import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BatchComponent } from './batch/batch.component';
import { AllBatchesComponent } from './all-batches/all-batches.component';
import { BatchDetailComponent } from './batch-detail/batch-detail.component';
import { AddBatchComponent } from './add-batch/add-batch.component';
import { AllFeedbackComponent } from '../feedback/all-feedback/all-feedback.component';
import { CreateBatchComponent } from './create-batch/create-batch.component';
import { CompletedBatchesComponent } from './completed-batches/completed-batches.component';

const routes: Routes = [
  {
    path: '', component: BatchComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: 'all-batches' },
      { path: 'add-batch', component: AddBatchComponent },
      { path: 'add-batch/:id', component: AddBatchComponent },
      { path: 'create-batch', component: CreateBatchComponent },
      { path: 'create-batch/:id', component: CreateBatchComponent },
      { path: 'all-batches', component: AllBatchesComponent },
      { path: 'completed-batches', component: CompletedBatchesComponent },
      { path: 'batch-detail/:id', component: BatchDetailComponent },
      { path: 'all-feedbacks', component: AllFeedbackComponent},
      { path: '**', component: AllBatchesComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BatchRoutingModule { }
