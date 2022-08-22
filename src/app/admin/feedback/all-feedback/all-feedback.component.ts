import { Component, OnInit, ViewChild, Inject, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AdminService } from '../../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-all-feedback',
  templateUrl: './all-feedback.component.html',
  styleUrls: ['./all-feedback.component.scss']
})
export class AllFeedbackComponent implements OnInit {
  displayedColumns: string[] = ['studentName', 'email', 'phone', 'rating', 'review', 'createdAt'];
  feedbacks = [];
  dataSource = new MatTableDataSource();
  @Input() batchId: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  element: any = {
    isActive: true
  }
  courseBatch: any;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(private adminService: AdminService, private snackBar: MatSnackBar, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.getFeedbacksByBatchId();
    this.getCourseDetails();
  }
  async getCourseDetails() {
    try {
      const course = await this.adminService.getCourseBatchById(this.batchId).toPromise();
      if (course['status'] == 200) {
        this.courseBatch = course['body'];
      }
    } catch (error) {
      if (error && error['status'] == 404) {
        this.router.navigateByUrl('/admin/course/allCourses');
      }
      console.log(error);
    }
  }

  async getFeedbacksByBatchId() {
    try {
      const feedbacks = await this.adminService.getFeedbacksByBatchId(this.batchId).toPromise();
      if (feedbacks['status'] == 200) {
        this.feedbacks = feedbacks['body'].data;
        this.dataSource.data = this.feedbacks;
        this.dataSource.paginator = this.paginator;
      }
    } catch (error) {
      console.log(error);
    } finally {
      // this.apexService.showLoader(false);
    }
  }
  async updateFeedback(feedbackStatus) {
    try {
      let res = await this.adminService.updateFeedbackFlag({batchId: this.batchId, isFeedbackEnabled: feedbackStatus }).toPromise();
      if (res['status'] == 200) {
        this.snackBar.open('Successfully Updated', '', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'snackBar',
          duration: 3000
        });
        this.getCourseDetails();
      } else {
        this.snackBar.open('Failed in updating', '', {
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

}
