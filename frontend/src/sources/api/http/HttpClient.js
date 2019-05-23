import superagent from 'superagent';

const methods = ['get', 'post', 'put', 'patch', 'del'];

import {httpApiPrefixPath} from '../ApiPaths';

/*
 * This silly underscore is here to avoid a mysterious "ReferenceError: HttpClient is not defined" error.
 * Remove it at your own risk.
 */
class _HttpClient {
    constructor() {
        methods.forEach((method) =>
            this[method] = (path, {params, data, files, token} = {}) => new Promise((resolve, reject) => {
                const fullPath = getFullPath(httpApiPrefixPath, path);

                const request = superagent[method](fullPath);

                if (params) {
                    request.query(params);
                }

                if (token) {
                    request.set('Authorization', token)
                }

                if (files) {
                    Object.keys(files || {}).forEach(key => {
                        request.attach(key, files[key]);
                    });

                    Object.keys(data || {}).forEach(key => {
                        request.field(key, data[key]);
                    });
                }
                else {
                    if (data) {
                        request.send(data);
                    }
                }

                request.end((err, {body} = {}) => err ? reject(body || err) : resolve(body));
            }));
    }
}

function getFullPath(prefix, path) {
    return withoutRightSlash(prefix) + '/' + withoutLeftSlash(path);
}

function withoutRightSlash(prefix) {
    if (prefix.slice(-1) === '/')
        return prefix.substr(0, prefix.length - 1);

    return prefix;
}

function withoutLeftSlash(suffix) {
    if (suffix[0] === '/')
        return suffix.substr(1);

    return suffix;
}

const HttpClient = _HttpClient;

export default HttpClient;
