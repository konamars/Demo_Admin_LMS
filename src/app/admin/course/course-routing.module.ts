import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCourseComponent } from './add-course/add-course.component';
import { AllCourseComponent } from './all-course/all-course.component';
import { CourseComponent } from './course/course.component';

const routes: Routes = [
  {
    path: '',component: CourseComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: 'all-courses' },
      { path: 'add-course', component: AddCourseComponent },
      { path: 'add-course/:id', component: AddCourseComponent },
      { path: 'all-courses', component: AllCourseComponent },
      { path: '**', component: AllCourseComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
