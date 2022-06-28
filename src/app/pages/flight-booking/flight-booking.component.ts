import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppServiceUrl } from 'src/app/constants/AppServiceUrl';
import { Schedule } from 'src/app/models/schedule';
import { Apiservice } from 'src/app/services/apiservice';
import { Helper } from 'src/app/shared/helper';

@Component({
  selector: 'app-flight-booking',
  templateUrl: './flight-booking.component.html',
  styleUrls: ['./flight-booking.component.css']
})
export class FlightBookingComponent implements OnInit {

  fromPlace:string = "";
  toPlace:string = "";
  startJourney:any;
  returnJourney:any;
  imagePath:string;

  // datasource
  schedules:any;
  roundWaySchedules:any;
  placeList:any;

  selectedScheduleRow:any;
  selectedRoundTripScheduleRow:any;
  isShowBookModal: boolean = false;
  oneWayOrRound: string = "1";
  
  displayedColumns = [    
    "logo",
    'airline',
    'flightNumber',
    'fromPlace',
    'toPlace',
    'seatsAvailable',
    'ticketCost',
    'instrumentUsed'
  ];

  constructor(private apiService: Apiservice, private helper : Helper,
        private router:Router, private route:ActivatedRoute) { 
    this.imagePath = AppServiceUrl.Airline_Images_Url;
  }

  ngOnInit(): void {
    this.getAllPlace();
  }

  getAllPlace():void{
    this.apiService.GetAllTavelLocation()
      .subscribe((data : Location[]) => {
          if(data)
          {
            this.placeList = data;
          }
      });
  }

  searchFlight() 
  {
    if(this.oneWayOrRound === "2" && this.returnJourney === undefined)
    {
      this.helper.showSnackBar("Please select return journey date.", 5000, "DeleteSnackBar");
      return
    }

    var params = new Schedule();

    params.fromPlace = this.fromPlace;
    params.toPlace = this.toPlace;
    params.startDateTime = this.startJourney;
    params.endDateTime = this.returnJourney;

    this.apiService.GetSchedulesByFilter(params)
      .subscribe((data : any) => {
          if(data)
          {
            if(data.hasOwnProperty("Journey"))
            {
              this.schedules = data.Journey
            }

            if(data.hasOwnProperty("ReturnJourney"))
            {
              this.roundWaySchedules = data.ReturnJourney
            }
          }
      })
  }

  navigateToBook()
  {
    if(!this.selectedScheduleRow)
    {
      this.helper.showSnackBar("Please select your flight.", 5000, "DeleteSnackBar");
      return
    }

    if(this.oneWayOrRound === "2" && !this.selectedRoundTripScheduleRow)
    {
      this.helper.showSnackBar("Please select your return journey flight.", 5000, "DeleteSnackBar");
      return;
    }

    var params = {
      "OneWay": JSON.stringify(this.selectedScheduleRow),
      "IsRoundTrip": this.oneWayOrRound === "2",
      "ReturnTrip" : JSON.stringify(this.selectedRoundTripScheduleRow)
    };

    this.isShowBookModal = true;
    this.router.navigate(["book-flight"], { relativeTo: this.route, queryParams : params });
  }
  
  rowClick_Schedule(schedule : any, oneWayOrRound : number) {
    
    switch(oneWayOrRound)
    {
      case 1:
        this.selectedScheduleRow = schedule;
        break;
      case 2:
          this.selectedRoundTripScheduleRow = schedule;
      break;
      default:        
        break;
    }
  }
}
