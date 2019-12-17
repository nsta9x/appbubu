import { Injectable } from '@angular/core';
import { MatSnackBarConfig, MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {
    constructor(private _snackBar: MatSnackBar){}
    public ShowNotify(Status : any, message: string){
        const config = new MatSnackBarConfig();
        config.panelClass = Status;
        config.duration = 2000;
        this._snackBar.open(message, null, config);
    }
}
