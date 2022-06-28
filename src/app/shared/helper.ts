import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackBarComponent } from "./snack-bar/snack-bar.component";

@Injectable({
    providedIn: 'root'
  })
export class Helper {
    constructor(private snackBar: MatSnackBar) {}

    showSnackBar(message: string, durationInSeconds: number, className: string) {
        this.snackBar.openFromComponent(SnackBarComponent, {
            duration: durationInSeconds,
            horizontalPosition: "center",
            verticalPosition: "top",
            panelClass: [className, "SnackBarFont"],
            data: {
                message: message
            }
        });
      }
}
