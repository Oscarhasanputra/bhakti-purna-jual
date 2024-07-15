import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// set global url
import { GlobalState } from '../../../../global.state';

// Import RxJs required methods
// Operators







@Injectable()
export class PartReceivingService {

    private token = this.global.Decrypt('mAuth').TOKEN;
    private headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': this.token });
    // private options = new RequestOptions({ headers: this.headers });

    constructor(public http: HttpClient, public global: GlobalState) {
    }

    getInvoicePRList(kodebass): Promise<any> {
        let bodyString = JSON.stringify({ kodebass:kodebass }); // Stringify payload
        return this.http.post(this.global.GlobalUrl + '/invoicePRList/', bodyString, {headers:this.headers})
            .toPromise()
            .then(response => response)
    }

    save(data): Promise<any> {
        return this.http.post(this.global.GlobalUrl + '/savePR/', data, {headers:this.headers})
            .toPromise()
            .then(response => response)
    }
}
