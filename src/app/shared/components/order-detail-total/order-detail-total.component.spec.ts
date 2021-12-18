import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailTotalComponent } from './order-detail-total.component';

describe('OrderDetailTotalComponent', () => {
  let component: OrderDetailTotalComponent;
  let fixture: ComponentFixture<OrderDetailTotalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderDetailTotalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
