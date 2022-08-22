import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  defaultImage: any = 'assets/images/user.png';
  routes: any[] = [
    {
      title: 'Users', icon: 'face', class: 'primary', children: [
        {
          title: 'Add User',
          path: '/admin/user/add-user'
        },
        {
          title: 'All Users',
          path: '/admin/user/all-users'
        },
        {
          title: 'Registered Users',
          path: '/admin/user/registered-users'
        }
      ]
    },
    {
      title: 'Instructors', icon: 'person', class: 'accent', children: [
        {
          title: 'Add Instructor',
          path: '/admin/instructor/add-instructor'
        },
        {
          title: 'All Instructors',
          path: '/admin/instructor/all-instructors'
        }
      ]
    },
    {
      title: 'Courses', icon: 'cast_for_education', class: 'secondary', children: [
        {
          title: 'Add Course',
          path: '/admin/course/add-course'
        },
        {
          title: 'All Courses',
          path: '/admin/course/all-courses'
        }
      ]
    },
    {
      title: 'Course Batches', icon: 'group', class: 'secondary', children: [
        {
          title: 'Add Batch',
          path: '/admin/course-batch/create-batch'
        },
        {
          title: 'All Batches',
          path: '/admin/course-batch/all-batches'
        },
        {
          title: 'Completed Batches',
          path: '/admin/course-batch/completed-batches'
        },
        
      ]
    },
    {
      title: 'Assessments', icon: 'cast_for_education', class: 'secondary', children: [
        {
          title: 'Add Assessment',
          path: '/admin/assessment/add-assessment'
        },
        {
          title: 'All Assessments',
          path: '/admin/assessment/all-assessments'
        }
      ]
    },
  ];

  constructor(private router: Router) { }

  ngOnInit() {
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
