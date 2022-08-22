import { Component, ChangeDetectorRef } from '@angular/core';
import { ApexService } from './services/apex.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ad';
  showLoader: any = true;
  constructor(private apexService: ApexService,
    private cdRef: ChangeDetectorRef) {
    this.apexService.showLoader(false);
  }
  ngOnInit() {
    this.apexService.loaderEventValue.subscribe(data => {
      if (data !== this.showLoader) {
        this.showLoader = data;
      }
    });
    this.cdRef.detectChanges();
  }
  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }
}
