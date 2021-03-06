
import { NgModule } from '@angular/core';
import { CardListComponent } from './withdrawal/options/card-list/card-list.component';
import { YandexComponent } from './withdrawal/options/yandex/yandex.component';
import { PaypalComponent } from './withdrawal/options/paypal/paypal.component';
import { WebmoneyComponent } from './withdrawal/options/webmoney/webmoney.component';
import {CommonModule} from '@angular/common';
import {InlineSVGModule} from 'ng-inline-svg';
import {RouterModule, Routes} from '@angular/router';
import {BalancePageComponent} from './balance.component';
import {WithdrawalComponent} from './withdrawal/withdrawal.component';
import {BalanceAddComponent} from './balance-add/balance-add.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: BalancePageComponent,
    children: [
      {
        path: '',
        redirectTo: 'withdrawal',
        pathMatch: 'full'
      },
      {
        path: 'withdrawal',
        component: WithdrawalComponent
      },
      {
        path: 'add',
        component: BalanceAddComponent
      },
    ]
  }
];

@NgModule({
  declarations: [
    CardListComponent,
    YandexComponent,
    WithdrawalComponent,
    PaypalComponent,
    WebmoneyComponent,
    BalancePageComponent,
    BalanceAddComponent
  ],

  imports: [
    CommonModule,
    InlineSVGModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  providers: [],
  exports: [
    CardListComponent,
    YandexComponent,
    PaypalComponent,
    WebmoneyComponent
  ],
  bootstrap: []
})


export class BalancePageModule { }
