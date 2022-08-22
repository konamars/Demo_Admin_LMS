import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-assessment',
  templateUrl: './add-assessment.component.html',
  styleUrls: ['./add-assessment.component.scss']
})
export class AddAssessmentComponent implements OnInit {

  constructor(private snackBar: MatSnackBar,  private activatedRoute: ActivatedRoute,private fb: FormBuilder, private adminService: AdminService, private router: Router) { }

  addAssessment: FormGroup = this.fb.group({
    assessment: this.fb.array([]),
    name: null
  });
  assessmentId: string;
  isEdit: boolean;

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      if (params && params['id']) {
        this.getCourseDetails(params['id']);
        this.assessmentId = params['id'];
        this.isEdit = true;
      }
    })
  }
  async getCourseDetails(id) {
    try {
      const assessment = await this.adminService.getAssessmentById(id).toPromise();
      if (assessment['status'] == 200) {
        assessment['body']['assessment'].forEach((a, i) => {
          this.addQuestion();
          a['options'].forEach((t, ti) => {
            this.addOption(i);
          });
        });
        this.addAssessment.patchValue({ ...assessment['body'] });
      }
    } catch (error) {
      if (error && error['status'] == 404) {
        this.router.navigateByUrl('/admin/assessment/all-assessments');
      }
      console.log(error);
    }
  }

  getControls(a)
  {
    return (<FormArray>this.addAssessment.controls.assessment).controls;
  }
  addQuestion() {
    (<FormArray>this.addAssessment.controls.assessment).push(this.fb.group({
      name: this.fb.control(null, Validators.required),
      options: this.fb.array([])
    }));
  }
  removeQuestion(i) {
    (<FormArray>this.addAssessment.controls.assessment).removeAt(i);
  }

  addOption(i) {
    (<FormArray>(<FormGroup>(<FormArray>this.addAssessment.controls.assessment).at(i)).controls.options).push(this.fb.group({
      name: [null, Validators.required],
      isChecked: false
    }));
  }
  removeOption(i, e) {
    (<FormArray>(<FormGroup>(<FormArray>this.addAssessment.controls.assessment).at(i)).controls.options).removeAt(e);
  }

  async add() {
    if (this.addAssessment.valid) {
      try {
        const created = await this.adminService.addAssessment({
          ...this.addAssessment.value
        }).toPromise();
        if (created['status'] == 201) {
          this.addAssessment.reset();
          this.snackBar.open('Successfully created', '', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'snackBar',
            duration: 3000
          });
          this.router.navigateByUrl('/admin/assessment/all-assessments');
        }
      } catch (error) {
        console.log(error);
      }
    }else {
      this.validateFormFields(this.addAssessment);
    }
  }

  validateFormFields(formGroup) {
    Object.keys(formGroup.controls).forEach((element) => {
      let control = formGroup.get(element);
      if (control instanceof FormControl) {
        control.markAsTouched();
      } else if (control instanceof FormGroup) {
        this.validateFormFields(control);
      } else if (control instanceof FormArray) {
        this.validateFormArrayFields(control);
      }
    })
  }

  validateFormArrayFields(formArray) {
    (<FormArray>formArray).controls.forEach((a, i) => {
      let c = (<FormArray>formArray).at(i);
      if (c instanceof FormControl) {
        c.markAsTouched();
      } else if (c instanceof FormGroup) {
        this.validateFormFields(c);
      } else if (c instanceof FormArray) {
        this.validateFormArrayFields(c);
      }
    })
  }

  async edit() {
    if(this.addAssessment.valid) {

      try {
        const created = await this.adminService.updateAssessment({
          ...this.addAssessment.value,
          assessmentId: this.assessmentId
        }).toPromise();
        if (created['status'] == 200) {
          this.addAssessment.reset();
          this.router.navigateByUrl('/admin/assessment/all-assessments');
          this.snackBar.open('Successfully Updated', '', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'snackBar',
            duration: 3000
          });
        }
      } catch (error) {
        console.log(error);
      }
    }else {
      this.validateFormFields(this.addAssessment);
    }
    }

}
