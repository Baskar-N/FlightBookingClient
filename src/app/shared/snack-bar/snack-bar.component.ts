import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.css']
})
export class SnackBarComponent implements OnInit {

  message: string = "";

  constructor(public snackbarRef : MatSnackBarRef<SnackBarComponent>, @Inject(MAT_SNACK_BAR_DATA) public data: any) 
  {
      this.message = data.message;
  }

  ngOnInit(): void {
  }
}
