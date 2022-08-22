import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-batch',
  templateUrl: './add-batch.component.html',
  styleUrls: ['./add-batch.component.scss']
})
export class AddBatchComponent implements OnInit {

  addCourse: FormGroup = this.fb.group({
    // basic: this.fb.group({
    //   title: [null, Validators.required],
    //   mainDescription: [null, Validators.required],
    //   imageURL: [null, Validators.required],
    //   features: this.fb.array([]),
    //   price: [null, Validators.required],
    //   // category: [null, Validators.required]
    // }),
    curriculum: this.fb.array([]),
    // faqs: this.fb.array([])
  });
  isEdit: boolean;
  courseId: string;
  batchId: string;
  step1: boolean = true;
  step2: boolean;
  step3: boolean;
  courseBatchData: any;
  @Output() triggerBatch: EventEmitter<any> = new EventEmitter();
  constructor(private fb: FormBuilder, private adminService: AdminService, private snackBar: MatSnackBar,
              private router: Router, private activatedRoute: ActivatedRoute) { }
  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      if (params && params['id']) {
        this.getBatchDetails(params['id']);
        this.isEdit = true;
        this.batchId = params['id'];
      }
    });
  }
  async getBatchDetails(id) {
    try {
      const course = await this.adminService.getBatchById(id).toPromise();
      if (course['status'] == 200) {
        this.courseBatchData = course['body'];
        course['body']['curriculum'].forEach((a, i) => {
          this.addTopicOnLoad();
          a['topics'].forEach((t, ti) => {
            this.addSubTopicOnLoad(i);
          });
        });
        // course['body']['basic']['features'].forEach((a, i) => {
        //   this.addFeature();
        // });
        // course['body']['faqs'].forEach((a, i) => {
        //   this.addFaq();
        // });
        this.addCourse.patchValue({ ...course['body'] });
      }
    } catch (error) {
      if (error && error['status'] == 404) {
        this.router.navigateByUrl('/admin/course/allCourses');
      }
      console.log(error);
    }
  }
  // addFeature() {
  //   (<FormArray>(<FormGroup>this.addCourse.controls.basic).controls.features).push(this.fb.control(null, Validators.required));
  // }
  // removeFeature(i) {
  //   (<FormArray>(<FormGroup>this.addCourse.controls.basic).controls.features).removeAt(i);
  // }
  addTopicOnLoad() {
    (<FormArray>this.addCourse.controls.curriculum).push(this.fb.group({
      title: this.fb.control(null, Validators.required),
      topics: this.fb.array([])
    }));
  }
  addSubTopicOnLoad(i) {
    (<FormArray>(<FormGroup>(<FormArray>this.addCourse.controls.curriculum).at(i)).controls.topics).push(this.fb.group({
      title: [null, Validators.required]
    }));
  }
  addTopic() {
    (<FormArray>this.addCourse.controls.curriculum).push(this.fb.group({
      title: this.fb.control(null, Validators.required),
      topics: this.fb.array([])
    }));
    this.courseBatchData.curriculum.push({
      title: '',
      topics: []
    });
  }
  removeTopic(i) {
    (<FormArray>this.addCourse.controls.curriculum).removeAt(i);
    this.courseBatchData.curriculum.splice(i, 1);
  }

  addSubTopic(i) {
    let a = false;
    this.courseBatchData.curriculum[i].topics.forEach(subTopic => {
      if (subTopic.title.toLowerCase().includes('assessment')) {
        a = true;
      }
    });
    if (!a) {
      (<FormArray>(<FormGroup>(<FormArray>this.addCourse.controls.curriculum).at(i)).controls.topics).push(this.fb.group({
        title: [null, Validators.required]
      }));
      this.courseBatchData.curriculum[i].topics.push({
        title: ''
      });
    } else {
        this.snackBar.open('Adding Sub topic after asssessment is not allowed', '', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'snackBar',
          duration: 3000
        });
    }
  }
  removeSubTopic(i, e) {
    (<FormArray>(<FormGroup>(<FormArray>this.addCourse.controls.curriculum).at(i)).controls.topics).removeAt(e);
    this.courseBatchData.curriculum[i].topics.splice(e, 1);
  }
  addAssessment(i) {
    (<FormArray>(<FormGroup>(<FormArray>this.addCourse.controls.curriculum).at(i)).controls.topics).push(this.fb.group({
      title: ['Assessment', Validators.required]
    }));
    this.courseBatchData.curriculum[i].topics.push({
      title: 'Assessment'
    });
  }

  // addFaq() {
  //   (<FormArray>this.addCourse.controls.faqs).push(this.fb.group({
  //     question: [null, Validators.required],
  //     answer: [null, Validators.required]
  //   }));
  // }

  // removeFaq(i) {
  //   (<FormArray>this.addCourse.controls.faqs).removeAt(i);
  // }

  // nextStep(formName, step) {
  //   if (this.addCourse.controls[formName].valid) {
  //     if (formName == 'faqs') {
  //     this.isEdit ? this.edit() : this.add();
  //     } else {
  //       this[`step${step}`] = false;
  //       this[`step${step + 1}`] = true;
  //     }
  //   } else {
  //     this.validateFormFields(this.addCourse.controls[formName]);
  //   }
  // }
  getTopicErrorStatus(index) {
    return this.addCourse.controls.curriculum['controls'][index].controls['title'];
  }
  getSubTopicErrorStatus(topicIndex, SubTopicIndex) {
    return this.addCourse.controls.curriculum['controls'][topicIndex].controls['topics']['controls'][SubTopicIndex].controls['title'];
  }
  async add() {
    try {
      this.courseBatchData.curriculum.forEach((module, i) => {
          this.addCourse.value.curriculum.forEach((modulex, k) => {
            if (i === k) {
              module.title = modulex.title;
            }
            module.topics.forEach((topic, j) => {
              modulex.topics.forEach((topicx, l) => {
                if (i === k && j === l) {
                  topic.title = topicx.title;
                }
              });
          });
        });
      });
      const created = await this.adminService.updateCourseBatch({
        curriculum: this.courseBatchData.curriculum,
        ...this.courseBatchData.basic,
        batchId: this.batchId
      }).toPromise();
      if (created['status'] == 200) {
        this.snackBar.open('Successfully updated', '', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'snackBar',
          duration: 3000
        });
        this.triggerBatch.emit('trigger');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async edit() {
    try {
      // const created = await this.adminService.updateCourse({
      //   ...this.addCourse.value['basic'],
      //   ...this.addCourse.value,
      //   basic: null,
      //   courseId: this.courseId
      // }).toPromise();
      // if (created['status'] == 200) {
      //   this.addCourse.reset();
      //   this.step3 = false;
      //   this.step1 = true;
      //   this.router.navigateByUrl('/admin/course/allCourses');
      //   this.snackBar.open('Successfully Updated', '', {
      //     horizontalPosition: 'center',
      //     verticalPosition: 'top',
      //     panelClass: 'snackBar',
      //     duration: 3000
      //   });
      // }
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
    });
  }

}
