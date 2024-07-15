import { Component, ViewEncapsulation, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BUSY_CONFIG_DEFAULTS, IBusyConfig } from 'ng-busy';
import { FakturListService } from './fakturlist.service';
import { Subject } from 'rxjs';
import { GlobalState } from '../../../../../../global.state';

@Component({
    selector: 'fakturlist',
    encapsulation: ViewEncapsulation.None,
    styleUrls:['./fakturlist.scss'],
    templateUrl:'./fakturlist.html'
})
export class FakturListComponent implements OnInit {
    public fakturList: any;
    public filterFaktur = { no_fakur: "", kodeInvoice: "", kodeBarang: "", kodeFinishing: "" }
    public flagHidden: Boolean = false

    public gloKodeBass: any;
    public gloNamaBass: any;
    public gloUsername: any;

    @Output() onHiddenMain = new EventEmitter<Boolean>();
    @Output() onCancel = new EventEmitter<Boolean>();
    @Output() onRowSelected = new EventEmitter<Object>();

    busyloadevent: IBusyConfig = Object.assign({}, BUSY_CONFIG_DEFAULTS);

    constructor(public router: Router, private actroute: ActivatedRoute, private service: FakturListService, public global: GlobalState) {
        this.busyloadevent.message= 'Please Wait...'
    }

    ngOnInit() {
        this.gloKodeBass = this.global.Decrypt('mAuth').KODE_BASS;
        this.gloNamaBass = this.global.Decrypt('mBass').NAMA_BASS;
        this.gloUsername = this.global.Decrypt('mAuth').USERNAME;
    }

    public buttonBrowseClicked(kodeInvoice, kodeBarang, kodeFinishing) {
        this.filterFaktur['no_fakur'] = kodeInvoice;
        this.filterFaktur['kodeInvoice'] = kodeBarang;
        this.filterFaktur['kodeBarang'] = kodeFinishing;

        this.getFakturList(this.gloKodeBass, kodeInvoice, kodeBarang, kodeFinishing)
        this.flagHidden = true
        this.onHiddenMain.emit(true)
    }

    public buttonSearchClicked() {
        this.getFakturList(this.gloKodeBass, this.filterFaktur.kodeInvoice, this.filterFaktur.kodeBarang, this.filterFaktur.kodeFinishing)
    }

    public onRowSelect(event) {
        this.flagHidden = false
        this.onRowSelected.emit(event)
    }

    public onCancelBrowse() {
        this.flagHidden = false
        this.onCancel.emit(false)
    }

    // search debounce service
    public debounceSearch(kodeInvoice, kodeBarang, kodeFinishing) {
        this.filterFaktur['no_fakur'] = kodeInvoice;
        this.filterFaktur['kodeInvoice'] = kodeBarang;
        this.filterFaktur['kodeBarang'] = kodeFinishing;

        this.buttonSearchClicked()
        this.flagHidden = true
        this.onHiddenMain.emit(true)
    }

    // get data in service
    public getFakturList(kodeBass: String, kodeInvoice: String, kodeBarang: String, kodeFinishing: String) {
        this.busyloadevent.busy = [this.service.getFakturList(kodeBass, kodeInvoice, kodeBarang, kodeFinishing).then(
            data => {
                this.fakturList = data;
                // console.log(this.fakturList)
            },
            err => {
                if (err._body.data.indexOf("TokenExpiredError") == 1 && err.status == 500) {
                    alert("Your Token has expired, please login again !")
                    sessionStorage.clear();
                    this.router.navigate(['/login']);
                } else {
                    alert(err._body.data);
                }
            })]
    }
}