angular
	.module('SeeAll')
	.controller('AboutCtrl', AboutCtrl);


function AboutCtrl($scope, $reactive) {

	$reactive(this).attach($scope);

}
