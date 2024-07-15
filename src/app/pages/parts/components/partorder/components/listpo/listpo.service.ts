import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    private headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': this.token });
    // private options = new RequestOptions({ headers: this.headers });

    constructor(public http: HttpClient, public global: GlobalState) {
    }

    getPOList(kodebass, tgldari, tglsampai): Promise<any> {
        let bodyString = JSON.stringify({ kodebass: kodebass, tgldari: tgldari, tglsampai: tglsampai }); // Stringify payload
        return this.http.post(this.global.GlobalUrl + '/poList/', bodyString, {headers:this.headers})
            .toPromise()
            .then(response => response)
    }

    getPObyKode(nopo): Promise<any> {
        let bodyString = JSON.stringify({ nopo:nopo }); // Stringify payload
        return this.http.post(this.global.GlobalUrl + '/poListbyKode/', bodyString, {headers:this.headers})
            .toPromise()
            .then(response => response)
    }
}
