import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';


import { GlobalState } from '../../../../global.state';


@Injectable()
export class MasterAplikasiService {
    data: any;

    constructor(private http: HttpClient, public global: GlobalState) {
    }

    getListMasterAplikasi(kode_aplikasi): Promise<any> {

        let token = this.global.Decrypt('mAuth').TOKEN
        let bodyString = JSON.stringify({ "kode_aplikasi": kode_aplikasi }); // Stringify payload
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });

        return this.http.post(this.global.GlobalUrl + '/getAplikasi/', bodyString,{headers})
            .toPromise()
            .then(response => this.data = response);
    }

}