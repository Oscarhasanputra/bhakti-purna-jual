import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


import { GlobalState } from '../../../../global.state';

@Injectable()
export class MasterRoleService {
    data:any;

    constructor(private http: HttpClient, public global: GlobalState) {

    }

    getListMasterRole(kode_role): Promise<any> {

        let token = this.global.Decrypt('mAuth').TOKEN
        let bodyString = JSON.stringify({"kode_role":kode_role}); // Stringify payload
        let headers = new HttpHeaders({ 'Content-Type': 'application/json','x-access-token': token });
        // let options = new RequestOptions({ headers: headers });

        return this.http.post(this.global.GlobalUrl + '/getRoleList/', bodyString, {headers})
            .toPromise()
            .then(response => this.data = response);
    }

    deleteRole(kode_role): Promise<any> {

        let token = this.global.Decrypt('mAuth').TOKEN
        let bodyString = JSON.stringify({"kode_role":kode_role}); // Stringify payload
        let headers = new HttpHeaders({ 'Content-Type': 'application/json','x-access-token': token });
        // let options = new RequestOptions({ headers: headers });

        return this.http.post(this.global.GlobalUrl + '/deleteRole/', bodyString, {headers})
            .toPromise()
            .then(response => this.data = response);
    }

}