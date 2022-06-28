import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AppServiceUrl } from 'src/app/constants/AppServiceUrl';
import { Booking } from 'src/app/models/booking';
import { Discount } from 'src/app/models/discount';
import { Apiservice } from 'src/app/services/apiservice';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { Helper } from 'src/app/shared/helper';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.css']
})
export class ManageBookingComponent implements OnInit {

  displayedColumns: string[] = ['logo', 'flightNumber','airline', 'fromPlace', 'toPlace', 'ticketCost', 
                                'isBussinessClass','numberOfSeats','ticketPnr','action'];
  dataSource:MatTableDataSource<Booking> = new MatTableDataSource<Booking>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  imagePath:string;

  constructor(private apiService:Apiservice, private dialog:MatDialog, private authService:AuthGuardService
              ,private helper:Helper)
  {
    this.imagePath = AppServiceUrl.Airline_Images_Url;
  }

  ngAfterViewInit() {
    this.getAllBookings();
  }

  ngOnInit(): void {
  }

  getAllBookings():void
  {
    var userId = this.authService.emailId;

    this.apiService.GetBookingHistory(userId).subscribe((returnData:Booking[]) =>
    {
      if(returnData)
      {
        this.dataSource = new MatTableDataSource<Booking>(returnData);
        this.dataSource.paginator = this.paginator;
      }
    },
    (error:any) => {
      console.log("Service call error :" + error);
    });
  }

  downloadTicket(ticketPnr:string, reportType:string):void{
    if(reportType === "Server")
    {
      this.downloadServerReport(ticketPnr);
    }
    else{
      this.downloadClientReport();
    }
  }

  downloadServerReport(ticketPnr:string):void{
    this.apiService.DownloadReport(ticketPnr).subscribe((returnData:Blob) =>
    {
      if(returnData)
      {
        const blob = new Blob([returnData], { type: 'application/pdf' });

        var downloadURL = window.URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = "flightTicket.pdf";
        link.click();
      }
    },
    (error:any) => {
      console.log("Service call error :" + error);
    });
  }

  canCancelTicket(element:any):boolean{
    return (new Date(element.Schedule?.StartDateTime) > new Date() 
            && element.TicketCancelDate == null)
  }

  doCancelTicket(ticketPnr:string):void{
    this.apiService.CancelBooking(ticketPnr).subscribe((returnData:any) => {

        if(returnData.statusCode === environment.statusCode200)
        {
          this.helper.showSnackBar(returnData.status, 5000, "SuccessSnackBar");
          this.getAllBookings();
        }
    }, 
    (error:any) => {
      console.log("Service call error :" + error);
    })
  }

  downloadClientReport():void{
    let doc = new jsPDF();

    (doc as any).autoTable({html: '#booking'});
    doc.save("order.pdf");
  }
}
