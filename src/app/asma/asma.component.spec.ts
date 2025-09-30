import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsmaComponent } from './asma.component';

describe('AsmaComponent', () => {
  let component: AsmaComponent;
  let fixture: ComponentFixture<AsmaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsmaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
