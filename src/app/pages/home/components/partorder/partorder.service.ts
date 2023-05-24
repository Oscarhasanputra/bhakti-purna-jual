import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';



// set global url
import { GlobalState } from '../../../../global.state';

@Injectable()
export class PartOrderService {
    public smartTableData: any;

    constructor(private http: HttpClient, public global: GlobalState) {

    }

    getPartOrder(kode_bass, tgl_awal, tgl_akhir, kode_zona, inputted_by_bass): Promise<any> {
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        let bodyString = JSON.stringify({ "kode_bass": kode_bass, "tgl_awal": tgl_awal, "tgl_akhir": tgl_akhir, "kode_zona": kode_zona, "inputted_by_bass": inputted_by_bass }); // Stringify payload
        // let options = new RequestOptions({ headers: headers });

        return this.http.post(this.global.GlobalUrl + '/getPartorderHomeSelect/', bodyString, {headers})
            .toPromise()
            .then(response => this.smartTableData = response);
    }

    getBassList(kode_dealer): Promise<any> {
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });

        return this.http.get(this.global.GlobalUrl + '/getBassList/' + kode_dealer, {headers}).toPromise()
            .then(response => this.smartTableData = response);
    }

    getBassListUnderCabang(kode_dealer): Promise<any> {
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });

        return this.http.get(this.global.GlobalUrl + '/getBassListUnderCabang/' + kode_dealer, {headers}).toPromise()
            .then(response => this.smartTableData = response);
    }

    getZonaList(kode_dealer) {
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });

        return this.http.get<any>(this.global.GlobalUrl + '/getZonaList/' + kode_dealer, {headers});
    }

    getBassSelectByZonaAndCabang(kode_bass, kode_zona): Promise<any> {
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });

        return this.http.get(this.global.GlobalUrl + '/getBassSelectByZonaAndCabang/' + kode_bass + '/' + kode_zona, {headers}).toPromise()
            .then(response => this.smartTableData = response);
    }

}