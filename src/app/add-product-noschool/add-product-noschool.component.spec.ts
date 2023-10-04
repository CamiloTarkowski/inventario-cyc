import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductNoschoolComponent } from './add-product-noschool.component';

describe('AddProductNoschoolComponent', () => {
  let component: AddProductNoschoolComponent;
  let fixture: ComponentFixture<AddProductNoschoolComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddProductNoschoolComponent]
    });
    fixture = TestBed.createComponent(AddProductNoschoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
