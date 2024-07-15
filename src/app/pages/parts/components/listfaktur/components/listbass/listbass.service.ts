import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// set global url
import { GlobalState } from '../../../../../../global.state';

// Import RxJs required methods
// Operators







@Injectable()
export class ListBassListFakturService {

    public PageData:any=[];
    public coba:any = true;

    private token = this.global.Decrypt('mAuth').TOKEN;
    private headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': this.token });
    // private options = new RequestOptions({ headers: this.headers });

    constructor(public http: HttpClient, public global: GlobalState) {
    }

    getBassList(kdbass): Promise<any> {
        let bodyString = JSON.stringify({ kdbass:kdbass }); // Stringify payload
        return this.http.post(this.global.GlobalUrl + '/bassList/',bodyString, {headers:this.headers})
            .toPromise()
            .then(response => response)
    }

     getBassListUnderCabang(KodeBass: String, kodebasstxt: String): Promise<any> {
        let bodyString = JSON.stringify({ kode_bass: KodeBass, kodebasstxt: kodebasstxt }); // Stringify payload
        return this.http.post(this.global.GlobalUrl + '/basslistbycabang/', bodyString, {headers:this.headers})
            .toPromise()
            .then(response => response)
    }

    getBassListAll(kdbass): Promise<any> {
        let bodyString = JSON.stringify({ kdbass:kdbass }); // Stringify payload
        return this.http.post(this.global.GlobalUrl + '/bassListAll/',bodyString, {headers:this.headers})
            .toPromise()
            .then(response => response)
    }
}
