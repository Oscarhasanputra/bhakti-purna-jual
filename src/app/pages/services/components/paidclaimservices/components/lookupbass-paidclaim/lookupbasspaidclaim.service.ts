import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// set global url
import { GlobalState } from '../../../../../../global.state';

// Import RxJs required methods
// Operators







@Injectable()
export class LookUpBassPaidClaimService {
    constructor(public http: HttpClient, public global: GlobalState) {
    }
    private smartTableData: any;

    getBassListUnderCabang(KodeBass: String): Promise<any> {
        let bodyString = JSON.stringify({ kode_bass: KodeBass }); // Stringify payload
        // get token in localstorage
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });
        return this.http.post(this.global.GlobalUrl + '/claimreviewbasslistbycabang/', bodyString, {headers})
            .toPromise()
            .then(response => this.smartTableData = response)
    }

    getBassList(KodeBass: String): Promise<any> {
        let bodyString = JSON.stringify({ kode_bass: KodeBass }); // Stringify payload
        // get token in localstorage
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });
        return this.http.post(this.global.GlobalUrl + '/claimreviewbasslist/', bodyString, {headers})
            .toPromise()
            .then(response => this.smartTableData = response)
    }

}