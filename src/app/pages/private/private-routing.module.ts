import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import authGuard from '../../guards/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadComponent: ()=> DashboardComponent,
    canActivate: [authGuard], 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
