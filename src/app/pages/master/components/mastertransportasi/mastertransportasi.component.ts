import { Component, ViewChild, ViewEncapsulation } from '@angular/core';

import { ConfirmationService } from 'primeng/api';

import { BUSY_CONFIG_DEFAULTS, IBusyConfig } from 'ng-busy';
import { Router } from '@angular/router';
import { MasterTransportasiService } from './mastertransportasi.service';

@Component({
  selector: 'mastertransportasi',
  encapsulation: ViewEncapsulation.None,
  styleUrls:['./mastertransportasi.component.scss'],
  templateUrl:'./mastertransportasi.component.html'
})
export class masterTransportasi {

  selectedStatus: string;
  data: Array<any> = [];
  sStorage: any;
  kode_transportasi: any;
  kode_bass: any;
  public source: transportasiList[];
  busyloadevent: IBusyConfig = Object.assign({}, BUSY_CONFIG_DEFAULTS);

  constructor(private masterTransportasiService: MasterTransportasiService, protected router: Router, private confirmationService: ConfirmationService) {

    this.kode_transportasi = '';

    this.sStorage = sessionStorage.getItem('mAuth');
    this.sStorage = JSON.parse(this.sStorage);
    this.busyloadevent.message = 'Please Wait...'

    this.loadData()
  }

  loadData() {
    this.sStorage = sessionStorage.getItem('mAuth');
    this.sStorage = JSON.parse(this.sStorage);

    this.busyloadevent.busy = [this.masterTransportasiService.getListMasterTransportasi(this.kode_transportasi).then(
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

  tambahTransportasi() {
    this.router.navigate(['/pages/master/frmInputMasterTransportasi']);
  }

  edit(kode_transportasi) {
    this.router.navigate(['/pages/master/frmInputMasterTransportasi', kode_transportasi, 'edit']);
  }

  delete(kode_transportasi) {

    this.sStorage = sessionStorage.getItem('mAuth');
    this.sStorage = JSON.parse(this.sStorage);

    this.confirmationService.confirm({
      message: 'Anda yakin ingin menghapus transportasi ini?',
      accept: () => {
        //Actual logic to perform a confirmation
        this.masterTransportasiService.deleteTransportasi(kode_transportasi).then(
          data => {
            this.loadData();
            alert('Transportasi berhasil di hapus');
          },
          err => {
            if (err._body == 'You are not authorized' || err.status == 500) {
              alert("Your Token has expired, please login again !")
              sessionStorage.clear();
              this.router.navigate(['/login']);
            }
          }
        );
      }
    });
  }
}

export interface transportasiList {
  KODE_TRANS;
  JARAK;
  BIAYA;
}