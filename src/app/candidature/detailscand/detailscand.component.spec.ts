import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailscandComponent } from './detailscand.component';

describe('DetailscandComponent', () => {
  let component: DetailscandComponent;
  let fixture: ComponentFixture<DetailscandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailscandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailscandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
