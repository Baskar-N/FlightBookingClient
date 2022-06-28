import { Booking } from "./booking";
import { Journey } from "./journey";
import { ReturnJourney } from "./return-journey";

export class Passenger {
    public passengerId:number = 0;
    public bookingRecId:number = 0;
    public name:string = "";
    public gender:string = "";
    public age:number = 0;
    public booking:Booking | null = null;
    public journey: Journey | null = null;
    public returnJourney: ReturnJourney | null = null;
}
