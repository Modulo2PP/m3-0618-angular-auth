import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EachGroupComponent } from './each-group.component';

describe('EachGroupComponent', () => {
  let component: EachGroupComponent;
  let fixture: ComponentFixture<EachGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EachGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EachGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
