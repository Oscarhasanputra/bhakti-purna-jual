import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// set global url
import { GlobalState } from '../../../../../../global.state';

// Import RxJs required methods
// Operators








@Injectable()
export class TeknisiListService {

    constructor(public http: HttpClient, public global: GlobalState) {
    }

    // getservicelist
    getTeknisiList(kode_bass: String, kode_teknisi:String, status:String): Promise<any> {
        let bodyString = JSON.stringify({kode_bass:kode_bass, kode_teknisi:kode_teknisi, status:status}); // Stringify payload
        // console.log(bodyString)
        // get token in localstorage
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new HttpRequest({ headers: headers });
        return this.http.post(this.global.GlobalUrl + '/getTeknisiList/', bodyString, {headers:headers})
            .toPromise()
            .then(response =>  response)
    }

}