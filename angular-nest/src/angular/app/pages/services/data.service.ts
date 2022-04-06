import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Realtime, Security } from '../../dto/security-dto';
import { environment } from './../../../environments/environment';
import { ChartData } from 'src/nest/models/chart';

@Injectable({
  providedIn: 'root'
})

export class DataService {
 
  constructor(private http: HttpClient) { }

  getSecurities(searchKey: String) {
    return this.http.get<Security[]>(`${environment.api}/securities?securityKey=${searchKey}`);
  }

  getChartData(securityKey: String) {
    return this.http.get<ChartData[]>(`${environment.api}/chartData?securityKey=${securityKey}`);
  }

  getRealTimeData(securityKey: String) {
    return this.http.get<Realtime>(`${environment.api}/realtime?securityKey=${securityKey}`);
  }
}
