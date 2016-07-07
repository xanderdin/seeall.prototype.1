// Libs
import angular from 'angular';
import 'angular-animate';
import 'angular-meteor';
import 'angular-meteor-auth';
import 'angular-sanitize';
import 'angular-ui-router';
import 'ionic-scripts';


// Modules
import Definer from '../definer';
import AboutCtrl from '../controllers/about.controller';
import AppCtrl from '../controllers/app.controller';
import DeviceActions from '../services/device-actions.service';
import DeviceInfoPopup from '../services/device-info-popup.service';
import DeviceInfoPopupCtrl from '../controllers/device-info-popup.controller';
import DeviceCtrl from '../controllers/device.controller';
import DevicesCtrl from '../controllers/devices.controller';
import DevicesFunctions from '../services/devices-functions.service';
import HelpCtrl from '../controllers/help.controller';
import matchWith from '../directives/login-passwords-match.directive';
import LoginCtrl from '../controllers/login.controller';
import NewDeviceModal from '../services/new-device-modal.service';
import NewDeviceModalCtrl from '../controllers/new-device-modal.controller';
import SettingsCtrl from '../controllers/settings.controller';
import ZoneActions from '../services/zone-actions.service';
import ZoneInfoPopup from '../services/zone-info-popup.service';
import ZoneInfoPopupCtrl from '../controllers/zone-info-popup.controller';
import ZonesFunctions from '../services/zones-functions.service';
import { RoutesConfig, RoutesRunner } from '../routes';


// App
const App = angular.module('SeeAll', [
	'angular-meteor',
	'angular-meteor.auth',
	'ionic'
]);


new Definer(App)
	.define(AboutCtrl)
	.define(AppCtrl)
	.define(DeviceActions)
	.define(DeviceInfoPopup)
	.define(DeviceInfoPopupCtrl)
	.define(DeviceCtrl)
	.define(DevicesCtrl)
	.define(DevicesFunctions)
	.define(HelpCtrl)
	.define(matchWith)
	.define(LoginCtrl)
	.define(NewDeviceModal)
	.define(NewDeviceModalCtrl)
	.define(SettingsCtrl)
	.define(ZoneActions)
	.define(ZoneInfoPopup)
	.define(ZoneInfoPopupCtrl)
	.define(ZonesFunctions)
	.define(RoutesConfig)
	.define(RoutesRunner);


App.constant('$ionicLoadingConfig', { template: '<ion-spinner></ion-spinner>'})


App.config(AppConfig);


function AppConfig($ionicConfigProvider) {
	$ionicConfigProvider.scrolling.jsScrolling(true);
	$ionicConfigProvider.tabs.position('top');
	$ionicConfigProvider.tabs.style('striped');
}


Meteor.subscribe('devices');
Meteor.subscribe('history');
//Meteor.subscribe('devusers', devId);


// Startup
if (Meteor.isCordova) {
	angular.element(document).on('deviceready', onReady);
} else {
	angular.element(document).ready(onReady);
}


function onReady() {
	angular.bootstrap(document, ['SeeAll']);
}
