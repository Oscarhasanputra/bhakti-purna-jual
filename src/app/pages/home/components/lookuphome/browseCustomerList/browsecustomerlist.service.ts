import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';



// set global url
import { GlobalState } from '../../../../../global.state';

@Injectable()
export class BrowseCustomerListService {
    public data: any;

    constructor(private http: HttpClient, public global: GlobalState) {

    }

    getCustomerList(kode_zona, kode_bass): Promise<any> {
        let token = this.global.Decrypt('mAuth').TOKEN
        let bodyString = JSON.stringify({ "KODE_ZONA": kode_zona, "KODE_BASS": kode_bass }); // Stringify payload
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });

        return this.http.post(this.global.GlobalUrl + '/getCustomerList/', bodyString, {headers}) // ...using post request
            .toPromise()
            .then(response => this.data = response);
    }

    getCustomerListPusat(kode_zona): Promise<any> {
        let token = this.global.Decrypt('mAuth').TOKEN
        let bodyString = JSON.stringify({ "KODE_ZONA": kode_zona }); // Stringify payload
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });

        return this.http.post(this.global.GlobalUrl + '/getCustomerListPusat/', bodyString, {headers}) // ...using post request
            .toPromise()
            .then(response => this.data = response);
    }

    getZonaList(kode_dealer) {
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });

        return this.http.get<any>(this.global.GlobalUrl + '/getZonaList/' + kode_dealer, {headers});
    }

}

