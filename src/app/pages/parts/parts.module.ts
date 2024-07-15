//module utama angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PartsRoutingModule } from './parts.routing';
import { NgaModule } from '../../theme/nga.module';

//module utama part
import { Parts } from './parts.component';

import { PartOrder } from './components/partorder/partorder.component';
import { PartOrderService } from './components/partorder/partorder.service';

import { PartReceiving } from './components/partreceiving/partreceiving.component';
import { PartReceivingService } from './components/partreceiving/partreceiving.service';

import { MaintainPartOrder } from './components/maintainpartorder/maintainpartorder.component';
import { MaintainPartOrderService } from './components/maintainpartorder/maintainpartorder.service';

import { ListFaktur } from './components/listfaktur/listfaktur.component';
import { ListFakturService } from './components/listfaktur/listfaktur.service';

//module browse
import { ListBassListFaktur } from './components/listfaktur/components/listbass/listbass.component';
import { ListBassListFakturService } from './components/listfaktur/components/listbass/listbass.service';

import { ListBassMaintainPO } from './components/maintainpartorder/components/listbass/listbass.component';
import { ListBassMaintainPOService } from './components/maintainpartorder/components/listbass/listbass.service';

import { ListBarang } from './components/partorder/components/listbarangforexploded/listbarang/listbarang.component';
import { ListBarangService } from './components/partorder/components/listbarangforexploded/listbarang/listbarang.service';

import { ListPO } from './components/partorder/components/listpo/listpo.component';
import { ListPoService } from './components/partorder/components/listpo/listpo.service';

import { ListSparepart } from './components/partorder/components/listsparepart/listsparepart.component';
import { ListSparepartService } from './components/partorder/components/listsparepart/listsparepart.service';

import { ServiceList } from './components/partorder/components/serviceList/serviceList.component';
import { ServiceListService } from './components/partorder/components/serviceList/serviceList.service';

import { ListPartReceiving } from './components/partreceiving/components/listpartreceiving/listpartreceiving.component';
import { ListPartReceivingService } from './components/partreceiving/components/listpartreceiving/listpartreceiving.service';

//module tambahan
import {DialogModule} from "primeng/dialog"
import {CalendarModule} from "primeng/calendar"
import {ConfirmDialogModule} from "primeng/confirmdialog"
import {ConfirmationService} from "primeng/api"
// import
import { NgBusyModule } from 'ng-busy';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PrimengDefaultModule } from '../../theme/defaultprimeng.module';
// import {MomentModule} from 'angular2-moment';

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    FormsModule,
    PartsRoutingModule,
    // MomentModule
    // DataTableModule,
    DialogModule,
    CalendarModule,
    ConfirmDialogModule,
    ButtonModule,
    NgBusyModule,
    TableModule,
    PrimengDefaultModule,
  ],
  declarations: [
    ListBassListFaktur,
    ListBassMaintainPO,
    ListBarang,
    ListPO,
    ListSparepart,
    ServiceList,
    ListPartReceiving,

    Parts,
    PartOrder,
    PartReceiving,
    MaintainPartOrder,
    ListFaktur
  ],
  providers: [
    ListBassListFakturService,
    ListBassMaintainPOService,
    ListBarangService,
    ListPoService,
    ListSparepartService,
    ServiceListService,
    ListPartReceivingService,

    PartOrderService,
    PartReceivingService,
    MaintainPartOrderService,
    ListFakturService,

    ConfirmationService
  ]
})
export class PartsModule {
}