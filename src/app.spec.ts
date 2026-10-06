import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './main';

describe('AppComponent tests', () => {
  let component: App;
  let fixture: ComponentFixture<App>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [App],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
  });

  it(`should have a app`, () => {
    expect(component).toBeTruthy();
  });
});
