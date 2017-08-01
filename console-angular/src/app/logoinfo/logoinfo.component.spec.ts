import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoinfoComponent } from './logoinfo.component';

describe('LogoinfoComponent', () => {
  let component: LogoinfoComponent;
  let fixture: ComponentFixture<LogoinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
