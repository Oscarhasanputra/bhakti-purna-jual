import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// set global url
import { GlobalState } from '../../../../../../global.state';

// Import RxJs required methods
// Operators







@Injectable()
export class ReviewClaimService {
    constructor(public http: HttpClient, public global: GlobalState) {
    }
    private smartTableData: any;

    getClaimService(KodeClaim: String): Promise<any> {
        let bodyString = JSON.stringify({ kode_claim: KodeClaim }); // Stringify payload
        // get token in localstorage
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });
        return this.http.post(this.global.GlobalUrl + '/claimreviewservicelist/', bodyString, {headers})
            .toPromise()
            .then(response => this.smartTableData = response)
    }

    insertReviewClaim(kodeClaim: String, kodeService: String, isValid: number, reason: String, inputtedBy: String,
        inputtedByBass: String, inputtedDate: Date): Promise<any> {
        let result: any;

        let bodyString = JSON.stringify({
            kode_claim: kodeClaim, kode_service: kodeService,
            isvalid: isValid, reason: reason, input_by: inputtedBy,
            kode_bass: inputtedByBass, tgl_trx: inputtedDate
        }); // Stringify payload

        // get token in localstorage
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });
        return this.http.post(this.global.GlobalUrl + '/insertreviewclaim/', bodyString, {headers})
            .toPromise()
            .then(response => result = response)
    }
}
