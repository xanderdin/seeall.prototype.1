import { Service } from '../entities';


export default class NewDeviceModal extends Service {

	constructor() {
		super(...arguments);

		this.templateUrl = 'client/templates/new-device-modal.html';
	}


	showModal() {

		this.scope = this.$rootScope.$new();

		this.$ionicModal.fromTemplateUrl(this.templateUrl, {
			scope: this.scope
		}).then((modal) => {
			this.modal = modal;
			this.modal.show();
		});
	}

	hideModal() {
		this.scope.$destroy();
		this.modal.remove();
	}
}


NewDeviceModal.$inject = ['$rootScope', '$ionicModal'];
