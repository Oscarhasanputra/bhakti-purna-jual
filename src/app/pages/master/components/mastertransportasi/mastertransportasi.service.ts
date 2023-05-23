import { Injectable } from '@angular/core';
import { HttpClient, Headers, RequestOptions, Response } from '@angular/http';
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
        let headers = new Headers({ 'Content-Type': 'application/json', 'x-access-token': token });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.global.GlobalUrl + '/transportasiGet/', bodyString, options)
            .toPromise()
            .then(response => this.data = response.json());
    }

    deleteTransportasi(kode_transportasi): Promise<any> {

        // console.log(kode_transportasi);

        let token = this.global.Decrypt('mAuth').TOKEN
        let bodyString = JSON.stringify({ "kode_transportasi": kode_transportasi }); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json', 'x-access-token': token });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.global.GlobalUrl + '/deleteTransportasi/', bodyString, options)
            .toPromise()
            .then(response => this.data = response.json());
    }

}