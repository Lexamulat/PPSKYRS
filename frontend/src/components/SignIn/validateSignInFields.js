import AbstractFieldsValidator from 'helpers/validation/AbstractFieldsValidator';
import isTextFieldRight from 'helpers/validation/isTextFieldRight';
import isEmailRight from 'helpers/validation/isEmailRight';


export default function (fields, options) {
    return new NewSignInValidator(fields, options).validate();
}

class NewSignInValidator extends AbstractFieldsValidator {
    doCheckForSingleValue() {

        const {
            email,
            pass,
        } = this.fields;


        if (!isEmailRight(email))
            this.addError('email', loc('email-err'));

        if (!isTextFieldRight(pass, 6, 32)) {
            this.addError('pass', loc('pass-err'));
        }


    }
}
