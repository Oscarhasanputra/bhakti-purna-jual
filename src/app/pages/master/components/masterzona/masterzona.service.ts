import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// set global url
import { GlobalState } from '../../../../global.state';

// Import RxJs required methods
// Operators







@Injectable()
export class MasterZonaService {

    private token = this.global.Decrypt('mAuth').TOKEN
    private headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': this.token });
    // private options = new RequestOptions({ headers: this.headers });

    constructor(public http: HttpClient, public global: GlobalState) {
    }

    getData(): Promise<any> {
        let bodyString = {}; // Stringify payload // Stringify payload
        return this.http.post(this.global.GlobalUrl + '/zona_list/', bodyString, {headers:this.headers})
            .toPromise()
            .then(response => response)
    }

    saveZona(data): Promise<any> {
        //   let bodyString = {}; // Stringify payload // Stringify payload
        return this.http.post(this.global.GlobalUrl + '/zona_insert/', data, {headers:this.headers})
            .toPromise()
            .then(response => response)
    }

    deleteZona(zona): Promise<void> {
        let bodyString = JSON.stringify({ zona: zona }); // Stringify payload // Stringify payload
        return this.http.post(this.global.GlobalUrl + '/zona_delete/', bodyString, {headers:this.headers})
            .toPromise()
            .then(response => {response})
    }

    editZona(data): Promise<any> {
        //   let bodyString = {}; // Stringify payload // Stringify payload
        return this.http.post(this.global.GlobalUrl + '/zona_edit/', data, {headers:this.headers})
            .toPromise()
            .then(response => response)
    }

}
