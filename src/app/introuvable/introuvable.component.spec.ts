import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntrouvableComponent } from './introuvable.component';

describe('IntrouvableComponent', () => {
  let component: IntrouvableComponent;
  let fixture: ComponentFixture<IntrouvableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntrouvableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntrouvableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
