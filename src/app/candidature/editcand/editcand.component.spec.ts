import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcandComponent } from './editcand.component';

describe('EditcandComponent', () => {
  let component: EditcandComponent;
  let fixture: ComponentFixture<EditcandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditcandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditcandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
