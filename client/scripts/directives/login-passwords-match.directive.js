angular
    .module('SeeAll')
    .directive('passwordsMatch', PasswordsMatch);


function PasswordsMatch($rootScope) {
    return {
        require: 'ngModel',
        link: function(scope, element, attr, mCtrl) {
            function myValidation(value) {
                if (value === scope.password) { // FIXME
                    mCtrl.$setValidity('passwMatch', true);
                } else {
                    mCtrl.$setValidity('passwMatch', false);
                }
                return value;
            }
            mCtrl.$parsers.push(myValidation);
        }
    };
}
