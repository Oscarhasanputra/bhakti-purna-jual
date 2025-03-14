import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// set global url
import { GlobalState } from '../../../../../../global.state';

// Import RxJs required methods
// Operators








@Injectable()
export class ServiceListService {

    constructor(public http: HttpClient, public global: GlobalState) {
    }

    // getservicelist
    getServiceList(kodeService: String, kodeBass:String, dari:String, sampai:String, type:String, nomorNota:String): Promise<any> {
        let bodyString = JSON.stringify({kodeService:kodeService, kodeBass:kodeBass, dari:dari, sampai:sampai, type:type, nomorNota:nomorNota}); // Stringify payload
        // console.log(bodyString)
        // get token in localstorage
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });
        return this.http.post(this.global.GlobalUrl + '/getservicelist/', bodyString, {headers})
            .toPromise()
            .then(response =>  response)
    }

}