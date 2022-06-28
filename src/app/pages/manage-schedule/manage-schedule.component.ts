import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Airline } from 'src/app/models/airline';
import { Meal } from 'src/app/models/meal';
import { Schedule } from 'src/app/models/schedule';
import { ScheduleType } from 'src/app/models/schedule-type';
import { Apiservice } from 'src/app/services/apiservice';
import { AddScheduleComponent } from './add-schedule/add-schedule.component';

@Component({
  selector: 'app-manage-schedule',
  templateUrl: './manage-schedule.component.html',
  styleUrls: ['./manage-schedule.component.css']
})
export class ManageScheduleComponent implements OnInit {

  displayedColumns: string[] = ['flightNumber', 'airline', 'fromPlace', 'toPlace', 'startDateTime', 'endDateTime'
              , 'scheduledType', 'instrumentUsed', 'bcs', 'nonBcs', 'ticketCost', 'mealType'];
  dataSource:MatTableDataSource<Schedule> = new MatTableDataSource<Schedule>();

  airlines:Airline[] = [];
  mealTypes:Meal[] = [];
  scheduleType:ScheduleType[] = [];
  places:Location[] = [];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private apiService:Apiservice, private dialog:MatDialog)
  {

  }

  ngAfterViewInit() {
    this.getAllSchedules(true);
  }

  ngOnInit(): void {
    this.getAllAirline();
  }

  getAllAirline():void{
    this.apiService.GetAllAirline(false).subscribe((returnData:Airline[]) =>
    {
      if(returnData)
      {
        this.airlines = returnData;
      }
    },
    (error:any) => {
      console.log("Service call error :" + error);
    });
  }

  getAllSchedules(isNeedRelatedLookups:boolean):void{
    this.apiService.GetAllSchedules(isNeedRelatedLookups).subscribe((returnData:any) =>
    {
      if(returnData)
      {
        if(returnData.hasOwnProperty("Schedules"))
        {
          this.dataSource = new MatTableDataSource<Schedule>(returnData.Schedules);
          this.dataSource.paginator = this.paginator;
        }

        if(returnData.hasOwnProperty("MealTypes"))
        {
            this.mealTypes = returnData.MealTypes;
        }

        if(returnData.hasOwnProperty("ScheduledTypes"))
        {
          this.scheduleType = returnData.ScheduledTypes;
        }

        if(returnData.hasOwnProperty("Places"))
        {
          this.places = returnData.Places;
        }
      }
    },
    (error:any) => {
      console.log("Service call error :" + error);
    });
  }

  showAddScheduleModal(isViewOnly:boolean = false)
  {
    const dialogRef = this.dialog.open(AddScheduleComponent, {
      maxWidth: '600px',
      disableClose: true,
      data:{
        mealTypeList: this.mealTypes,
        airlineList: this.airlines,
        scheduleTypeList: this.scheduleType,
        placeList: this.places,
        isViewOnly:isViewOnly
      }
    });

    dialogRef.afterClosed().subscribe((dialogResult: any) => {
      if(dialogResult)
      {
        this.getAllSchedules(false);
      }
    })
  }
}
