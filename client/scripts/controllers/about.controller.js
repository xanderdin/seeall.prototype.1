//angular
//	.module('SeeAll')
//	.controller('AboutCtrl', AboutCtrl);
//
//
//function AboutCtrl($scope, $reactive) {
//
//	$reactive(this).attach($scope);
//
//}


import { Controller } from '../entities';


export default class AboutCtrl extends Controller {
    constructor() {
        super(...arguments);
    }
}


AboutCtrl.$inject = ['$scope'];
