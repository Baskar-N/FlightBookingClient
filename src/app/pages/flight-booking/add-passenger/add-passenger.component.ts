import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from 'src/app/models/booking';
import { Discount } from 'src/app/models/discount';
import { Passenger } from 'src/app/models/passenger';
import { Journey } from 'src/app/models/journey';
import { ReturnJourney } from 'src/app/models/return-journey';
import { Apiservice } from 'src/app/services/apiservice';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { Helper } from 'src/app/shared/helper';
import { environment } from 'src/environments/environment';
import { Meal } from 'src/app/models/meal';

@Component({
  selector: 'app-add-passenger',
  templateUrl: './add-passenger.component.html',
  styleUrls: ['./add-passenger.component.css']
})
export class AddPassengerComponent implements OnInit {

  selectedSchedule:any;
  isRoundTrip : boolean = false;
  selectedReturnSchedule:any;
  dateOfJourney:any;
  returnJourney:any;
  isBusinessClass: string = "1"; // 1 - Non-Business, 2- Business
  showPassengers: boolean = false;
  passengerList  = new MatTableDataSource<Passenger>([]);
  mealTypeList:Meal[] = [];
  disCode: any;
  ticketCost: number = 0;
  isDisableDiscount: boolean = false;
  discount:Discount = new Discount();
  passengerColumns : string[] = 
  [
    "name",
    "age",
    "gender",
    "seatNumber",
    "returnSeatNumber",
    "delete"
  ];

  constructor(private _router : Router, private _activeRoute : ActivatedRoute, 
    private formBuilder : FormBuilder, private dialog: MatDialog, private helper: Helper,
    private apiService: Apiservice, public authService:AuthGuardService) 
  {
    this._activeRoute.queryParams.subscribe((params) => {
        console.log(params);
        this.isRoundTrip = params["IsRoundTrip"] === "true";
        this.selectedSchedule = JSON.parse(params["OneWay"]);

        if(this.isRoundTrip)
        {               
          this.selectedReturnSchedule = JSON.parse(params["ReturnTrip"]);
        }
    });
   }   

