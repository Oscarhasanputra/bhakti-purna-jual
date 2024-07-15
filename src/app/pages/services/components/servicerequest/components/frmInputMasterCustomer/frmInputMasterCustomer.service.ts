import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


// set global url
import { GlobalState } from '../../../../../../global.state';

@Injectable()
export class FrmInputMasterCustomerService {
    public data: any;

    constructor(private http: HttpClient, public global: GlobalState) {

    }

    getKotaList() {
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });

        return this.http.get<any>(this.global.GlobalUrl + '/getKotaSelect/', {headers});
    }

    saveTambahCustomer(registerCustomer): Promise<any> {
        let token = this.global.Decrypt('mAuth').TOKEN
        registerCustomer["inputted_by"] = this.global.Decrypt('mAuth').USERNAME;
        registerCustomer["inputted_by_bass"] = this.global.Decrypt('mAuth').KODE_BASS;
        let bodyString = JSON.stringify(registerCustomer);

        // Stringify payload
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });

        return this.http.post(this.global.GlobalUrl + '/saveTambahCustomer/', bodyString, {headers}) // ...using post request
            .toPromise()
            .then(response => this.data = response);
    }

    getCustomerSingle(kode_customer) {
        let token = this.global.Decrypt('mAuth').TOKEN
        let bodyString = JSON.stringify({ "kode_customer": kode_customer });
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });

        return this.http.post<any>(this.global.GlobalUrl + '/getCustomerSingle/', bodyString, {headers});
    }

    editCustomer(registerCustomer, kode_customer): Promise<any> {
        let token = this.global.Decrypt('mAuth').TOKEN
        registerCustomer["kode_customer"] = kode_customer;
        let bodyString = JSON.stringify(registerCustomer);

        // Stringify payload
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });

        return this.http.post(this.global.GlobalUrl + '/updateCustomer/', bodyString, {headers}) // ...using post request
            .toPromise()
            .then(response => this.data = response);
    }

}