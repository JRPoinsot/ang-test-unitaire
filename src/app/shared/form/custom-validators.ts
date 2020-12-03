import { FormControl } from '@angular/forms';

export class CustomValidators {

    /**
     * Function to control email with custom validator
     *
     * @param control the form control
     *
     * @returns customEmail: boolean => vrai si la value de l'email est conform, false sinon
     */
    static customEmail(control: FormControl) {
        // email regex
        const regex = /^\w+\.\w+@custom\.com$/;

        // returns control
        return regex.test(control.value) ? null : {
            customEmail: true
        };
    }
}
