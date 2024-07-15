import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


import { GlobalState } from '../../../../global.state';


@Injectable()
export class MasterTeknisiService {
    data:any;

    constructor(private http: HttpClient, public global: GlobalState) {

    }

    getListMasterTeknisi(kode_bass,kode_teknisi,status): Promise<any> {

        let token = this.global.Decrypt('mAuth').TOKEN
        let bodyString = JSON.stringify({"kode_bass":kode_bass,"kode_teknisi":kode_teknisi,"status":status}); // Stringify payload
        let headers = new HttpHeaders({ 'Content-Type': 'application/json','x-access-token': token });
        // let options = new RequestOptions({ headers: headers });

        return this.http.post(this.global.GlobalUrl + '/getTeknisiList/', bodyString, {headers})
            .toPromise()
            .then(response => this.data = response);
    }

    deleteTeknisi(kode_bass,kode_teknisi): Promise<any> {

        let token = this.global.Decrypt('mAuth').TOKEN
        let bodyString = JSON.stringify({"kode_bass":kode_bass,"kode_teknisi":kode_teknisi}); // Stringify payload
        let headers = new HttpHeaders({ 'Content-Type': 'application/json','x-access-token': token });
        // let options = new RequestOptions({ headers: headers });

        return this.http.post(this.global.GlobalUrl + '/deleteTeknisi/', bodyString, {headers})
            .toPromise()
            .then(response => this.data = response);
    }

    activateTeknisi(kode_bass,kode_teknisi): Promise<any> {

        let token = this.global.Decrypt('mAuth').TOKEN
        let bodyString = JSON.stringify({"kode_bass":kode_bass,"kode_teknisi":kode_teknisi}); // Stringify payload
        let headers = new HttpHeaders({ 'Content-Type': 'application/json','x-access-token': token });
        // let options = new RequestOptions({ headers: headers });

        return this.http.post(this.global.GlobalUrl + '/activateTeknisi/', bodyString, {headers})
            .toPromise()
            .then(response => this.data = response);
    }
}