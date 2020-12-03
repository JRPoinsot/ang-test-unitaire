import { HttpClientModule } from '@angular/common/http';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { asyncData } from '../../test';
import { PeopleService } from '../shared/people.service';
import { HomeComponent } from './home.component';

const fakePerson = {
  id: '5763cd4d9d2a4f259b53c901',
  photo: 'https://randomuser.me/portraits/women/59.jpg',
  firstname: 'Leanne',
  lastname: 'Woodard',
  entity: 'BIOSPAN',
  entryDate: '27/10/2015',
  birthDate: '02/01/1974',
  gender: '',
  email: 'Leanne.Woodard@BIOSPAN.com',
  skills: ['pariatur', 'ipsum', 'laboris', 'nostrud', 'elit'],
  geo: {
    lat: 48.854107964410616,
    lng: 2.2486534555789013
  },
  phone: '0784112248',
  address: {
    street: 'Narrows Avenue',
    postalCode: 70534,
    city: 'Boling'
  },
  links: {
    twitter: 'https://twitter.com/laboris',
    slack: 'https://slack.com/fugiat',
    github: 'https://github.com/velit',
    linkedin: 'https://www.linkedin.com/in/voluptate'
  },
  isManager: false,
  manager: 'Erika',
  managerId: '5763cd4d3b57c672861bfa1f'
};

fdescribe('Test Home Component', () => {

  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let debugElement: DebugElement;
  let peopleService: PeopleService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [HomeComponent],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    peopleService = TestBed.inject(PeopleService);
  });

  it('should be created', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should not display cards if person is null', () => {
    component.person = null;
    fixture.detectChanges(); // ngOnInit
    expect(debugElement.query(By.css('pwa-card'))).toBeFalsy();
    component.person = {};
    fixture.detectChanges(); // update view
    expect(debugElement.query(By.css('pwa-card'))).toBeTruthy();
  });

  it('should call fetchRandom when click on autorenew', () => {
    const fetchRandomSpy = spyOn(peopleService, 'fetchRandom').and.returnValue(of(fakePerson));
    fixture.detectChanges(); // ngOnInit
    expect(fetchRandomSpy).toHaveBeenCalled();
    expect(component).toBeTruthy();
    debugElement
        .query(By.css('[data-id=button-1]'))
        .triggerEventHandler('click', {button : 0});
    expect(fetchRandomSpy).toHaveBeenCalledTimes(2);
  });

  it('should call delete when card triggers a personDelete event', () => {
    component.person.id = 'fakeId';
    const deleteSpy = spyOn(peopleService, 'delete').and.returnValue(of([]));
    fixture.detectChanges(); // ngOnInit
    debugElement.query(By.css('pwa-card')).triggerEventHandler('personDelete', null);
    expect(deleteSpy).toHaveBeenCalledWith(component.person.id);
  });

  it('should call fetch random person on Init and display it (async)', waitForAsync(() => {
      component.person = null;
      const fetchRandomSpy = spyOn(peopleService, 'fetchRandom').and.returnValue(asyncData(fakePerson));
      fixture.detectChanges(); // ngOnInit
      fixture.whenStable().then(() => {
          fixture.detectChanges(); // updateView after async code is executed
          expect(fetchRandomSpy).toHaveBeenCalled();
          expect(debugElement.query(By.css('pwa-card'))).toBeTruthy();
      });
  }));
});
