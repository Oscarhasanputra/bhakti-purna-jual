import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


import { GlobalState } from '../../../../global.state';


@Injectable()
export class MasterTransportasiService {
    data: any;

    constructor(private http: HttpClient, public global: GlobalState) {

    }

    getListMasterTransportasi(kode_transportasi): Promise<any> {

        let token = this.global.Decrypt('mAuth').TOKEN
        let bodyString = JSON.stringify({ "kode_transportasi": kode_transportasi }); // Stringify payload
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });

        return this.http.post(this.global.GlobalUrl + '/transportasiGet/', bodyString, {headers})
            .toPromise()
            .then(response => this.data = response);
    }

    deleteTransportasi(kode_transportasi): Promise<any> {

        // console.log(kode_transportasi);

        let token = this.global.Decrypt('mAuth').TOKEN
        let bodyString = JSON.stringify({ "kode_transportasi": kode_transportasi }); // Stringify payload
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });

        return this.http.post(this.global.GlobalUrl + '/deleteTransportasi/', bodyString, {headers})
            .toPromise()
            .then(response => this.data = response);
    }

}