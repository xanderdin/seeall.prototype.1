angular
    .module('SeeAll')
    .controller('LoginCtrl', LoginCtrl);


function LoginCtrl($scope, $reactive) {

    $reactive(this).attach($scope);

    this.doLogin = doLogin;
    this.doRegister = doRegister;


    //this.helpers({
    //    disableLoginButton: function() {
    //        if (!this.username) {
    //            return true;
    //        }
    //        //if (this.loginForm.password.$invalid) {
    //        //    return true;
    //        //}
    //        return false;
    //    },
    //    disableRegisterButton: function() {
    //        //if (this.username.$invalid) {
    //        //    return true;
    //        //}
    //        //if (this.password.$invalid) {
    //        //    return true;
    //        //}
    //        //if (this.password2.$invalid) {
    //        //    return true;
    //        //}
    //        //if (this.email.$invalid) {
    //        //    return true;
    //        //}
    //        return false;
    //    }
    //});


    function doLogin() {

        var account = {
            username: this.username,
            password: this.password
        };

        alert(' ' + account);
    }


    function doRegister() {

        var account = {
            username: this.username,
            email: this.email,
            password: this.password
        };

        alert(account);
    }
}
