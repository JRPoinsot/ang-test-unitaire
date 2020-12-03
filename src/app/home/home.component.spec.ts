import { HttpClientModule } from '@angular/common/http';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { asyncData, asyncError } from '../../test';
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

  // NOT SYNC
  it('NUMBER 0: should call fetch random person on Init and display it', () => {
    component.person = null;
    const fetchRandomSpy = spyOn(peopleService, 'fetchRandom').and.returnValue(of(fakePerson));
    fixture.detectChanges(); // ngOnInit
    expect(fetchRandomSpy).toHaveBeenCalled();
    expect(debugElement.query(By.css('pwa-card'))).toBeTruthy();
  });

  //
  it('NUMBER 1: waitForAsync (should call fetch random person on Init and display it)', waitForAsync(() => {
    component.person = null;
    const fetchRandomSpy = spyOn(peopleService, 'fetchRandom').and.returnValue(asyncData(fakePerson));
    fixture.detectChanges(); // ngOnInit
    fixture.whenStable().then(() => {
        expect(fetchRandomSpy).toHaveBeenCalled();
        fixture.detectChanges(); // updateView after async code is executed
        expect(debugElement.query(By.css('pwa-card'))).toBeTruthy();
    });
  }));

  //
  it('NUMBER 2: fakeAsync (should call fetch random person on Init and display it)', fakeAsync(() => {
    component.person = null;
    const fetchRandomSpy = spyOn(peopleService, 'fetchRandom').and.returnValue(asyncData(fakePerson));
    fixture.detectChanges(); // ngOnInit
    tick();
    fixture.detectChanges(); // updateView after async code is executed
    expect(fetchRandomSpy).toHaveBeenCalled();
    expect(debugElement.query(By.css('pwa-card'))).toBeTruthy();
  }));

  // wait 4 second in execution :'( ==> prefere fake async tick
  it('NUMBER 3: waitForAsync 10s (should call fetch random person on Init and display it)', waitForAsync(() => {
      component.person = null;
      const fetchRandomSpy = spyOn(peopleService, 'fetchRandom').and.returnValue(asyncData(fakePerson, 4000));
      fixture.detectChanges(); // ngOnInit
      fixture.whenStable().then(() => {
          fixture.detectChanges(); // updateView after async code is executed
          expect(fetchRandomSpy).toHaveBeenCalled();
          expect(debugElement.query(By.css('pwa-card'))).toBeTruthy();
      });
  }));

  //
  it('NUMBER 4: fakeAsync 10s (should call fetch random person and display error) (FakeAsync)', fakeAsync(() => {
    component.person = null;
    const onErrorMethodSpy = spyOn(component, 'onError');
    const fetchRandomSpy = spyOn(peopleService, 'fetchRandom').and.returnValue(asyncData(fakePerson, 10000));
    fixture.detectChanges(); // ngOnInit
    tick(10000);
    fixture.detectChanges(); // updateView after async code is executed
    expect(fetchRandomSpy).toHaveBeenCalled();
    expect(debugElement.query(By.css('pwa-card'))).toBeTruthy();
  }));

  // FIX THIS ASYNC TEST
  it('NUMBER 5: should call fetch random person and display error (FakeAsync)', fakeAsync(() => {
    component.person = null;
    const componentOnErrorSpy = spyOn(component, 'onError');
    const fetchRandomSpy = spyOn(peopleService, 'fetchRandom').and.returnValue(asyncError({}));
    fixture.detectChanges(); // ngOnInit
    expect(fetchRandomSpy).toHaveBeenCalled();
    tick();
    expect(componentOnErrorSpy).toHaveBeenCalled();
  }));
});
