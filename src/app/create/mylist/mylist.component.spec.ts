import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MylistComponent } from './mylist.component';

describe('MylistComponent', () => {
  let component: MylistComponent;
  let fixture: ComponentFixture<MylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MylistComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
