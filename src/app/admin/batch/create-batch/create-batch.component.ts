import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ApexService } from "src/app/services/apex.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AdminService } from "src/app/services/admin.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";

@Component({
  selector: "app-create-batch",
  templateUrl: "./create-batch.component.html",
  styleUrls: ["./create-batch.component.scss"],
})
export class CreateBatchComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private apexService: ApexService,
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  addBatch: FormGroup = this.fb.group({
    courseId: [null, Validators.required],
    instructorId: [null, Validators.required],
    startTime: [null, [Validators.required]],
    endTime: [null, [Validators.required]],
    endDate: [null, Validators.required],
    startedDate: [null, Validators.required],
    status: null
  });
  isEdit: boolean;
  batchId: string;
  displayedColumns: string[] = ["name", "email", 'suspend', "action"];
  courses = [];
  dataSource = new MatTableDataSource();
  students = [];
  student = this.fb.control(null, Validators.required);
  showStudent = false;
  studentsData = [];
  allStudents = [];
  studentDetail;
  instructors = [];
  courseId;
  statuses = ['Yet to start','Ongoing', 'On Hold', 'Completed'];
  currentDate: any = new Date();
  total=0;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // async allUsers() {
  //   try {
  //     const users = await this.adminService.allUsers().toPromise();
  //     if (users["status"] == 200) {
  //       this.allStudents = [...users["body"]];
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     // this.apexService.showLoader(false);
  //   }
  // }

  async getUsersBasedOnBatch(courseId = null) {
    try {
      const users = await this.adminService.getStudentsBasedOnBatch(courseId ? courseId :this.addBatch.controls.courseId.value).toPromise();
      if (users["status"] == 200) {
        this.student.reset();
        this.studentDetail = null;
        this.studentsData = users["body"];
      }
    } catch (error) {
      console.log(error);
    } finally {
      // this.apexService.showLoader(false);
    }
  }

  async allInstructors() {
    try {
      const instructors = await this.adminService.allInstructors().toPromise();
      if (instructors["status"] == 200) {
        this.instructors = [...instructors["body"]];
      }
    } catch (error) {
      console.log(error);
    } finally {
      // this.apexService.showLoader(false);
    }
  }

 async suspendUser(checked,user) {
  try {
    const updated = await this.adminService.suspendUser({ id: user['progressId'], isSuspended: checked }).toPromise();
  } catch (error) {
    console.log(error);
  } finally {
    // this.apexService.showLoader(false);
  }
  }

  optionSelected(e) {
    this.studentDetail = e.option.value;
    this.student.patchValue(
      `${this.studentDetail.firstname} ${this.studentDetail.lastname}`
    );
  }

  deleteStudent(a) {
    console.log(a);
    this.students = this.students.filter((b) => b["_id"] !== a["_id"]);
    this.dataSource.data = this.students;
    this.dataSource.paginator = this.paginator;
  }

  addStudent() {
    let isExist = false;
    this.students.forEach(student => {
      if (student.email && student.email === this.studentDetail.email) {
        isExist = true;
      }
    });
    if (this.studentDetail && !isExist) {
      this.students.unshift({ ...this.studentDetail, isNew: true });
      this.dataSource.data = this.students;
      this.dataSource.paginator = this.paginator;
      this.student.reset();
      this.studentDetail = null;
      this.showStudent = false;
    } else if (isExist) {
      this.snackBar.open('Student already added', '', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'snackBar',
        duration: 3000
      });
    } else {
      this.student.markAsTouched();
    }
  }
  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      if (params && params["id"]) {
        this.batchId = params["id"];
        this.init(params["id"]);
        this.isEdit = true;
        // this.addBatch.removeControl('courseId');
        this.addBatch.controls.courseId.disable();
        this.addBatch.removeControl("password");
      }else {
        this.init();
      }
    });
  }

  async init(id = null) {
    await this.allCourses();
    // await this.allUsers();
    await this.allInstructors();
    if(id) {
      await this.getBatchDetails(id);
    }
  }

  async getBatchDetails(id, page = 1, size=5) {
    try {
      this.students = [];
      const batch = await this.adminService.getBatchDetailById({id, page, size}).toPromise();
      if (batch["status"] == 200) {
        this.addBatch.patchValue({ ...batch["body"]['data'] });
        this.students = batch["body"]['data']["students"];
        
        this.courseId = batch['body']['data']['courseId'];
        this.dataSource.data = this.students;
        this.total = batch['body']['total'];
        // this.dataSource.paginator = this.paginator;
      }
    } catch (error) {
      if (error && error["status"] == 404) {
        this.router.navigateByUrl("/admin/course-batch/all-batches");
      }
      console.log(error);
    }
  }

  getData(event) {
    this.getBatchDetails(this.batchId, event.pageIndex, event.pageSize);
  }

  async deleteProgress(e) {
    if(e['isNew']) {
      this.students = this.students.filter(s => s['_id'] == e['_id']);
      this.dataSource.data = this.students;
      this.dataSource.paginator = this.paginator;
    }else {

      try {
        const done = await this.adminService.deleteProgress(e['progressId']).toPromise();
        if(done['status'] == 200) {
          await this.getBatchDetails(this.batchId);
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

  async allCourses() {
    try {
      const courses = await this.adminService.allCourses().toPromise();
      if (courses["status"] == 200) {
        this.courses = courses["body"];
      }
    } catch (error) {
      if (error && error["status"] == 404) {
        this.router.navigateByUrl("/admin/course-batch/all-batches");
      }
      console.log(error);
    }
  }

  async add() {
    if (this.addBatch.valid) {
      this.apexService.showLoader(true);
      try {
        const Batch = await this.adminService
          .addBatch({
            ...this.addBatch.value,
            courseId: this.addBatch.value["courseId"],
            courseName: this.courses.find(c => c['_id'] == this.addBatch.value["courseId"])["title"],
            students: this.students,
          })
          .toPromise();
        if (Batch["status"] == 201) {
          this.addBatch.reset();
          this.router.navigateByUrl("/admin/course-batch/all-batches");
          this.snackBar.open("Successfully created", "", {
            horizontalPosition: "center",
            verticalPosition: "top",
            panelClass: "snackBar",
            duration: 3000,
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.apexService.showLoader(false);
      }
    }
  }

  getStudents() {
    console.log('ee');
    if(!(this.studentsData && this.studentsData.length)){
      this.getUsersBasedOnBatch(this.courseId);
    }
  }

  async edit() {
    if (this.addBatch.valid) {
      this.apexService.showLoader(true);
      try {
        const batch = await this.adminService
          .updateBatchDetail({
            ...this.addBatch.value,
            courseId: this.courseId,
            batchId: this.batchId,
            students: this.students.filter((s) => s["isNew"]),
          })
          .toPromise();
        if (batch["status"] == 200) {
          this.addBatch.reset();
          this.router.navigateByUrl("/admin/course-batch/all-batches");
          this.snackBar.open("Successfully Updated", "", {
            horizontalPosition: "center",
            verticalPosition: "top",
            panelClass: "snackBar",
            duration: 3000,
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.apexService.showLoader(false);
      }
    }
  }
}
