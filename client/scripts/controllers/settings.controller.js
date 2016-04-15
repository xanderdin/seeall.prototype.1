//angular
//	.module('SeeAll')
//	.controller('SettingsCtrl', SettingsCtrl);
//
//
//function SettingsCtrl($scope, $reactive) {
//	$reactive(this).attach($scope);
//}


import { Controller } from '../entities';


export default class SettingsCtrl extends Controller {
	constructor() {
		super(...arguments);
	}
}


SettingsCtrl.$inject = ['$scope'];
