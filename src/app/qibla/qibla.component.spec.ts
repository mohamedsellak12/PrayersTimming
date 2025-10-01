import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QiblaComponent } from './qibla.component';

describe('QiblaComponent', () => {
  let component: QiblaComponent;
  let fixture: ComponentFixture<QiblaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QiblaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QiblaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
