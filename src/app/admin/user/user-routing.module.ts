import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllUsersComponent } from './all-users/all-users.component';
import { UserComponent } from './user/user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { RegisteredUsersTableComponent } from './registered-users-table/registered-users-table.component';

const routes: Routes = [
  {
    path: '', component: UserComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: 'all-users' },
      { path: 'add-user', component: AddUserComponent},
      { path: 'add-user/:id', component: AddUserComponent},
      { path: 'all-users', component: AllUsersComponent },
      { path: 'registered-users', component: RegisteredUsersTableComponent },
      { path: '**', component: AllUsersComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
