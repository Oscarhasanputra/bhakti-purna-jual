import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
// import { SelectItem, ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import {SelectItem,ConfirmationService} from "primeng/api"
import {ConfirmDialogModule} from "primeng/confirmdialog"
import { BUSY_CONFIG_DEFAULTS, IBusyConfig } from 'ng-busy';
import { Router } from '@angular/router';
import { MasterCustomerService } from './mastercustomer.service';
import { GlobalState } from '../../../../global.state'

@Component({
  selector: 'mastercustomer',
  encapsulation: ViewEncapsulation.None,
  styleUrls:['./mastercustomer.component.scss'],
  templateUrl:'./mastercustomer.component.html'
})
export class masterCustomer {
  HakAkses: any;
  appCode = "APPL00002";

  sStorage: any;
  status: Array<any>;
  selectedStatus: string;
  listZona: SelectItem[] = [];
  data: Array<any> = [];
  selectedListZona: string;

  kode_customer: any;
  public source: customerList[];
  public totalRecords: number;
  busyloadevent: IBusyConfig = Object.assign({}, BUSY_CONFIG_DEFAULTS);
  selectedCust: Array<any>;
  listKodeCust: Array<any>;
  hasInit = false;

  constructor(private masterCustomerService: MasterCustomerService, protected router: Router,
    private confirmationService: ConfirmationService, public global: GlobalState) {
    this.sStorage = this.global.Decrypt('mAuth');
    this.HakAkses = this.global.Decrypt('mRole').filter(data => data.KODE_APPLICATION == this.appCode)[0];

    this.listKodeCust = [];
    this.selectedCust = [];

    this.status = [];
    this.status.push({ label: 'All', value: "" });
    this.status.push({ label: 'Active', value: "A" });
    this.status.push({ label: 'Inactive', value: "I" });

    this.kode_customer = '';

    this.busyloadevent.message = 'Please Wait...'

    this.selectedStatus = this.status[0].value;

    if (this.HakAkses.HAK_AKSES) {
      this.masterCustomerService.getZonaList(this.sStorage.KODE_BASS).subscribe(
        data => {
          this.data = data;
          for (var i = 0; i < this.data.length; i++) {
            this.listZona.push({ label: this.data[i].NAMA_ZONA, value: this.data[i].ZONA });
          }

          this.selectedListZona = this.listZona[0].value;
          this.loadData()
          this.hasInit = true;
        },
        err => {
          if (err._body == 'You are not authorized' || err.status == 500) {
            alert("Your Token has expired, please login again !")
            sessionStorage.clear();
            this.router.navigate(['/login']);
          }
        }
      );
    } else {
      alert('Anda tidak berhak mengakses halaman ini!');
      this.router.navigate(['/pages/home']);
    }
  }

  loadData(first=0,rows=10,keyword=null) {

    const kodeCustomer = keyword?keyword:this.kode_customer;
    this.busyloadevent.busy = [this.masterCustomerService.getListMasterCustomer(this.sStorage.KODE_BASS, this.selectedListZona, kodeCustomer,first,rows).then(
      data => {
        if(data){

          this.source = data[0].data;
          this.totalRecords = data[0].total_record[0].TOTAL_RECORD;
        }
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

  onInputFilter(){

  }
  onLazyLoad(event){
    if(this.hasInit){
      const first = event.first+1;
      const rows= event.rows-1;
      const keywords= event.filters.global?event.filters.global.value:null;

      this.loadData(first,rows,keywords);


    }

  }
  tambahCustomer() {
    this.router.navigate(['/pages/master/frmInputMasterCustomer']);
  }

  edit(kode_customer) {
    this.router.navigate(['/pages/master/frmInputMasterCustomer', kode_customer, 'edit']);
  }

  delete(kode_customer) {
    console.log("delete")
    console.log(kode_customer);
    if (this.HakAkses.HAK_DELETE) {
      this.confirmationService.confirm({
        message: 'Anda yakin ingin menghapus customer ' + kode_customer + '?',
        accept: () => {
          //Actual logic to perform a confirmation
          this.masterCustomerService.deleteCustomer(kode_customer).then(
            data => {
              alert('Customer ' + kode_customer + ' berhasil di hapus');
              this.loadData();
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
    } else {
      alert("Anda tidak berhak menghapus data!")
    }
  }

  massDeleteCustomer() {
    if (this.HakAkses.HAK_DELETE) {
      this.listKodeCust = [];

      for (let i = 0; i < this.selectedCust.length; i++) {
        this.listKodeCust.push({ kode_customer: this.selectedCust[i].KODE_CUSTOMER });
      }

      this.confirmationService.confirm({
        message: 'Anda yakin ingin menghapus semua Customer ini?',
        accept: () => {
          //Actual logic to perform a confirmation
          this.masterCustomerService.massDeleteCustomer(this.listKodeCust).then(
            data => {
              this.selectedCust = [];
              alert('Customer berhasil di hapus');
              this.loadData();
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
    } else {
      alert("Anda tidak berhak menghapus data!")
    }
  }
}

export interface customerList {
  KODE_CUSTOMER;
  NAMA_CUSTOMER;
  KODE_ZONA;
  NAMA_ZONA;
}