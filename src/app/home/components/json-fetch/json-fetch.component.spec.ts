import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonFetchComponent } from './json-fetch.component';

describe('JsonFetchComponent', () => {
  let component: JsonFetchComponent;
  let fixture: ComponentFixture<JsonFetchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JsonFetchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonFetchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
