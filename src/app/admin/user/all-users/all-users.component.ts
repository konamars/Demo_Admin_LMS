import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AdminService } from '../../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApexService } from '../../../services/apex.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'phone', 'startedDate', 'action', 'activate'];
  users = [];
  dataSource = new MatTableDataSource();
  total = 0;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(private adminService: AdminService, private snackBar: MatSnackBar, private apexService: ApexService) { }

  ngOnInit() {
    this.allUsers();
  }

  async allUsers(page =1, size=5) {
    try {
      const users = await this.adminService.allUsers({page, size}).toPromise();
      if (users['status'] == 200) {
        this.users = users['body']['data'];
        this.total = users['body']['total'];
        this.dataSource.data = this.users;
      }
    } catch (error) {
      console.log(error);
    } finally {
      // this.apexService.showLoader(false);
    }
  }
  getData(event) {
    this.allUsers(event.pageIndex, event.pageSize);
  }

  async deleteUser(user) {
    try {
      const done = await this.adminService.deleteUser(user['_id']).toPromise();
      if(done['status'] == 200) {
        await this.allUsers();
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
  async edit(isActive, userId) {
    try {
      const user = await this.adminService.updateUser({isActive, userId}).toPromise();
      if (user['status'] == 200) {
        this.snackBar.open('Successfully Updated', '', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'snackBar',
          duration: 3000
        });
      }
    } catch (error) {
    } finally {
      this.apexService.showLoader(false);
    }
  }
}
