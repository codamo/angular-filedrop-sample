var app = angular.module('myApp', []);

app.controller('fileDropCtrl', ['$scope', function($scope){
  $scope.fileNames = [];

  $scope.dragOver = function($event){
    $event.stopPropagation();
    $event.preventDefault();

    $event.dataTransfer.dropEffect = 'copy';
  };

  $scope.drop = function($event){
    $event.stopPropagation();
    $event.preventDefault();

    var files = $event.dataTransfer.files;
    for (var i = 0; i<files.length; i++) {
      var f = files[i];
      $scope.fileNames.push(f.name);
    }
  };
}]).directive('ngDrop', function($parse){
  return{
    restrict: 'A',
    link: function($scope, element, attrs){
      element.bind('drop', function(event){
        var fn = $parse(attrs.ngDrop);
        $scope.$apply(function() {
          fn($scope, {$event:event});
				});
      });
    }
  };
}).directive('ngDragover', function($parse){
  return{
    restrict: 'A',
    link: function($scope, element, attrs){
      element.bind('dragover', function(event){
        var fn = $parse(attrs.ngDragover);
        $scope.$apply(function() {
          fn($scope, {$event:event});
				});
      });
    }
  };
});
