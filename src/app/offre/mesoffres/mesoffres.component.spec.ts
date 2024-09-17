import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesoffresComponent } from './mesoffres.component';

describe('MesoffresComponent', () => {
  let component: MesoffresComponent;
  let fixture: ComponentFixture<MesoffresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesoffresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesoffresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
