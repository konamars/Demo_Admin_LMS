import { Component, OnInit, ViewChild } from '@angular/core';
import { ApexService } from '../../../services/apex.service';
import { AdminService } from '../../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-all-instructors',
  templateUrl: './all-instructors.component.html',
  styleUrls: ['./all-instructors.component.scss']
})
export class AllInstructorsComponent implements OnInit {

  constructor(private apexService: ApexService, private adminService: AdminService, private snackBar: MatSnackBar) { }
  instructors = [];
  displayedColumns: string[] = ['username', 'email', 'action'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit() {
    this.allInstructors();
  }
  async allInstructors() {
    try {
      const instructors = await this.adminService.allInstructors().toPromise();
      if (instructors['status'] == 200) {
        this.instructors = [...instructors['body']];
        this.dataSource.data = this.instructors;
        this.dataSource.paginator = this.paginator;
      }
    } catch (error) {
      console.log(error);
    } finally {
      // this.apexService.showLoader(false);
    }
  }

  async deleteInstructor(instructor) {
    try {
      const done = await this.adminService.deleteInstructor(instructor['_id']).toPromise();
      if(done['status'] == 200) {
        await this.allInstructors();
        this.snackBar.open('Successfully deleted','', {
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
