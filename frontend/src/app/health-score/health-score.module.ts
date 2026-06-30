import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HealthScoreComponent } from './health-score.component';

@NgModule({
  imports: [
    HealthScoreComponent,
    RouterModule.forChild([{ path: '', component: HealthScoreComponent }])
  ]
})
export class HealthScoreModule {}
