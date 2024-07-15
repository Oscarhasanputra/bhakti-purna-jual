import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// set global url
import { GlobalState } from '../../../../global.state';

// Import RxJs required methods
// Operators







@Injectable()
export class PartOrderService {

    private token = this.global.Decrypt('mAuth').TOKEN;
    private headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': this.token });
    // private options = new RequestOptions({ headers: this.headers });

    constructor(public http: HttpClient, public global: GlobalState) {
    }

    getTipePO(): Promise<any> {
        return this.http.get(this.global.GlobalUrl + '/tipePO/', {headers:this.headers})
            .toPromise()
            .then(response => response)
    }

    getAutonumberNoPO(tgl, kodebass): Promise<any> {
        let bodyString = JSON.stringify({ tgl:tgl,kodebass:kodebass }); // Stringify payload
        return this.http.post(this.global.GlobalUrl + '/autonumberNoPO/', bodyString, {headers:this.headers})
            .toPromise()
            .then(response => response)
    }

    save(data): Promise<any> {
        return this.http.post(this.global.GlobalUrl + '/savePO/', data, {headers:this.headers})
            .toPromise()
            .then(response => response)
    }

    sendEmail(basspusat, kodekaryawan, kodebass, nopo, tgl, details): Promise<any> {
        let bodyString = JSON.stringify({ basspusat:basspusat, kodekaryawan:kodekaryawan, kodebass:kodebass, nopo:nopo, tgl:tgl, details:details }); // Stringify payload
        return this.http.post(this.global.GlobalUrl + '/sendEmail/', bodyString, {headers:this.headers})
            .toPromise()
            .then(response => response)
    }

}