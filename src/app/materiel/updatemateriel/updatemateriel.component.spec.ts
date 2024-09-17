import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatematerielComponent } from './updatemateriel.component';

describe('UpdatematerielComponent', () => {
  let component: UpdatematerielComponent;
  let fixture: ComponentFixture<UpdatematerielComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatematerielComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatematerielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
