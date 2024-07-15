import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// set global url
import { GlobalState } from '../../../../global.state';

// Import RxJs required methods
// Operators







@Injectable()
export class MasterKaryawanService {
    private token = this.global.Decrypt('mAuth').TOKEN
    private headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': this.token });
    // private options = new RequestOptions({ headers: this.headers });

    constructor(public http: HttpClient, public global: GlobalState) {
    }

    getData(kodebass, status): Promise<any> {
        let bodyString = JSON.stringify({ kodebass: kodebass, status: status }); // Stringify payload // Stringify payload
        return this.http.post(this.global.GlobalUrl + '/karyawan_list/', bodyString, {headers:this.headers})
            .toPromise()
            .then(response => response)
    }

    getDataDetail(kodebass, username): Promise<any> {
        let bodyString = JSON.stringify({ kodebass: kodebass, username: username }); // Stringify payload // Stringify payload
        return this.http.post(this.global.GlobalUrl + '/karyawan_listdetail/', bodyString, {headers:this.headers})
            .toPromise()
            .then(response => response)
    }

    getKodeRole(type, role): Promise<any> {
        let bodyString = JSON.stringify({ type: type, role: role }); // Stringify payload // Stringify payload
        return this.http.post(this.global.GlobalUrl + '/role_list/', bodyString, {headers:this.headers})
            .toPromise()
            .then(response => response)
    }

    saveKaryawan(data): Promise<any> {
        //   let bodyString = {}; // Stringify payload // Stringify payload
        return this.http.post(this.global.GlobalUrl + '/karyawan_insert/', data, {headers:this.headers})
            .toPromise()
            .then(response => response)
    }

    deleteKaryawan(data): Promise<any> {
        // let bodyString = JSON.stringify({ zona: zona}); // Stringify payload // Stringify payload
        return this.http.post(this.global.GlobalUrl + '/karyawan_delete/', data, {headers:this.headers})
            .toPromise()
            .then(response => response)
    }

    aktifkanKaryawan(data): Promise<any> {
        // let bodyString = JSON.stringify({ zona: zona}); // Stringify payload // Stringify payload
        return this.http.post(this.global.GlobalUrl + '/karyawan_aktif/', data, {headers:this.headers})
            .toPromise()
            .then(response => response)
    }

    resetPassKaryawan(data): Promise<any> {
        // let bodyString = JSON.stringify({ zona: zona}); // Stringify payload // Stringify payload
        return this.http.post(this.global.GlobalUrl + '/karyawan_resetPass/', data, {headers:this.headers})
            .toPromise()
            .then(response => response)
    }

    editKaryawan(data): Promise<any> {
        //   let bodyString = {}; // Stringify payload // Stringify payload
        return this.http.post(this.global.GlobalUrl + '/Karyawan_edit/', data, {headers:this.headers})
            .toPromise()
            .then(response => response)
    }

    getBassListAll(kdbass): Promise<any> {
        let bodyString = JSON.stringify({ kdbass: kdbass }); // Stringify payload
        return this.http.post(this.global.GlobalUrl + '/bassListAll/', bodyString, {headers:this.headers})
            .toPromise()
            .then(response => response)
    }

    getBassList(kdbass): Promise<any> {
        let bodyString = JSON.stringify({ kdbass: kdbass }); // Stringify payload
        return this.http.post(this.global.GlobalUrl + '/bassList/', bodyString, {headers:this.headers})
            .toPromise()
            .then(response => response)
    }
}
