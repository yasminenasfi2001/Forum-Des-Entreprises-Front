import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterielComponent } from './materiel.component';

describe('MaterielComponent', () => {
  let component: MaterielComponent;
  let fixture: ComponentFixture<MaterielComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterielComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
