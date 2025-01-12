import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrayCartComponent } from './pray-cart.component';

describe('PrayCartComponent', () => {
  let component: PrayCartComponent;
  let fixture: ComponentFixture<PrayCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrayCartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrayCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
