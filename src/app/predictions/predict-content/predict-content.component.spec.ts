import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictContentComponent } from './predict-content.component';

describe('PredictContentComponent', () => {
  let component: PredictContentComponent;
  let fixture: ComponentFixture<PredictContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PredictContentComponent]
    });
    fixture = TestBed.createComponent(PredictContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
