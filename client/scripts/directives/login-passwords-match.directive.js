import { Directive } from '../entities';


export default class matchWith extends Directive {

    constructor() {
        super(...arguments);

        this.require = 'ngModel';

        this.scope = {
            otherModelValue: '=matchWith'
        };
    }

    link(scope, element, attr, mCtrl) {
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
}


//angular
//    .module('SeeAll')
//    .directive('matchWith', MatchWith);
//
//
//function MatchWith() {
//    return {
//        require: 'ngModel',
//        scope: {
//            otherModelValue: "=matchWith"
//        },
//        link: function(scope, element, attr, mCtrl) {
//
//            mCtrl.$validators.compareTo = function(modelValue) {
//                if (modelValue === undefined) {
//                    return false;
//                }
//                if (scope.otherModelValue === undefined) {
//                    return false;
//                }
//                return modelValue === scope.otherModelValue;
//            };
//
//            scope.$watch("otherModelValue", function() {
//                mCtrl.$validate();
//            });
//        }
//    };
//}
