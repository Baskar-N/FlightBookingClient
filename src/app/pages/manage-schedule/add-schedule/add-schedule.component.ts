import { Component, Inject, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Schedule } from 'src/app/models/schedule';
import { Apiservice } from 'src/app/services/apiservice';
import { Helper } from 'src/app/shared/helper';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.css']
})
export class AddScheduleComponent implements OnInit {

  airlineList:any;
  constructor(private formBuilder:FormBuilder, private apiService:Apiservice,
    private dialogRef: MatDialogRef<AddScheduleComponent>, private helper:Helper,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

    addScheduleForm:FormGroup = this.formBuilder.group({
      airlineRecId: new FormControl(),
      flightNumber: new FormControl('', [Validators.required]),
      fromPlace: new FormControl('', [Validators.required]),
      toPlace: new FormControl('', [Validators.required]),
      startDateTime: new FormControl('', [Validators.required]),
      endDateTime: new FormControl('', [Validators.required]),
      scheduleTypeRecId: new FormControl('', [Validators.required]),
      instrumentUsed: new FormControl('', [Validators.required]),
      noOfBussinessClsSeats: new FormControl('', [Validators.maxLength(7)]),
      noOfNonBussinessClsSeats: new FormControl('', [Validators.maxLength(7)]),
      ticketCost: new FormControl('', [Validators.maxLength(7)]),
      mealTypeRecId: new FormControl('', [Validators.maxLength(7)])
  })

  checkError = (controlName: string, errorName: string) => {
    return this.addScheduleForm.controls[controlName].hasError(errorName);
  }

  ngOnInit(): void {
    
  }

  onAddSchedule() {
    if(this.addScheduleForm.invalid)
    {
      return;
    }

    var schedule = new Schedule();
    
    schedule.airlineId = Number(this.addScheduleForm.controls["airlineRecId"]?.value);
    schedule.flightNumber = this.addScheduleForm.controls["flightNumber"]?.value;
    schedule.fromPlace = this.addScheduleForm.controls["fromPlace"]?.value,
    schedule.toPlace = this.addScheduleForm.controls["toPlace"]?.value,
    schedule.startDateTime = this.addScheduleForm.controls["startDateTime"]?.value,
    schedule.endDateTime = this.addScheduleForm.controls["endDateTime"]?.value,
    schedule.scheduledDaysRecId = Number(this.addScheduleForm.controls["scheduleTypeRecId"]?.value),
    schedule.instrumentUsed = this.addScheduleForm.controls["instrumentUsed"]?.value;
    schedule.bcs = Number(this.addScheduleForm.controls["noOfBussinessClsSeats"]?.value);
    schedule.nonBcs = Number(this.addScheduleForm.controls["noOfNonBussinessClsSeats"]?.value);
    schedule.ticketCost = Number(this.addScheduleForm.controls["ticketCost"]?.value);
    schedule.mealTypeRecId = Number(this.addScheduleForm.controls["mealTypeRecId"]?.value);

    this.apiService.AddSchedule(schedule).subscribe((returnData : any) => 
    {
        if(returnData.statusCode === environment.statusCode201)
        {
          this.helper.showSnackBar(returnData.status, 5000, "SuccessSnackBar");
          this.closeForm();
        }
    }, (error) =>
    {
      console.log("Api service error:" + error);
    });

  }

  closeForm():void{
    this.dialogRef.close(true);
  }
}
