import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {
    path: '', 
    component: AdminComponent,
    children: [
      {
        path: 'user', 
        loadChildren: () => import('./user/user.module').then(m => m.UserModule)
      },
      {
        path: 'instructor', 
        loadChildren: () => import('./instructor/instructor.module').then(m => m.InstructorModule)
      },
      {
        path: 'course', 
        loadChildren: () => import('./course/course.module').then(m => m.CourseModule)
      },
      {
        path: 'course-batch', 
        loadChildren: () => import('./batch/batch.module').then(m => m.BatchModule)
      },
      {
        path: 'assessment', 
        loadChildren: () => import('./assessment/assessment.module').then(m => m.AssessmentModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
