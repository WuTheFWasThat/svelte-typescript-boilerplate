import 'svelte-extras';
import $ from 'jquery';
import 'bootstrap-loader';
import './polyfills.ts';

import 'font-awesome/css/font-awesome.css';

import Main from './app/components/main.sve';

const app = new Main({
  target: document.querySelector('#svelte-app'),
  data: {
    url: 'http://northwind.servicestack.net/customers.json'
  }
});

(<any>window).app = app; // for testing purposes only

// detach the component and clean up
// app.teardown();
