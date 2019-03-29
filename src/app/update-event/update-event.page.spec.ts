import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEventPage } from './update-event.page';

describe('UpdateEventPage', () => {
  let component: UpdateEventPage;
  let fixture: ComponentFixture<UpdateEventPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateEventPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
