import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventListUserPage } from './event-list-user.page';

describe('EventListUserPage', () => {
  let component: EventListUserPage;
  let fixture: ComponentFixture<EventListUserPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EventListUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

