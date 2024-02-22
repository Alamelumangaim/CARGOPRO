import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignDeliveryComponent } from './assign-delivery.component';

describe('AssignDeliveryComponent', () => {
  let component: AssignDeliveryComponent;
  let fixture: ComponentFixture<AssignDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignDeliveryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
