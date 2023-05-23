import { Injectable } from '@angular/core';
import { HttpClient, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

// set global url
import { GlobalState } from '../../../../global.state';

// Import RxJs required methods
// Operators







@Injectable()
export class MaintainPartOrderService {

    private token = this.global.Decrypt('mAuth').TOKEN;
    private headers = new Headers({ 'Content-Type': 'application/json', 'x-access-token': this.token });
    private options = new RequestOptions({ headers: this.headers });

    constructor(public http: HttpClient, public global: GlobalState) {
    }

    getPOList(kodebass, status): Promise<any> {
        let bodyString = JSON.stringify({ kodebass: kodebass, status: status }); // Stringify payload
        return this.http.post(this.global.GlobalUrl + '/ListPO/', bodyString, this.options)
            .toPromise()
            .then(response => response.json())
    }

    deletePO(nopo, status): Promise<any> {
        let bodyString = JSON.stringify({ nopo: nopo, status: status }); // Stringify payload
        return this.http.post(this.global.GlobalUrl + '/DeletePO/', bodyString, this.options)
            .toPromise()
            .then(response => response.json())
    }
}
