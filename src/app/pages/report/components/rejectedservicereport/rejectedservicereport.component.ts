import { Component, ViewChild, ViewEncapsulation, EventEmitter } from '@angular/core';


import { RejectedServiceReportService, User } from './rejectedservicereport.service';
import { Subscription } from 'rxjs';
import { BUSY_CONFIG_DEFAULTS, IBusyConfig } from 'ng-busy';
import { Router } from '@angular/router';
import { GlobalState } from '../../../../global.state';



@Component({
  selector: 'rejectedservicereport',
  encapsulation: ViewEncapsulation.None,
  styleUrls:['./rejectedservicereport.component.scss'],
  templateUrl:'./rejectedservicereport.component.html'
})
export class rejectedServiceReport {

  public rejectedServiceReportServices: any;
  public listBass: listBass[];
  public kode_dealer;
  public tglAwal: any;
  public tglAkhir: any;
  public sKodeBass: any = '';
  sStorage: any;
  sParam: any;
  display: boolean = false;
  showPilihKodeBass: boolean;
  busyloadevent: IBusyConfig = Object.assign({}, BUSY_CONFIG_DEFAULTS);
  appCode: any = "APPL00064";
  hakAkses: any;

  public handleEvent(childData: any) {
    this.showPilihKodeBass = childData;
  }

  public kodeBassEvent(childData: any) {
    this.sKodeBass = childData;
  }

  constructor(private rejectedServiceReportService: RejectedServiceReportService, protected router: Router,
    public global: GlobalState) {
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

    this.sStorage = this.global.Decrypt('mAuth');
    this.sParam = this.global.Decrypt('mParameter');

    this.hakAkses = this.global.Decrypt('mRole').filter(data => data.KODE_APPLICATION == this.appCode)[0];

    if (this.hakAkses.HAK_AKSES) {

    } else {
      alert('Anda tidak berhak mengakses halaman ini!');
      this.router.navigate(['/pages/home']);
    }

    if (this.sStorage.TYPE == "Cabang") {
      this.showPilihKodeBass = true;
    } else if (this.sStorage.KODE_BASS == this.sParam.BASS_PUSAT) {
      this.showPilihKodeBass = true;
    } else {
      this.showPilihKodeBass = false;
    }
  }

  public proses(tglAwal, tglAkhir) {

    if (tglAwal == '' || tglAkhir == '') {

    } else {
      let dayAwal = tglAwal.getDate();
      let monthAwal = tglAwal.getMonth() + 1; // add 1 because months are indexed from 0
      let yearAwal = tglAwal.getFullYear();

      let dayAkhir = tglAkhir.getDate();
      let monthAkhir = tglAkhir.getMonth() + 1; // add 1 because months are indexed from 0
      let yearAkhir = tglAkhir.getFullYear();

      tglAwal = monthAwal + '-' + dayAwal + '-' + yearAwal
      tglAkhir = monthAkhir + '-' + dayAkhir + '-' + yearAkhir
    }
    // console.log('pilih', this.showPilihKodeBass);
    if (this.showPilihKodeBass == false) {
      this.busyloadevent.busy = [this.rejectedServiceReportService.getRejectedServiceReport(this.sStorage.KODE_BASS, tglAwal, tglAkhir).subscribe(
        data => { this.rejectedServiceReportServices = data },
        err => {
          if (err._body == 'You are not authorized' || err.status == 500) {
            alert("Your Token has expired, please login again !")
            sessionStorage.clear();
            this.router.navigate(['/login']);
          }
        }
      )]
    } else if (this.showPilihKodeBass == true) {
      this.busyloadevent.busy = [this.rejectedServiceReportService.getRejectedServiceReport(this.sKodeBass, tglAwal, tglAkhir).subscribe(
        data => { this.rejectedServiceReportServices = data},
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

  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>REJECTED SERVICE REPORT</title>
           <style>

            .mytable {
                border-collapse: collapse;
                margin-top:10px;
                margin-bottom:40px;
                table-layout: fixed;
                width: 100%;
            }
            /* Zebra striping */
            .mytable tr:nth-of-type(odd) {
                background: #eee;
                }
            .mytable th {
                background: #3498db;
                color: white;
                }
            .mytable td, th {
                padding: 7px;
                border: 1px solid #ccc;
                text-align: center;
                font-size: 10px;
                }
            .mytable .nourut {
                width:30px;
            }

            .kodeclaim {
                font-weight: bold;
                font-size: 14px;
            }

            .div-jarak {
                margin:10px 0px 10px 0px;
            }
           </style>
        </head>
    <body onload="window.print();window.close()">
      ${printContents}
    </body>
      </html>`
    );
    popupWin.document.close();
  }

}

export interface listBass {
  KODE_BASS;
  NAMA_BASS;
}
