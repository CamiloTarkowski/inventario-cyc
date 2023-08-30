import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditColegioComponent } from './edit-colegio.component';

describe('EditColegioComponent', () => {
  let component: EditColegioComponent;
  let fixture: ComponentFixture<EditColegioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditColegioComponent]
    });
    fixture = TestBed.createComponent(EditColegioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
