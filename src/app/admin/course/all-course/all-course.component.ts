import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../../../services/admin.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-all-course',
  templateUrl: './all-course.component.html',
  styleUrls: ['./all-course.component.scss']
})
export class AllCourseComponent implements OnInit {

  displayedColumns: string[] = ['title', 'price', 'action'];
  courses = [];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource.filter);
  }
  constructor(private adminService: AdminService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.allCourses();
  }

  async allCourses() {
    try {
      const courses = await this.adminService.allCourses().toPromise();
      if (courses['status'] == 200) {
        this.courses = [...courses['body']];
        this.dataSource.data = this.courses;
        this.dataSource.paginator = this.paginator;
      }
    } catch (error) {
      console.log(error);
    } finally {
      // this.apexService.showLoader(false);
    }
  }

  async deleteCourse(course) {
    try {
      const done = await this.adminService.deleteCourse(course['_id']).toPromise();
      if (done['status'] == 200) {
        await this.allCourses();
        this.snackBar.open('Successfully deleted', '', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'snackBar',
          duration: 3000
        })
      };
    } catch (error) {
      console.log(error);
    }
  }

}
