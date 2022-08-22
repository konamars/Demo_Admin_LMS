import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructorRoutingModule } from './instructor-routing.module';
import { AddInstructorComponent } from './add-instructor/add-instructor.component';
import { AllInstructorsComponent } from './all-instructors/all-instructors.component';
import { InstructorComponent } from './instructor/instructor.component';
import { MaterialModule } from '../../material/material.module';

@NgModule({
  declarations: [AddInstructorComponent, AllInstructorsComponent, InstructorComponent],
  imports: [
    CommonModule,
    InstructorRoutingModule,
    MaterialModule
  ],
  providers: []
})
export class InstructorModule { }
