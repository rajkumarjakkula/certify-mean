import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminsidedataComponent } from './adminsidedata.component';

describe('AdminsidedataComponent', () => {
  let component: AdminsidedataComponent;
  let fixture: ComponentFixture<AdminsidedataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminsidedataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminsidedataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
