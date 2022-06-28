import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import jwtDecode, { JwtPayload } from 'jwt-decode'
import { AppServiceUrl } from '../constants/AppServiceUrl';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  private _userRecId:number | null = null;
  private _firstName:string = "";
  private _lastName:string = "";
  private _emailId:string = "";
  private _userRole:string = "";

  get userRecId():number|null{
    return this._userRecId;
  }

  get firstName():string{
    return this._firstName;
  }

  get lastName():string{
    return this._lastName;
  }

  get fullName():string{
    return this._firstName + " " + this._lastName;
  }

  get emailId():string{
    return this._emailId;
  }

  get userRole():string{
    return this._userRole;
  }

  public IsUserLogged = new BehaviorSubject<boolean>(false);

  constructor(private router:Router, private route:ActivatedRoute, 
          private httpClient:HttpClient) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if(this.getToken())
    {
      this.SetLoggedUserInfo();
      this.IsUserLogged.next(true);

      var userRole = this.userRole?.toLowerCase();

      if(!route.data["role"])
      {
        return true;
      }

      if(route.data["role"]?.toLowerCase() === userRole)
      {
        return true;
      }
    }
    else
    {
      this.Logout();

      this.router.navigate(["login"]);
      
    }   
    
    return false;
  }

  public Logout(isClick:boolean = false):void{
    var returnUrl = this.route.routeConfig?.component?.name;

    if(isClick)
    {
      const endPoint = AppServiceUrl.Logout_User_Url;

      this.httpClient.get(endPoint);
    }

    localStorage.removeItem("Token");
    this.IsUserLogged.next(false);
    this.router.navigate(["login"], {queryParams: {returnUrl: returnUrl}});
  }

  public getToken():any{
    return localStorage.getItem("Token");
  }

  // Login service method's
  LoginAuthentication(params:any):Observable<any>
  {
      const endPoint = AppServiceUrl.Login_User_Url;

      return this.httpClient.post(endPoint, params);
  }

  UserRegistration(params:any):Observable<any>
  {
      const endPoint = AppServiceUrl.Register_User_Url;

      return this.httpClient.post(endPoint, params);
  }

  SetLoggedUserInfo():void
  {
    var userInfo = this.GetDecodeTokenInfo();

    if(userInfo)
    {
      this._emailId = userInfo.UserRecId;
      this._firstName = userInfo.FirstName;
      this._lastName = userInfo.LastName;
      this._userRole = userInfo.Role;
    }
  }

  private GetDecodeTokenInfo():any{
    const token = this.getToken();

    if(token)
    {
      return jwtDecode<JwtPayload>(token);
    }
  }

  public GetDefaultPath():string
  {
    var userRole = this._userRole?.toLowerCase();

    return userRole === 'admin' ? 'manage-schedule' : 'search-flight'
  }
}
