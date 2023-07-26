import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColegioComponent } from './colegio.component';

describe('ColegioComponent', () => {
  let component: ColegioComponent;
  let fixture: ComponentFixture<ColegioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColegioComponent]
    });
    fixture = TestBed.createComponent(ColegioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
