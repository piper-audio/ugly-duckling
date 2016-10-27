/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AudioFileOpenComponent } from './audio-file-open.component';

describe('AudioFileOpenComponent', () => {
  let component: AudioFileOpenComponent;
  let fixture: ComponentFixture<AudioFileOpenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioFileOpenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioFileOpenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
