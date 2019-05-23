import AbstractFieldsValidator from 'helpers/validation/AbstractFieldsValidator';
import isTextFieldRight from 'helpers/validation/isTextFieldRight';
import isEmailRight from 'helpers/validation/isEmailRight';
import isPasswordsMatch from 'helpers/validation/isPasswordsMatch';


export default function (fields, options) {
    return new NewSignUpValidator(fields, options).validate();
}

class NewSignUpValidator extends AbstractFieldsValidator {
    doCheckForSingleValue() {

        const {

            fName,
            lName,
            email,
            pass,
            confPass,
        } = this.fields;

        if (!isTextFieldRight(fName, 2, 32)) {
            this.addError('fName', loc('fname-err'));
        }
        if (!isTextFieldRight(lName, 2, 32)) {
            this.addError('lName', loc('lname-err'));
        }
        if (!isEmailRight(email))
            this.addError('email', loc('email-err'));

        if (!isTextFieldRight(pass, 6, 32)) {
            this.addError('pass', loc('pass-err'));
        }
        if (!isTextFieldRight(confPass, 6, 32)) {
            this.addError('confPass', loc('pass-err'));
        }

        if (!isPasswordsMatch(pass,confPass))
            this.addError('confPass', loc('pass-match-err'));



    }
}
