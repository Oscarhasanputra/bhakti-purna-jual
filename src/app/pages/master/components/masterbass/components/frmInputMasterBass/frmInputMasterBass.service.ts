import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


import { GlobalState } from '../../../../../../global.state';


@Injectable()
export class FrmInputMasterBassService {
    public data: any;

    constructor(private http: HttpClient, public global: GlobalState) {
    }

    getKotaList() {
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });

        return this.http.get<any>(this.global.GlobalUrl + '/getKotaSelect/', {headers});
    }

    saveTambahBass(registerBass): Promise<any> {
        let token = this.global.Decrypt('mAuth').TOKEN
        //let bodyString = JSON.stringify({"kode_bass":kode_bass,"nama_bass":nama_bass,"alamat_bass":alamat_bass,"nomor_telp":nomor_telp,"kota":kota,"contact_person":contact_person,"email":email,"inputted_by":inputted_by,"inputted_by_bass":inputted_by_bass,"inputted_date":inputted_date,"type":type});
        registerBass["inputted_by"] = this.global.Decrypt('mAuth').USERNAME
        registerBass["inputted_by_bass"] = this.global.Decrypt('mAuth').KODE_BASS
        let bodyString = JSON.stringify(registerBass);

        // Stringify payload
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });

        return this.http.post(this.global.GlobalUrl + '/saveTambahBass/', bodyString, {headers}) // ...using post request
            .toPromise()
            .then(response => this.data = response);
    }

    getBassSingle(kode_bass) {
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });

        return this.http.get<any>(this.global.GlobalUrl + '/getBassSingle/' + kode_bass, {headers});
    }

    editBass(registerBass, kode_bass): Promise<any> {
        let token = this.global.Decrypt('mAuth').TOKEN

        registerBass["kode_bass"] = kode_bass;
        let bodyString = JSON.stringify(registerBass);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });

        return this.http.post(this.global.GlobalUrl + '/updateBass/', bodyString, {headers}) // ...using post request
            .toPromise()
            .then(response => this.data = response);
    }

}