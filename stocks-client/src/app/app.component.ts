import { Component, OnInit } from '@angular/core';
import { StockDataDTO } from 'src/app/dto';
import * as Highcharts from 'highcharts';
import HC_dilldown from 'highcharts/modules/drilldown';
import { BehaviorSubject } from 'rxjs';
HC_dilldown(Highcharts);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor: string = 'chart';
  updateFlag: boolean = false;
  haveOpener: boolean;
  data: StockDataDTO = { chart: [] };
  chartQuote = new BehaviorSubject<[x: number, y: number][]>([]);

  constructor() {
    this.haveOpener = window.opener ? true : false;
    window.addEventListener('message', (e) => {
      //console.log(e.data);
      this.data = e.data;
      if (e?.data?.chart)
        this.chartQuote.next(e.data.chart.map((x: any) => [(new Date(x.time)).getTime(), x.open, this.data.stock?.symbol]) as [x: number, y: number][]);
    }, false);
  }

  chartOptions: Highcharts.Options = {
    title: {
      text: 'Weekly data',
      style: {
        color: '#000',
        fontSize: '14px',
        fontWeight: 'bold'
      }
    },
    xAxis: {
      type: 'datetime',
      labels: {
        format: "{value:%b %e}"
     },
     startOfWeek: 2,
      title: {
        text: 'Weekly chart'
      }
    },
    tooltip: {
      formatter: function() {
          return 'The value for <b>' + new Date(this.x as number).toDateString()  + '</b> is <b>' + this.y + '</b>';
      }
  },
    yAxis: {
      title: {
        text: 'Open Values'
      },
      labels: {
        format: '{value:,.0f}'
      }
    },
    series: [{
      data: this.chartQuote.value,
      type: 'spline',
    }]
  };

  ngOnInit(): void {
    this.chartQuote.subscribe(x => {
      if (this.chartOptions?.series) {
        this.chartOptions!.series[0] = {
          type: 'line',
          data: x
        }
        this.updateFlag = true;
      }

    })
  }


}
