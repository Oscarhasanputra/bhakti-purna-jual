import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// set global url
import { GlobalState } from '../../../../global.state';

// Import RxJs required methods
// Operators







@Injectable()
export class MaintainPartOrderService {

    private token = this.global.Decrypt('mAuth').TOKEN;
    private headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': this.token });
    // private options = new RequestOptions({ headers: this.headers });

    constructor(public http: HttpClient, public global: GlobalState) {
    }

    getPOList(kodebass, status): Promise<any> {
        let bodyString = JSON.stringify({ kodebass: kodebass, status: status }); // Stringify payload
        return this.http.post(this.global.GlobalUrl + '/ListPO/', bodyString, {headers:this.headers})
            .toPromise()
            .then(response => response)
    }

    deletePO(nopo, status): Promise<any> {
        let bodyString = JSON.stringify({ nopo: nopo, status: status }); // Stringify payload
        return this.http.post(this.global.GlobalUrl + '/DeletePO/', bodyString, {headers:this.headers})
            .toPromise()
            .then(response => response)
    }
}
