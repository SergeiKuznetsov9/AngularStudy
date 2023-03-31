import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammNavigationComponent } from './programm-navigation.component';

describe('ProgrammNavigationComponent', () => {
  let component: ProgrammNavigationComponent;
  let fixture: ComponentFixture<ProgrammNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgrammNavigationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgrammNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
