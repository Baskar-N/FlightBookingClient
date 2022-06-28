import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Discount } from 'src/app/models/discount';
import { Apiservice } from 'src/app/services/apiservice';
import { AddDiscountComponent } from './add-discount/add-discount.component';

@Component({
  selector: 'app-manage-discount',
  templateUrl: './manage-discount.component.html',
  styleUrls: ['./manage-discount.component.css']
})
export class ManageDiscountComponent implements OnInit {

  displayedColumns: string[] = ['discountCode', 'discountAmount'];
  dataSource:MatTableDataSource<Discount> = new MatTableDataSource<Discount>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private apiService:Apiservice, private dialog:MatDialog)
  {

  }

  ngAfterViewInit() {
    this.getAllDiscount();
  }

  ngOnInit(): void {
  }

  getAllDiscount():void{
    this.apiService.GetAllDiscount().subscribe((returnData:Discount[]) =>
    {
      if(returnData)
      {
        this.dataSource = new MatTableDataSource<Discount>(returnData);
        this.dataSource.paginator = this.paginator;
      }
    },
    (error:any) => {
      console.log("Service call error :" + error);
    });
  }

  deactivateDiscount(element:Discount):void
  {

  }

  showDiscountModal()
  {
    const dialogRef = this.dialog.open(AddDiscountComponent, {
      maxWidth: '300px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((dialogResult: any) => {
      if(dialogResult)
      {
        this.getAllDiscount();
      }
    })
  }
}
