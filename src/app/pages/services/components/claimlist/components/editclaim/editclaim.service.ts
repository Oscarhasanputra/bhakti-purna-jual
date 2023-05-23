import { Injectable } from '@angular/core';
import { HttpClient, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

// set global url
import { GlobalState } from '../../../../../../global.state';

// Import RxJs required methods
// Operators







@Injectable()
export class EditClaimService {
    constructor(public http: HttpClient, public global: GlobalState) {
    }
    private smartTableData: any;

    getClaimDetail(KodeClaim: String): Promise<any> {
        let bodyString = JSON.stringify({ kode_claim: KodeClaim }); // Stringify payload
        // get token in localstorage
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new Headers({ 'Content-Type': 'application/json', 'x-access-token': token });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.global.GlobalUrl + '/claimdetail/', bodyString, options)
            .toPromise()
            .then(response => this.smartTableData = response.json())
    }

    removeDataClaim(kodeClaim: String, dataDetail: Array<any>): Promise<any> {
        let result: any;

        let bodyString = JSON.stringify({ kode_claim: kodeClaim, data: dataDetail }); // Stringify payload
        // get token in localstorage
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new Headers({ 'Content-Type': 'application/json', 'x-access-token': token });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.global.GlobalUrl + '/claimremovedetail/', bodyString, options)
            .toPromise()
            .then(response => result = response.json())
    }
}
