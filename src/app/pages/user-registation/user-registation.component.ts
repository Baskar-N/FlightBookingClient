import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { Apiservice } from 'src/app/services/apiservice';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { Helper } from 'src/app/shared/helper';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-registation',
  templateUrl: './user-registation.component.html',
  styleUrls: ['./user-registation.component.css']
})
export class UserRegistationComponent implements OnInit {

  @ViewChild('emailIdInput', {static: true}) emailId:any;
  
  registerForm: FormGroup;
  loginInValid:boolean = false;
  hide:boolean = true;

  constructor(private formBuilder:FormBuilder, private route:ActivatedRoute
              , private authService:AuthGuardService, private router:Router
              , private helper:Helper) { 

    this.registerForm = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(25)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(25)]),
      emailId: new FormControl('', [Validators.required, Validators.maxLength(25),
                Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]),
      password: new FormControl('', [Validators.required, Validators.maxLength(20),
                Validators.pattern('(?=.*[a-z])(?=.*[0-9])(?=.*[$@$!%?&])[A-Za-z\d$@$!%*?&].{7,}')]),
      confirmPassword: new FormControl()
    });
  }

  ngOnInit(): void {
  }

  onRegister():void
  {
    
    if(this.registerForm.valid)
    {
      this.loginInValid = false;

      var data = new User();

      data.firstName = this.registerForm.controls["firstName"].value;
      data.lastName = this.registerForm.controls["lastName"].value;
      data.emailId = this.registerForm.controls["emailId"].value;
      data.password = this.registerForm.controls["password"].value;

      // call web service
      this.authService.UserRegistration(data).subscribe((returnData:any) =>
      {
        if(returnData)
        {
          if(returnData.statusCode === environment.statusCode201)
          {
            this.helper.showSnackBar(returnData.status, 5000, "SuccessSnackBar");
            this.router.navigate(["login"]);
          }
          else{
            // To show invalid error message
            this.loginInValid = true;
          }
        }
      },
      (error:any) => {
        console.log("Service call error :" + error);
      });
    }
  }

  cancelRegistration():void{
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';

    this.router.navigate([returnUrl])
  }

  checkError = (controlName:string, errorName: string) => {
    if(controlName === "confirmPassword")
    {
      this.comparePassword();
    }

    return this.registerForm.controls[controlName]?.hasError(errorName);
  }

  comparePassword():void
  {
    var password = this.registerForm.controls["password"]?.value;
    var confirmPassword = this.registerForm.controls["confirmPassword"];

    if(password === confirmPassword?.value)
    {
      confirmPassword?.setErrors(null);
    }
    else{
      confirmPassword?.setErrors({mustMatch:true});
    }
  }
}
