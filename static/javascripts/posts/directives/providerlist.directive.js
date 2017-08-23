/**
* Posts
* @namespace thinkster.posts.directives
*/
(function () {
  'use strict';

  angular
    .module('prototype.posts.directives')
    .directive('providerlist', providerlist);

  function providerlist() {

    var directive = {
      controller: 'ProviderListController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        providerlist: '='
      },
      templateUrl: '/static/templates/posts/providerlist.html'
    };

    return directive;
  }
})();
