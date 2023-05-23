import { Injectable } from '@angular/core';
import { HttpClient, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

// set global url
import { GlobalState } from '../../../../../../global.state';

// Import RxJs required methods
// Operators







@Injectable()
export class ServiceListService {

    public PageData: any = [];
    public coba: any = true;

    private token = this.global.Decrypt('mAuth').TOKEN;
    private headers = new Headers({ 'Content-Type': 'application/json', 'x-access-token': this.token });
    private options = new RequestOptions({ headers: this.headers });

    constructor(public http: HttpClient, public global: GlobalState) {
    }

    getServiceList(KODE_BASS: string, DARI: string, SAMPAI: string): Promise<any> {
        let bodyString = JSON.stringify({ kodebass: KODE_BASS, tgldari: DARI, tglsampai: SAMPAI }); // Stringify payload
        return this.http.post(this.global.GlobalUrl + '/serviceList/', bodyString, this.options)
            .toPromise()
            .then(response => response.json())
    }

    getServicebyKode(kodeservice): Promise<any> {
        let bodyString = JSON.stringify({ kodeservice: kodeservice }); // Stringify payload
        return this.http.post(this.global.GlobalUrl + '/serviceListbyKode/', bodyString, this.options)
            .toPromise()
            .then(response => response.json())
    }
}
