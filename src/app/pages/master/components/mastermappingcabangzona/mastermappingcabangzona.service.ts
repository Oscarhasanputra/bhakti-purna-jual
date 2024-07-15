import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';


import { GlobalState } from '../../../../global.state';


@Injectable()
export class MasterMappingCabangZonaService {
    data: any;

    constructor(private http: HttpClient, public global: GlobalState) {
    }

    getListMasterMappingCabangZona(kode_bass, kata_kunci): Promise<any> {
        let token = this.global.Decrypt('mAuth').TOKEN
        let bodyString = JSON.stringify({ "kode_cabang": kode_bass, "kata_kunci": kata_kunci }); // Stringify payload
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });

        return this.http.post(this.global.GlobalUrl + '/mappingCabangZonaGet/', bodyString, {headers})
            .toPromise()
            .then(response => this.data = response);
    }

    deleteMappingZona(kode_cabang, kode_zona): Promise<any> {
        let token = this.global.Decrypt('mAuth').TOKEN
        let bodyString = JSON.stringify({ "kode_cabang": kode_cabang, "kode_zona": kode_zona }); // Stringify payload
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });

        return this.http.post(this.global.GlobalUrl + '/deleteMappingZona/', bodyString, {headers})
            .toPromise()
            .then(response => this.data = response);
    }

    deleteTeknisi(kode_bass, kode_teknisi): Promise<any> {
        let token = this.global.Decrypt('mAuth').TOKEN
        let bodyString = JSON.stringify({ "kode_bass": kode_bass, "kode_teknisi": kode_teknisi }); // Stringify payload
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });

        return this.http.post(this.global.GlobalUrl + '/deleteTeknisi/', bodyString, {headers})
            .toPromise()
            .then(response => this.data = response);
    }

    activateTeknisi(kode_bass, kode_teknisi): Promise<any> {
        let token = this.global.Decrypt('mAuth').TOKEN
        let bodyString = JSON.stringify({ "kode_bass": kode_bass, "kode_teknisi": kode_teknisi }); // Stringify payload
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });

        return this.http.post(this.global.GlobalUrl + '/activateTeknisi/', bodyString, {headers})
            .toPromise()
            .then(response => this.data = response);
    }
}