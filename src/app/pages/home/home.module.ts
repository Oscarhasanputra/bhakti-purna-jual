import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

// import { CalendarModule,  DialogModule, TabViewModule } from 'primeng/primeng';
import {DialogModule} from "primeng/dialog"
import {CalendarModule} from "primeng/calendar"
import {TabViewModule} from "primeng/tabview"
import {TableModule} from "primeng/table"
import { NgBusyModule } from 'ng-busy';
import { ModalModule } from "ngx-bootstrap/modal";
// import { Ng2SmartTableModule } from 'ng2-smart-table';

import { Home } from './home.component';
import { HomeRoutingModule }       from './home.routing';
import { serviceList } from './components/servicelist/servicelist.component'
import { partOrder } from './components/partorder/partorder.component'
import { partOrderExpired } from './components/partorderexpired/partorderexpired.component'
import { barangDalamPerjalanan } from './components/barangdalamperjalanan/barangdalamperjalanan.component'
import { browseListBass } from './components/lookuphome/browseListBass/browseListBass.component'
import { browseCustomerList } from './components/lookuphome/browseCustomerList/browsecustomerlist.component'


import { BrowseListBassService } from './components/lookuphome/browseListBass/browseListBass.service'
import { ServiceListService } from './components/servicelist/servicelist.service'
import { BrowseCustomerListService } from './components/lookuphome/browseCustomerList/browsecustomerlist.service'
import { PartOrderService } from './components/partorder/partorder.service'
import { PartOrderExpiredService } from './components/partorderexpired/partorderexpired.service'
import { BarangDalamperJalananService } from './components/barangdalamperjalanan/barangdalamperjalanan.service'
import { InputTextModule } from 'primeng/inputtext';
import { PrimengDefaultModule } from '../../theme/defaultprimeng.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    HomeRoutingModule,
    CalendarModule,
    TableModule,
    // DataTableModule,
    DialogModule,
    NgBusyModule,
    ModalModule,
    InputTextModule,
    PrimengDefaultModule,
    // Ng2SmartTableModule,
    TabViewModule
  ],
  declarations: [
    Home,
    serviceList,
    partOrder,
    partOrderExpired,
    barangDalamPerjalanan,
    browseListBass,
    browseCustomerList
  ],
  providers: [
    BrowseListBassService,
    ServiceListService,
    BrowseCustomerListService,
    PartOrderService,
    PartOrderExpiredService,
    BarangDalamperJalananService
   ]
})
export class HomeModule {}
