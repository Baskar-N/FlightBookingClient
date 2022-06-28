import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NEVER } from 'rxjs';
import { AppServiceUrl } from 'src/app/constants/AppServiceUrl';
import { Airline } from 'src/app/models/airline';
import { Apiservice } from 'src/app/services/apiservice';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { Helper } from 'src/app/shared/helper';
import { environment } from 'src/environments/environment';
import { AddAirlineComponent } from './add-airline/add-airline.component';

@Component({
  selector: 'app-manage-airline',
  templateUrl: './manage-airline.component.html',
  styleUrls: ['./manage-airline.component.css']
})
export class ManageAirlineComponent implements OnInit {

  displayedColumns: string[] = ['logo', 'name', 'contactNumber', 'contactAddress', 'block'];
  dataSource:MatTableDataSource<Airline> = new MatTableDataSource<Airline>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  imagePath:string;

  constructor(private apiService:Apiservice, private dialog:MatDialog, private helper:Helper)
  {
    this.imagePath = AppServiceUrl.Airline_Images_Url;
  }

  ngAfterViewInit() {
    this.getAllAirline();
  }

  ngOnInit(): void {
  }

  getAllAirline():void{
    this.apiService.GetAllAirline(true).subscribe((returnData:any) =>
    {
      if(returnData)
      {
        this.dataSource = new MatTableDataSource<Airline>(returnData);
        this.dataSource.paginator = this.paginator;
      }
    },
    (error:any) => {
      console.log("Service call error :" + error);
    });
  }

  blockAirline(airline:Airline):void
  {
    var status = airline.isActive ? "block" : "unblock";

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      minWidth: '300px',
      disableClose: true,
      data: {
        title : "Confirmation",
        message: "Are you sure to "+ status + " the \"" + airline.name + "\" airlines?"
      }
    });

    dialogRef.afterClosed().subscribe((result:boolean) => {
      if(result)
      {
        this.apiService.BlockAirline(airline.airlineId).subscribe((returnData:any) =>
        {
          if(returnData.statusCode = environment.statusCode200)
          {
            this.helper.showSnackBar(returnData.status, 5000, "SuccessSnackBar");
            this.getAllAirline();
          }
        },
        (error:any) => {
          console.log("Service call error :" + error);
        });
      }
    });
  }

  showOrHideAddAirline(isShow:boolean)
  {
    const dialogRef = this.dialog.open(AddAirlineComponent, {
      maxWidth: '500px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((dialogResult: any) => {
      if(dialogResult)
      {
        this.getAllAirline();
      }
    })
  }
}
