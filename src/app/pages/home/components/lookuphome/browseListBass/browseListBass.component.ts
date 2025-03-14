import { Component, ViewChild, ViewEncapsulation, Output, EventEmitter, OnInit, Renderer2, Input } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { BrowseListBassService } from './browseListBass.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { BUSY_CONFIG_DEFAULTS, IBusyConfig } from 'ng-busy';
import { GlobalState } from '../../../../../global.state';

@Component({
  selector: 'browselistbass',
  styleUrls:['./browseListBass.component.scss'],
  templateUrl:'./browseListBass.component.html'
})
export class browseListBass {

  public kode_dealer;
  public listBass: listBass[];
  // public
  sStorage: any;
  display: boolean = false;
  showPilihKodeBass: boolean = false;
  @Input("kodeBass") sKodeBass: any;
  @Output() kodeBassChild = new EventEmitter<string>();
  busyloadevent: IBusyConfig = Object.assign({}, BUSY_CONFIG_DEFAULTS);

  showDialog() {
    this.display = true;
  }

  @ViewChild('childModal',{static:true}) childModal: ModalDirective;

  showChildModal(): void {
    this.childModal.show();
  }

  hideChildModal(): void {
    this.childModal.hide();
  }

  constructor(private browseListBassService: BrowseListBassService, protected router: Router, public global: GlobalState,private renderer:Renderer2) {

    this.sStorage = this.global.Decrypt('mAuth');
    // this.renderer
    this.busyloadevent.message = 'Please Wait...'

    if (this.sStorage.TYPE == "Cabang") {
      this.showPilihKodeBass = true;

      this.busyloadevent.busy = [this.browseListBassService.getBassListUnderCabang(this.sStorage.KODE_BASS).then(
        data => {
          this.listBass = data;
        },
        err => {
          if (err._body == 'You are not authorized' || err.status == 500) {
            alert("Your Token has expired, please login again !")
            sessionStorage.clear();
            this.router.navigate(['/login']);
          }
        }
      )]
    } else if (this.sStorage.KODE_BASS == this.global.Decrypt('mParameter').BASS_PUSAT) {
      this.showPilihKodeBass = true;

      this.busyloadevent.busy = [this.browseListBassService.getBassList(this.sStorage.KODE_BASS).then(
        data => {
          this.listBass = data;
        },
        err => {
          if (err._body == 'You are not authorized' || err.status == 500) {
            alert("Your Token has expired, please login again !")
            sessionStorage.clear();
            this.router.navigate(['/login']);
          }
        }
      )];
    } else {
      this.showPilihKodeBass = false;

      this.busyloadevent.busy = [this.browseListBassService.getBassList(this.sStorage.KODE_BASS).then(
        data => {
          this.listBass = data;
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

  onBlurMethod() {
    this.execemit();
  }

  onRowSelect(event) {
    this.sKodeBass = event.data.KODE_BASS;
    this.display = false;
    this.execemit();
  }

  execemit() {
    this.kodeBassChild.emit(this.sKodeBass);
  }

}

export interface listBass {
  KODE_BASS;
  NAMA_BASS;
}
