import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesreclamationComponent } from './mesreclamation.component';

describe('MesreclamationComponent', () => {
  let component: MesreclamationComponent;
  let fixture: ComponentFixture<MesreclamationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesreclamationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesreclamationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
