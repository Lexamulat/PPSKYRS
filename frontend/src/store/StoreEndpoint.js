import * as extendActionType from 'reducers/extendActionType';

export default class StoreEndpoint {
    constructor() {
        this.actionHandlers = {};
    }

    addStore(store) {
        this.store = store;
    }

    handleAction(action, getState) {
        const handler = this.actionHandlers[action.type];
        handler && handler(action, getState);
    }

    dispatchSuccess(type, result) {
        const successAction = {
            type: extendActionType.success(type),
            result
        };
        this.dispatchToStore(successAction);
    }

    dispatchError(type, error) {
        console.error(error);
        const failAction = {
            type: extendActionType.fail(type),
            error
        };
        this.dispatchToStore(failAction);
    }

    dispatchProcessing(type) {
        const processingAction = {
            type: extendActionType.progress(type)
        };
        this.dispatchToStore(processingAction);
    }

    dispatchToStore(action) {
        this.store.dispatch(action);
    }
}
