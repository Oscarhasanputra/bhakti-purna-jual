import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


// set global url
import { GlobalState } from '../../../../global.state';

@Injectable()
export class ServiceListService {
    public smartTableData: any;

    constructor(private http: HttpClient, public global: GlobalState) {

    }

    getServiceListHome(sKodeBass, kode_cust, selectedStatus, tglAwal, tglAkhir): Promise<any> {
        let token = this.global.Decrypt('mAuth').TOKEN;
        let bodyString = JSON.stringify({ "kode_service": "%%", "kode_bass": sKodeBass, "kode_cust": kode_cust, "tgl_awal": tglAwal, "tgl_akhir": tglAkhir, "status": selectedStatus }); // Stringify payload
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });

        return this.http.post(this.global.GlobalUrl + '/serviceListHome/', bodyString, {headers}) // ...using post request
            .toPromise()
            .then(response => this.smartTableData = response);
    }
}