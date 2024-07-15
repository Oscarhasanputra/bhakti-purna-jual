import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


import { GlobalState } from '../../../../../../global.state';


@Injectable()
export class FrmInputMasterMappingCabangService {
    public data: any;

    constructor(private http: HttpClient, public global: GlobalState) {
    }

    getCabangList() {
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });

        return this.http.get<any>(this.global.GlobalUrl + '/getCabang/', {headers});
    }

    getZonaList() {
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });

        return this.http.get<any>(this.global.GlobalUrl + '/getZonaMapping/', {headers});
    }

    saveTambahMappingZona(registerMappingZona): Promise<any> {
        let token = this.global.Decrypt('mAuth').TOKEN
        registerMappingZona["inputted_by"] = this.global.Decrypt('mAuth').USERNAME
        registerMappingZona["inputted_by_bass"] = this.global.Decrypt('mAuth').KODE_BASS
        let bodyString = JSON.stringify(registerMappingZona);

        // Stringify payload
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });

        return this.http.post(this.global.GlobalUrl + '/saveMappingZona/', bodyString, {headers}) // ...using post request
            .toPromise()
            .then(response => this.data = response);
    }

    getTeknisiSingle(kode_bass, kode_teknisi) {
        let token = this.global.Decrypt('mAuth').TOKEN
        let bodyString = JSON.stringify({ "kode_bass": kode_bass, "kode_teknisi": kode_teknisi });
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });

        return this.http.post(this.global.GlobalUrl + '/getTeknisiSingle/', bodyString, {headers});
    }

    editTeknisi(registerTeknisi, kode_bass, kode_teknisi): Promise<any> {
        let token = this.global.Decrypt('mAuth').TOKEN
        registerTeknisi["kode_teknisi"] = kode_teknisi;
        registerTeknisi["kode_bass"] = kode_bass;

        let bodyString = JSON.stringify(registerTeknisi);

        // Stringify payload
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });

        return this.http.post(this.global.GlobalUrl + '/updateTeknisi/', bodyString, {headers}) // ...using post request
            .toPromise()
            .then(response => this.data = response);
    }

}