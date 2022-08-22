import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {ApexService} from '../../../services/apex.service';

@Component({
  selector: 'app-batch-detail',
  templateUrl: './batch-detail.component.html',
  styleUrls: ['./batch-detail.component.scss']
})
export class BatchDetailComponent implements OnInit {

  course;
  curriculumModule;
  topic;
  batchId;
  topics = [];
  assessments =[];
  selectedAssessment;
  assessmentTopic;
  projectFile;
  resources;
  module;
  assignments;
  constructor(private activatedRoute: ActivatedRoute, private adminService: AdminService, private router: Router,
  private snackBar: MatSnackBar, private apexService: ApexService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      if (params && params['id']) {
        this.getCourseDetails(params['id']);
        this.batchId = params['id'];
        this.getAssessments();
      }
    });
  }
  getBatch(data) {
    this.getCourseDetails(this.batchId);
  }

  async getCourseDetails(id) {
    try {
      const course = await this.adminService.getCourseBatchById(id).toPromise();
      if (course['status'] == 200) {
        course['body']['upcomingClassDate'] = course['body']['upcomingClassDate'] ? this.formatdate(new Date(course['body']['upcomingClassDate'])) : '';
        this.course = course['body'];
      }
    } catch (error) {
      if (error && error['status'] == 404) {
        this.router.navigateByUrl('/admin/course/allCourses');
      }
      console.log(error);
    }
  }
  formatdate(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    var date = date.getDate();
    date = date < 10 ? '0' + date : date;
    hours = hours < 10  ? '0' + hours : hours;
    minutes = minutes > 60  ? '0' + minutes : minutes;
    const strTime = year + '-' + month + '-' + date + 'T' + hours + ':' + minutes;
    return strTime;
  }

  async getAssessments() {
    try {
      const assessments = await this.adminService.allAssessments().toPromise();
      if (assessments['status'] == 200) {
        this.assessments = assessments['body'];
      }
    } catch (error) {
      console.log(error);
    }
  }

  addResource() {
    if (this.module && this.topic) {
      this.course['curriculum'].forEach(m => {
        m.topics.forEach(t => {
          if (t._id === this.topic._id) {
            t['resources'].push({
              fileTitle: null,
              fileLink: null,
              referenceTitle: null,
              referenceLink: null,
              isEdit: true
            });
          }
        });
      });
    }
  }

  addAssignment() {
    if (this.module && this.topic) {
      this.course['curriculum'].forEach(m => {
        m.topics.forEach(t => {
          if (t._id === this.topic._id) {
            t['assignments'].push({
              title: null,
              submitOn: null,
              instructions: null,
              instructorMailId: null,
              solution: {
                fileLink: null,
                content: null,
              },
              isEdit: true
            });
          }
        });
      });
    }
  }

  addProject() {
    this.course['projects'].push({
      title: null,
      description: null,
      projectFile: null,
      isEdit: true
    });
  }

  deleteResource(r, i) {
    this.course['curriculum'].forEach(m => {
      m.topics.forEach(t => {
        if (t._id === this.topic._id) {
          t['resources'].push({
            fileTitle: null,
            fileLink: null,
            referenceTitle: null,
            referenceLink: null,
            isEdit: true
          });
        }
      });
    });
    this.course['resources'].splice(i, 1);
  }

  deleteAssignment(r, i) {
    this.course['curriculum'].forEach(m => {
      m.topics.forEach(t => {
        if (t._id === this.topic._id) {
          t['assignments'].push({
            title: null,
            submitOn: null,
            instructions: null,
            instructorMailId: null,
            solution: {
              fileLink: null,
              content: null,
            },
            isEdit: true
          });
        }
      });
    });
    this.course['assignments'].splice(i, 1);
  }

  deleteProject(r, i) {
    this.course['projects'].splice(i, 1);
    this.updateCourse();
  }

  changeCurriculumModule(e) {
    if (this.curriculumModule && e) {
      this.topic = null;
      this.module = {
        ...e['value']
      };
      this.topics = this.curriculumModule['topics'];
    }
  }

  changeTopic(e) {
    if (e) {
      this.topic = {
        ...e['value']
      };
      this.resources = e['value']['resources'];
      this.resources.forEach(r => {
        r.isEdit = false;
      });
      this.assignments = e['value']['assignments'];
      this.assignments.forEach(r => {
        r.isEdit = false;
      });
      this.assessments.forEach(a => {
        a.isEdit = false;
      });
    }
  }
  changeAssessment(e) {
    if(e) {
      this.selectedAssessment = [];
      if(e['value'] && e['value']['assessmentId']) {
        this.selectedAssessment = this.assessments.find((c) =>  c['_id'] == e['value']['assessmentId']);
      }
      this.assessmentTopic = {
        ...e['value'],
      };
    }
  }
  addAssessment() {
    if(this.selectedAssessment) {
      this.course['curriculum'][this.course['curriculum'].findIndex(c => c['_id'] == this.curriculumModule['_id'])]['topics'][this.curriculumModule['topics'].findIndex(t => t['_id'] == this.assessmentTopic['_id'])] = {
        ...this.assessmentTopic,
        assessmentId: this.selectedAssessment['_id'],
        assessmentName: this.selectedAssessment['name']
      };
      this.selectedAssessment = null;
      this.assessmentTopic = null;
      this.curriculumModule = null;
      this.topics = null;
    }
    this.updateCourse();
  }
  deleteAssessment(assessment) {
    this.course.curriculum.forEach(module => {
      module.topics.forEach(topic => {
        if (topic.assessmentId === assessment._id) {
          delete topic.assessmentId;
          delete topic.assessmentName;
        }
      });
    });
    this.selectedAssessment = null;
    this.assessmentTopic = null;
    this.curriculumModule = null;
    this.topics = null;
    this.updateCourse();
  }
  addRecorded(topic) {
    this.course['curriculum'][this.course['curriculum'].findIndex(c => c['_id'] == this.curriculumModule['_id'])]['topics'][this.curriculumModule['topics'].findIndex(t => t['_id'] == this.topic['_id'])] = {
      ...this.topic,
      isEdit: null
    };
    topic.isEdit = false;
    this.topic = null;
    this.curriculumModule = null;
    this.topics = [];
    this.updateCourse();
  }

  async updateCourse() {
    if(this.course) {
      let request = {
        ...this.course,
        ...this.course['upcomingClassDate'] = this.course['upcomingClassDate'] ? new Date(this.course['upcomingClassDate']) : null,
        ...this.course['resources'] && { resources: this.course['resources'].map((a) => ({...a, isEdit: null})) },
        ...this.course['assignments'] && { assignments: this.course['assignments'].map((a) => ({...a, isEdit: null})) },
        ...this.course['projects'] && { projects: this.course['projects'].map((a) => ({...a, isEdit: null})) },
      isEdit: null
      }
      try {
        let res = await this.adminService.updateCourseBatch({ ...request, batchId: this.batchId }).toPromise();
        if(res['status'] == 200) {
          this.getCourseDetails(this.batchId);
          // this.router.navigateByUrl('/admin/course-batch/all-batches');
          this.snackBar.open('Successfully Updated', '', {
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
  async saveProject(project) {
    try {
      let res = await this.adminService.addProject({ ...project, projectFile: (this.projectFile || project['projectLink']), batchId: this.batchId }).toPromise();
      if(res['status'] == 200) {
        this.ngOnInit();
        this.projectFile = null,
        this.curriculumModule = null;
        this.topic = null;
        this.topics = [];
        this.snackBar.open('Successfully Updated', '', {
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
  async saveResource(resource, isDelete = false) {
    try {
      const req = { ...resource, fileLink: (this.projectFile || resource.fileLink), batchId: this.batchId, topicId: this.topic._id, moduleId: this.module._id, isDelete };
      if (resource && resource._id) { req.resourceId = resource._id; }
      let res = await this.adminService.addResource(req).toPromise();
      if(res['status'] == 200 && res['body']['status'] === 1) {
        resource.isEdit = false;
        await this.ngOnInit();
        this.course['curriculum'].forEach(m => {
          m.topics.forEach(t => {
            if (t._id === this.topic._id) {
              this.resources = res['body']['data'];
            }
          });
        });
        this.projectFile = null,
        this.curriculumModule = null;
        this.topic = null;
        this.topics = [];
        this.snackBar.open('Successfully Updated', '', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'snackBar',
          duration: 3000
        });
      } else {
        this.snackBar.open(res['body']['data']['error'], '', {
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
  async saveAssignment(assignment, isDelete = false) {
    try {
      const missingParamsRes =
        this.apexService.checkMandatoryFields(assignment, ['title', 'submitOn', 'instructions', 'instructorMailId']);
      if (missingParamsRes === true) {
        if (assignment.instructorMailId.match('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')) {
          const req = {
            ...assignment,
            submitOn: assignment.submitOn ? new Date(assignment.submitOn) : null,
            file: this.projectFile || assignment['solution']['fileLink'],
            batchId: this.batchId, topicId: this.topic.id, isDelete
          };
          if (assignment && assignment.id) { req.assignmentId = assignment.id; }
          let res = await this.adminService.addUpdateDeleteAssignment(req).toPromise();
          if(res['status'] == 200 && res['body']['status'] === 1) {
            assignment.isEdit = false;
            await this.ngOnInit();
            this.course['curriculum'].forEach(m => {
              m.topics.forEach(t => {
                if (t.id === this.topic.id) {
                  this.assignments = res['body']['data'];
                }
              });
            });
            this.projectFile = null,
            this.curriculumModule = null;
            this.topic = null;
            this.topics = [];
            this.snackBar.open('Successfully Updated', '', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'snackBar',
              duration: 3000
            });
          } else {
            this.snackBar.open(res['body']['data']['error'], '', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'snackBar',
              duration: 3000
            });
          }
        } else {
          this.snackBar.open('Please fill valid email', '', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'snackBar',
            duration: 3000
          });
        }
      } else {
        this.snackBar.open(missingParamsRes, '', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'snackBar',
          duration: 3000
        });
      }
    } catch (error) {
      console.log(error);
      this.snackBar.open('Failed in updating', '', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'snackBar',
        duration: 3000
      });
    }
  }
  getSelected(event) {
    if (event.target.files && event.target.files[0]) {
      this.projectFile = event.target.files[0];
    }
  }
}
