import { loginView } from './views/loginView.js';
import { homeView } from './views/homeView.js';
import { userView } from './views/userView.js';
import { notFoundView } from './views/notFoundView.js';
import { initLogin } from './controllers/login.controller.js';
import { initHome, initUser } from './controllers/todo.controller.js';
import { renderLayout } from './components/layout.js';
import { getSession } from '../database/db.js';

 
const app = document.getElementById('app');

async function router() { 
    const hash = window.location.hash;
    const sesion = getSession();

    if (!sesion && hash !== '#login' && hash !== '') {
        window.location.hash = '#login';
        return;
    }

    if (sesion && (hash === '#login' || hash === '')) {
        window.location.hash = sesion.role === 'admin' ? '#home' : '#user';
        return;
    }

    switch (hash) {
        case '':
        case '#login':
            app.innerHTML = loginView();
            initLogin();
            break;
        case '#home':
            if (sesion?.role !== 'admin') {
                window.location.hash = '#user';
                return;
            }
            renderLayout(homeView());
            await initHome();
            break;
        case '#user':
            renderLayout(userView());
            await initUser();
            break;
        default:
            app.innerHTML = notFoundView();
    }
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);