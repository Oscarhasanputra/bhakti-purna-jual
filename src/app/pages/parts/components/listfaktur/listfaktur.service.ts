import { Injectable } from '@angular/core';
import { HttpClient, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

// set global url
import { GlobalState } from '../../../../global.state';

// Import RxJs required methods
// Operators







@Injectable()
export class ListFakturService {

    private token = this.global.Decrypt('mAuth').TOKEN;
    private headers = new Headers({ 'Content-Type': 'application/json', 'x-access-token': this.token });
    private options = new RequestOptions({ headers: this.headers });

    constructor(public http: HttpClient, public global: GlobalState) {
    }

    getInvoiceList(kdBassTxt, status, tgldari, tglsampai,kodebass): Promise<any> {
        let bodyString = JSON.stringify({ kdBassTxt:kdBassTxt , kodebass: kodebass, status: status, tgldari: tgldari, tglsampai: tglsampai }); // Stringify payload
        return this.http.post(this.global.GlobalUrl + '/ListInvoice/', bodyString, this.options)
            .toPromise()
            .then(response => response.json())
    }

    getDetailInvoice(kodeinvoice): Promise<any> {
        let bodyString = JSON.stringify({ kodeinvoice: kodeinvoice }); // Stringify payload
        return this.http.post(this.global.GlobalUrl + '/DetailInvoice/', bodyString, this.options)
            .toPromise()
            .then(response => response.json())
    }

    deleteFaktur(noinvoice): Promise<any> {
        let bodyString = JSON.stringify({ noinvoice: noinvoice }); // Stringify payload
        return this.http.post(this.global.GlobalUrl + '/DeleteInvoice/', bodyString, this.options)
            .toPromise()
            .then(response => response.json())
    }
}
