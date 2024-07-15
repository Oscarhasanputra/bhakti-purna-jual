import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


import { GlobalState } from '../../../../../global.state';

@Injectable()
export class BrowseListCabangMasterService {
    public smartTableData: any;

    constructor(private http: HttpClient, public global: GlobalState) {
    }

    getCabangList(kode_cabang): Promise<any> {
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });

        return this.http.get(this.global.GlobalUrl + '/getCabangList/' + kode_cabang, {headers}).toPromise()
            .then(response => this.smartTableData = response);
    }

    getBassListUnderCabang(kode_dealer): Promise<any> {
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });

        return this.http.get(this.global.GlobalUrl + '/getBassListUnderCabang/' + kode_dealer, {headers}).toPromise()
            .then(response => this.smartTableData = response);
    }
}

