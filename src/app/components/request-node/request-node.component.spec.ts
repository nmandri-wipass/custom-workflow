import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestNodeComponent } from './request-node.component';

describe('RequestNodeComponent', () => {
  let component: RequestNodeComponent;
  let fixture: ComponentFixture<RequestNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestNodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
