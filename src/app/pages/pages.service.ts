import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalState } from '../global.state';



@Injectable()
export class PagesService {
    // Resolve HTTP using the constructor
    constructor(private http: HttpClient, public global: GlobalState) {
    }

    getMenu(body: String): Promise<any> {
        let bodyString = JSON.stringify({ kode_role: body }); // Stringify payload
        let token = this.global.Decrypt('mAuth').TOKEN
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token });
        // let options = new RequestOptions({ headers: headers });

        return this.http.post(this.global.getGlobalUrl() + '/get_menu', bodyString, {headers}) // ...using post request
            .toPromise()
            .then(response => response)
            .catch(this.handleError);
    }

    private handleError(error: HttpResponse<any> | any) {
        return Promise.reject(error);
    }

}