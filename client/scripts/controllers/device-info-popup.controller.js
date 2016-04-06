angular
    .module('SeeAll')
    .controller('DeviceInfoPopupCtrl', DeviceInfoPopupCtrl);


function DeviceInfoPopupCtrl($scope, DevicesFunctions) {
    $scope.hasAttentionInfo = DevicesFunctions.hasAttentionInfo($scope.device);
}
