import { Controller } from '../entities';


export default class ZoneInfoPopupCtrl extends Controller {
    constructor() {
        super(...arguments);

        this.$scope.hasAttentionInfo = this.ZonesFunctions.hasAttentionInfo(this.$scope.zone);
    }
}


ZoneInfoPopupCtrl.$inject = ['$scope', 'ZonesFunctions'];


//angular
//    .module('SeeAll')
//    .controller('ZoneInfoPopupCtrl', ZoneInfoPopupCtrl);
//
//
//function ZoneInfoPopupCtrl($scope, ZonesFunctions) {
//    $scope.hasAttentionInfo = ZonesFunctions.hasAttentionInfo($scope.zone);
//}
