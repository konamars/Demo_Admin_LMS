import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssessmentComponent } from './assessment/assessment.component';
import { AddAssessmentComponent } from './add-assessment/add-assessment.component';
import { AllAssessmentComponent } from './all-assessment/all-assessment.component';

const routes: Routes = [
  {
    path: '', 
    component: AssessmentComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'all-assessments' },
      { path: 'add-assessment', component: AddAssessmentComponent },
      { path: 'add-assessment/:id', component: AddAssessmentComponent },
      { path: 'all-assessments', component: AllAssessmentComponent },
      { path: '**', component: AllAssessmentComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssessmentRoutingModule { }
