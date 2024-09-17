import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostulerComponent } from './postuler.component';

describe('PostulerComponent', () => {
  let component: PostulerComponent;
  let fixture: ComponentFixture<PostulerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostulerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
