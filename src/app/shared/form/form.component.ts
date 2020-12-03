import { Component, OnInit, Output, Input, EventEmitter, OnChanges } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

import { CustomValidators } from './custom-validators';
import {Person} from '../../model/person.model';

@Component({
    selector: 'pwa-form',
    templateUrl: 'form.component.html',
    styleUrls: ['form.component.css']
})
export class FormComponent implements OnInit, OnChanges {

    private form: FormGroup;
    @Input() model: any;
    isUpdateMode: boolean;

    @Output() cancel: EventEmitter<null>;
    @Output() submit: EventEmitter<Person>;


    constructor() {
        this.submit = new EventEmitter();
        this.cancel = new EventEmitter();
        this.model = {address: {}};
        this.form = this._buildForm();
    }

    /**
     * OnInit implementation
     */
    ngOnInit() {
    }

    /**
     * Function to handle component update
     *
     * @param record model
     */
    ngOnChanges(record) {
        if (record.model && record.model.currentValue) {
            this.model = record.model.currentValue;
            this.isUpdateMode = !!this.model;
            this.form.patchValue(this.model);
        }
    }

    /**
     * Function to emit event to cancel process
     */
    onCancel() {
        this.cancel.emit();
    }

    /**
     * Function to emit event to submit form and person
     */
    onSubmit(person: Person) {
        this.submit.emit(person);
    }

    /**
     * Function to build our form
     *
     */
    private _buildForm(): FormGroup {
        return new FormGroup({
            id: new FormControl(''),
            firstname: new FormControl('', Validators.compose([
                Validators.required, Validators.minLength(2)
            ])),
            lastname: new FormControl('', Validators.compose([
                Validators.required, Validators.minLength(2)
            ])),
            email: new FormControl('', Validators.compose([
                Validators.required, Validators.email
            ])),
            photo: new FormControl('https://randomuser.me/api/portraits/lego/6.jpg'),
            address: new FormGroup({
                street: new FormControl(''),
                city: new FormControl(''),
                postalCode: new FormControl('')
            }),
            phone: new FormControl('', Validators.compose([
                Validators.required, Validators.pattern('\\d{10}')
            ])),
            isManager: new FormControl('')
        });
    }
}
