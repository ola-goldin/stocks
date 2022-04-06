import { Body, ClassSerializerInterceptor, Controller, Get, Post, Query, UseInterceptors } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { AppService } from './app.service';
import { ChartData } from './models/chart';
import { Realtime } from './models/realTime';
import { Security } from './models/security-model';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('securities')
  securities(@Query('securityKey') securityKey): Observable<Security[]> {
    return this.appService.getSecurities(securityKey);
  }

  @Get('chartData')
  chartData(@Query('securityKey') securityKey): ChartData[] {
    return this.appService.getChartData(securityKey);
  }

  @Get('realtime')
  realtime(@Query('securityKey') securityKey): Realtime {
    return this.appService.getRealTimeData(securityKey);
  }
}
