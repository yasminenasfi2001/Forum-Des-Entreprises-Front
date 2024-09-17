import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffredetailedetudComponent } from './offredetailedetud.component';

describe('OffredetailedetudComponent', () => {
  let component: OffredetailedetudComponent;
  let fixture: ComponentFixture<OffredetailedetudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffredetailedetudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffredetailedetudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
