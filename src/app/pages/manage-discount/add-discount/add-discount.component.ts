import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Discount } from 'src/app/models/discount';
import { Apiservice } from 'src/app/services/apiservice';
import { Helper } from 'src/app/shared/helper';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-discount',
  templateUrl: './add-discount.component.html',
  styleUrls: ['./add-discount.component.css']
})
export class AddDiscountComponent implements OnInit {

  discountForm: FormGroup;

  constructor(private formBuilder:FormBuilder, private apiService:Apiservice,
          private dialogRef: MatDialogRef<AddDiscountComponent>, private helper:Helper) { 

    this.discountForm = this.formBuilder.group({
      discountCode: new FormControl('', [Validators.required, Validators.maxLength(25)]),
      discountAmount: new FormControl('', [Validators.required, Validators.maxLength(25)]),
    });
  }

  ngOnInit(): void {
  }

  onRegister():void
  {
    
    if(this.discountForm.valid)
    {
      var data = new Discount();

      data.discountCode = this.discountForm.controls["discountCode"].value;
      data.discountAmount = Number(this.discountForm.controls["discountAmount"].value);

      // call web service
      this.apiService.AddDiscount(data).subscribe((returnData:any) =>
      {
        if(returnData)
        {
          if(returnData.statusCode === environment.statusCode201)
          {
            this.helper.showSnackBar(returnData.status, 5000, "SuccessSnackBar");
            this.closeForm();
          }
        }
      },
      (error:any) => {
        console.log("Service call error :" + error);
      });
    }
  }

  closeForm():void{
    this.dialogRef.close(true);
  }

  checkError = (controlName:string, errorName: string) => {
    return this.discountForm.controls[controlName]?.hasError(errorName);
  }
}
