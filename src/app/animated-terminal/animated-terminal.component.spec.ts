import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedTerminalComponent } from './animated-terminal.component';

describe('AnimatedTerminalComponent', () => {
  let component: AnimatedTerminalComponent;
  let fixture: ComponentFixture<AnimatedTerminalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimatedTerminalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimatedTerminalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
