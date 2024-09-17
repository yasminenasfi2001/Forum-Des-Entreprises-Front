import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsessionComponent } from './addsession.component';

describe('AddsessionComponent', () => {
  let component: AddsessionComponent;
  let fixture: ComponentFixture<AddsessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddsessionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddsessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
