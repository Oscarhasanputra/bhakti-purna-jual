import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// set global url
import { GlobalState } from '../../../../../../global.state';
import { SortOrderDTO } from '../../../../../models/sortOrderDto';

// Import RxJs required methods
// Operators








@Injectable()
export class PartlistService {

    constructor(public http: HttpClient, public global: GlobalState) {
    }

    // getservicelist
    getSparepart(kodeBass: String, kodeBarang:String, kodeInvoice:String, kodeSparepart:String, jenisService:String, kodeFinishing:String,first:number,rows:number,sort:SortOrderDTO): Promise<any> {
        let bodyString = JSON.stringify({kodeBass:kodeBass, kodeBarang:kodeBarang,
            first:first,rows:rows,sortField:sort.sortField,sortOrder:sort.sortOrder,
            kodeInvoice:kodeInvoice,kodeSparepart:kodeSparepart, jenisService:jenisService, kodeFinishing:kodeFinishing }); // Stringify payload
        // console.log(bodyString)
        // get token in localstorage
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });
        return this.http.post(this.global.GlobalUrl + '/getsparepart/', bodyString, {headers})
            .toPromise()
            .then(response =>  response)
    }

}