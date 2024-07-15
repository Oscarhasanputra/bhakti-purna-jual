import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


import { GlobalState } from '../../../../../../global.state';

@Injectable()
export class FrmInputMasterTransportasiService {
    public data: any;

    constructor(private http: HttpClient, public global: GlobalState) {

    }

    saveTambahTransportasi(registerTransportasi): Promise<any> {
        let token = this.global.Decrypt('mAuth').TOKEN;
        registerTransportasi["inputted_by"] = this.global.Decrypt('mAuth').USERNAME;
        registerTransportasi["inputted_by_bass"] = this.global.Decrypt('mAuth').KODE_BASS;
        let bodyString = JSON.stringify(registerTransportasi);


        // Stringify payload
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });

        return this.http.post(this.global.GlobalUrl + '/saveTambahTransportasi/', bodyString, {headers}) // ...using post request
            .toPromise()
            .then(response => this.data = response);
    }

    getTransportasiSingle(kode_transportasi) {
        let token = this.global.Decrypt('mAuth').TOKEN
        let bodyString = JSON.stringify({ "kode_transportasi": kode_transportasi });
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });

        return this.http.post<any>(this.global.GlobalUrl + '/getTransportasiSingle/', bodyString, {headers});
    }

    editTransportasi(registerTransportasi, kode_transportasi): Promise<any> {
        let token = this.global.Decrypt('mAuth').TOKEN
        registerTransportasi["kode_transportasi"] = kode_transportasi;
        // console.log(registerTransportasi);
        let bodyString = JSON.stringify(registerTransportasi);
        // console.log(bodyString);
        // Stringify payload
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });

        return this.http.post(this.global.GlobalUrl + '/updateTransportasi/', bodyString, {headers}) // ...using post request
            .toPromise()
            .then(response => this.data = response);
    }

}