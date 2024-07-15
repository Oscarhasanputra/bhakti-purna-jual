import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


import { GlobalState } from '../../../../../../global.state';


@Injectable()
export class FrmInputMasterTeknisiService {
    public data: any;

    constructor(private http: HttpClient, public global: GlobalState) {

    }

    saveTambahTeknisi(registerTeknisi): Promise<any> {
        let token = this.global.Decrypt('mAuth').TOKEN;
        registerTeknisi["inputted_by"] = this.global.Decrypt('mAuth').USERNAME;
        registerTeknisi["inputted_by_bass"] = this.global.Decrypt('mAuth').KODE_BASS;
        let bodyString = JSON.stringify(registerTeknisi);


        // Stringify payload
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });

        return this.http.post(this.global.GlobalUrl + '/saveTambahTeknisi/', bodyString, {headers}) // ...using post request
            .toPromise()
            .then(response => this.data = response);
    }

    getTeknisiSingle(kode_bass, kode_teknisi) {
        let token = this.global.Decrypt('mAuth').TOKEN
        let bodyString = JSON.stringify({ "kode_bass": kode_bass, "kode_teknisi": kode_teknisi });
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });

        return this.http.post<any>(this.global.GlobalUrl + '/getTeknisiSingle/', bodyString, {headers});
    }

    editTeknisi(registerTeknisi, kode_bass, kode_teknisi): Promise<any> {
        let token = this.global.Decrypt('mAuth').TOKEN
        registerTeknisi["kode_teknisi"] = kode_teknisi;
        registerTeknisi["kode_bass"] = kode_bass;
        // console.log(registerTeknisi);
        let bodyString = JSON.stringify(registerTeknisi);
        // console.log(bodyString);
        // Stringify payload
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });

        return this.http.post(this.global.GlobalUrl + '/updateTeknisi/', bodyString, {headers}) // ...using post request
            .toPromise()
            .then(response => this.data = response);
    }

}