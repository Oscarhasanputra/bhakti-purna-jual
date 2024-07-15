import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GlobalState } from '../../../../global.state';

@Injectable()
export class ReportPartReceivingService {
    public smartTableData:any;

    constructor(private http: HttpClient, public global: GlobalState) {

    }

    getReportPartReceivingService(kode_dealer,tgl_awal,tgl_akhir){
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });

        return this.http.get<any>(this.global.GlobalUrl + '/reportpartreceiving/' + kode_dealer + '/' + tgl_awal + '/' + tgl_akhir, {headers});
    }

    getBassList(kode_dealer): Promise<any>{
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });

        return this.http.get(this.global.GlobalUrl + '/getBassList/' + kode_dealer, {headers}).toPromise()
        .then(response => this.smartTableData = response);
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