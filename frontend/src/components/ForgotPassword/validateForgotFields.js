import AbstractFieldsValidator from 'helpers/validation/AbstractFieldsValidator';
import isTextFieldRight from 'helpers/validation/isTextFieldRight';
import isEmailRight from 'helpers/validation/isEmailRight';
import isPasswordsMatch from 'helpers/validation/isPasswordsMatch';


export default function (fields, options) {
    return new NewForgotValidator(fields, options).validate();
}

class NewForgotValidator extends AbstractFieldsValidator {
    doCheckForSingleValue() {

        const {
            email,
        } = this.fields;

        if (!isEmailRight(email))
            this.addError('email', loc('email-err'));
    }
}
