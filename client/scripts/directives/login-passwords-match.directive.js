angular
    .module('SeeAll')
    .directive('matchWith', MatchWith);


function MatchWith() {
    return {
        require: 'ngModel',
        scope: {
            otherModelValue: "=matchWith"
        },
        link: function(scope, element, attr, mCtrl) {

            mCtrl.$validators.compareTo = function(modelValue) {
                if (modelValue === undefined) {
                    return false;
                }
                if (scope.otherModelValue === undefined) {
                    return false;
                }
                return modelValue === scope.otherModelValue;
            };

            scope.$watch("otherModelValue", function() {
                mCtrl.$validate();
            });
        }
    };
}
