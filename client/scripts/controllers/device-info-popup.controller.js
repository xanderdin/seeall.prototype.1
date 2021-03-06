import { Controller } from '../entities';


export default class DeviceInfoPopupCtrl extends Controller {

    constructor() {
        super(...arguments);

        this.$scope.hasAttentionInfo = this.DevicesFunctions.hasAttentionInfo(this.$scope.device);
    }
}


DeviceInfoPopupCtrl.$inject = ['$scope', 'DevicesFunctions'];
