import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-all-assessment',
  templateUrl: './all-assessment.component.html',
  styleUrls: ['./all-assessment.component.scss']
})
export class AllAssessmentComponent implements OnInit {

  displayedColumns: string[] = ['name', 'createdDate', 'action'];
  assessments = [];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(private adminService: AdminService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.allAssessments();
  }

  async allAssessments() {
    try {
      const assessments = await this.adminService.allAssessments().toPromise();
      if (assessments['status'] == 200) {
        this.assessments = [...assessments['body']];
        this.dataSource.data = this.assessments;
        this.dataSource.paginator = this.paginator;
      }
    } catch (error) {
      console.log(error);
    } finally {
      // this.apexService.showLoader(false);
    }
  }

  async deleteAssessment(assessment) {
    try {
      const done = await this.adminService.deleteAssessment(assessment['_id']).toPromise();
      if (done['status'] == 200) {
        await this.allAssessments();
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