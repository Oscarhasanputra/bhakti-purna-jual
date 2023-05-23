import { Injectable } from '@angular/core';
import { HttpClient, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';


import { GlobalState } from '../../../../../global.state';

@Injectable()
export class BrowseListCabangMasterService {
    public smartTableData: any;

    constructor(private http: HttpClient, public global: GlobalState) {
    }

    getCabangList(kode_cabang): Promise<any> {
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new Headers({ 'Content-Type': 'application/json', 'x-access-token': token });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.global.GlobalUrl + '/getCabangList/' + kode_cabang, options).toPromise()
            .then(response => this.smartTableData = response.json());
    }

    getBassListUnderCabang(kode_dealer): Promise<any> {
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new Headers({ 'Content-Type': 'application/json', 'x-access-token': token });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.global.GlobalUrl + '/getBassListUnderCabang/' + kode_dealer, options).toPromise()
            .then(response => this.smartTableData = response.json());
    }
}

