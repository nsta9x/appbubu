import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
    constructor(){}

    public extractData(res: Response){
        let response = res.json();
        return response;
    }

    public handleError (error: Response | any) {
        let errMsg: string;
        errMsg = error.message ? error.message : error.toString();
        return Observable.throw(errMsg);
    }
}
