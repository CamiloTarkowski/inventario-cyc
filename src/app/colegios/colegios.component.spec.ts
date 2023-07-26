import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColegiosComponent } from './colegios.component';

describe('ColegiosComponent', () => {
  let component: ColegiosComponent;
  let fixture: ComponentFixture<ColegiosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColegiosComponent]
    });
    fixture = TestBed.createComponent(ColegiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
