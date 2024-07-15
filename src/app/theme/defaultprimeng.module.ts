import { NgModule, ModuleWithProviders }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxUploaderModule } from 'ngx-uploader';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';




@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUploaderModule,
    InputTextModule,
    TableModule,
    ButtonModule,
    DropdownModule
  ],
  exports: [
    CommonModule,
    InputTextModule,
  ],
  bootstrap:[]
})
export class PrimengDefaultModule {
  static forRoot(): ModuleWithProviders<PrimengDefaultModule> {
    return {
      ngModule: PrimengDefaultModule,
      providers: [
      ],
    };
  }
}
