import { Component, ViewEncapsulation, Output, EventEmitter, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ListSparepartService } from './listsparepart.service';
import { GlobalState } from '../../../../../../global.state';

import { BUSY_CONFIG_DEFAULTS, IBusyConfig } from 'ng-busy';
@Component({
  selector: 'list-sparepart',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './listsparepart.html',
  styleUrls: ['./listsparepart.scss']
})
export class ListSparepart {

  sparepartlist: any;
  selectedSparepart: any;
  KodeBass: any;
  selectedSparepart2: any;
  display: boolean = false;
  kodesparepart: any = '';
  data: any = [];
  totalRecords:any=0;
  hasInit = false;

  busyloadevent: IBusyConfig = Object.assign({}, BUSY_CONFIG_DEFAULTS);


  @Output() SparepartdataOutput = new EventEmitter<String>();
  @Input() componentDisableSparepart = false;

  constructor(protected service: ListSparepartService,
    private _state: GlobalState,
    private route: ActivatedRoute,
    private router: Router, public global: GlobalState) {

    this.KodeBass = this.global.Decrypt('mAuth').KODE_BASS
     this.busyloadevent.message = 'Please Wait...';

  }

  onRowSelect(event) {
    this.selectedSparepart2 = [];
    this.selectedSparepart['PartID'] = this.selectedSparepart.Part_ID;
    this.data.push(this.selectedSparepart)
    this.service.getStockSelect(this.data, this.KodeBass.trim())
      .then((detail) => {
        this.selectedSparepart2.push({ Part_ID: detail[0].Part_ID, Part_Name: this.selectedSparepart.Part_Name, QUANTITY: 1, STOCK_CABANG: detail[0].Stock_Cabang, STOCK_PUSAT: detail[0].Stock_Pusat, Harga: this.selectedSparepart.Harga });
        // this.service.pushData(this.selectedSparepart2[0])
        this.SparepartdataOutput.emit(this.selectedSparepart2[0])

        this.selectedSparepart = [];
        this.selectedSparepart2 = [];
        this.data = [];
      })

    this.display = false;
  }

  browseSparepart(first=0,rows=5) {
    this.hasInit =true;
    this.kodesparepart = this.kodesparepart?this.kodesparepart:"";
    this.busyloadevent.busy = [
      this.service.getSparepartList(this.kodesparepart,first,rows)
        .then(response=>{

          const data = response[0]?.data?response[0].data:[];
          this.sparepartlist=data;
          this.totalRecords=response[0]?.total_record?response[0]?.total_record[0]?.TOTAL_RECORD[0]?.TOTAL_RECORD:0;
          this.display = true;
          console.log("list sparepart")
          console.log(this.sparepartlist)
          // if(this.kodesparepart==''){
          //   this.sparepartlist=data;
          //   this.totalRecords=response[0]?.total_record?response[0]?.total_record[0]?.TOTAL_RECORD[0]?.TOTAL_RECORD:0;
          //   this.display = true;
          //   console.log("list sparepart")
          //   console.log(this.sparepartlist)
          // }else {

          //   if (data.length == 0) {
          //     alert('Data tidak ditemukan!');
          //     this.kodesparepart = '';
          //   } else {
          //     this.selectedSparepart2 = [];
          //     data[0]['PartID'] = data[0].Part_ID;
          //     this.selectedSparepart = data[0];
          //     this.service.getStockSelect(data, this.KodeBass.trim())
          //       .then((detail) => {

          //         this.selectedSparepart2.push({ Part_ID: detail[0].Part_ID, Part_Name: this.selectedSparepart.Part_Name, QUANTITY: 0, STOCK_CABANG: detail[0].Stock_Cabang, STOCK_PUSAT: detail[0].Stock_Pusat, Harga: this.selectedSparepart.Harga });
          //         // this.service.pushData(this.selectedSparepart2[0])
          //         this.SparepartdataOutput.emit(this.selectedSparepart2[0])

          //         this.kodesparepart = '';
          //         this.selectedSparepart = [];
          //         this.selectedSparepart2 = [];
          //       })
          //   }

          // }
        }).catch(err=>console.log(err))
    ]

  }

  Back() {
    this.display = false;
  }


  onLazyLoad(event){
    console.log("on lazy load")
    console.log(event);
    if(this.hasInit){
      const first = event.first+1;
      const rows= event.rows-1;
      const keywords= event.filters.global?event.filters.global.value:null;
      console.log(keywords);
      this.browseSparepart(first,rows);
      // this.loadData(first,rows,keywords);

    }
  }
}
