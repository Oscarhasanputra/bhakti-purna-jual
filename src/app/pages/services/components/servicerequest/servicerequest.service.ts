import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// set global url
import { GlobalState } from '../../../../global.state';

// Import RxJs required methods
// Operators








@Injectable()
export class ServiceRequestService {

    constructor(public http: HttpClient, public global: GlobalState) {
    }

    // getNearestBass
    getNearestBass(kodeCustomer: String, kodeBass: String, isAdmin: Number): Promise<any> {
        let bodyString = JSON.stringify({ kodeCustomer: kodeCustomer, kodeBass: kodeBass, isAdmin: isAdmin }); // Stringify payload
        // get token in localstorage
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });
        return this.http.post(this.global.GlobalUrl + '/getnearestbass/', bodyString, {headers})
            .toPromise()
            .then(response => response)
    }

    // getKerusakan
    getKerusakan(kodeBarang: String): Promise<any> {
        // console.log(kodeBarang)
        let bodyString = JSON.stringify({ kodeBarang: kodeBarang }); // Stringify payload
        // get token in localstorage
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });
        return this.http.post(this.global.GlobalUrl + '/getkerusakan/', bodyString, {headers})
            .toPromise()
            .then(response => response)
    }

    // getCustomer
    getCustomer(kodeCustomer: String): Promise<any> {
        let bodyString = JSON.stringify({ kodeCustomer: kodeCustomer }); // Stringify payload
        // get token in localstorage
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });
        return this.http.post(this.global.GlobalUrl + '/getcustomer/', bodyString, {headers})
            .toPromise()
            .then(response => response)
    }

    // getBarangByKode
    getBarangByKode(kodeBarang: String): Promise<any> {
        let bodyString = JSON.stringify({ kodeBarang: kodeBarang }); // Stringify payload
        // get token in localstorage
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });
        return this.http.post(this.global.GlobalUrl + '/getbarangbykode/', bodyString, {headers})
            .toPromise()
            .then(response => response)
    }

    // getHarga
    getHarga(kodeBarang: String, merk: String, jenis: String): Promise<any> {
        let bodyString = JSON.stringify({ kodeBarang: kodeBarang, merk: merk, jenis: jenis }); // Stringify payload
        // get token in localstorage
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });
        return this.http.post(this.global.GlobalUrl + '/getharga/', bodyString, {headers})
            .toPromise()
            .then(response => response)
    }

    // serviceUpdate
    serviceUpdate(data): Promise<any> {
        let bodyString = JSON.stringify(data); // Stringify payload
        // get token in localstorage
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });
        return this.http.post(this.global.GlobalUrl + '/serviceupdate/', bodyString, {headers})
            .toPromise()
            .then(response => response)
    }

    //  serviceInsert
    serviceInsert(data): Promise<any> {
        let bodyString = JSON.stringify(data); // Stringify payload
        // get token in localstorage
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });
        return this.http.post(this.global.GlobalUrl + '/serviceinsert/', bodyString, {headers})
            .toPromise()
            .then(response => response)
    }


    // insert customer
    customerInsert(data): Promise<any> {
        let bodyString = JSON.stringify(data); // Stringify payload
        // get token in localstorage
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });
        return this.http.post(this.global.GlobalUrl + '/saveTambahCustomer/', bodyString, {headers})
            .toPromise()
            .then(response => response)
    }

    // insert customer
    sendMail(data): Promise<any> {
        let bodyString = JSON.stringify(data); // Stringify payload
        // get token in localstorage
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });
        return this.http.post(this.global.GlobalUrl + '/sendmail/', bodyString, {headers})
            .toPromise()
            .then(response => response)
    }

    // getReviewClainService
    getReviewClaimService(kodeService: String): Promise<any> {
        let bodyString = JSON.stringify({ kodeService: kodeService }); // Stringify payload
        // get token in localstorage
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });
        return this.http.post(this.global.GlobalUrl + '/getReviewClaimService/', bodyString, {headers})
            .toPromise()
            .then(response => response)
    }
}