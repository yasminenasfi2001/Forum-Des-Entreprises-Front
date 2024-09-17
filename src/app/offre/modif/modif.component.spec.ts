import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifComponent } from './modif.component';

describe('ModifComponent', () => {
  let component: ModifComponent;
  let fixture: ComponentFixture<ModifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
