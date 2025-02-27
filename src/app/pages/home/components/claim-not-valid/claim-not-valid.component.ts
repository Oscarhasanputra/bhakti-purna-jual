import { AfterViewInit, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SelectItem } from 'primeng/api';

import { Subscription } from 'rxjs';
import { BUSY_CONFIG_DEFAULTS, IBusyConfig } from 'ng-busy';
import { GlobalState } from '../../../../global.state';
import { ClaimNotValidService } from './claim-not-valid.service';


@Component({
  selector: 'claimNotValid',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './claim-not-valid.component.html',
  styleUrl: './claim-not-valid.component.scss'
})
export class ClaimNotValidComponent {
  public sKodeBass: any = "";
  public source: ClaimNotValidDTO[];
  tglAwal: any = "";
  tglAkhir: any = "";
  busyloadevent: IBusyConfig = Object.assign({}, BUSY_CONFIG_DEFAULTS);

  public kodeBassEvent(childData: any) {
    this.sKodeBass = childData;
  }


  constructor(private _state: GlobalState, private claimNotValidService:ClaimNotValidService, protected router: Router) {

    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = (month === 0) ? 11 : month - 1;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    this.tglAwal = new Date();
    this.tglAwal.setMonth(prevMonth);
    this.tglAwal.setFullYear(prevYear);

    this.tglAkhir = new Date();


    this.busyloadevent.message = 'Please Wait...'

    if (this._state.Decrypt('mAuth').KODE_BASS == this._state.Decrypt('mParameter').BASS_PUSAT) {
      this.sKodeBass = "";
    } else {
      this.sKodeBass = this._state.Decrypt('mAuth').KODE_BASS;
    }
    this.loadData();
  }


  loadData() {
    this.busyloadevent.busy = [this.claimNotValidService.getClaimNotValidList(this.sKodeBass, this.tglAwal, this.tglAkhir).then(
      data => {
        console.log("DATA")
        console.log(data)
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
    this.sKodeBass = event.data.KODE_BASS;
  }

  tampil(kode_service) {
    this.router.navigate(['/pages/service/finishingservicerequest', kode_service]);
  }
}


export interface ClaimNotValidDTO {
  KODE_CLAIM:string;
  KODE_PRODUK:string;
  KODE_SERVICE:string;
  NOMOR_NOTA:string;
  NOMOR_SERI:string;
  REASON:string;
  TANGGAL:string;
}