import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [authGuard]
  },
  {
    path: 'msme',
    loadChildren: () => import('./msme/msme.module').then(m => m.MsmeModule),
    canActivate: [authGuard]
  },
  {
    path: 'health-score',
    loadChildren: () => import('./health-score/health-score.module').then(m => m.HealthScoreModule),
    canActivate: [authGuard]
  },
  {
    path: 'loan',
    loadChildren: () => import('./loan/loan.module').then(m => m.LoanModule),
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
