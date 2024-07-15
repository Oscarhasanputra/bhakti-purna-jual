import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GlobalState } from '../../../../global.state';

@Injectable()
export class ReportFinishingServiceService {
    constructor(private http: HttpClient, public global: GlobalState) {

    }

    getReportFinishingService(kode_dealer,kode_zona,tgl_awal,tgl_akhir){
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });

        return this.http.get<any>(this.global.GlobalUrl + '/reportFinishingService/' + kode_dealer + '/' + kode_zona + '/' + tgl_awal + '/' + tgl_akhir, {headers});
    }

    getZonaList(kode_dealer){
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });

        return this.http.get<any>(this.global.GlobalUrl + '/getZonaList/' + kode_dealer, {headers});
    }
}

export class User {
    KODE_BASS: string;
    USERNAME: string;
    KODE_ROLE: string;
    INPUTTED_BY: string;
    INPUTTED_BY_BASS: string;
    INPUTTED_DATE: string;
    TYPE: string;
    TOKEN: string;
}