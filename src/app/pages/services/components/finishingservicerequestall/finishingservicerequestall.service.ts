import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// set global url
import { GlobalState } from '../../../../global.state';

// Import RxJs required methods
// Operators








@Injectable()
export class FinishingServiceRequestAllService {

    constructor(public http: HttpClient, public global: GlobalState) {
    }

    // getteknisi
    getTeknisi(kode_bass: String, kode_teknisi: String, status: String): Promise<any> {
        let bodyString = JSON.stringify({ kode_bass: kode_bass, kode_teknisi: kode_teknisi, status: status }); // Stringify payload
        // get token in localstorage
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });
        return this.http.post(this.global.GlobalUrl + '/getTeknisiList/', bodyString, {headers})
            .toPromise()
            .then(response =>  response)
    }

    // getPerbaikan
    getPerbaikan(kodeBarang: String, namaKerusakan: String, namaPenyebab:String): Promise<any> {
        let bodyString = JSON.stringify({ kodeBarang: kodeBarang, namaKerusakan: namaKerusakan, namaPenyebab:namaPenyebab});
        // get token in localstorage
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });
        return this.http.post(this.global.GlobalUrl + '/getperbaikan/',bodyString, {headers})
            .toPromise()
            .then(response =>  response)
    }

    // getPenyebab
    getPenyebab(kodeBarang: String, namaKerusakan: String): Promise<any> {
        let bodyString = JSON.stringify({ kodeBarang: kodeBarang, namaKerusakan: namaKerusakan}); // Stringify payload
        // get token in localstorage
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });
        return this.http.post(this.global.GlobalUrl + '/getpenyebab/', bodyString, {headers})
            .toPromise()
            .then(response =>  response)
    }

    // getservicelist <== ada di module service request

    // getBiayaTransportasi
    getBiayaTransportasi(): Promise<any> {
        // get token in localstorage
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });
        return this.http.post(this.global.GlobalUrl + '/getbiayatransportasi/', {}, {headers})
            .toPromise()
            .then(response =>  response)
    }

    // invoiceServiceRequest
    invoiceServiceRequest(kodeBass: String, kodeInvoice: String, kodeBarang: String, kodeFinishing: String): Promise<any> {
        let bodyString = JSON.stringify({ kodeBass: kodeBass, kodeInvoice: kodeInvoice, kodeBarang: kodeBarang, kodeFinishing: kodeFinishing}); // Stringify payload
        // get token in localstorage
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });
        return this.http.post(this.global.GlobalUrl + '/getpenyebab/', bodyString, {headers})
            .toPromise()
            .then(response =>  response)
    }

    // getReviewClainService
    getReviewClaimService(kodeService: String): Promise<any> {
        let bodyString = JSON.stringify({ kodeService: kodeService}); // Stringify payload
        // get token in localstorage
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });
        return this.http.post(this.global.GlobalUrl + '/getReviewClaimService/', bodyString, {headers})
            .toPromise()
            .then(response =>  response)
    }

    // GET_HARGA <== ada di service request

    // getTransportasi
    getTransportasi(kodeTransportasi: String): Promise<any> {
        let bodyString = JSON.stringify({ kodeTransportasi: kodeTransportasi}); // Stringify payload
        // get token in localstorage
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });
        return this.http.post(this.global.GlobalUrl + '/gettransportasi/', bodyString, {headers})
            .toPromise()
            .then(response =>  response)
    }

    // calculatePPN
    calculatePPN(hargaSukuCadang: number, hargaService: number, hargaTransport: number): Promise<any> {
        let bodyString = JSON.stringify({ hargaSukuCadang: hargaSukuCadang, hargaService: hargaService, hargaTransport: hargaTransport}); // Stringify payload
        // get token in localstorage
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });
        return this.http.post(this.global.GlobalUrl + '/calculateppn/', bodyString, {headers})
            .toPromise()
            .then(response =>  response)
    }

    // KERUSAKAN_SORT_SELECT <== udah ada di service request

    // getDetailServiceRequest
    getDetailServiceRequest(kodeService: String): Promise<any> {
        let bodyString = JSON.stringify({ kodeService: kodeService}); // Stringify payload
        // get token in localstorage
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });
        return this.http.post(this.global.GlobalUrl + '/getdetailservicerequest/', bodyString, {headers})
            .toPromise()
            .then(response =>  response)
    }

    // getStokInvoiceSelectByKodePartAndInvoice
    getStokInvoiceSelectByKodePartAndInvoice(kodeBass: String, kodePart: String, noInvoice: String): Promise<any> {
        let bodyString = JSON.stringify({ kodeBass: kodeBass, kodePart: kodePart, noInvoice: noInvoice}); // Stringify payload
        // get token in localstorage
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });
        return this.http.post(this.global.GlobalUrl + '/getStokInvoiceselectbykodepartandinvoice/', bodyString, {headers})
            .toPromise()
            .then(response =>  response)
    }

    // getDetailServiceRequestReceived
    getDetailServiceRequestReceived(kodeService: String): Promise<any> {
        let bodyString = JSON.stringify({ kodeService: kodeService}); // Stringify payload
        // get token in localstorage
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });
        return this.http.post(this.global.GlobalUrl + '/getdetailservicerequestreceived/', bodyString, {headers})
            .toPromise()
            .then(response =>  response)
    }

    // getSparepart
    getSparepart(kodeBass: String, kodeBarang: String, nomorInvoice: String, kodeSparepart:String, jenisService:String, kodeFinishing:String): Promise<any> {
        let bodyString = JSON.stringify({ kodeBass: kodeBass, kodeBarang: kodeBarang, nomorInvoice: nomorInvoice, kodeSparepart:kodeSparepart, jenisService:jenisService, kodeFinishing:kodeFinishing}); // Stringify payload
        // get token in localstorage
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });
        return this.http.post(this.global.GlobalUrl + '/getsparepart/', bodyString, {headers})
            .toPromise()
            .then(response =>  response)
    }

    // saveServiceFinishing
    saveServiceFinishingAll(data): Promise<any> {
        let bodyString = JSON.stringify(data); // Stringify payload
        // get token in localstorage
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });
        return this.http.post(this.global.GlobalUrl + '/saveservicefinishingall/', bodyString, {headers})
            .toPromise()
            .then(response =>  response)
    }

    // serviceInsertDetail
    serviceInsertDetail(data): Promise<any> {
        let bodyString = JSON.stringify(data); // Stringify payload
        // get token in localstorage
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });
        return this.http.post(this.global.GlobalUrl + '/serviceinsertdetail/', bodyString, {headers})
            .toPromise()
            .then(response =>  response)
    }

    // reject
    reject(data): Promise<any> {
        let bodyString = JSON.stringify(data); // Stringify payload
        // get token in localstorage
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });
        return this.http.post(this.global.GlobalUrl + '/reject/', bodyString, {headers})
            .toPromise()
            .then(response =>  response)
    }

    // updatestatus
    updatestatus(kodeService:String, status:String): Promise<any> {
        let bodyString = JSON.stringify({kodeService:kodeService, status:status}); // Stringify payload
        // get token in localstorage
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });
        return this.http.post(this.global.GlobalUrl + '/updatestatus/', bodyString, {headers})
            .toPromise()
            .then(response =>  response)
    }

    // stokInsert
    stokInsert(kodeBass:String, partID:String, noInvoice:String, tanggal:String, description:String, qty:number, kodeFinishing:String): Promise<any> {
        let bodyString = JSON.stringify({kodeBass:kodeBass, partID:partID, noInvoice:noInvoice, tanggal:tanggal, description:description, qty:qty, kodeFinishing:kodeFinishing}); // Stringify payload
        // get token in localstorage
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });
        return this.http.post(this.global.GlobalUrl + '/stokInsert/', bodyString, {headers})
            .toPromise()
            .then(response =>  response)
    }

    // updateStatusBeforeClaimService
    updateStatusBeforeClaimService(kodeService:String): Promise<any> {
        let bodyString = JSON.stringify({kodeService:kodeService}); // Stringify payload
        // get token in localstorage
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });
        return this.http.post(this.global.GlobalUrl + '/updateStatusBeforeClaimService/', bodyString, {headers})
            .toPromise()
            .then(response =>  response)
    }
}