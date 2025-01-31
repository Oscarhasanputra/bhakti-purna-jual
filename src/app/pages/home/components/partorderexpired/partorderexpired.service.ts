import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';



// set global url
import { GlobalState } from '../../../../global.state';

@Injectable()
export class PartOrderExpiredService {
    public smartTableData: any;

    constructor(private http: HttpClient, public global: GlobalState) {
    }

    getPartOrderExpiredHomeSelect(tgl_awal, tgl_akhir, inputted_by_bass): Promise<any> {
        let token = this.global.Decrypt('mAuth').TOKEN
        let bodyString = JSON.stringify({ "no_po": '%%', "tgl_awal": tgl_awal, "tgl_akhir": tgl_akhir, "inputted_by_bass": inputted_by_bass }); // Stringify payload
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });

        return this.http.post(this.global.GlobalUrl + '/getPartOrderExpiredHomeSelect/', bodyString, {headers})
            .toPromise()
            .then(response => this.smartTableData = response);
    }

    getBassList(kode_dealer): Promise<any> {
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });

        return this.http.get(this.global.GlobalUrl + '/getBassList/' + kode_dealer, {headers}).toPromise()
            .then(response => this.smartTableData = response);
    }

    getBassListUnderCabang(kode_dealer): Promise<any> {
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });

        return this.http.get(this.global.GlobalUrl + '/getBassListUnderCabang/' + kode_dealer,{headers}).toPromise()
            .then(response => this.smartTableData = response);
    }
}