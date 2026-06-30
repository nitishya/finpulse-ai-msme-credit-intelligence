import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MsmeProfileComponent } from './msme-profile.component';

@NgModule({
  imports: [
    MsmeProfileComponent,
    RouterModule.forChild([{ path: '', component: MsmeProfileComponent }])
  ]
})
export class MsmeModule {}
