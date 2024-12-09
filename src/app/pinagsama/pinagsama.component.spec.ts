import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PinagsamaComponent } from './pinagsama.component';

describe('PinagsamaComponent', () => {
  let component: PinagsamaComponent;
  let fixture: ComponentFixture<PinagsamaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PinagsamaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PinagsamaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
