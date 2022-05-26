import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllFilesComponent } from './view-all-files.component';

describe('ViewAllFilesComponent', () => {
  let component: ViewAllFilesComponent;
  let fixture: ComponentFixture<ViewAllFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAllFilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
