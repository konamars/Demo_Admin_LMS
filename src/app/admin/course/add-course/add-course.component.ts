import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { ApexService } from '../../../services/apex.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {

  addCourse: FormGroup = this.fb.group({
    basic: this.fb.group({
      title: [null, Validators.required],
      mainDescription: [null, Validators.required],
      imageURL: [null, Validators.required],
      features: this.fb.array([]),
      price: [null, Validators.required],
      duration: [null, Validators.required],
      prerequisties: [null, Validators.required],
      skillLevel: [null, Validators.required],
      // category: [null, Validators.required]
    }),
    curriculum: this.fb.array([]),
    faqs: this.fb.array([])
  });
  isEdit: boolean;
  courseId: string;
  step1: boolean = true;
  step2: boolean;
  step3: boolean;
  constructor(private fb: FormBuilder, private adminService: AdminService, private snackBar: MatSnackBar, private router: Router, private activatedRoute: ActivatedRoute, private apexService: ApexService) { }
  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      if (params && params['id']) {
        this.getCourseDetails(params['id']);
        this.isEdit = true;
        this.courseId = params['id'];
      }
    })
  }
  async getCourseDetails(id) {
    try {
      const course = await this.adminService.getCourseById(id).toPromise();
      if (course['status'] == 200) {
        course['body']['curriculum'].forEach((a, i) => {
          this.addTopic();
          a['topics'].forEach((t, ti) => {
            this.addSubTopic(i);
          });
        });
        course['body']['basic']['features'].forEach((a, i) => {
          this.addFeature();
          });
          course['body']['faqs'].forEach((a, i) => {
            this.addFaq();
            });
            this.addCourse.patchValue({ ...course['body'] });
      }
    } catch (error) {
      if (error && error['status'] == 404) {
        this.router.navigateByUrl('/admin/course/allCourses');
      }
      console.log(error);
    }
  }
  addFeature() {
    (<FormArray>(<FormGroup>this.addCourse.controls.basic).controls.features).push(this.fb.control(null, Validators.required));
  }
  removeFeature(i) {
    (<FormArray>(<FormGroup>this.addCourse.controls.basic).controls.features).removeAt(i);
  }
  addTopic() {
    (<FormArray>this.addCourse.controls.curriculum).push(this.fb.group({
      title: this.fb.control(null, Validators.required),
      topics: this.fb.array([])
    }));
  }
  removeTopic(i) {
    (<FormArray>this.addCourse.controls.curriculum).removeAt(i);
  }

  addSubTopic(i) {
    (<FormArray>(<FormGroup>(<FormArray>this.addCourse.controls.curriculum).at(i)).controls.topics).push(this.fb.group({
      title: [null, Validators.required]
    }));
  }
  removeSubTopic(i, e) {
    (<FormArray>(<FormGroup>(<FormArray>this.addCourse.controls.curriculum).at(i)).controls.topics).removeAt(e);
  }

  addFaq() {
    (<FormArray>this.addCourse.controls.faqs).push(this.fb.group({
      question: [null, Validators.required],
      answer: [null, Validators.required]
    }));
  }

  removeFaq(i) {
    (<FormArray>this.addCourse.controls.faqs).removeAt(i);
  }

  nextStep(formName, step) {
    if (this.addCourse.controls[formName].valid) {
      if (formName == 'faqs') {
      this.isEdit ? this.edit() : this.add();
      } else {
        this[`step${step}`] = false;
        this[`step${step + 1}`] = true;
      }
    } else {
      this.validateFormFields(this.addCourse.controls[formName]);
    }
  }

  async add() {
    try {
      const created = await this.adminService.addCourse({
        ...this.addCourse.value['basic'],
        ...this.addCourse.value,
        basic: null
      }).toPromise();
      if (created['status'] == 201) {
        this.addCourse.reset();
        this.step3 = false;
        this.step1 = true;
        this.snackBar.open('Successfully created', '', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'snackBar',
          duration: 3000
        });
      }
    } catch (error) {
      this.apexService.showLoader(false);
      if (error.status === 409) {
        this.snackBar.open('Course already exist', '', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'snackBar',
          duration: 3000
        })
      }
    }
  }

  async edit() {
    try {
      const created = await this.adminService.updateCourse({
        ...this.addCourse.value['basic'],
        ...this.addCourse.value,
        basic: null,
        courseId: this.courseId
      }).toPromise();
      if (created['status'] == 200) {
        this.addCourse.reset();
        this.step3 = false;
        this.step1 = true;
        this.router.navigateByUrl('/admin/course/allCourses');
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


}
