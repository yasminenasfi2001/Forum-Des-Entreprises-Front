import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddoComponent } from './addo.component';

describe('AddoComponent', () => {
  let component: AddoComponent;
  let fixture: ComponentFixture<AddoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
