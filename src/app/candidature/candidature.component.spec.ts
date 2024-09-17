import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatureComponent } from './candidature.component';

describe('CandidatureComponent', () => {
  let component: CandidatureComponent;
  let fixture: ComponentFixture<CandidatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidatureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
