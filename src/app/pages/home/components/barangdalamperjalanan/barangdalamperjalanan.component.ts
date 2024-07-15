import { Component, ViewChild, ViewEncapsulation } from '@angular/core';

import { Router } from '@angular/router';

import { BarangDalamperJalananService } from './barangdalamperjalanan.service';
import { Subscription } from 'rxjs';
import { BUSY_CONFIG_DEFAULTS, IBusyConfig } from 'ng-busy';
import { GlobalState } from '../../../../global.state';

@Component({
  selector: 'barangdalamperjalanan',
  encapsulation: ViewEncapsulation.None,
  styleUrls:['./barangdalamperjalanan.component.scss'],
  templateUrl:'./barangdalamperjalanan.component.html'
})
export class barangDalamPerjalanan {
  kode_bass: any;
  source: any;
  sStorage: any;
  busyloadevent: IBusyConfig = Object.assign({}, BUSY_CONFIG_DEFAULTS);
  cols_of_header = [
    { field: "NO_INVOICE", header: 'No Invoice', width: '20%', type: 'text', ext: '' },
    { field: 'NO_PO', header: "No PO", width: '20%', type: 'text', ext: '' },
    { field: 'Tanggal', header: 'Tanggal', width: '5%', type: 'text', ext: '' },
    { field: 'KODE_BASS', header: 'Kode Bass', width: '5%', type: 'text', ext: '' },
    { field: 'NAMA_BASS', header: 'Nama Bass', width: '15%', type: 'text', ext: '' },
    { field: 'STATUS', header: 'Status', width: '15%', type: 'text', ext: '' }
  ];

  public kodeBassEvent(childData: any) {
    this.kode_bass = childData;
  }

  constructor(private barangDalamperJalananService: BarangDalamperJalananService, protected router: Router, public global: GlobalState) {
    this.sStorage = this.global.Decrypt('mAuth');

    this.busyloadevent.message = 'Please Wait...'
  }

  loadData() {

    if (!this.kode_bass) {
      this.kode_bass = this.sStorage.KODE_BASS;
    }

    this.busyloadevent.busy = [this.barangDalamperJalananService.getBarangDalamPerjalanan(this.kode_bass).then(
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

  onRowSelect(event) {
    this.kode_bass = event.data.KODE_BASS;
  }

}