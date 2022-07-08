import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsToBuyComponent } from './steps-to-buy.component';

describe('StepsToBuyComponent', () => {
  let component: StepsToBuyComponent;
  let fixture: ComponentFixture<StepsToBuyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepsToBuyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepsToBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
