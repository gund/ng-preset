/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MyPresetOneComponent } from './my-preset-one.component';

describe('MyPresetOneComponent', () => {
  let component: MyPresetOneComponent;
  let fixture: ComponentFixture<MyPresetOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPresetOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPresetOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
