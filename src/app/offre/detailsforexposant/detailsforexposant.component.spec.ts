import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsforexposantComponent } from './detailsforexposant.component';

describe('DetailsforexposantComponent', () => {
  let component: DetailsforexposantComponent;
  let fixture: ComponentFixture<DetailsforexposantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsforexposantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsforexposantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
