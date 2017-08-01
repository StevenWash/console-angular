import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MqttclientComponent } from './mqttclient.component';

describe('MqttclientComponent', () => {
  let component: MqttclientComponent;
  let fixture: ComponentFixture<MqttclientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MqttclientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MqttclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
