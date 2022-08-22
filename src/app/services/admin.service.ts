import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

class HttpReq {
  url: string;
  type: string;
  showLoader: any = false;
  body: any = {};
  contentType: any = 'application/json';
  isAcessTokenReq = false;
}
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  REST_TYPE_GET = 'get';
  REST_TYPE_POST = 'post';
  REST_TYPE_PUT = 'put';
  REST_TYPE_DELETE = 'delete';
  constructor(private httpService: HttpService) { }
  addInstructor(data) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_POST;
    httpReq.url = '/admin/addInstructor';
    httpReq.showLoader = true;
    httpReq.body = data;
    return this.httpService.restCall(httpReq);
  }
  updateInstructor(data) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_PUT;
    httpReq.url = '/admin/updateInstructor';
    httpReq.showLoader = true;
    httpReq.body = data;
    return this.httpService.restCall(httpReq);
  }
  deleteInstructor(id) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_DELETE;
    httpReq.url = `/admin/deleteInstructor/${id}`;
    httpReq.showLoader = true;
    httpReq.body = {};
    return this.httpService.restCall(httpReq);
  }
  deleteProgress(id) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_DELETE;
    httpReq.url = `/admin/deleteProgress/${id}`;
    httpReq.showLoader = true;
    httpReq.body = {};
    return this.httpService.restCall(httpReq);
  }
  allInstructors() {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_GET;
    httpReq.url = `/admin/allInstructors`;
    httpReq.showLoader = true;
    httpReq.body = {};
    return this.httpService.restCall(httpReq);
  }
  getInstructorById(id) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_GET;
    httpReq.url = `/admin/getInstructorById/${id}`;
    httpReq.showLoader = true;
    httpReq.body = {};
    return this.httpService.restCall(httpReq);
  }
  addCourse(data) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_POST;
    httpReq.url = '/admin/addCourse';
    httpReq.showLoader = true;
    httpReq.body = data;
    return this.httpService.restCall(httpReq);
  }
  allCourses() {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_GET;
    httpReq.url = `/admin/allCourses`;
    httpReq.showLoader = true;
    httpReq.body = {};
    return this.httpService.restCall(httpReq);
  }
  deleteCourse(id) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_DELETE;
    httpReq.url = `/admin/deleteCourse/${id}`;
    httpReq.showLoader = true;
    httpReq.body = {};
    return this.httpService.restCall(httpReq);
  }
  updateCourse(data) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_PUT;
    httpReq.url = '/admin/updateCourse';
    httpReq.showLoader = true;
    httpReq.body = data;
    return this.httpService.restCall(httpReq);
  }
  getCourseById(id) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_GET;
    httpReq.url = `/admin/getCourseById/${id}`;
    httpReq.showLoader = true;
    httpReq.body = {};
    return this.httpService.restCall(httpReq);
  }
  getBatchById(id) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_GET;
    httpReq.url = `/admin/getBatchById/${id}`;
    httpReq.showLoader = true;
    httpReq.body = {};
    return this.httpService.restCall(httpReq);
  }
  getBatchDetailById(data) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_POST;
    httpReq.url = `/admin/getBatchDetailById`;
    httpReq.showLoader = true;
    httpReq.body = data;
    return this.httpService.restCall(httpReq);
  }
  allCourseBatches(data) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_POST;
    httpReq.url = `/admin/allCourseBatches`;
    httpReq.showLoader = true;
    httpReq.body = data;
    return this.httpService.restCall(httpReq);
  }
  allCompletedBatches() {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_GET;
    httpReq.url = `/admin/CompletedCourseBatches`;
    httpReq.showLoader = true;
    httpReq.body = {};
    return this.httpService.restCall(httpReq);
  }
  updateLiveClassLink(data) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_PUT;
    httpReq.url = '/admin/updateLiveClassLink';
    httpReq.showLoader = true;
    httpReq.body = data;
    return this.httpService.restCall(httpReq);
  }
  getCourseBatchById(id) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_GET;
    httpReq.url = `/admin/getCourseBatchById/${id}`;
    httpReq.showLoader = true;
    httpReq.body = {};
    return this.httpService.restCall(httpReq);
  }
  updateBatchDetail(data) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_PUT;
    httpReq.url = '/admin/updateCourseBatchDetail';
    httpReq.showLoader = true;
    httpReq.body = data;
    return this.httpService.restCall(httpReq);
  }
  authenticate(data) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_POST;
    httpReq.url = '/admin/authenticate';
    httpReq.showLoader = true;
    httpReq.body = data;
    return this.httpService.restCall(httpReq, false);
  }
  suspendUser(data) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_POST;
    httpReq.url = '/admin/suspendUser';
    httpReq.showLoader = true;
    httpReq.body = data;
    return this.httpService.restCall(httpReq);
  }
  getStudentsBasedOnBatch(id) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_GET;
    httpReq.url = `/admin/getStudentsBasedOnBatch/${id}`;
    httpReq.showLoader = true;
    httpReq.body = {};
    return this.httpService.restCall(httpReq);
  }
  addUser(data) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_POST;
    httpReq.url = '/student/create';
    httpReq.showLoader = true;
    httpReq.body = data;
    return this.httpService.restCall(httpReq);
  }
  updateUser(data) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_PUT;
    httpReq.url = '/admin/updateUser';
    httpReq.showLoader = true;
    httpReq.body = data;
    return this.httpService.restCall(httpReq);
  }
  deleteUser(id) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_DELETE;
    httpReq.url = `/admin/deleteUser/${id}`;
    httpReq.showLoader = true;
    httpReq.body = {};
    return this.httpService.restCall(httpReq);
  }
  allUsers(data) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_POST;
    httpReq.url = `/admin/allUsers`;
    httpReq.showLoader = true;
    httpReq.body = data;
    return this.httpService.restCall(httpReq);
  }
  allRegisteredUsers() {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_GET;
    httpReq.url = `/admin/registeredUsers`;
    httpReq.showLoader = true;
    httpReq.body = {};
    return this.httpService.restCall(httpReq);
  }
  getUserById(id) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_GET;
    httpReq.url = `/admin/getUserById/${id}`;
    httpReq.showLoader = true;
    httpReq.body = {};
    return this.httpService.restCall(httpReq);
  }
  updateCourseBatch(data) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_PUT;
    httpReq.url = '/admin/updateCourseBatch';
    httpReq.showLoader = true;
    httpReq.body = data;
    return this.httpService.restCall(httpReq);
  }
  addProject(data) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_POST;
    const formData = new FormData();
    formData.append('batchId', data.batchId);
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('projectFile', data.projectFile);
    formData.append('projectId', data.id);
    httpReq.url = '/course/createProject';
    httpReq.showLoader = true;
    httpReq.body = formData;
    return this.httpService.restCall(httpReq);
  }
  addResource(data) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_POST;
    const formData = new FormData();
    formData.append('fileTitle', data.fileTitle);
    formData.append('fileLink', data.fileLink);
    formData.append('referenceLink', data.referenceLink);
    formData.append('referenceTitle', data.referenceTitle);
    formData.append('batchId', data.batchId);
    formData.append('moduleId', data.moduleId);
    formData.append('topicId', data.topicId);
    formData.append('isDelete', data.isDelete);
    formData.append('resourceId', data.resourceId);
    httpReq.url = '/course/createResource';
    httpReq.showLoader = true;
    httpReq.body = formData;
    return this.httpService.restCall(httpReq);
  }
  addUpdateDeleteAssignment(data) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_POST;
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('submitOn', data.submitOn);
    formData.append('instructions', data.instructions);
    formData.append('content', data.solution.content);
    formData.append('batchId', data.batchId);
    formData.append('topicId', data.topicId);
    formData.append('assignmentId', data.assignmentId);
    formData.append('instructorMailId', data.instructorMailId);
    formData.append('file', data.file);
    formData.append('isDelete', data.isDelete);
    httpReq.url = '/admin/createUpdateDeleteAssignment';
    httpReq.showLoader = true;
    httpReq.body = formData;
    return this.httpService.restCall(httpReq);
  }
  allAssessments() {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_GET;
    httpReq.url = `/admin/allAssessments`;
    httpReq.showLoader = true;
    httpReq.body = {};
    return this.httpService.restCall(httpReq);
  }
  addAssessment(data) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_POST;
    httpReq.url = '/admin/addAssessment';
    httpReq.showLoader = true;
    httpReq.body = data;
    return this.httpService.restCall(httpReq);
  }
  deleteAssessment(id) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_DELETE;
    httpReq.url = `/admin/deleteAssessment/${id}`;
    httpReq.showLoader = true;
    httpReq.body = {};
    return this.httpService.restCall(httpReq);
  }
  updateAssessment(data) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_PUT;
    httpReq.url = '/admin/updateAssessment';
    httpReq.showLoader = true;
    httpReq.body = data;
    return this.httpService.restCall(httpReq);
  }
  getAssessmentById(id) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_GET;
    httpReq.url = `/admin/getAssessmentById/${id}`;
    httpReq.showLoader = true;
    httpReq.body = {};
    return this.httpService.restCall(httpReq);
  }
  getFeedbacksByBatchId(batchId) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_GET;
    httpReq.url = `/admin/getFeedbacksByBatchId/${batchId}`;
    httpReq.showLoader = true;
    httpReq.body = {};
    return this.httpService.restCall(httpReq);
  }
  updateFeedbackFlag(data) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_PUT;
    httpReq.url = `/admin/updateFeedbackFlag`;
    httpReq.showLoader = true;
    httpReq.body = data;
    return this.httpService.restCall(httpReq);
  }
  addBatch(data) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_POST;
    httpReq.url = '/admin/addBatch';
    httpReq.showLoader = true;
    httpReq.body = data;
    return this.httpService.restCall(httpReq);
  }
  updateBatch(data) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_PUT;
    httpReq.url = '/admin/updateBatch';
    httpReq.showLoader = true;
    httpReq.body = data;
    return this.httpService.restCall(httpReq);
  }
  
}
