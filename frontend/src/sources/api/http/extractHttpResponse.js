export default function (response) {
    if (response.status === 'success')
        return Promise.resolve(response.result);

    if (response.status === 'error') {
        // const error = new Error(response.error);
        const error = new Error(response.result);

        error.code = response.code;
        error.details = response.details;
        error.message = response.message;


        return Promise.reject(error);
    }

    return Promise.reject(new Error('Broken http server response'));
}
