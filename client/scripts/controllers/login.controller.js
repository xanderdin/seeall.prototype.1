import { Controller } from '../entities';


export default class LoginCtrl extends Controller {

    constructor() {
        super(...arguments);
    }


    clearLoginCredentials(scope) {
        scope.username = '';
        scope.password = '';
        if (scope.password2) {
            scope.password2 = '';
        }
        if (scope.email) {
            scope.email = '';
        }
    }


    doLogin() {

        const scope = this;

        this.$ionicLoading.show();

        Meteor.loginWithPassword(this.username, this.password, function(error) {

            scope.$ionicLoading.hide();

            if (error) {
                console.log("Error: " + error.reason);
                scope.$ionicPopup.alert({
                    title: 'Error',
                    template: error.reason
                });
            } else {
                console.log("No Error");
                scope.clearLoginCredentials(scope);
                var target = 'app.about';
                var params = null;
                var devices = scope.DevicesFunctions.getAllDevices().fetch();
                if (!devices) {
                    // nothing
                } else if (devices.length > 1) {
                    target = 'app.devices';
                } else if (devices.length === 1) {
                    target = 'app.device';
                    params = { devId: devices[0]._id };
                }
                scope.$ionicHistory.currentView(scope.$ionicHistory.backView());
                scope.$state.go(target, params, { location: 'replace' });
            }
        });
    }


    doRegister() {

        var account = {
            username: this.username,
            email: this.email,
            password: this.password
        };

        const scope = this;

        this.$ionicLoading.show();

        Accounts.createUser(account, function(error) {

            scope.$ionicLoading.hide();

            if (error) {
                scope.$ionicPopup.alert({
                    title: 'Error',
                    template: error.reason
                });
            } else {
                scope.clearLoginCredentials(scope);
                scope.$ionicHistory.currentView(scope.$ionicHistory.backView());
                scope.$state.go('app.devices', null, { location: 'replace' });
            }
        });
    }
}


LoginCtrl.$inject = ['$scope', '$ionicPopup', '$state', '$ionicHistory',
                     '$ionicLoading', 'DevicesFunctions'];


//angular
//    .module('SeeAll')
//    .controller('LoginCtrl', LoginCtrl);
//
//
//function LoginCtrl($scope, $reactive, $ionicPopup, $state, $ionicHistory,
//                   $ionicLoading, DevicesFunctions) {
//
//    $reactive(this).attach($scope);
//
//    this.doLogin = doLogin;
//    this.doRegister = doRegister;
//
//
//    function clearLoginCredentials(scope) {
//        scope.username = '';
//        scope.password = '';
//        if (scope.password2) {
//            scope.password2 = '';
//        }
//        if (scope.email) {
//            scope.email = '';
//        }
//    }
//
//
//    function doLogin() {
//
//        var scope = this;
//
//        $ionicLoading.show();
//
//        Meteor.loginWithPassword(this.username, this.password, function(error) {
//
//            if (error) {
//                $ionicPopup.alert({
//                    title: 'Error',
//                    template: error.reason
//                });
//            } else {
//                clearLoginCredentials(scope);
//                var target = 'app.about';
//                var params = null;
//                var devices = DevicesFunctions.getAllDevices().fetch();
//                if (!devices) {
//                    // nothing
//                } else if (devices.length > 1) {
//                    target = 'app.devices';
//                } else if (devices.length === 1) {
//                    target = 'app.device';
//                    params = { devId: devices[0]._id };
//                }
//                $ionicHistory.currentView($ionicHistory.backView());
//                $state.go(target, params, { location: 'replace' });
//            }
//
//            $ionicLoading.hide();
//        });
//    }
//
//
//    function doRegister() {
//
//        var account = {
//            username: this.username,
//            email: this.email,
//            password: this.password
//        };
//
//        Accounts.createUser(account, function(error) {
//            if (error) {
//                $ionicPopup.alert({
//                    title: 'Error',
//                    template: error.reason
//                });
//            } else {
//                this.username = this.password = this.password2 = this.email = '';
//                this.loginForm.username.value = this.loginForm.password.value =
//                this.loginForm.password2.value = this.loginForm.email.value = '';
//                $ionicHistory.currentView($ionicHistory.backView());
//                $state.go('app.devices', null, { location: 'replace' });
//            }
//        });
//    }
//}
