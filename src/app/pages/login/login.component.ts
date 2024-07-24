import { Component, TemplateRef, ViewChild } from '@angular/core';
import { UntypedFormGroup, AbstractControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router, Routes } from '@angular/router';
import { BUSY_CONFIG_DEFAULTS, BusyConfig, IBusyConfig } from 'ng-busy';

import { LoginService } from './login.service';
import { GlobalState } from '../../global.state';

import { PAGES_MENU } from '../pages.menu';

import 'style-loader!./login.scss';

@Component({
  selector: 'login',
  templateUrl: './login.html',
})
export class Login {
  busyLoaderEvent: IBusyConfig = Object.assign({}, BUSY_CONFIG_DEFAULTS);
  // @ViewChild("bustLoad") busyLoad:Element
  public form: UntypedFormGroup;
  public kode_bass: AbstractControl;
  public username: AbstractControl;
  public password: AbstractControl;
  public submitted: boolean = false;
  public errorMsg: String;

  constructor(private _state: GlobalState, fb: UntypedFormBuilder, public loginService: LoginService, public router: Router) {
    this.busyLoaderEvent.message= `Please Wait....`;

    this.form = fb.group({
      'kode_bass': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'username': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.kode_bass = this.form.controls['kode_bass'];
    this.username = this.form.controls['username'];
    this.password = this.form.controls['password'];

    sessionStorage.clear();
  }

  public onSubmit(values: Object): void {
    this.submitted = true;
    if (this.form.valid) {
      this.busyLoaderEvent.minDuration = 10000
      this.busyLoaderEvent.busy = [this.loginService.login(values)
        .then(
        data => {
          console.log("data login")
          console.log(data)
          this.setSessionUser(data.mAuth[0][0][0])
          this.setSessionBass(data.mBass[0][0][0])
          this.setSessionRole(data.mRole[0][0])
          this.setSessionParameter(data.mParameter[0][0][0])
          // this.setSessionUser(JSON.parse(data._body).mAuth[0][0][0])
          // this.setSessionBass(JSON.parse(data._body).mBass[0][0][0])
          // this.setSessionRole(JSON.parse(data._body).mRole[0][0])
          // this.setSessionParameter(JSON.parse(data._body).mParameter[0][0][0])

          this._state.notifyDataChanged('user.isLoggedIn', true);
          this.router.navigate(['pages/home']);
        },
        error => {

          this.errorMsg=error.error.data;

          // this.errorMsg = JSON.parse(error._body).data;
        })]
    }
  }

  private setSessionUser(data: any) {
    // save to session storage
    try {
      // let auth = {
      //   Kode_Bass: data.KODE_BASS,
      //   Kode_Karyawan: data.USERNAME,
      //   Role: data.KODE_ROLE,
      //   Type: data.TYPE === 'C' ? 'Cabang' : 'Bass',
      //   Token: data.TOKEN
      // }​​​​​​​;
      // console.log('user',data.mAuth)
      // sessionStorage.setItem('mAuth', data.mAuth);
      sessionStorage.setItem('mAuth', JSON.stringify(data.mAuth));
    } catch (error) {
      console.log(error)
    }
  }

  private setSessionBass(data: any) {
    // save to session storage
    try {
      // let bass = {
      //   Nama_Bass: data.NAMA_BASS,
      //   Alamat_Bass: data.ALAMAT_BASS,
      //   No_Telp: data.NO_TELP,
      //   Kota: data.KOTA,
      //   Contact_Person: data.CONTACT_PERSON,
      //   Email: data.EMAIL
      // }​​​​​​​;
      sessionStorage.setItem('mBass', JSON.stringify(data.mBass));
    } catch (error) {
      console.log(error)
    }
  }

  private setSessionRole(data: any) {
    // save to session storage
    try {
      // let role = [];
      // data.forEach(element => {
      //   role.push({
      //     App_Code: element.KODE_APPLICATION,
      //     Akses: element.HAK_AKSES,
      //     Insert: element.HAK_INSERT,
      //     Edit: element.HAK_EDIT,
      //     Delete: element.HAK_DELETE
      //   })
      // });
      sessionStorage.setItem('mRole', JSON.stringify(data.mRole));
    } catch (error) {
      console.log(error)
    }
  }

  private setSessionParameter(data: any) {
    // save to session storage
    try {
      // let param = {
      //   Web_Title: data.WEB_TITLE,
      //   Report_Server_Path: data.REPORT_SERVER_PATH,
      //   Expired_PO_Date: data.EXPIRED_PO_DATE,
      //   Bass_Pusat: data.BASS_PUSAT,
      //   Email_SMTP: data.EMAIL_SMTP,
      //   Email_Port: data.EMAIL_PORT,
      //   Email_Username: data.EMAIL_USERNAME,
      //   Email_Password: data.EMAIL_PASSWORD
      // }​​​​​​​;
      sessionStorage.setItem('mParameter', JSON.stringify(data.mParameter));
    } catch (error) {
      console.log(error)
    }
  }
}
