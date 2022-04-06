import { Component, Input, OnInit } from '@angular/core';
import { StockDataDTO } from '../dto';

@Component({
  selector: 'app-meta',
  templateUrl: './meta.component.html',
  styleUrls: ['./meta.component.scss']
})
export class MetaComponent {

  constructor() { }

  @Input() data: StockDataDTO = { chart: [], realTime: {}, stock: {} };
  ngOnInit(): void {
  }

}
