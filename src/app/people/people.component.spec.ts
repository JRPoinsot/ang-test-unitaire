import { HttpClientModule } from '@angular/common/http';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, Subject } from 'rxjs';
import { CardComponent } from '../shared/card';
import { PeopleService } from '../shared/people.service';
import { PeopleComponent } from './people.component';
import Spy = jasmine.Spy;

const newPersonCreate = {
  id: '5763cd4dfa6f96cd26c65787',
  photo: 'https://randomuser.me/portraits/men/70.jpg',
  firstname: 'Mclaughlin',
  lastname: 'Cochran',
  entity: 'UTARA',
  entryDate: '11/04/2016',
  birthDate: '19/03/1973',
  gender: '',
  email: 'Mclaughlin.Cochran@undefined.com',
  skills: ['commodo', 'cillum', 'ea', 'ex', 'in'],
  geo: {
    lat: 48.848942410578736,
    lng: 2.4026880720467796
  },
  phone: '0266334856',
  address: {
    street: 'Jewel Street',
    postalCode: 61400,
    city: 'Snelling'
  },
  links: {
    twitter: 'https://twitter.com/mollit',
    slack: 'https://slack.com/cupidatat',
    github: 'https://github.com/qui',
    linkedin: 'https://www.linkedin.com/in/sunt'
  },
  isManager: true,
  manager: '',
  managerId: ''
};
const fakePeopleList = [
    {
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
    },
    {
        id: '5763cd4d51fdb6588742f99e',
        photo: 'https://randomuser.me/portraits/men/65.jpg',
        firstname: 'Castaneda',
        lastname: 'Salinas',
        entity: 'METROZ',
        entryDate: '04/10/2015',
        birthDate: '22/01/1963',
        gender: '',
        email: 'Castaneda.Salinas@METROZ.com',
        skills: ['exercitation', 'consectetur', 'aute', 'ad', 'adipisicing'],
        geo: {
            lat: 48.85988099923647,
            lng: 2.283677529858706
        },
        phone: '0145652522',
        address: {
            street: 'Metrotech Courtr',
            postalCode: 53292,
            city: 'Franklin'
        },
        links: {
            twitter: 'https://twitter.com/velit',
            slack: 'https://slack.com/sunt',
            github: 'https://github.com/sint',
            linkedin: 'https://www.linkedin.com/in/voluptate'
        },
        isManager: false,
        manager: 'Erika',
        managerId: '5763cd4d3b57c672861bfa1f'
    }
];

fdescribe('Test People Component', () => {

    let component: PeopleComponent;
    let fixture: ComponentFixture<PeopleComponent>;
    let debugElement: DebugElement;
    let peopleService: PeopleService;
    let spyOpenDialog: Spy;
    let addDialogMock: any;
    let matDialog: MatDialog;
    let spyFetchAll: Spy;

    const afterCloseSubject = new Subject();

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [BrowserAnimationsModule, HttpClientModule, MatDialogModule, MatCardModule, MatButtonModule, MatIconModule],
        declarations: [PeopleComponent, CardComponent],
        providers: [MatDialog],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    }));

    beforeEach(() => {
      // init test variables
      fixture = TestBed.createComponent(PeopleComponent);
      component = fixture.componentInstance;
      debugElement = fixture.debugElement;
      peopleService = TestBed.inject(PeopleService);
      matDialog = TestBed.inject(MatDialog);
      addDialogMock = {
          afterClosed: () => afterCloseSubject.asObservable()
      };
      spyOpenDialog = spyOn(matDialog, 'open').and.returnValue(addDialogMock);
      spyFetchAll = spyOn(peopleService, 'fetch').and.returnValue(of(fakePeopleList));
    });


    it('should be created', () => {
        fixture.detectChanges(); // ngOnInit
        expect(component).toBeTruthy();
    });

    it('should call fetchAll onInit then display cards', () => {
        fixture.detectChanges(); // ngOnInit
        expect(spyFetchAll).toHaveBeenCalled();
        const pwaCardsDe = debugElement.queryAll(By.css('pwa-card'));
        expect(pwaCardsDe.length).toEqual(2);
    });

    it('should call delete when card raises personDelete event', () => {
        fixture.detectChanges(); // ngOnInit
        const fakeListAfterDelete = fakePeopleList.slice(0, 1);
        spyOn(peopleService, 'delete').and.returnValue(of(fakeListAfterDelete));
        let pwaCardsDe = debugElement.queryAll(By.css('pwa-card'));
        pwaCardsDe[0].triggerEventHandler('personDelete', fakePeopleList[0]);
        fixture.detectChanges(); // detect changes (refresh view)
        pwaCardsDe = debugElement.queryAll(By.css('pwa-card'));
        expect(pwaCardsDe.length).toEqual(1);
    });

    it('should open MatDialog component when clicking add button', () => {
        fixture.detectChanges(); // ngOnInit
        expect(component.dialogStatus).toEqual('inactive');
        let button = debugElement.query(By.css('button'));
        button.triggerEventHandler('click', null);
        expect(component.dialogStatus).toEqual('active');
        fixture.detectChanges(); // update view
        button = debugElement.query(By.css('#dialog-button'));
        expect(button).toBeFalsy();
        expect(spyOpenDialog).toHaveBeenCalled();
        afterCloseSubject.next(null); // cancel
        expect(component.dialogStatus).toEqual('inactive');
        fixture.detectChanges();
        button = debugElement.query(By.css('#dialog-button')); 
        expect(button).toBeTruthy();
    });

    it('should create person when addDialog is closing with payload', () => {
        const createSpy = spyOn(peopleService, 'create').and.returnValue(of(newPersonCreate));
        fixture.detectChanges(); // ngOnInit
        expect(component.dialogStatus).toEqual('inactive');
        const button = debugElement.query(By.css('#dialog-button'));
        button.triggerEventHandler('click', null);
        fixture.detectChanges();
        afterCloseSubject.next(newPersonCreate); // payload
        expect(createSpy).toHaveBeenCalledWith(newPersonCreate);
    });
});
