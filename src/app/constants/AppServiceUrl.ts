import { environment } from "src/environments/environment";

const BASE_URL:string = environment.base_url;

export const AppServiceUrl = {
    // Auth Micro Services Url
    Register_User_Url: BASE_URL + "auth/register",    
    Login_User_Url: BASE_URL + "auth/login",
    Logout_User_Url: BASE_URL + "auth/logout",

    // Airline Micro Services Url
    Airline_All_Url: BASE_URL + "airline/getallairline?isShowInactiveAlso=",
    Airline_AddNew_Url: BASE_URL + "airline/register",
    Airline_Block_Url: BASE_URL + "airline/blockairline?airlineRecId=",
    Airline_Images_Url: BASE_URL + "airline/images/",

    // Booking Micro Services Url
    Booking_AddNew_Url: BASE_URL + "booking/addbooking",
    Booking_Cancel_Url: BASE_URL + "booking/cancelticket?ticketPnr=",
    Booking_Histoy_Url: BASE_URL + "ticket/gethistory?emailId=",
    Booking_TicketDetails_Url: BASE_URL + "ticket/getTicketdetails?ticketPnr=",
    Booking_TicketDownload_Url:BASE_URL + "ticket/downloadticket?ticketPnr=",

    // Schedule Micro Services Url
    Schedule_AddInventory_Url: BASE_URL + "schedule/addinventory",
    Schedule_All_Url: BASE_URL + "schedule/getallschedules?isNeedRelatedLookup=",
    Schedule_Search_Url: BASE_URL + "schedule/search",
    Schedule_MealType_Url: BASE_URL + "schedule/getallmealType",
    Schedule_Location_Url: BASE_URL + "schedule/getallplace",
    Schedule_ScheduleType_Url: BASE_URL + "schedule/scheduleType",
    Schedule_AddDiscount_Url: BASE_URL + "schedule/adddiscount",
    Schedule_CheckDiscount_Url: BASE_URL + "schedule/getdiscount?discountCode=",
    Schedule_AllDiscount_Url: BASE_URL + "schedule/getAlldiscount"
}