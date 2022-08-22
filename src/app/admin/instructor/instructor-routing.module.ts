import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddInstructorComponent } from './add-instructor/add-instructor.component';
import { AllInstructorsComponent } from './all-instructors/all-instructors.component';
import { InstructorComponent } from './instructor/instructor.component';

const routes: Routes = [
  {
    path: '',component: InstructorComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: 'all-instructors' },
      { path: 'add-instructor', component: AddInstructorComponent },
      { path: 'add-instructor/:id', component: AddInstructorComponent },
      { path: 'all-instructors', component: AllInstructorsComponent },
      { path: '**', component: AllInstructorsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructorRoutingModule { }
