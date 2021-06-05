import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSiginComponent } from './auth-sigin.component';

describe('AuthSiginComponent', () => {
  let component: AuthSiginComponent;
  let fixture: ComponentFixture<AuthSiginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthSiginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthSiginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
