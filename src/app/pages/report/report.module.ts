import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { ReportRoutingModule } from './report.routing';


import {CalendarModule} from "primeng/calendar"
import {TableModule} from "primeng/table"
import {SharedModule} from "primeng/api"
import {DialogModule} from "primeng/dialog"

import { NgBusyModule } from 'ng-busy';

// import { Ng2BootstrapModule } from "ngx-bootstrap";
// import {} from "ngx-bootstrap/ngx-bootstrap"
import { Report } from './report.component';
import { reportClaim } from './components/reportclaim/reportclaim.component';
import { reportServiceList } from './components/reportservicelist/reportservicelist.component';
import { reportFinishingService } from './components/reportfinishingservice/reportfinishingservice.component';
import { rejectedServiceReport } from './components/rejectedservicereport/rejectedservicereport.component';
import { reportPartOrder } from './components/reportpartorder/reportpartorder.component';
import { reportPartReceivings } from './components/reportpartreceiving/reportpartreceiving.component';
import { browseListBassReport } from './components/lookupreport/browseListBassReport/browseListBassReport.component'

import { ClaimReportService } from './components/reportclaim/reportclaim.service';
import { ReportServiceListService } from './components/reportservicelist/reportservicelist.service';
import { ReportFinishingServiceService } from './components/reportfinishingservice/reportfinishingservice.service';
import { RejectedServiceReportService } from './components/rejectedservicereport/rejectedservicereport.service';
import { ReportPartOrderService } from './components/reportpartorder/reportpartorder.service';
import { ReportPartReceivingService } from './components/reportpartreceiving/reportpartreceiving.service';
import { BrowseListBassReportService } from './components/lookupreport/browseListBassReport/browseListBassReport.service'
import { PrimengDefaultModule } from '../../theme/defaultprimeng.module';




@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    ReportRoutingModule,
    CalendarModule,
    NgBusyModule,
    DialogModule,
    FormsModule,
    PrimengDefaultModule,
    // Ng2BootstrapModule,
    TableModule,
    SharedModule
  ],
  declarations: [
    Report,
    reportClaim,
    reportServiceList,
    reportFinishingService,
    rejectedServiceReport,
    reportPartOrder,
    reportPartReceivings,
    browseListBassReport
  ],
  providers: [
    ClaimReportService,
    ReportServiceListService,
    ReportFinishingServiceService,
    RejectedServiceReportService,
    ReportPartOrderService,
    ReportPartReceivingService,
    BrowseListBassReportService
  ]
})
export class ReportModule {
}
