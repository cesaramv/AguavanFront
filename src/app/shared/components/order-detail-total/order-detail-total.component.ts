import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order-detail-total',
  templateUrl: './order-detail-total.component.html',
  styleUrls: ['./order-detail-total.component.css']
})
export class OrderDetailTotalComponent implements OnInit {

  @Input() orderData: any;

  constructor() { }

  ngOnInit(): void {
  }

}
