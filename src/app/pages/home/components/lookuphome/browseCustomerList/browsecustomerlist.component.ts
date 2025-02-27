import { Component, ViewChild, ViewEncapsulation, Output, EventEmitter, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { BrowseCustomerListService } from './browsecustomerlist.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { BUSY_CONFIG_DEFAULTS, IBusyConfig } from 'ng-busy';
import { GlobalState } from '../../../../../global.state';
import { SortOrderDTO } from '../../../../models/sortOrderDto';

@Component({
    selector: 'browsecustomerlist',
    encapsulation: ViewEncapsulation.None,
    styleUrls:['./browsecustomerlist.component.scss'],
    templateUrl:'./browsecustomerlist.component.html'
})
export class browseCustomerList {

    public kode_dealer;
    public listCust: listCust[];
    public sKodeCust: any;
    data: Array<any> = [];
    listZona: SelectItem[] = [];
    public selectedListZona: string;
    sStorage: any;
    display: boolean = false;
    showPilihKodeCust: boolean = false;
    showPilihListZona: boolean = false;
    @Output() kodeCustomerChild = new EventEmitter<string>();
    busyloadevent: IBusyConfig = Object.assign({}, BUSY_CONFIG_DEFAULTS);

    keyword:string="";
    hasInit:boolean= false;
    totalRecords = 0;

    showDialog() {
        this.display = true;
    }

    @ViewChild('childModal') childModal: ModalDirective;

    showChildModal(): void {
        this.childModal.show();
    }

    hideChildModal(): void {
        this.childModal.hide();
    }

    constructor(private browseCustomerListService: BrowseCustomerListService, protected router: Router, public global: GlobalState) {

        this.sStorage = this.global.Decrypt('mAuth');
        this.busyloadevent.message = 'Please Wait...'

        //bind zona
        if (this.sStorage.TYPE == "Cabang") {
            this.showPilihListZona = true;

            this.browseCustomerListService.getZonaList(this.sStorage.KODE_BASS).subscribe(
                data => {
                    this.data = data;
                    for (var i = 0; i < this.data.length; i++) {
                        if (this.data[i].ZONA === "ALL") {
                            this.listZona.push({ label: "PILIH ZONA", value: "PILIH ZONA" });
                        } else {
                            this.listZona.push({ label: this.data[i].NAMA_ZONA, value: this.data[i].ZONA });
                        }

                    }
                    for (var i = 0; i < this.listZona.length; i++) {
                        if (this.listZona[i].label === "JABODETABEK") {
                            this.selectedListZona = this.listZona[i].value;
                            this._bindListCustomer();
                            return;
                        } else {
                            this.selectedListZona = this.listZona[0].value;
                        }
                    }
                    this._bindListCustomer();
                },
                err => {
                    if (err._body == 'You are not authorized' || err.status == 500) {
                        alert("Your Token has expired, please login again !")
                        sessionStorage.clear();
                        this.router.navigate(['/login']);
                    }
                }
            );

        } else if (this.sStorage.KODE_BASS == this.global.Decrypt('mParameter').BASS_PUSAT) {
            this.showPilihListZona = true;

            this.browseCustomerListService.getZonaList(this.sStorage.KODE_BASS).subscribe(
                data => {
                    this.data = data
                    for (var i = 0; i < this.data.length; i++) {
                        if (this.data[i].ZONA === "ALL") {
                            this.listZona.push({ label: "PILIH ZONA", value: "PILIH ZONA" });
                        } else {
                            this.listZona.push({ label: this.data[i].NAMA_ZONA, value: this.data[i].ZONA });
                        }

                    }

                    for (var i = 0; i < this.listZona.length; i++) {
                        if (this.listZona[i].label === "JABODETABEK") {
                            this.selectedListZona = this.listZona[i].value;
                            this._bindListCustomer();
                            return;
                        } else {
                            this.selectedListZona = this.listZona[0].value;
                        }
                    }
                    this._bindListCustomer();
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
            this.showPilihListZona = false;

            this.browseCustomerListService.getZonaList(this.sStorage.KODE_BASS).subscribe(
                data => {
                    this.data = data;
                    for (var i = 0; i < this.data.length; i++) {
                        if (this.data[i].ZONA === "ALL") {
                            this.listZona.push({ label: "PILIH ZONA", value: "PILIH ZONA" });
                        } else {
                            this.listZona.push({ label: this.data[i].NAMA_ZONA, value: this.data[i].ZONA });
                        }
                    }
                    for (var i = 0; i < this.listZona.length; i++) {
                        if (this.listZona[i].label === "JABODETABEK") {
                            this.selectedListZona = this.listZona[i].value;
                            this._bindListCustomer();
                            return;
                        } else {
                            this.selectedListZona = this.listZona[0].value;
                        }
                    }
                    this._bindListCustomer();
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


        this.hasInit=true;
    }

    onBlurMethod() {
        this.execemit();
    }

    onRowSelect(event) {
        this.sKodeCust = event.data.KODE_CUSTOMER;
        this.display = false;
        this.execemit();
    }

    execemit() {
        this.kodeCustomerChild.emit(this.sKodeCust);
    }

    //bind list kustomer
    bindListCustomer(keyword="",first=0,rows=10) {
        // const keyword= this.keyword?this.keyword:"";
        if (this.sStorage.TYPE == "Cabang") {
            this.showPilihKodeCust = true;

            this.busyloadevent.busy = [this.browseCustomerListService.getCustomerListPusat(this.selectedListZona,keyword,first,rows).then(
                response => {
                    const data = response[0]?.data?response[0].data:[];
                    this.listCust=data;

                    this.totalRecords=response[0]?.total_record?response[0]?.total_record[0]?.TOTAL_RECORD:0;

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
            this.showPilihKodeCust = true;

            this.busyloadevent.busy = [this.browseCustomerListService.getCustomerListPusat(this.selectedListZona,keyword,first,rows).then(
                response => {

                    const data = response[0]?.data?response[0].data:[];
                    this.listCust=data;
                    this.totalRecords=response[0]?.total_record?response[0]?.total_record[0]?.TOTAL_RECORD:0;

                },
                err => {
                    if (err._body == 'You are not authorized' || err.status == 500) {
                        alert("Your Token has expired, please login again !")
                        sessionStorage.clear();
                        this.router.navigate(['/login']);
                    }
                }
            )]
        } else {
            this.showPilihKodeCust = false;

            this.busyloadevent.busy = [this.browseCustomerListService.getCustomerList(this.selectedListZona, this.sStorage.KODE_BASS,keyword,first,rows).then(
                response => {

                    const data = response[0]?.data?response[0].data:[];
                    this.listCust=data;

                    this.totalRecords=response[0]?.total_record?response[0]?.total_record[0]?.TOTAL_RECORD:0;

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

    _bindListCustomer(){
        this.bindListCustomer()
    }

    onZonaChange(test) {
        this._bindListCustomer();
    }

    onLazyLoad(event){

        if(this.hasInit){

          const first = event.first+1;
          const rows= event.rows-1;
          const keywords= event.filters.global?event.filters.global.value:"";

          this.bindListCustomer(keywords,first,rows);

        }

    }

}


export interface listCust {
    KODE_CUSTOMER;
    NAMA_CUSTOMER;
    TELP_CUSTOMER;
    ALAMAT_CUSTOMER;
    KOTA_CUSTOMER;
    NAMA_ZONA;
    HP_CUSTOMER;
}