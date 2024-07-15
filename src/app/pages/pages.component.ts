import { Component } from '@angular/core';
import { Routes, Router } from '@angular/router';
import { BUSY_CONFIG_DEFAULTS, IBusyConfig } from 'ng-busy';

import { BaMenuService } from '../theme';
import { PAGES_MENU } from './pages.menu';
import * as _ from 'lodash';
import { GlobalState } from '../global.state';

import { PagesService } from './pages.service';

@Component({
  selector: 'pages',
  template: `
    <div [ngBusy]="busyLoaderEvent"></div>
    <ba-sidebar></ba-sidebar>
    <ba-page-top></ba-page-top>
    <div class="al-main">
      <div class="al-content">
        <ba-content-top></ba-content-top>
        <router-outlet></router-outlet>
      </div>
    </div>
    <footer class="al-footer clearfix">
      <div class="al-footer-main clearfix">
      </div>
    </footer>
    <ba-back-top position="200"></ba-back-top>
    `
})
export class Pages {
  busyLoaderEvent: IBusyConfig = Object.assign({}, BUSY_CONFIG_DEFAULTS);

  constructor(public router: Router, private _menuService: BaMenuService, public pagesService: PagesService,
    private _state: GlobalState) {
      // this.busyLoaderEvent.template=""
    this.busyLoaderEvent.message = `Please Wait...`;
  }

  ngOnInit() {
    let menuFilter = [];
    // console.log(this._state.Decrypt('mAuth').KODE_BASS)
    //set menu
    let menuPart: any = _.cloneDeep(PAGES_MENU);
    this.busyLoaderEvent.busy = [this.pagesService.getMenu(this._state.Decrypt('mAuth').KODE_ROLE)
      .then(
      data => {

        for (let x in data) {
          menuFilter.push(data[x].menu);
        }
        for (let x in menuPart[0].children) {
          if (menuPart[0].children[x].children != null) {
            menuPart[0].children[x].children = menuPart[0].children[x].children.filter(menu => {
              for (let field in menuFilter) {
                if (menu.path === menuFilter[field]) {
                  return true;
                }
              }
              return false;
            });
          }
        }
        this._menuService.updateMenuByRoutes(<Routes>menuPart);
      },
      err => {
        if (err._body.data.indexOf("TokenExpiredError") == 1 && err.status == 500) {
          alert("Your Token has expired, please login again !")
          sessionStorage.clear();
          this.router.navigate(['/login']);
        } else {
          alert(err._body.data);
        }
      }
      )]
    //end menu
    // this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
  }
}
