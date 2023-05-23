import { Injectable } from '@angular/core';
import { HttpClient, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

// set global url
import { GlobalState } from '../../../../../../global.state';

// Import RxJs required methods
// Operators







@Injectable()
export class ListPoService {

    public PageData:any=[];
    public coba:any = true;

    private token = this.global.Decrypt('mAuth').TOKEN;
    private headers = new Headers({ 'Content-Type': 'application/json', 'x-access-token': this.token });
    private options = new RequestOptions({ headers: this.headers });

    constructor(public http: HttpClient, public global: GlobalState) {
    }

    getPOList(kodebass, tgldari, tglsampai): Promise<any> {
        let bodyString = JSON.stringify({ kodebass: kodebass, tgldari: tgldari, tglsampai: tglsampai }); // Stringify payload
        return this.http.post(this.global.GlobalUrl + '/poList/', bodyString, this.options)
            .toPromise()
            .then(response => response.json())
    }

    getPObyKode(nopo): Promise<any> {
        let bodyString = JSON.stringify({ nopo:nopo }); // Stringify payload
        return this.http.post(this.global.GlobalUrl + '/poListbyKode/', bodyString, this.options)
            .toPromise()
            .then(response => response.json())
    }
}
