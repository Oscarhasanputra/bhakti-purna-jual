import { Injectable } from '@angular/core';
import { HttpClient, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

// Import RxJs required methods
// Operators






import { GlobalState } from '../../../../global.state';


@Injectable()
export class MasterExplodedSparepartService {
    public PageData: any = [];
    private token = this.global.Decrypt('mAuth').TOKEN;
    private headers = new Headers({ 'Content-Type': 'application/json', 'x-access-token': this.token });
    private options = new RequestOptions({ headers: this.headers });

    constructor(private http: HttpClient, public global: GlobalState) {
    }

    getStockSelect(objectDetail, kodebass): Promise<any> {
        let bodyString = JSON.stringify({ kodebass: kodebass, objectDetail: objectDetail }); // Stringify payload
        return this.http.post(this.global.GlobalUrl + '/stockselect/', bodyString, this.options)
            .toPromise()
            .then(response => response.json())
    }

    getBarangList(): Promise<any> {
        let bodyString = {}; // Stringify payload
        return this.http.post(this.global.GlobalUrl + '/barangList/', bodyString, this.options)
            .toPromise()
            .then(response => response.json())
    }

    getExplodedHeaderList(kodebarang): Promise<any> {
        let bodyString = JSON.stringify({ kodebarang: kodebarang }); // Stringify payload
        return this.http.post(this.global.GlobalUrl + '/explodedHeaderList/', bodyString, this.options)
            .toPromise()
            .then(response => response.json())
    }

    getExplodedDetailList(kodepart): Promise<any> {
        let bodyString = JSON.stringify({ kodepart: kodepart }); // Stringify payload
        return this.http.post(this.global.GlobalUrl + '/explodedDetailList/', bodyString, this.options)
            .toPromise()
            .then(response => response.json())
    }

    getExplodedImage(kodepart): Promise<any> {
        let bodyString = JSON.stringify({ kodepart: kodepart }); // Stringify payload
        return this.http.post(this.global.GlobalUrl + '/explodedImage/', bodyString, this.options)
            .toPromise()
            .then(response => response.json())
    }

}