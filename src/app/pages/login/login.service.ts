import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalState } from '../../global.state';



@Injectable()
export class LoginService {
    // Resolve HTTP using the constructor
    constructor(private http: HttpClient, public global: GlobalState) {
    }

    login(body: Object): Promise<any> {
        let bodyString = JSON.stringify(body); // Stringify payload
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        // let options = new RequestOptions({ headers: headers });

        return this.http.post(this.global.getGlobalUrl() + '/login', body, {headers}) // ...using post request
            .toPromise()
            .catch(this.handleError)
    }

    private handleError(error: Response | any) {
        return Promise.reject(error);
    }
}