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
                scope.$ionicPopup.alert({
                    title: 'Error',
                    template: error.reason
                });
            } else {
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
