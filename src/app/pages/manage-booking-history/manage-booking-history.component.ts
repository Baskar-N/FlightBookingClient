import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { filter, Observable } from 'rxjs';
import { AppServiceUrl } from 'src/app/constants/AppServiceUrl';
import { Booking } from 'src/app/models/booking';
import { Apiservice } from 'src/app/services/apiservice';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

@Component({
  selector: 'app-manage-booking-history',
  templateUrl: './manage-booking-history.component.html',
  styleUrls: ['./manage-booking-history.component.css']
})
export class ManageBookingHistoryComponent implements OnInit {

  displayedColumns: string[] = ['logo', 'flightNumber','airline', 'fromPlace', 'toPlace', 'ticketCost', 
                                'isBussinessClass','numberOfSeats','ticketPnr','boardingStatus'];
  dataSource:MatTableDataSource<Booking> = new MatTableDataSource<Booking>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  filterType:string = "email";
  emailId:string = "";
  pnr:string = "";
  imagePath:string;

  constructor(private apiService:Apiservice, private authService:AuthGuardService)
  {
    this.imagePath = AppServiceUrl.Airline_Images_Url;
  }

  ngAfterViewInit() {
    this.getBookingsByEmailId();
  }

  ngOnInit(): void {
  }

  getBookingsByEmailId():void
  {
    if(this.emailId === "")
    {
      return;
    }

    this.apiService.GetBookingHistory(this.emailId).subscribe((returnData:Booking[]) =>
    {
      if(returnData)
      {
        this.dataSource = new MatTableDataSource<Booking>(returnData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = (data:any, filter:string) => {
          return data.TicketPnr.trim().toLowerCase().indexOf(filter) > -1;
        }
      }
    },
    (error:any) => {
      console.log("Service call error :" + error);
    });
  }

  getBookingsByPnr():void
  {
    this.apiService.GetTicketDetails(this.pnr).subscribe((returnData:Booking) =>
    {
      if(returnData)
      {
        this.dataSource = new MatTableDataSource<Booking>([returnData]);
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = (data:any, filter:string) => {
          return data.TicketPnr.trim().toLowerCase().indexOf(filter) > -1;
        }
      }
    },
    (error:any) => {
      console.log("Service call error :" + error);
    });
  }

  doSearch():void{
    if(this.filterType === "email")
    {
      this.getBookingsByEmailId();
    }
    else{
      this.getBookingsByPnr();
    }
  }

  getStatus(element:any):string 
  {
    if (element.TicketCancelDate !== null && element.TicketCancelDate !== "")
    {
        return "Cancelled";
    }
    else if(element.TicketCancelDate === null && new Date(element.Shedule?.StartDateTime) < new Date())
    {
        return "Completed";
    }
    else
    {
        return "OnBoarding";
    }
  }
}
