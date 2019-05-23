const MAX_SHOWN_EMAIL_LENGTH = 30;


export default function filterEmail(email) {
    if (email.length > MAX_SHOWN_EMAIL_LENGTH) {
        email = email.substring(0, MAX_SHOWN_EMAIL_LENGTH) + '...'
    }
    return email
}

