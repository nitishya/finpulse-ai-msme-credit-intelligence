import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoanComponent } from './loan.component';

@NgModule({
  imports: [
    LoanComponent,
    RouterModule.forChild([{ path: '', component: LoanComponent }])
  ]
})
export class LoanModule {}
