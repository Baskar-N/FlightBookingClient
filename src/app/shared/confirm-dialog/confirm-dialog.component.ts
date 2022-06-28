import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  title:string = "";
  message:string = "";

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) 
  {
      if(data)
      {
        this.title = data.title;
        this.message = data.message;
      }
  }

  ngOnInit(): void {
  }

  onConfirmClick() {
    this.dialogRef.close(true);
  }

  @HostListener("keydown.esc")
  public onEsc()
  {
    this.dialogRef.close(false);
  }
}
