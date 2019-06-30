"use strict";

import configureStore from './store';
import reducer from './reducer';
import 'riot-hot-reload';
import riot from 'riot';
import riotReduxConnect from 'riot-redux-connect';

const store = configureStore(reducer);

riotReduxConnect(riot, store);

import 'tags/app.tag';

riot.mount('body', 'app');
