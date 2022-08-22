import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AdminService } from 'src/app/services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-completed-batches',
  templateUrl: './completed-batches.component.html',
  styleUrls: ['./completed-batches.component.scss']
})
export class CompletedBatchesComponent implements OnInit {

  displayedColumns: string[] = ['title','createdDate', 'startedDate', 'studentsCount', 'timing', 'endDate', 'action'];
  courses = [];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(private adminService: AdminService, private snackBar: MatSnackBar, private fb: FormBuilder) { }

  ngOnInit() {
    this.allCourses();
  }

  async allCourses() {
    try {
      const courses = await this.adminService.allCompletedBatches().toPromise();
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
}

