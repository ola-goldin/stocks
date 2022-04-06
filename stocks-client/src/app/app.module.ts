import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MetaComponent } from './meta/meta.component';
import { HighchartsChartModule } from 'highcharts-angular';
@NgModule({
  declarations: [
    AppComponent,
    MetaComponent
  ],
  imports: [
    BrowserModule,
    HighchartsChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
