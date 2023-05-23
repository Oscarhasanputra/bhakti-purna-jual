import { Injectable } from '@angular/core';
import { HttpClient, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

// set global url
import { GlobalState } from '../../../../../../global.state';

// Import RxJs required methods
// Operators







@Injectable()
export class ListSparepartService {

    public PageData:any=[];
    public coba:any = true;

    private token = this.global.Decrypt('mAuth').TOKEN;
    private headers = new Headers({ 'Content-Type': 'application/json', 'x-access-token': this.token });
    private options = new RequestOptions({ headers: this.headers });

    constructor(public http: HttpClient, public global: GlobalState) {
    }

    getSparepartList(): Promise<any> {
        let bodyString = {}; // Stringify payload
        return this.http.post(this.global.GlobalUrl + '/sparepartList/', bodyString, this.options)
            .toPromise()
            .then(response => response.json())
    }

    getSparepartListbyKode(kdsparepart): Promise<any> {
        let bodyString = JSON.stringify({ kdsparepart: kdsparepart }); // Stringify payload
        return this.http.post(this.global.GlobalUrl + '/sparepartListbyKode/', bodyString, this.options)
            .toPromise()
            .then(response => response.json())
    }

    getStockSelect(objectDetail, kodebass): Promise<any> {
        let bodyString = JSON.stringify({ kodebass: kodebass, objectDetail: objectDetail }); // Stringify payload
        return this.http.post(this.global.GlobalUrl + '/stockselect/', bodyString, this.options)
            .toPromise()
            .then(response => response.json())
    }
}
