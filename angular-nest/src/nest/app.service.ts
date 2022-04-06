import { Injectable } from '@nestjs/common';
import { Security } from './models/security-model';
import * as SECURITIES from './data/securities.json'
import * as CHART from './data/chartData.json'
import { map, Observable, of } from 'rxjs';
import { ChartData } from './models/chart';
import { Realtime } from './models/realTime';
@Injectable()
export class AppService {

  getSecurities(key: string): Observable<Security[]> {
    return this.getFilteredOptions(key);
  }

  getChartData(key: string): ChartData[] {
    return JSON.parse(JSON.stringify(CHART));
  }

  getRealTimeData(key: string): Realtime {
    return { lastPrice: Math.floor(Math.random() * (1000 + 1)), hight: Math.floor(Math.random() * (1000 + 1)), low: Math.floor(Math.random() * (100 + 1)), }
  }


  private filter(value: string): Security[] {
    const filterValue = value.toString().toLowerCase();

    return JSON.parse(JSON.stringify(SECURITIES)).filter(optionValue => optionValue.desc.toLowerCase().includes(filterValue)
      || optionValue.symbol.toLowerCase().includes(filterValue)
      || optionValue.key.toString().toLowerCase().includes(filterValue));
  }

  private getFilteredOptions(value: string): Observable<Security[]> {
    return of(value).pipe(
      map(filterString => this.filter(filterString)),
    );
  }
}
