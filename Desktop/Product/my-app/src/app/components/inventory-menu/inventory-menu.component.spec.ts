import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryMenuComponent } from './inventory-menu.component';

describe('InventoryMenuComponent', () => {
  let component: InventoryMenuComponent;
  let fixture: ComponentFixture<InventoryMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InventoryMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
