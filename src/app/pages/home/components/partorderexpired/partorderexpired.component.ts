import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';

import { PartOrderExpiredService } from './partorderexpired.service';
import { Subscription } from 'rxjs';
import { BUSY_CONFIG_DEFAULTS, IBusyConfig } from 'ng-busy';
import { GlobalState } from '../../../../global.state';

@Component({
  selector: 'partorderexpired',
  encapsulation: ViewEncapsulation.None,
  styleUrls:['./partorderexpired.component.scss'],
  templateUrl:'./partorderexpired.component.html'
})
export class partOrderExpired {

  public sKodeBass: any = "";
  public source: partOrderExpired[];
  tglAwal: any = "";
  tglAkhir: any = "";
  busyloadevent: IBusyConfig = Object.assign({}, BUSY_CONFIG_DEFAULTS);

  public kodeBassEvent(childData: any) {
    this.sKodeBass = childData;
  }

  constructor(public partOrderExpiredService: PartOrderExpiredService, protected router: Router, public global: GlobalState) {
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = (month === 0) ? 11 : month - 1;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    this.tglAwal = new Date();
    this.tglAwal.setMonth(prevMonth);
    this.tglAwal.setFullYear(prevYear);

    this.tglAkhir = new Date();

    this.sKodeBass = this.global.Decrypt('mAuth').KODE_BASS;

    this.busyloadevent.message= 'Please Wait...'
  }

  tampil(kode_po) {
    this.router.navigate(['/pages/part/partorder', kode_po]);
  }

  loadData() {
    this.busyloadevent.busy = [this.partOrderExpiredService.getPartOrderExpiredHomeSelect(this.tglAwal, this.tglAkhir, this.sKodeBass).then(
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

}

export interface partOrderExpired {
  NO_PO;
  TANGGAL;
  KODE_BASS;
  NAMA_BASS;
  CATATAN;
  STATUS;
  NAMA_ZONA;
}