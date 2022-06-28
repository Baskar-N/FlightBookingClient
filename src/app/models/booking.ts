import { Passenger } from "./passenger";
import { Schedule } from "./schedule";

export class Booking {
    public bookingRecId:number = 0;
    public scheduleRecId:number = 0;
    public returnScheduleRecId:number | null = null;
    public emailId:string = "";
    public name:string = "";
    public numberOfSeats:number = 0;
    public isBcs:boolean = false;
    public ticketPnr:string = "";
    public ticketCancelDate:Date | null = null;
    public passenger:Passenger[] | null = null;
    public schedule:Schedule | null = null;
    public createdDate:Date | null = null;
    public discountCode:string | null = null;
    public discountRecId:number | null = null;
}
