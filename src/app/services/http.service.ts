import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApexService } from '../services/apex.service';
import { Router } from '@angular/router';
@Injectable()
export class HttpService {

  headers: HttpHeaders;
  private CONTENT_APPLICATION_URLENCODED: any = 'application/x-www-form-urlencoded';
  private CONTENT_APPLICATION_JSON: any = 'application/json';
  API_ENDPOINT: string = environment.apiUrl;
  constructor(private http: HttpClient, private apexService: ApexService, private router: Router) {
    this.http = http;
  }
  showLoader(show: boolean) {
    this.apexService.showLoader(show);
  }
  restCall(httpReq, isTokenReq = true) {
    if (httpReq.showLoader && httpReq.showLoader === true) {
      this.showLoader(true);
    }
    return this.restService(httpReq, isTokenReq);
  }

  restService(httpReq, isTokenReq) {
    return this.requestMethod(httpReq, isTokenReq);

  }
  requestMethod(httpReq, isTokenReq: boolean): Observable<HttpResponse<any> | HttpErrorResponse> {
    let header;
    if (isTokenReq) {
      if (localStorage.getItem('token')) {
        header = {
          Authorization: localStorage.getItem('token'),
        };
      } 
      // else {
      //   this.router.navigate(['/auth']);
      // }
    }
    const url = environment.apiUrl + httpReq.url;
    if (httpReq.type === 'get' || httpReq.type == 'delete') {
      return this.http[httpReq.type](url, {observe:'response', headers: {...header}}).pipe(
        map(
          (resp: any) => {
            if (httpReq.showLoader && httpReq.showLoader === true) {
              this.showLoader(false);
            }
            return resp;
          },
          (error: HttpErrorResponse) => {
            if (httpReq.showLoader && httpReq.showLoader === true) {
              this.showLoader(false);
            }
            if (error.status == 401) {
              localStorage.clear();
              this.router.navigate(['/login']);
            }
            return error;
          }
        )
      );
    }else {
      return this.http[httpReq.type](url, httpReq.body, {observe:'response',headers:{...header}}).pipe(
        map(
          (resp: any) => {
            if (httpReq.showLoader && httpReq.showLoader === true) {
              this.showLoader(false);
            }
            return resp;
          },
          (error: HttpErrorResponse) => {
            if (httpReq.showLoader && httpReq.showLoader === true) {
              this.showLoader(false);
            }
            this.apexService.showLoader(false);
            if (error.status == 401) {
              localStorage.clear();
              this.router.navigate(['/login']);
            }
            return error;
          }
        )
      );
    }
  }
}
