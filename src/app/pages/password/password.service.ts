import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalState } from '../../global.state';



@Injectable()
export class PasswordService {
    // Resolve HTTP using the constructor
    constructor(private http: HttpClient, public global: GlobalState) {
    }

    changePassword(body: any): Promise<any> {
        let bodyString = JSON.stringify({
            kode_bass: this.global.Decrypt('mAuth').KODE_BASS,
            username: this.global.Decrypt('mAuth').USERNAME,
            oldpassword: body.oldpassword,
            newpassword: body.password
        }); // Stringify payload
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        // let options = new RequestOptions({ headers: headers });

        return this.http.post(this.global.getGlobalUrl() + '/changepassword', bodyString, {headers}) // ...using post request
            .toPromise()
            .catch(this.handleError);
    }

    private handleError(error: Response | any) {
        // console.log(error);
        return Promise.reject(error);
    }
}