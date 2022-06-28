import { Passenger } from "./passenger";

export class Journey {
    public journeyRecId:number = 0;
    public passengerRecId:number = 0;
    public mealTypeRecId:number = 0;
    public seatNumber:number = 0;
    public passenger:Passenger | null = null;
}