   passengerFormGroup : FormGroup  = this.formBuilder.group({
    passengerName: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required, Validators.maxLength(6)]),
    gender: new FormControl('', [Validators.required]),
    seatNumber: new FormControl('', [Validators.required]),
    returnSeatNumber: new FormControl(),
    mealTypeRecId: new FormControl('', [Validators.required]) 
  });     

  ngOnInit(): void 
  {
    this.getMealTypes();
  }

  getMealTypes():void{
    this.apiService.GetAllMealType()
      .subscribe((data : Meal[]) => {
          if(data)
          {
            this.mealTypeList = data;
          }
      });
  }

  redirectToFlightSearch() {
    this._router.navigate(["search-flight"]).then(() => {
      window.location.reload();
    });
  }

  checkError = (controlName: string, errorName: string) => {
    return this.passengerFormGroup.controls[controlName].hasError(errorName);
  }

  checkReturnSeat() : boolean {
    var returnSeatNumber = this.passengerFormGroup.controls["returnSeatNumber"];
    
    if(!returnSeatNumber.value)
    {
      returnSeatNumber.setErrors({ required: true });
      return true;
    }

    return false;
  }

  resetFormData(){
   this.passengerFormGroup.reset();
  }

    onSubmit_passengerDetails() 
    {
      if(this.passengerFormGroup.invalid)
      {
        return;
      }

      var newPassenger = new Passenger();
      var journey = new Journey();
      journey.seatNumber = this.passengerFormGroup.controls["seatNumber"].value;
      journey.mealTypeRecId = Number(this.passengerFormGroup.controls["mealTypeRecId"].value);

      newPassenger.name = this.passengerFormGroup.controls["passengerName"].value;
      newPassenger.age = Number(this.passengerFormGroup.controls["age"].value);
      newPassenger.gender = this.passengerFormGroup.controls["gender"].value;
      newPassenger.journey = journey;

      if(this.isRoundTrip)
      {
        var returnJourney = new ReturnJourney();
        returnJourney.seatNumber = this.passengerFormGroup.controls["returnSeatNumber"].value;
        returnJourney.mealTypeRecId = Number(this.passengerFormGroup.controls["mealTypeRecId"].value);

        newPassenger.returnJourney = returnJourney;
      }

      this.passengerList.data.push(newPassenger);
      this.passengerList._updateChangeSubscription();

      this.showPassengers = true;
  }

  calculateTicketCost(noOfPassenger : number)
  {
    this.ticketCost = 0;

    this.ticketCost += Number(this.selectedSchedule.TicketCost) * noOfPassenger;

    if(this.isRoundTrip)
    {
      this.ticketCost += Number(this.selectedReturnSchedule.TicketCost) * noOfPassenger;
    }
  }

  deletePassenger(rowIndex : number)   
  {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      minWidth: '300px',
      disableClose: true,
      data : {
        title: "Confirmation",
        message: "Are you sure to delete the passenger details?"
      }
    });
    dialogRef.afterClosed().subscribe((result : boolean) => {
        if(result)
        {
          this.passengerList.data.splice(rowIndex);
          this.passengerList._updateChangeSubscription();

          if(this.passengerList.data.length === 0){
            this.showPassengers = false;
          }
        }
    });    
  }

  returnToSchedule() {
    this._router.navigate(["search-flight"]).then(() => {
      window.location.reload();
    });
  }

  onclick_bookTicket()
  {
    var noOfSeats = this.passengerList?.data.length;

    if(noOfSeats === 0)
    {
      this.helper.showSnackBar("Please add the passenger first.", 5000, "DeleteSnackBar");
      return;
    }

    this.TicketAmount(Number(this.discount?.discountAmount));

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      minWidth: '300px',
      disableClose: true,
      data : {
        title: "Booking Confirmation",
        message: "Number of seats : " + noOfSeats + "  Ticket Cost : " + this.ticketCost
      }
    });
    dialogRef.afterClosed().subscribe((result : boolean) => {
        if(result)
        {
          this.bookTicketService(noOfSeats);
        }
    });
  }

  bookTicketService(noOfSeats : any)
  {
    var params = new Booking();
    params.scheduleRecId = Number(this.selectedSchedule?.ScheduleRecId); 
    params.name = this.authService.fullName;
    params.emailId = this.authService.emailId;
    params.numberOfSeats = noOfSeats;
    params.isBcs = this.isBusinessClass === "2",
    params.passenger = this.passengerList.data;
    params.discountCode = this.disCode;
    params.discountRecId = this.discount?.discountRecId == 0 ? null : this.discount?.discountRecId;

    if(this.isRoundTrip)
    {
      params.returnScheduleRecId = Number(this.selectedReturnSchedule?.ScheduleRecId)
    }

    console.log("book param - ", params);

    this.apiService.AddBooking(params)
      .subscribe((data : any) => {
        if(data.statusCode === environment.statusCode201)
        {
          this.helper.showSnackBar(data.status, 5000, "SuccessSnackBar");

          this.redirectToFlightSearch();
        }
    })
  }

  onclick_ApplyDiscount()
  {
    if(!this.disCode)
    {
      this.helper.showSnackBar("Please enter the discount code.", 5000, "DeleteSnackBar");
      return;
    }

    this.apiService.GetDiscount(this.disCode).subscribe((result:Discount) => {

      if(result)
      {
        this.discount = result;
        this.TicketAmount(result.discountAmount);
        this.helper.showSnackBar("Your discount code is applied", 5000, "SuccessSnackBar");
      }
      else{
        this.helper.showSnackBar("Invalid discount code", 5000, "DeleteSnackBar");
      }
    },
    (error) =>{
      console.log("Api service:" + error);
    });
  }

  TicketAmount(discountAmount:number = 0)
  {
    var noOfSeats = this.passengerList?.data.length;

    this.calculateTicketCost(noOfSeats);

    if(discountAmount > 0)
    {
      if(this.isRoundTrip)
      {
          this.ticketCost *= noOfSeats;
      }
      
      this.ticketCost *= noOfSeats;
      this.ticketCost -= discountAmount;
      this.isDisableDiscount = true;
    }
  }

}
