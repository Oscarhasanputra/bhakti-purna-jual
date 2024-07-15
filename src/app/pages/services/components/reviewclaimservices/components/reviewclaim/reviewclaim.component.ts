import { Component, ViewEncapsulation, Input, EventEmitter, Output, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import * as _ from 'lodash';
import { BUSY_CONFIG_DEFAULTS, IBusyConfig } from 'ng-busy';

import { ReviewClaimService } from './reviewclaim.service';

import { Services } from './service';
import { GlobalState } from '../../../../../../global.state';

@Component({
  selector: 'review-claim',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './reviewclaim.html',
  styleUrls: ['./reviewclaim.scss'],
  providers: [ConfirmationService]
})
export class ReviewClaim implements DoCheck {

  @Input() NoClaim: String;
  @Input() StatusClaim: String;
  @Output() viewState = new EventEmitter<boolean>();

  busyLoaderEvent: IBusyConfig = Object.assign({}, BUSY_CONFIG_DEFAULTS);
  services: Services[];
  KodeBass: String;
  oldNoClaim: String = '';

  constructor(protected service: ReviewClaimService, protected router: Router,
    private confirmationService: ConfirmationService, public global: GlobalState) {
    this.KodeBass = this.global.Decrypt('mAuth').KODE_BASS;
    this.busyLoaderEvent.message = `Please Wait...`;
  }

  ngDoCheck() {
    if (this.NoClaim !== this.oldNoClaim) {
      this.services = [];
      this.oldNoClaim = this.NoClaim;
      this.loadData(this.NoClaim);
    }
  }

  loadData(noClaim: String) {
    this.busyLoaderEvent.busy = [this.service.getClaimService(noClaim).then(
      data => {
        this.services = data;
      },
      err => {
        if (err._body.indexOf("TokenExpiredError") == 1 && err.status == 500) {
          alert("Your Token has expired, please login again !")
          sessionStorage.clear();
          this.router.navigate(['/login']);
        } else {
          alert(err._body);
        }
      }
    )]
  }

  cancel() {
    this.viewState.emit(false);
  }

  reviewService(service: any) {
    // console.log(service);
    if (service.ISVALID == '0' && service.REASON == '') {
      alert('Catatan harap diisi!');
    } else {
      this.confirmationService.confirm({
        header: 'Confirmation',
        message: 'Simpan review claim service?',
        accept: () => {
          if (service.ISVALID == '1') {
            service.REASON = '';
          }
          //Actual logic to perform a confirmation
          this.busyLoaderEvent.busy = [this.service.insertReviewClaim(
            this.NoClaim, service.KODE_SERVICE, Number(service.ISVALID), service.REASON,
            this.global.Decrypt('mAuth').USERNAME,
            this.KodeBass,
            new Date()).then(
            data => {
              alert(data);
              this.loadData(this.NoClaim);
            },
            err => {
              if (err._body.indexOf("TokenExpiredError") == 1 && err.status == 500) {
                alert("Your Token has expired, please login again !")
                sessionStorage.clear();
                this.router.navigate(['/login']);
              } else {
                alert(err._body);
              }
            })]
        }
      });
    }
  }

  changeBgColor(rowData, rowIndex): string {
    return rowData.STATUS === '1' ? 'row-backgroundcolor' : '';
  }
}
