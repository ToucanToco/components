import Vue from 'vue';
import VueRouter from 'vue-router';

import { THEMES } from '../variables';

Vue.use(VueRouter);

export default new VueRouter({
  base: process.env.BASE_URL,
  linkActiveClass: 'is-active',
  linkExactActiveClass: 'is-exact-active',
  mode: 'history',
  routes: [
    {
      component() {
        return import(/* webpackChunkName: 'index' */ './pages/Index.vue');
      },
      name: 'Index',
      path: '/:theme/',
    },
    {
      component() {
        return import(/* webpackChunkName: 'tc-app-bar' */ './pages/components/TcAppBar.vue');
      },
      name: 'TcAppBar',
      path: '/:theme/components/tc-app-bar',
    },
    {
      component() {
        return import(/* webpackChunkName: 'tc-button' */ './pages/components/TcButton.vue');
      },
      name: 'TcButton',
      path: '/:theme/components/tc-button',
    },
    {
      component() {
        return import(/* webpackChunkName: 'tc-checkbox' */ './pages/components/TcCheckbox.vue');
      },
      name: 'TcCheckbox',
      path: '/:theme/components/tc-checkbox',
    },
    {
      component() {
        return import(/* webpackChunkName: 'tc-clickable' */ './pages/components/TcClickable.vue');
      },
      name: 'TcClickable',
      path: '/:theme/components/tc-clickable',
    },
    {
      component() {
        return import(/* webpackChunkName: 'tc-dialog' */ './pages/components/TcDialog.vue');
      },
      name: 'TcDialog',
      path: '/:theme/components/tc-dialog',
    },
    {
      component() {
        return import(/* webpackChunkName: 'tc-form' */ './pages/components/TcForm.vue');
      },
      name: 'TcForm',
      path: '/:theme/components/tc-form',
    },
    {
      component() {
        return import(/* webpackChunkName: 'tc-icon' */ './pages/components/TcIcon.vue');
      },
      name: 'TcIcon',
      path: '/:theme/components/tc-icon',
    },
    {
      component() {
        return import(
          /* webpackChunkName: 'tc-navigation-drawer' */ './pages/components/TcNavigationDrawer.vue'
        );
      },
      name: 'TcNavigationDrawer',
      path: '/:theme/components/tc-navigation-drawer',
    },
    {
      component() {
        return import(
          /* webpackChunkName: 'tc-radio-group' */ './pages/components/TcRadioGroup.vue'
        );
      },
      name: 'TcRadioGroup',
      path: '/:theme/components/tc-radio-group',
    },
    {
      component() {
        return import(/* webpackChunkName: 'tc-select' */ './pages/components/TcSelect.vue');
      },
      name: 'TcSelect',
      path: '/:theme/components/tc-select',
    },
    {
      component() {
        return import(/* webpackChunkName: 'tc-switch' */ './pages/components/TcSwitch.vue');
      },
      name: 'TcSwitch',
      path: '/:theme/components/tc-switch',
    },
    {
      component() {
        return import(/* webpackChunkName: 'tc-tabs' */ './pages/components/TcTabs.vue');
      },
      name: 'TcTabs',
      path: '/:theme/components/tc-tabs',
    },
    {
      component() {
        return import(/* webpackChunkName: 'tc-text' */ './pages/components/TcText.vue');
      },
      name: 'TcText',
      path: '/:theme/components/tc-text',
    },
    {
      component() {
        return import(/* webpackChunkName: 'tc-text-field' */ './pages/components/TcTextField.vue');
      },
      name: 'TcTextField',
      path: '/:theme/components/tc-text-field',
    },
    {
      component() {
        return import(/* webpackChunkName: 'tc-toolbar' */ './pages/components/TcToolbar.vue');
      },
      name: 'TcToolbar',
      path: '/:theme/components/tc-toolbar',
    },
    {
      component() {
        return import(/* webpackChunkName: 'quick-start' */ './pages/QuickStart.vue');
      },
      name: 'QuickStart',
      path: '/:theme/quick-start',
    },
    {
      path: '*',
      redirect: {
        name: 'Index',
        params: {
          theme: THEMES.DEFAULT,
        },
      },
    },
  ],
});
