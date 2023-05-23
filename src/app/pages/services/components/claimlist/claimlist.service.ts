import { Injectable } from '@angular/core';
import { HttpClient, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

// set global url
import { GlobalState } from '../../../../global.state';

// Import RxJs required methods
// Operators







@Injectable()
export class ClaimListService {
    constructor(public http: HttpClient, public global: GlobalState) {
    }

    private smartTableData: any;

    getDataClaimList(KodeBass: String, KodeClaim: String, dateFr: String, dateTo: String, Status: String): Promise<any> {
        let bodyString = JSON.stringify({
            kode_bass: KodeBass, kode_claim: KodeClaim,
            tgl_awal: dateFr, tgl_akhir: dateTo, status: Status
        }); // Stringify payload
        // get token in localstorage
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new Headers({ 'Content-Type': 'application/json', 'x-access-token': token });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.global.GlobalUrl + '/claimlist/', bodyString, options)
            .toPromise()
            .then(response => this.smartTableData = response.json())
    }

    deleteDataClaimList(KodeClaim: String): Promise<any> {
        let result: any;

        let bodyString = JSON.stringify({ kode_claim: KodeClaim }); // Stringify payload
        // get token in localstorage
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new Headers({ 'Content-Type': 'application/json', 'x-access-token': token });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.global.GlobalUrl + '/claimdelete/', bodyString, options)
            .toPromise()
            .then(response => result = response.json())
    }
}
