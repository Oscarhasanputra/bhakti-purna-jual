import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// set global url
import { GlobalState } from '../../../../global.state';

// Import RxJs required methods
// Operators







@Injectable()
export class ReviewClaimServicesService {
    constructor(public http: HttpClient, public global: GlobalState) {
    }

    private smartTableData: any;

    getReviewClaimList(KodeBass: String, KodeParam: String, dateFr: String, dateTo: String, Status: String): Promise<any> {
        let bodyString = JSON.stringify({
            tgl_awal: dateFr, tgl_akhir: dateTo,
            kode_bass: KodeBass, param_kode_bass: KodeParam,
            status: Status
        }); // Stringify payload
        // get token in localstorage
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });
        return this.http.post(this.global.GlobalUrl + '/claimreviewlist/', bodyString, {headers})
            .toPromise()
            .then(response => this.smartTableData = response)
    }
}
