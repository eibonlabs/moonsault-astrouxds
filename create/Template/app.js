
import { setupApp } from '../../lib/moonsault.js';

import { config } from './config.js';

import { localization } from './localization.js';

import { routes } from './routes.js';

import { defineCustomElements } from '@astrouxds/astro-web-components/loader';
defineCustomElements();

import './components/Header/index.js';
import './components/Footer/index.js';

setupApp({
    config: config,
    localization: localization,
    routes: routes,
    layout: `
    <c-header></c-header>
    <div id="page" data-defaultPage='#/home' data-transition=""></div>
    <c-footer></c-footer>`
});
