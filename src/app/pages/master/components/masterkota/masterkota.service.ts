import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// set global url
import { GlobalState } from '../../../../global.state';

// Import RxJs required methods
// Operators







@Injectable()
export class MasterKotaService {

    private token = this.global.Decrypt('mAuth').TOKEN
    private headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': this.token });
    // private options = new RequestOptions({ headers: this.headers });

    constructor(public http: HttpClient, public global: GlobalState) {
    }

    getDatas(): Promise<any> {
        let bodyString = {}; // Stringify payload // Stringify payload
        return this.http.post(this.global.GlobalUrl + '/kota_list/', bodyString, {headers:this.headers})
            .toPromise()
            .then(response => response)
    }

    getData(kota): Promise<any> {
        let bodyString = JSON.stringify({ kota: kota }); // Stringify payload // Stringify payload
        return this.http.post(this.global.GlobalUrl + '/kota_get/', bodyString, {headers:this.headers})
            .toPromise()
            .then(response => response)
    }

    saveKota(data): Promise<any> {
        //   let bodyString = {}; // Stringify payload // Stringify payload
        return this.http.post(this.global.GlobalUrl + '/kota_insert/', data, {headers:this.headers})
            .toPromise()
            .then(response => response)
    }

    editKota(data): Promise<any> {
        //   let bodyString = {}; // Stringify payload // Stringify payload
        return this.http.post(this.global.GlobalUrl + '/kota_edit/', data, {headers:this.headers})
            .toPromise()
            .then(response => response)
    }
}
