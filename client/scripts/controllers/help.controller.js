angular
	.module('SeeAll')
	.controller('HelpCtrl', HelpCtrl);


function HelpCtrl($scope, $reactive) {
	$reactive(this).attach($scope);
}