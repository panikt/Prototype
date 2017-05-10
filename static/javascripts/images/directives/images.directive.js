
(function () {
  'use strict';

  angular
    .module('prototype.images.directives')
    .directive('images', images);


  function images() {
    var directive = {
      restrict: 'E',
      controller: 'ImagesController',
      controllerAs: 'vm',
      scope: {
        post: '='
      },
      templateUrl: '/static/templates/images/images.html'
    };

    return directive;
  }
})();
