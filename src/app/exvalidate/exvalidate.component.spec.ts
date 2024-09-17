import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExvalidateComponent } from './exvalidate.component';

describe('ExvalidateComponent', () => {
  let component: ExvalidateComponent;
  let fixture: ComponentFixture<ExvalidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExvalidateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExvalidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
