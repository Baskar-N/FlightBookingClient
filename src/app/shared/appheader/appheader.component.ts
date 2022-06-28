import { Component, Input, OnInit, Output } from '@angular/core';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

@Component({
  selector: 'app-header',
  templateUrl: './appheader.component.html',
  styleUrls: ['./appheader.component.css']
})
export class AppheaderComponent implements OnInit {

  @Input() IsUserLogged:boolean = false;
  @Input() appTitle:string = "";

  menuItems:any = [];
  authService:AuthGuardService;

  constructor(private auth:AuthGuardService) { 
    this.authService = auth;
  }

  ngOnInit(): void {
    this.authService.IsUserLogged.subscribe((result) => {
      this.IsUserLogged = result;
    });

    this.setMenuItems();
  }

  setMenuItems():void
  {
    this.menuItems = [
      {
        "Title": "Manage Schedules",
        "RouterLink": "manage-schedule",
        "Role": [
          "admin"
        ]
      },
      {
        "Title": "Manage Discounts",
        "RouterLink": "manage-discount",
        "Role": [
          "admin"
        ]
      },
      {
        "Title": "Manage Airlines",
        "RouterLink": "manage-airline",
        "Role": [
          "admin"
        ]
      },
      {
        "Title": "Book Flight",
        "RouterLink": "search-flight",
        "Role": [
          "user"
        ]
      },
      {
        "Title": "Manage Bookings",
        "RouterLink": "manage-booking",
        "Role": [
          "user"
        ]
      },
      {
        "Title": "Booking History",
        "RouterLink": "manage-booking-history",
        "Role": [
          "user"
        ]
      }
    ];
  }

  get getMenuItems():any
  {
    var currentUserRole:string = this.authService.userRole.toLowerCase();

    return this.menuItems.filter(function(menu:any)
    {
      return menu.Role.indexOf(currentUserRole) >= 0;
    });
  }
}
