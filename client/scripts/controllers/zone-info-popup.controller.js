angular
    .module('SeeAll')
    .controller('ZoneInfoPopupCtrl', ZoneInfoPopupCtrl);


function ZoneInfoPopupCtrl($scope, ZonesFunctions) {
    $scope.hasAttentionInfo = ZonesFunctions.hasAttentionInfo($scope.zone);
}
