import { Component, DebugElement, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Person } from '../../model/person.model';
import { FormComponent } from './form.component';
import Spy = jasmine.Spy;

const fakePerson = {
        id: '5763cd4d9d2a4f259b53c901',
        photo: 'https://randomuser.me/portraits/women/59.jpg',
        firstname: 'Leanne',
        lastname: 'Woodard',
        entity: 'BIOSPAN',
        entryDate: '27/10/2015',
        birthDate: '02/01/1974',
        gender: '',
        email: 'Leanne.Woodard@custom.com',
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

@Component({
    selector: `host-component`,
    template: `<pwa-form [model]="person" (cancel)="onCancel()" (submit)="setPerson($event)"></pwa-form>`
})
export class TestHostComponent {

    @ViewChild(FormComponent) formComponent: FormComponent;
    person: Person;

    setPerson(newInput: Person) {
        this.person = newInput;
    }

    onCancel() {
        console.log('Canceled!');
    }

}

describe('Test Form Component', () => {

    let hostFixture: ComponentFixture<TestHostComponent>;
    let hostComponent: TestHostComponent;
    let component: FormComponent;
    let debugElement: DebugElement;
    let spyCancel: Spy;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ BrowserAnimationsModule,
                ReactiveFormsModule,
                MatCardModule,
                MatButtonModule,
                MatInputModule,
                MatCheckboxModule],
            declarations: [TestHostComponent, FormComponent],
            schemas: [ NO_ERRORS_SCHEMA ]
        }).compileComponents();
    }));

    beforeEach(() => {
            hostFixture = TestBed.createComponent(TestHostComponent);
            hostFixture.detectChanges(); // ngOnInit
            hostComponent = hostFixture.componentInstance;
            component = hostComponent.formComponent;
            debugElement = hostFixture.debugElement;
            spyCancel = spyOn(hostComponent, 'onCancel');
    });

    it('should be created with no model', () => {
        expect(component).toBeTruthy();
        expect(component.form.valid).toBeFalsy();
        const submitButtonDe = debugElement.query(By.css('button[type=submit]'));
        expect(submitButtonDe.nativeElement.disabled).toBeTruthy();
    });

    it('form firstname should be valid when valued with +2 characters', () => {
        expect(component.form.controls.firstname.valid).toBeFalsy();
        component.form.controls.firstname.setValue('t');
        expect(component.form.controls.firstname.valid).toBeFalsy();
        console.error(component.form.controls.firstname.errors);
        console.error(component.form.valid);
        expect(component.form.controls.firstname.errors['minlength']).toBeTruthy();
        component.form.controls.firstname.setValue('toto');
        expect(component.form.controls.firstname.valid).toBeTruthy( 'le prenom doit etre valide avec la valeur toto');
    });

    it('submit button should be enable when form is valid', () => {
        component.form.controls.firstname.setValue('toto');
        component.form.controls.lastname.setValue('Titi');
        component.form.controls.email.setValue('titi.toto@custom.com');
        component.form.controls.phone.setValue('0633242589');
        expect(component.form.valid).toBeTruthy('Le formulaire doit être valide !');
        hostFixture.detectChanges(); // update view
        const submitButtonDe = debugElement.query(By.css('button[type=submit]'));
        expect(submitButtonDe.nativeElement.disabled).toBeFalsy();
    });

    it('should be "update mode" when model is present', () => {
        hostComponent.setPerson(fakePerson);
        hostFixture.detectChanges(); // change person detection
        expect(component.form.valid).toBeTruthy('Le formulaire doit être valide !');
        expect(debugElement.query(By.css('mat-card-title')).nativeElement.textContent).toEqual('Update Leanne Woodard');
    });

    it('should trigger cancelEvent when click on cancel', () => {
        hostComponent.setPerson(fakePerson);
        hostFixture.detectChanges(); // change person detection
        const cancelButtonDe = debugElement.query(By.css('button[type=button]'));
        cancelButtonDe.triggerEventHandler('click', null);
        expect(spyCancel).toHaveBeenCalled();
    });

    it('should trigger submitEvent with new values when click on save', () => {
        hostComponent.setPerson(fakePerson);
        hostFixture.detectChanges(); // change person detection
        const newFirstName = 'JR';
        component.form.controls.firstname.setValue(newFirstName);
        const submitButtonDe = debugElement.query(By.css('button[type=submit]'));
        submitButtonDe.triggerEventHandler('click', null);
        expect(hostComponent.person.firstname).toBe(newFirstName);
    });

});
