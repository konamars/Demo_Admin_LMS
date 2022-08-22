import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
import { ApexService } from '../services/apex.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private adminService: AdminService, private router: Router, private apexservice: ApexService) { }
  login: FormGroup = this.fb.group({
    username: [null, Validators.required],
    password: [null, Validators.required]
  });

  ngOnInit() {
  }

  async authenticate() {
    if(this.login.valid) {
      try {
        let res = await this.adminService.authenticate(this.login.value).toPromise();
        if(res['status'] == 200) {
          localStorage.setItem('token', res['body']['token']);
          this.router.navigate(['/admin/user/all-users']);
        }
      } catch (error) {
        console.log(error);
        if (error.status === 409) {
          if (error.error.username) {
            this.login.controls.username.setErrors({ notMatched: true });
          }
          if (error.error.password) {
            this.login.controls.password.setErrors({ notMatched: true });
          }
        }
        this.apexservice.showLoader(false);
      }
    }
  }

}
