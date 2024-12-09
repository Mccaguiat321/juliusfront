import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PathguardComponent } from './pathguard.component';

describe('PathguardComponent', () => {
  let component: PathguardComponent;
  let fixture: ComponentFixture<PathguardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PathguardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PathguardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
