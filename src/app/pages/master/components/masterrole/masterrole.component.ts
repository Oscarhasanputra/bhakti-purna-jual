import { Component, ViewChild, ViewEncapsulation } from '@angular/core';

import { ConfirmationService } from 'primeng/api';

import { BUSY_CONFIG_DEFAULTS, IBusyConfig } from 'ng-busy';
import { Router } from '@angular/router';
import { MasterRoleService } from './masterrole.service';
import { GlobalState } from '../../../../global.state';

@Component({
  selector: 'masterrole',
  encapsulation: ViewEncapsulation.None,
  styleUrls:['./masterrole.component.scss'],
  templateUrl:'./masterrole.component.html'
})
export class masterRole {

  data: Array<any> = [];
  sStorage: any;
  kode_role: any;
  login_type: any;
  login_role: any;
  showPilihKodeBass: boolean = false;
  public source: roleList[];
  busyloadevent: IBusyConfig = Object.assign({}, BUSY_CONFIG_DEFAULTS);

  constructor(private masterRoleService: MasterRoleService, protected router: Router, private confirmationService: ConfirmationService,
    public global: GlobalState) {
    this.busyloadevent.message = 'Please Wait...'

    this.kode_role = '';

    this.sStorage = this.global.Decrypt('mAuth');

    this.loadData()
  }

  loadData() {
    this.busyloadevent.busy = [this.masterRoleService.getListMasterRole(this.kode_role).then(
      data => {
        this.source = data;
      },
      err => {
        if (err._body == 'You are not authorized' || err.status == 500) {
          alert("Your Token has expired, please login again !")
          sessionStorage.clear();
          this.router.navigate(['/login']);
        }
      }
    )]
  }

  tambahRole() {
    this.router.navigate(['/pages/master/frmInputMasterRole']);
  }

  edit(kode_role) {
    this.router.navigate(['/pages/master/frmInputMasterRole', kode_role, 'edit']);
  }

  delete(kode_role) {
    this.confirmationService.confirm({
      message: 'Anda yakin ingin menghapus role ' + kode_role + ' ?',
      accept: () => {
        //Actual logic to perform a confirmation
        this.busyloadevent.busy = [this.masterRoleService.deleteRole(kode_role).then(
          data => {
            this.loadData();
            alert('Role ' + kode_role + ' berhasil di hapus');
          },
          err => {
            if (err._body == 'You are not authorized' || err.status == 500) {
              alert("Your Token has expired, please login again !")
              sessionStorage.clear();
              this.router.navigate(['/login']);
            }
          }
        )]
      }
    });
  }
}

export interface roleList {
  KODE_ROLE;
  NAMA_ROLE;
  IS_SUPPORT_CENTER;
}