import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresetDefaultModule } from '../../preset';
import { MyComponent } from './my.component';
import { NgModule } from '@angular/core/src/metadata/ng_module';

@Component({ selector: 'prst-mock-preset', template: '' })
class MockPresetComponent { }

/* tslint:disable:no-unused-variable */
describe('MyComponent', () => {
  let component: MyComponent;
  let fixture: ComponentFixture<MyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PresetDefaultModule.forComponent(MyComponent, MockPresetComponent)],
      declarations: [MyComponent, MockPresetComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
