import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


import { GlobalState } from '../../../../global.state';

@Injectable()
export class MasterBassService {
    data: any;

    constructor(private http: HttpClient, public global: GlobalState) {

    }

    getZonaList(kode_dealer) {
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });

        return this.http.get<any>(this.global.GlobalUrl + '/getZonaList/' + kode_dealer, {headers});
    }

    getListMasterBass(kode_zona, status): Promise<any> {
        if (kode_zona == 'ALL') {
            kode_zona = '';
        }
        let token = this.global.Decrypt('mAuth').TOKEN
        let bodyString = JSON.stringify({ "kode_zona": kode_zona, "status": status }); // Stringify payload
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });

        return this.http.post(this.global.GlobalUrl + '/getListMasterBass/', bodyString, {headers})
            .toPromise()
            .then(response => this.data = response);
    }

    deleteBass(kode_bass): Promise<any> {
        let token = this.global.Decrypt('mAuth').TOKEN
        let bodyString = JSON.stringify({ "kode_bass": kode_bass }); // Stringify payload
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });

        return this.http.post(this.global.GlobalUrl + '/deleteBass/', bodyString, {headers})
            .toPromise()
            .then(response => this.data = response);
    }

    activateBass(kode_bass): Promise<any> {
        let token = this.global.Decrypt('mAuth').TOKEN
        let bodyString = JSON.stringify({ "kode_bass": kode_bass }); // Stringify payload
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });

        return this.http.post(this.global.GlobalUrl + '/activateBass/', bodyString, {headers})
            .toPromise()
            .then(response => this.data = response);
    }
}