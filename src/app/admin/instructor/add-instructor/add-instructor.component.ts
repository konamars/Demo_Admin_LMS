import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApexService } from '../../../services/apex.service';
import { AdminService } from '../../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-instructor',
  templateUrl: './add-instructor.component.html',
  styleUrls: ['./add-instructor.component.scss']
})
export class AddInstructorComponent implements OnInit {

  constructor(private fb: FormBuilder, private apexService: ApexService, private adminService: AdminService,
    private snackBar: MatSnackBar, private activatedRoute: ActivatedRoute, private router: Router) { }

  addInstructor: FormGroup = this.fb.group({
    username: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    password: [null, Validators.required]
  });
  isEdit: boolean;
  instructorId: string;

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      if (params && params['id']) {
        this.getInstructorDetails(params['id']);
        this.isEdit = true;
        this.instructorId = params['id'];
        this.addInstructor.removeControl('password');
      }
    })
  }

  async getInstructorDetails(id) {
    try {
      const instructor = await this.adminService.getInstructorById(id).toPromise();
      console.log(instructor);
      if (instructor['status'] == 200) {
        this.addInstructor.patchValue({ ...instructor['body'] });
      }
    } catch (error) {
      if (error && error['status'] == 404) {
        this.router.navigateByUrl('/admin/instructor/allInstructors');
      }
      console.log(error);
    }
  }

  async add() {
    if (this.addInstructor.valid) {
      this.apexService.showLoader(true);
      try {
        const instructor = await this.adminService.addInstructor(this.addInstructor.value).toPromise();
        if (instructor['status'] == 201) {
          this.addInstructor.reset();
          this.snackBar.open('Successfully created', '', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'snackBar',
            duration: 3000
          })
        }
      } catch (error) {
        console.log(error);
        if (error['status'] == 409) {
          this.addInstructor.controls.email.setErrors({ notValid: true });
        }
      } finally {
        this.apexService.showLoader(false);
      }
    }
  }

  async edit() {
    if (this.addInstructor.valid) {
      this.apexService.showLoader(true);
      try {
        const instructor = await this.adminService.updateInstructor({...this.addInstructor.value, instructorId: this.instructorId}).toPromise();
        if (instructor['status'] == 200) {
          this.addInstructor.reset();
          this.router.navigateByUrl('/admin/instructor/allInstructors');
          this.snackBar.open('Successfully Updated', '', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'snackBar',
            duration: 3000
          })
        }
      } catch (error) {
        console.log(error);
        if (error['status'] == 409) {
          this.addInstructor.controls.email.setErrors({ notValid: true });
        }
      } finally {
        this.apexService.showLoader(false);
      }
    }
  }
  disableWhiteSpace(event) {
    if (event.keyCode === 32) {
      return false;
    }
  }
}
