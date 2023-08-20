import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddColegioComponent } from './add-colegio.component';

describe('AddColegioComponent', () => {
  let component: AddColegioComponent;
  let fixture: ComponentFixture<AddColegioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddColegioComponent]
    });
    fixture = TestBed.createComponent(AddColegioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
