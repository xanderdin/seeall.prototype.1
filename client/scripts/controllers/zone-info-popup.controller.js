import { Controller } from '../entities';


export default class ZoneInfoPopupCtrl extends Controller {
    constructor() {
        super(...arguments);

        this.$scope.hasAttentionInfo = this.ZonesFunctions.hasAttentionInfo(this.$scope.zone);
    }
}


ZoneInfoPopupCtrl.$inject = ['$scope', 'ZonesFunctions'];
