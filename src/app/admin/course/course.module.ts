import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { CourseComponent } from './course/course.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { AllCourseComponent } from './all-course/all-course.component';
import { MaterialModule } from '../../material/material.module';

@NgModule({
  declarations: [CourseComponent, AddCourseComponent, AllCourseComponent],
  imports: [
    CommonModule,
    CourseRoutingModule,
    MaterialModule
  ]
})
export class CourseModule { }
