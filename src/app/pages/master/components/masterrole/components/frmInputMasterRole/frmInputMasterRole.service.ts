import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


import { GlobalState } from '../../../../../../global.state';


@Injectable()
export class FrmInputMasterRoleService {
    public data:any;

    constructor(private http: HttpClient, public global: GlobalState) {

    }

    getListRoleDetail(kode_role): Promise<any> {

        let token = this.global.Decrypt('mAuth').TOKEN
        let bodyString = JSON.stringify({"kode_role":kode_role}); // Stringify payload
        let headers = new HttpHeaders({ 'Content-Type': 'application/json','x-access-token': token });
        // let options = new RequestOptions({ headers: headers });

        return this.http.post(this.global.GlobalUrl + '/getRoleDetailList/', bodyString, {headers})
            .toPromise()
            .then(response => this.data = response);
    }

    saveTambahRole(payload): Promise<any> {
        let token = this.global.Decrypt('mAuth').TOKEN

        let bodyString = JSON.stringify(payload);


        // Stringify payload
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });

        return this.http.post(this.global.GlobalUrl + '/saveTambahRole/', bodyString, {headers}) // ...using post request
            .toPromise()
            .then(response => this.data = response);
    }

    getRoleHeader(kode_role): Promise<any> {

        let token = this.global.Decrypt('mAuth').TOKEN
        let bodyString = JSON.stringify({"kode_role":kode_role}); // Stringify payload
        let headers = new HttpHeaders({ 'Content-Type': 'application/json','x-access-token': token });
        // let options = new RequestOptions({ headers: headers });

        return this.http.post(this.global.GlobalUrl + '/getRoleList/', bodyString, {headers})
            .toPromise()
            .then(response => this.data = response);
    }

    updateRole(payload): Promise<any> {
        let token = this.global.Decrypt('mAuth').TOKEN

        let bodyString = JSON.stringify(payload);


        // Stringify payload
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });

        return this.http.post(this.global.GlobalUrl + '/updateRole/', bodyString, {headers}) // ...using post request
            .toPromise()
            .then(response => this.data = response);
    }

}