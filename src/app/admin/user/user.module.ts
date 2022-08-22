import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { AllUsersComponent } from './all-users/all-users.component';
import { UserComponent } from './user/user.component';
import { MaterialModule } from '../../material/material.module';
import { AddUserComponent } from './add-user/add-user.component';
import { RegisteredUsersTableComponent } from './registered-users-table/registered-users-table.component';

@NgModule({
  declarations: [AllUsersComponent, UserComponent, AddUserComponent, RegisteredUsersTableComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule
  ]
})
export class UserModule { }
