import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Airline } from 'src/app/models/airline';
import { Apiservice } from 'src/app/services/apiservice';
import { Helper } from 'src/app/shared/helper';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-airline',
  templateUrl: './add-airline.component.html',
  styleUrls: ['./add-airline.component.css']
})
export class AddAirlineComponent implements OnInit {

  airlineForm: FormGroup;

  constructor(private formBuilder:FormBuilder, private apiService:Apiservice,
          private dialogRef: MatDialogRef<AddAirlineComponent>, private helper:Helper) { 

    this.airlineForm = this.formBuilder.group({
      airline: new FormControl('', [Validators.required, Validators.maxLength(25)]),
      logo: new FormControl('',[]),
      fileSource: new FormControl(''),
      contactNumber: new FormControl('', [Validators.required, Validators.maxLength(25)]),
      contactAddress: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    });
  }

  ngOnInit(): void {
  }

  onRegister():void
  {
    
    if(this.airlineForm.valid)
    {
      var data = new Airline();

      data.name = this.airlineForm.controls["airline"].value;
      // data.logo = this.airlineForm.controls["logo"].value;
      data.contactNumber = Number(this.airlineForm.controls["contactNumber"].value);
      data.contactAddress = this.airlineForm.controls["contactAddress"].value;

      var formData = new FormData();
      formData.append("imageFile", this.airlineForm.get('fileSource')?.value);
      formData.append("airline", JSON.stringify(data))

      // call web service
      this.apiService.AddAirline(formData).subscribe((returnData:any) =>
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
    return this.airlineForm.controls[controlName]?.hasError(errorName);
  }

  onFileChange(event:any) {
   
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.airlineForm.patchValue({
        fileSource: file
      });
    }
  } 
}
