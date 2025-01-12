import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSurahsComponent } from './list-surahs.component';

describe('ListSurahsComponent', () => {
  let component: ListSurahsComponent;
  let fixture: ComponentFixture<ListSurahsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListSurahsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSurahsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
