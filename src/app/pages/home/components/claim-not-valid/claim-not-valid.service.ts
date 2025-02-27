import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


// set global url
import { GlobalState } from '../../../../global.state';

@Injectable()
export class ClaimNotValidService {
    public smartTableData: any;

    constructor(private http: HttpClient, public global: GlobalState) {

    }

    getClaimNotValidList(sKodeBass, tglAwal, tglAkhir): Promise<any> {
        let token = this.global.Decrypt('mAuth').TOKEN;
        const kodeBass = sKodeBass?sKodeBass:"";

        let bodyString = JSON.stringify({
            kode_bass:kodeBass,
            tgl_awal:tglAwal,
            tgl_akhir:tglAkhir
        }); // Stringify payload
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });

        return this.http.post(this.global.GlobalUrl + '/claimnotvalid/', bodyString, {headers}) // ...using post request
            .toPromise()
            .then(response => this.smartTableData = response);
    }
}