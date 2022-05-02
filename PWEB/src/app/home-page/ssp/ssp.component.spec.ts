import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SspComponent } from './ssp.component';

describe('SspComponent', () => {
  let component: SspComponent;
  let fixture: ComponentFixture<SspComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SspComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SspComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
