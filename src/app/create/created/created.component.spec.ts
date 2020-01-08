import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedComponent } from './created.component';

describe('CreatedComponent', () => {
  let component: CreatedComponent;
  let fixture: ComponentFixture<CreatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreatedComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
