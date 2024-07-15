import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// set global url
import { GlobalState } from '../../../../../../global.state';

// Import RxJs required methods
// Operators








@Injectable()
export class FakturListService {

    constructor(public http: HttpClient, public global: GlobalState) {
    }

    // getfakturlist
    getFakturList(kodeBass: String, kodeInvoice:String, kodeBarang:String, kodeFinishing:String ): Promise<any> {
        let bodyString = JSON.stringify({kodeBass:kodeBass, kodeInvoice:kodeInvoice, kodeBarang:kodeBarang, kodeFinishing:kodeFinishing}); // Stringify payload
        // console.log(bodyString)
        // get token in localstorage
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });
        return this.http.post(this.global.GlobalUrl + '/invoiceservicerequest/', bodyString, {headers})
            .toPromise()
            .then(response =>  response)
    }

}