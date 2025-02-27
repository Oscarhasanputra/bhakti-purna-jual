import { Component, ViewEncapsulation, Output, EventEmitter, Input } from '@angular/core';
import { ServiceListService } from './serviceList.service';
import { ServiceListModel } from './serviceList.model';
import { GlobalState } from '../../../../../../global.state';

import { BUSY_CONFIG_DEFAULTS, IBusyConfig } from 'ng-busy';
@Component({
    selector: 'list-service',
    encapsulation: ViewEncapsulation.None,
    styleUrls:['./serviceList.scss'],
    templateUrl:'./serviceList.html'
})
export class ServiceList {
    serviceList: ServiceListModel[];
    selectedService: any;
    KodeBass: any;
    data: any = [];
    dateFr: any;
    dateTo: any;
    display: boolean = false;

    @Output() ServiceDataOutput = new EventEmitter<String>();
    @Output() NoServicekeypress = new EventEmitter<Boolean>();
    @Input() ServiceDataInput;
    @Input() componentDisableService = false;

    busyloadevent: IBusyConfig = Object.assign({}, BUSY_CONFIG_DEFAULTS);

    constructor(protected service: ServiceListService, public global: GlobalState) {
        this.KodeBass = this.global.Decrypt('mAuth').KODE_BASS;

        let today = new Date();
        let month = today.getMonth();
        let year = today.getFullYear();
        let prevMonth = (month === 0) ? 11 : month - 1;
        let prevYear = (prevMonth === 11) ? year - 1 : year;
        this.dateFr = new Date();
        this.dateFr.setMonth(prevMonth);
        this.dateFr.setFullYear(prevYear);

        this.dateTo = new Date();
        this.busyloadevent.message = 'Please Wait...';
    }

    onRowSelect(event) {
        this.service.getServicebyKode(this.selectedService.KODE_SERVICE).then(
            data => {
                this.ServiceDataInput.KODE_SERVICE = data[0].KODE_SERVICE;
                this.ServiceDataOutput.emit(data[0]);
            }
            , err => console.log(err)
        );
        this.display = false;
    }

    noservicekeyup(e) {
        if (e == '') {
            this.NoServicekeypress.emit(false);
        } else {
            this.NoServicekeypress.emit(true);
        }

    }

    search() {
        this.busyloadevent.busy=[ this.service.getServiceList(this.KodeBass, this.dateFr, this.dateTo).then(
            data => {
                console.log("get data");
                console.log(data);
                this.serviceList = data;
            },
            err => {
                console.log(err)
            })
        ];
    }

    browseServicebyText() {
        this.service.getServicebyKode(this.ServiceDataInput.KODE_SERVICE).then(
            data => {
                if (data.length == 0) {
                    if (this.ServiceDataInput.KODE_SERVICE != '') {
                        alert('Data tidak ditemukan!');
                    }
                    this.ServiceDataInput.KODE_SERVICE = '';
                    this.NoServicekeypress.emit(false);
                } else {
                    this.ServiceDataInput.KODE_SERVICE = data[0].KODE_SERVICE;
                    this.ServiceDataOutput.emit(data[0]);
                    this.NoServicekeypress.emit(false);
                }
            }
            , err => {
                // console.log(err);
                this.ServiceDataInput.KODE_SERVICE = '';
            }
        );
    }

    browseService() {
        this.service.getServiceList(this.KodeBass, this.dateFr, this.dateTo).then(
            data => {
                this.serviceList = data;
                this.selectedService = [];
            },
            err => {
                console.log(err)
            })
        this.display = true;
    }

    Back() {
        this.display = false;
    }
}


