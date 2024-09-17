import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmaterielComponent } from './addmateriel.component';

describe('AddmaterielComponent', () => {
  let component: AddmaterielComponent;
  let fixture: ComponentFixture<AddmaterielComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddmaterielComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddmaterielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
