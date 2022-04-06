import { NgModule } from '@angular/core';
import { NbAutocompleteModule, NbCardModule, NbInputModule } from '@nebular/theme';
import { FormsModule }   from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    FormsModule,
    NbCardModule,
    ThemeModule,
    NbAutocompleteModule,
    NbInputModule,

  ],
  declarations: [
    DashboardComponent,
  ],
})
export class DashboardModule { }
