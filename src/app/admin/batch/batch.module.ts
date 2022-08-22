import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BatchRoutingModule } from './batch-routing.module';
import { BatchComponent } from './batch/batch.component';
import { AllBatchesComponent } from './all-batches/all-batches.component';
import { MaterialModule } from '../../material/material.module';
import { BatchDetailComponent } from './batch-detail/batch-detail.component';
import { AddBatchComponent } from './add-batch/add-batch.component';
import { AllFeedbackComponent } from '../feedback/all-feedback/all-feedback.component';
import { CreateBatchComponent } from './create-batch/create-batch.component';
import { CompletedBatchesComponent } from './completed-batches/completed-batches.component';


@NgModule({
  declarations: [BatchComponent, AllBatchesComponent, BatchDetailComponent, AddBatchComponent, AllFeedbackComponent, CreateBatchComponent, CompletedBatchesComponent],
  imports: [
    CommonModule,
    BatchRoutingModule,
    MaterialModule,
  ],
})
export class BatchModule { }
