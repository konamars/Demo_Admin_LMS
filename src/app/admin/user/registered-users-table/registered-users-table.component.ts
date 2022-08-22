import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AdminService } from '../../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApexService } from '../../../services/apex.service';

@Component({
  selector: 'app-registered-users-table',
  templateUrl: './registered-users-table.component.html',
  styleUrls: ['./registered-users-table.component.scss']
})
export class RegisteredUsersTableComponent implements OnInit {
  displayedColumns: string[] = ['student', 'course', 'amount', 'date', 'allocated'];
  users = [];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(private adminService: AdminService, private snackBar: MatSnackBar, private apexService: ApexService) { }

  ngOnInit() {
    this.allUsers();
  }

  async allUsers() {
    try {
      const users = await this.adminService.allRegisteredUsers().toPromise();
      if (users['status'] == 200) {
        this.users = [...users['body']];
        this.dataSource.data = this.users;
        this.dataSource.paginator = this.paginator;
      }
    } catch (error) {
      console.log(error);
    } finally {
      // this.apexService.showLoader(false);
    }
  }
}
