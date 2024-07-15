import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Import RxJs required methods
// Operators






import { GlobalState } from '../../../../global.state';


@Injectable()
export class MasterExplodedSparepartService {
    public PageData: any = [];
    private token = this.global.Decrypt('mAuth').TOKEN;
    private headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': this.token });
    // private options = new RequestOptions({ headers: this.headers });

    constructor(private http: HttpClient, public global: GlobalState) {
    }

    getStockSelect(objectDetail, kodebass): Promise<any> {
        let bodyString = JSON.stringify({ kodebass: kodebass, objectDetail: objectDetail }); // Stringify payload
        return this.http.post(this.global.GlobalUrl + '/stockselect/', bodyString, {headers:this.headers})
            .toPromise()
            .then(response => response)
    }

    getBarangList(): Promise<any> {
        let bodyString = {}; // Stringify payload
        return this.http.post(this.global.GlobalUrl + '/barangList/', bodyString, {headers:this.headers})
            .toPromise()
            .then(response => response)
    }

    getExplodedHeaderList(kodebarang): Promise<any> {
        let bodyString = JSON.stringify({ kodebarang: kodebarang }); // Stringify payload
        return this.http.post(this.global.GlobalUrl + '/explodedHeaderList/', bodyString, {headers:this.headers})
            .toPromise()
            .then(response => response)
    }

    getExplodedDetailList(kodepart): Promise<any> {
        let bodyString = JSON.stringify({ kodepart: kodepart }); // Stringify payload
        return this.http.post(this.global.GlobalUrl + '/explodedDetailList/', bodyString, {headers:this.headers})
            .toPromise()
            .then(response => response)
    }

    getExplodedImage(kodepart): Promise<any> {
        let bodyString = JSON.stringify({ kodepart: kodepart }); // Stringify payload
        return this.http.post(this.global.GlobalUrl + '/explodedImage/', bodyString, {headers:this.headers})
            .toPromise()
            .then(response => response)
    }

}