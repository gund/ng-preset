/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MyPresetDefaultComponent } from './my-preset-default.component';

describe('MyPresetDefaultComponent', () => {
  let component: MyPresetDefaultComponent;
  let fixture: ComponentFixture<MyPresetDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyPresetDefaultComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPresetDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
