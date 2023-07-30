import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S3uploadComponent } from './s3upload.component';

describe('S3uploadComponent', () => {
  let component: S3uploadComponent;
  let fixture: ComponentFixture<S3uploadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [S3uploadComponent]
    });
    fixture = TestBed.createComponent(S3uploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
