import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppServiceUrl } from "../constants/AppServiceUrl";
import { Airline } from "../models/airline";
import { Booking } from "../models/booking";
import { Discount } from "../models/discount";
import { Meal } from "../models/meal";
import { Schedule } from "../models/schedule";
import { ScheduleType } from "../models/schedule-type";

@Injectable(
    {
        providedIn: 'root'
    }
)

export class Apiservice {

    constructor(private httpClient: HttpClient)
    {

    }

    // Common service method's
    GetAllMealType(): Observable<Meal[]>{
        const endPoint = AppServiceUrl.Schedule_MealType_Url;

        return this.httpClient.get<Meal[]>(endPoint);  
    }

    GetAllTavelLocation(): Observable<Location[]>{
        const endPoint = AppServiceUrl.Schedule_Location_Url;

        return this.httpClient.get<Location[]>(endPoint);  
    }

    GetAllScheduleType(): Observable<ScheduleType[]>{
        const endPoint = AppServiceUrl.Schedule_ScheduleType_Url;

        return this.httpClient.get<ScheduleType[]>(endPoint);  
    }

    // Airline service method's 
    GetAllAirline(isShowInactiveAlso:boolean): Observable<Airline[]>{
        const endPoint = AppServiceUrl.Airline_All_Url+isShowInactiveAlso;

        return this.httpClient.get<Airline[]>(endPoint);        
    }

    AddAirline(airline:any):Observable<any>{
        const endPoint = AppServiceUrl.Airline_AddNew_Url;

        var header = new HttpHeaders();

        header.append('Content-Type', 'multipart/form-data');

        return this.httpClient.post(endPoint, airline, {headers:header});
    }

    BlockAirline(airlineRecId:number): Observable<any>{
        const endPoint = AppServiceUrl.Airline_Block_Url + airlineRecId;

        return this.httpClient.get(endPoint);        
    }

    // Booking service method's
    AddBooking(booking:Booking): Observable<any>{
        const endPoint = AppServiceUrl.Booking_AddNew_Url;

        return this.httpClient.post(endPoint, booking);        
    }

    CancelBooking(ticketPnr:string): Observable<any>{
        const endPoint = AppServiceUrl.Booking_Cancel_Url + ticketPnr;

        return this.httpClient.get(endPoint);        
    }

    GetBookingHistory(emailId:string): Observable<Booking[]>{
        const endPoint = AppServiceUrl.Booking_Histoy_Url + emailId;

        return this.httpClient.get<Booking[]>(endPoint);    
    }

    GetTicketDetails(ticketPnr:string): Observable<Booking>{
        const endPoint = AppServiceUrl.Booking_TicketDetails_Url + ticketPnr;

        return this.httpClient.get<Booking>(endPoint);    
    }

    // Schedule service method's
    AddSchedule(schedule:Schedule): Observable<any>{
        const endPoint = AppServiceUrl.Schedule_AddInventory_Url;

        return this.httpClient.post(endPoint, schedule);    
    }

    GetSchedulesByFilter(filters:any): Observable<any>{
        const endPoint = AppServiceUrl.Schedule_Search_Url;

        return this.httpClient.post<any>(endPoint, filters);    
    }

    GetAllSchedules(isNeedRealedLookups:boolean): Observable<any>
    {
        const endPoint = AppServiceUrl.Schedule_All_Url + isNeedRealedLookups;

        return this.httpClient.get(endPoint);
    }

    AddDiscount(discount:Discount): Observable<any>{
        const endPoint = AppServiceUrl.Schedule_AddDiscount_Url;

        return this.httpClient.post(endPoint, discount);    
    }

    GetDiscount(discountCode:string): Observable<Discount>{
        const endPoint = AppServiceUrl.Schedule_CheckDiscount_Url + discountCode;

        return this.httpClient.get<Discount>(endPoint);    
    }

    GetAllDiscount(): Observable<Discount[]>{
        const endPoint = AppServiceUrl.Schedule_AllDiscount_Url;

        return this.httpClient.get<Discount[]>(endPoint);    
    }

    //Download
    DownloadReport(ticketPnr:string):Observable<Blob>{
        const endPoint = AppServiceUrl.Booking_TicketDownload_Url + ticketPnr;

        return this.httpClient.get(endPoint, { responseType : 'blob'}); 
    }
}
