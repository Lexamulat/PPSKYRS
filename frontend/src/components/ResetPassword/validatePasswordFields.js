import AbstractFieldsValidator from 'helpers/validation/AbstractFieldsValidator';
import isTextFieldRight from 'helpers/validation/isTextFieldRight';
import isPasswordsMatch from 'helpers/validation/isPasswordsMatch';


export default function (fields, options) {
    return new NewPasswordsValidator(fields, options).validate();
}

class NewPasswordsValidator extends AbstractFieldsValidator {
    doCheckForSingleValue() {

        const {
            pass,
            confPass,
        } = this.fields;

        if (!isTextFieldRight(pass, 2, 32)) {
            this.addError('pass', loc('pass-err'));
        }
        if (!isTextFieldRight(confPass, 2, 32)) {
            this.addError('confPass', loc('pass-err'));
        }

        if (!isPasswordsMatch(pass, confPass))
            this.addError('confPass', loc('pass-match-err'));


    }
}
