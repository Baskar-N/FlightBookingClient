import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Apiservice } from 'src/app/services/apiservice';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('emailIdInput', {static: true}) emailId:any;
  
  form: FormGroup;
  loginInValid:boolean = false;
  hide:boolean = true;

  constructor(private formBuilder:FormBuilder, private route:ActivatedRoute
              , private authService:AuthGuardService, private router:Router) { 

    this.form = this.formBuilder.group({
      emailId: new FormControl('', [Validators.required, Validators.maxLength(25)]),
      password: new FormControl('', [Validators.required, Validators.maxLength(25)])
    });
  }

  ngOnInit():void
  {
    if(this.authService.getToken())
    {
      this.authService.SetLoggedUserInfo();
      var returnUrl = this.authService.GetDefaultPath();

      this.router.navigate([returnUrl]);
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.emailId.nativeElement.focus();
    }, 100);
  }

  onLogin():void{
    if(this.form.valid)
    {
      // call web service
      this.authService.LoginAuthentication(this.form.value).subscribe((returnData:any) =>
      {
        if(returnData.hasOwnProperty("token"))
        {
          localStorage.setItem("Token", returnData.token);
          this.authService.SetLoggedUserInfo();
          const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || this.authService.GetDefaultPath();
          this.router.navigate([returnUrl]);
        }
      },
      (error:any) => {
        this.loginInValid = true;
        this.emailId.nativeElement.focus();
        console.log("Service call error :" + error);
      });
    }
  }
}
