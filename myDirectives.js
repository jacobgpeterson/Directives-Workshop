var app = angular.module('directiveWorkshop');

app.directive('dirPending', function(){
	return {
		restrict: 'EA',
		scope: {
			request: '&'
		},
		template: '<div ng-show="showSpin">Submit</div><div ng-show="!showSpin"><img src="http://dribbble.s3.amazonaws.com/users/82092/screenshots/1073359/spinner.gif" height=40 width=40/></div>',
		link: function(scope, elem, attrs){
			scope.showSpin = true;
			elem.on('click', function(){
				scope.showSpin = false;
				scope.request().then(function(){
					scope.showSpin = true;
				})
			})
		},
	}
});

app.directive('dirNotify', function(){
	return {
		restrict: 'AE',
		scope: {
			request: '&',
			title: '=',
			body: '=',
			icon: '='
		},
		link: function(scope, elem, attrs){
			var Notification = window.Notification || window.mozNotification || window.webkitNotification;
    		Notification.requestPermission(function (permission) {
                console.log(permission);
                console.log(Notification);
            elem.on('click', function(title){
            	console.log(title);
            	new Notification(title.currentTarget.form[0].value, {body:title.currentTarget.form[1].value, icon:title.currentTarget.form[2].value});
            })
            });
		},
	}
});