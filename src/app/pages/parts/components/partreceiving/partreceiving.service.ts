import { Injectable } from '@angular/core';
import { HttpClient, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

// set global url
import { GlobalState } from '../../../../global.state';

// Import RxJs required methods
// Operators







@Injectable()
export class PartReceivingService {

    private token = this.global.Decrypt('mAuth').TOKEN;
    private headers = new Headers({ 'Content-Type': 'application/json', 'x-access-token': this.token });
    private options = new RequestOptions({ headers: this.headers });

    constructor(public http: HttpClient, public global: GlobalState) {
    }

    getInvoicePRList(kodebass): Promise<any> {
        let bodyString = JSON.stringify({ kodebass:kodebass }); // Stringify payload
        return this.http.post(this.global.GlobalUrl + '/invoicePRList/', bodyString, this.options)
            .toPromise()
            .then(response => response.json())
    }

    save(data): Promise<any> {
        return this.http.post(this.global.GlobalUrl + '/savePR/', data, this.options)
            .toPromise()
            .then(response => response.json())
    }
}
