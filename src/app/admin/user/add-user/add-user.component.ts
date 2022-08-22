import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApexService } from '../../../services/apex.service';
import { AdminService } from '../../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  constructor(private fb: FormBuilder, private apexService: ApexService, private adminService: AdminService,
    private snackBar: MatSnackBar, private activatedRoute: ActivatedRoute, private router: Router) { }

  addUser: FormGroup = this.fb.group({
    firstname: [null, Validators.required],
    lastname: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    phone: [null, [Validators.required, Validators.minLength(10)]],
    password: [null, [Validators.required, Validators.minLength(8)]],
  });
  isEdit: boolean;
  userId: string;

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      if (params && params['id']) {
        this.getUserDetails(params['id']);
        this.isEdit = true;
        this.userId = params['id'];
        this.addUser.removeControl('password');
        this.addUser.controls.email.disable();
      }
    });
  }

  async getUserDetails(id) {
    try {
      const user = await this.adminService.getUserById(id).toPromise();
      if (user['status'] == 200) {
        this.addUser.patchValue({ ...user['body']['user'] });
      }
    } catch (error) {
      if (error && error['status'] == 404) {
        this.router.navigateByUrl('/admin/user/all-users');
      }
    }
  }

  async add() {
    if (this.addUser.valid) {
      this.apexService.showLoader(true);
      try {
        const instructor = await this.adminService.addUser(this.addUser.value).toPromise();
        if (instructor['status'] == 201) {
          this.snackBar.open('Successfully created', '', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'snackBar',
            duration: 3000
          });
          this.addUser.reset();
          this.router.navigateByUrl('/admin/user/all-users');
        }
      } catch (error) {
        if (error['status'] == 409) {
          this.addUser.controls.email.setErrors({ notValid: true });
        }
        if (error.error.phone) {
          this.addUser.controls.phone.setErrors({ phoneExists: true });
        }
      } finally {
        this.apexService.showLoader(false);
      }
    }
  }

  async edit() {
    if (this.addUser.valid) {
      this.apexService.showLoader(true);
      try {
        const user = await this.adminService.updateUser({...this.addUser.value, userId: this.userId}).toPromise();
        if (user['status'] == 200) {
          this.addUser.reset();
          this.router.navigateByUrl('/admin/user/all-users');
          this.snackBar.open('Successfully Updated', '', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'snackBar',
            duration: 3000
          });
        }
      } catch (error) {
        console.log(error);
        if (error['status'] == 409) {
          this.addUser.controls.email.setErrors({ notValid: true });
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
  trim(fieldName) {
    return this.addUser.controls[fieldName].setValue(this.addUser.value[fieldName].trim());
  }
}
