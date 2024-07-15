import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    private headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': this.token });
    // private options = new RequestOptions({ headers: this.headers });

    constructor(public http: HttpClient, public global: GlobalState) {
    }

    getSparepartList(): Promise<any> {
        let bodyString = {}; // Stringify payload
        return this.http.post(this.global.GlobalUrl + '/sparepartList/', bodyString, {headers:this.headers})
            .toPromise()
            .then(response => response)
    }

    getSparepartListbyKode(kdsparepart): Promise<any> {
        let bodyString = JSON.stringify({ kdsparepart: kdsparepart }); // Stringify payload
        return this.http.post(this.global.GlobalUrl + '/sparepartListbyKode/', bodyString, {headers:this.headers})
            .toPromise()
            .then(response => response)
    }

    getStockSelect(objectDetail, kodebass): Promise<any> {
        let bodyString = JSON.stringify({ kodebass: kodebass, objectDetail: objectDetail }); // Stringify payload
        return this.http.post(this.global.GlobalUrl + '/stockselect/', bodyString, {headers:this.headers})
            .toPromise()
            .then(response => response)
    }
}
