//angular
//	.module('SeeAll')
//	.controller('HelpCtrl', HelpCtrl);
//
//
//function HelpCtrl($scope, $reactive) {
//	$reactive(this).attach($scope);
//}


import { Controller } from '../entities';


export default class HelpCtrl extends Controller {
	constructor() {
		super(...arguments);
	}
}


HelpCtrl.$inject = ['$scope'];
