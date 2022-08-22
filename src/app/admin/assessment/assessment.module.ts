import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssessmentRoutingModule } from './assessment-routing.module';
import { AssessmentComponent } from './assessment/assessment.component';
import { AddAssessmentComponent } from './add-assessment/add-assessment.component';
import { AllAssessmentComponent } from './all-assessment/all-assessment.component';
import { MaterialModule } from '../../material/material.module';

@NgModule({
  declarations: [AssessmentComponent, AddAssessmentComponent, AllAssessmentComponent],
  imports: [
    CommonModule,
    AssessmentRoutingModule,
    MaterialModule
  ]
})
export class AssessmentModule { }
