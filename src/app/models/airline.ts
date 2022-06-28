import { Schedule } from "./schedule";

export class Airline {
    public airlineId:number = 0;
    public name:string = "";
    public logo:string = "";
    public contactNumber:number = 0;
    public contactAddress:string = "";
    public schedule:Schedule[] | null = null;
    public isActive:boolean = false;
}
