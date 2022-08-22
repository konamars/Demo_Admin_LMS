import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ApexService {

  sessionUserEvent: EventEmitter<any> = new EventEmitter();
  private loaderEvent = new BehaviorSubject<boolean>(false);
  loaderEventValue = this.loaderEvent.asObservable();
  constructor() {

  }
  showLoader(show: boolean) {
    this.loaderEvent.next(show);
  }
  checkMandatoryFields(request, requiredParams) {
    const missingParams = requiredParams.filter((param: any) => !(!!request[param] && !!request[param].trim()));
    if (missingParams.length) {
        return `Please fill ${missingParams.join(', ')}`;
    } else {
        return true;
    }
  }
}