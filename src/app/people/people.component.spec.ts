import { HttpClientModule } from '@angular/common/http';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { PeopleService } from '../shared/people.service';
import { PeopleComponent } from './people.component';

fdescribe('Test People Component', () => {

    let component: PeopleComponent;
    let fixture: ComponentFixture<PeopleComponent>;
    let debugElement: DebugElement;
    let peopleService: PeopleService;

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientModule, MatDialogModule],
        declarations: [PeopleComponent],
        schemas: [ NO_ERRORS_SCHEMA ]
      }).compileComponents();
    }));

    beforeEach(() => {
          // init test variables
          fixture = TestBed.createComponent(PeopleComponent);
          component = fixture.componentInstance;
          debugElement = fixture.debugElement;
          peopleService = TestBed.inject(PeopleService);
    });

    it('should be created', () => {
        fixture.detectChanges(); // ngOnInit
        expect(component).toBeTruthy();
    });

    it('should call fetchAll onInit then display cards', () => {
    });

    it('should call delete when card raises personDelete event', () => {
    });

    it('should open MatDialog component when clicking add button', () => {
    });

    it('should create person when addDialog is closing with payload', () => {
    });
});
