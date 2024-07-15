import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MasterRoutingModule } from './master.routing';
import { NgaModule } from '../../theme/nga.module';
import { EqualValidator } from './equal-validator.directive';

import { NgBusyModule } from 'ng-busy';

import { Master } from './master.component';

import { MasterZona } from './components/masterzona/masterzona.component';
import { MasterZonaService } from './components/masterzona/masterzona.service';

import { MasterKota } from './components/masterkota/masterkota.component';
import { MasterKotaService } from './components/masterkota/masterkota.service';

import { MasterExplodedSparepart } from './components/masterexplodedsparepart/masterexplodedsparepart.component';
import { MasterExplodedSparepartService } from './components/masterexplodedsparepart/masterexplodedsparepart.service';

import { MasterKaryawan } from './components/masterkaryawan/masterkaryawan.component';
import { MasterKaryawanService } from './components/masterkaryawan/masterkaryawan.service';

import { masterBass } from './components/masterbass/masterbass.component';
import { masterCustomer } from './components/mastercustomer/mastercustomer.component';
import { masterTeknisi } from './components/masterteknisi/masterteknisi.component';
import { masterAplikasi } from './components/masteraplikasi/masteraplikasi.component';
import { masterRole } from './components/masterrole/masterrole.component';
import { masterTransportasi } from './components/mastertransportasi/mastertransportasi.component';
import { masterMappingCabangZona } from './components/mastermappingcabangzona/mastermappingcabangzona.component';
import { frmInputMasterBass } from './components/masterbass/components/frmInputMasterBass/frmInputMasterBass.component';
import { frmInputMasterCustomer } from './components/mastercustomer/components/frmInputMasterCustomer/frmInputMasterCustomer.component';
import { frmInputMasterTeknisi } from './components/masterteknisi/components/frmInputMasterTeknisi/frmInputMasterTeknisi.component';
import { frmInputMasterRole } from './components/masterrole/components/frmInputMasterRole/frmInputMasterRole.component';
import { frmInputMasterTransportasi } from './components/mastertransportasi/components/frmInputMasterTransportasi/frmInputMasterTransportasi.component';
import { frmInputMasterMappingCabang } from './components/mastermappingcabangzona/components/frmInputMasterMappingCabang/frmInputMasterMappingCabang.component';
import { browseListBassMaster } from './components/lookupmaster/browseListBassMaster/browseListBassMaster.component';
import { browseListCabangMaster } from './components/lookupmaster/browseListCabangMaster/browseListCabangMaster.component';

import { MasterBassService } from './components/masterbass/masterbass.service';
import { MasterCustomerService } from './components/mastercustomer/mastercustomer.service';
import { MasterTeknisiService } from './components/masterteknisi/masterteknisi.service';
import { FrmInputMasterBassService } from './components/masterbass/components/frmInputMasterBass/frmInputMasterBass.service';
import { FrmInputMasterCustomerService } from './components/mastercustomer/components/frmInputMasterCustomer/frmInputMasterCustomer.service';
import { FrmInputMasterTeknisiService } from './components/masterteknisi/components/frmInputMasterTeknisi/frmInputMasterTeknisi.service';
import { FrmInputMasterRoleService } from './components/masterrole/components/frmInputMasterRole/frmInputMasterRole.service';
import { FrmInputMasterTransportasiService } from './components/mastertransportasi/components/frmInputMasterTransportasi/frmInputMasterTransportasi.service';
import { FrmInputMasterMappingCabangService } from './components/mastermappingcabangzona/components/frmInputMasterMappingCabang/frmInputMasterMappingCabang.service';
import { BrowseListBassMasterService } from './components/lookupmaster/browseListBassMaster/browseListBassMaster.service'
import { BrowseListCabangMasterService } from './components/lookupmaster/browseListCabangMaster/browseListCabangMaster.service';
import { MasterAplikasiService } from './components/masteraplikasi/masteraplikasi.service';
import { MasterRoleService } from './components/masterrole/masterrole.service';
import { MasterTransportasiService } from './components/mastertransportasi/mastertransportasi.service';
import { MasterMappingCabangZonaService } from './components/mastermappingcabangzona/mastermappingcabangzona.service';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { PrimengDefaultModule } from '../../theme/defaultprimeng.module';

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    FormsModule,
    MasterRoutingModule,
    TableModule,
    DialogModule,
    CalendarModule,
    ConfirmDialogModule,
    NgBusyModule,
    ReactiveFormsModule,
    PrimengDefaultModule
  ],
  declarations: [
    Master,
    MasterZona,
    MasterKota,
    MasterKaryawan,
    EqualValidator,
    masterBass,
    frmInputMasterBass,
    masterCustomer,
    frmInputMasterCustomer,
    masterTeknisi,
    browseListBassMaster,
    browseListCabangMaster,
    frmInputMasterTeknisi,
    masterAplikasi,
    masterRole,
    frmInputMasterRole,
    masterTransportasi,
    frmInputMasterTransportasi,
    masterMappingCabangZona,
    frmInputMasterMappingCabang,
    MasterExplodedSparepart
  ],
  providers: [
    ConfirmationService,
    MasterZonaService,
    MasterKotaService,
    MasterKaryawanService,
    MasterBassService,
    FrmInputMasterBassService,
    MasterCustomerService,
    FrmInputMasterCustomerService,
    ConfirmationService,
    MasterTeknisiService,
    BrowseListBassMasterService,
    BrowseListCabangMasterService,
    FrmInputMasterTeknisiService,
    MasterAplikasiService,
    MasterRoleService,
    FrmInputMasterRoleService,
    MasterTransportasiService,
    FrmInputMasterTransportasiService,
    MasterMappingCabangZonaService,
    FrmInputMasterMappingCabangService,
    MasterExplodedSparepartService
  ]
})
export class MasterModule {
}