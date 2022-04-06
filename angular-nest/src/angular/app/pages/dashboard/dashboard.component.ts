
import { Component, ViewChild, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { forkJoin, interval, Observable, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Security, StockDataDTO } from '../../dto/security-dto';
import { DataService } from './../services/data.service';
import { environment } from './../../../environments/environment';


@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DataService]
})

export class DashboardComponent implements OnInit {
  constructor(private dataService: DataService,
    private sanitizer: DomSanitizer) {
  }


  stockData: StockDataDTO = { chart: [], realTime: null, stock: null };
  iFrameUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(environment.iFramePath);
  displayIframe: boolean = false;
  filteredOptions$: Observable<Security[]>;
  intervalSub$: Subscription;

  @ViewChild('autoInput') input;

  ngOnInit() {
    this.filteredOptions$ = of([]);
  }


  onChange() {
    if (this.input.nativeElement.value.length >= 2) {
      this.filteredOptions$ = this.dataService.getSecurities(this.input.nativeElement.value);
      setTimeout(() => {
        this.input.nativeElement.dispatchEvent(new Event('click'));
      }, 0);
    }
  }

  onSelectionChange($event) {
    if(this.intervalSub$)
    this.intervalSub$.unsubscribe();

    this.intervalSub$= interval(2000).subscribe((x =>{
      forkJoin({
        chart: this.dataService.getChartData($event.key),
        realTime: this.dataService.getRealTimeData($event.key)
      }).subscribe(sd => {
        this.stockData.chart = sd.chart;
        this.stockData.realTime = sd.realTime;
        this.stockData.stock = $event;
        this.sendMessage(this.stockData);
      })
    }));

    this.displayIframe = true;
    this.input.nativeElement.value = $event.desc;
  }

  sendMessage(message: StockDataDTO) {
    const iFrame = (document.getElementById('stockData') as HTMLIFrameElement);
    iFrame.contentWindow.postMessage(message, environment.iFramePath);
  }

}
