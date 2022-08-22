import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'admin', 
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: '', component: LoginComponent, pathMatch: 'full'
  },
  {
    path: '**', component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
