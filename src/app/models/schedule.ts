import { Airline } from "./airline";

export class Schedule {
    public scheduleRecId:number = 0;
    public airlineId:number = 0;
    public flightNumber:string = "";
    public fromPlace:string = "";
    public toPlace:string = "";
    public startDateTime:Date | null = null;
    public endDateTime:Date | null = null;
    public scheduledDaysRecId:number = 0;
    public instrumentUsed:string = "";
    public bcs:number = 0;
    public nonBcs:number = 0;
    public ticketCost:number = 0;
    public mealTypeRecId:number = 0;
    public airline:Airline | null = null;
}
