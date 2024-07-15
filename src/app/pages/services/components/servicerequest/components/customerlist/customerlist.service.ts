import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// set global url
import { GlobalState } from '../../../../../../global.state';

// Import RxJs required methods
// Operators








@Injectable()
export class CustomerListService {

    constructor(public http: HttpClient, public global: GlobalState) {
    }

    // getCustomerService
    getCustomerService(filter: String, zona: String, kodeBass: String): Promise<any> {
        let bodyString = JSON.stringify({ filter: filter, zona: zona, kodeBass: kodeBass }); // Stringify payload
        // get token in localstorage
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });
        return this.http.post(this.global.GlobalUrl + '/getcustomerservice/', bodyString, {headers})
            .toPromise()
            .then(response =>  response)
    }

    // getZonaList
    getZonaList(kodeBass: String): Promise<any> {
        // get token in localstorage
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });
        return this.http.get(this.global.GlobalUrl + '/getZonaList/'+kodeBass, {headers})
            .toPromise()
            .then(response =>  response)
    }

}