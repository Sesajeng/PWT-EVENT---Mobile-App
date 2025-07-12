import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventSubmitUserPage } from './event-submit-user.page';

describe('EventSubmitUserPage', () => {
  let component: EventSubmitUserPage;
  let fixture: ComponentFixture<EventSubmitUserPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EventSubmitUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
