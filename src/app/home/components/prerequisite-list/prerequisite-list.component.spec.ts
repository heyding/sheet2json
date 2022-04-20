import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrerequisiteListComponent } from './prerequisite-list.component';

describe('PrerequisitesComponent', () => {
  let component: PrerequisiteListComponent;
  let fixture: ComponentFixture<PrerequisiteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrerequisiteListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrerequisiteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
