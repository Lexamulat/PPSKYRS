import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/configureStore';
import './styles/main.scss';
import config from 'config'
import {initLocale} from 'sources/locale/localeHelper';


window.config = config;
initLocale();
// Store Initialization
// ------------------------------------
const store = configureStore(window.__INITIAL_STATE__);

// Render Setup
// ------------------------------------
const MOUNT_NODE = document.getElementById('root');

let render = () => {
    const App = require('./components/App').default;

    ReactDOM.render(
        <App store={store}/>,
        MOUNT_NODE
    )
};

// Development Tools
// ------------------------------------
if (__DEV__) {
    if (module.hot) {
        const renderApp = render;
        const renderError = (error) => {
            const RedBox = require('redbox-react').default;

            ReactDOM.render(<RedBox error={error}/>, MOUNT_NODE)
        };

        render = () => {
            try {
                renderApp()
            } catch (e) {
                console.error(e);
                renderError(e)
            }
        };

        // Setup hot module replacement
        module.hot.accept([
                './components/App'
            ], () =>
                setImmediate(() => {
                    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
                    render()
                })
        )
    }
}


// Let's Go!
// ------------------------------------
if (!__TEST__) render();