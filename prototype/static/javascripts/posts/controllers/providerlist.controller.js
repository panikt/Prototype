/**
* PostsController
* @namespace thinkster.posts.controllers
*/
(function () {
  'use strict';

  angular
    .module('prototype.posts.controllers')
    .controller('ProviderListController', ProviderListController);


  ProviderListController.$inject = ['$scope', 'Posts'];

  /**
  * @namespace PostsController
  */
  function ProviderListController($scope, Posts) {
    var vm = this;

    vm.columns = [];
    vm.postpics = [];

    activate();


    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf thinkster.posts.controllers.PostsController
    */
    function activate() {
      $scope.$watchCollection(function () { return $scope.providerlist; }, render);
    }




    /**
    * @name render
    * @desc Renders Posts into columns of approximately equal height
    * @param {Array} current The current value of `vm.posts`
    * @param {Array} original The value of `vm.posts` before it was updated
    * @memberOf thinkster.posts.controllers.PostsController
    */
    function render(current, original) {
      if (current !== original ) {
          vm.columns = [];

        for (var i = 0; i < current.length; ++i) {
          vm.columns.push([]);
        }

        for (var i = 0; i < current.length; ++i) {
          if(current[i])
            vm.columns[i].push(current[i]);
            if( current[i].username in vm.postpics )
              vm.postpics[current[i].username].clear();
            Posts.get(current[i].username).then(postsSuccessFn, postsErrorFn);
        }
      }
    }


    function postsSuccessFn(data, status, headers, config) {
      var items = [];

      data.data.forEach(function(entry) {
      if ( entry.image != "" )
          items.push(entry.image);
      vm.postpics[entry.author.username] = items;
    });
  }


    function postsErrorFn(data, status, headers, config) {
      Snackbar.error(data.data.error);
    }
  }
})();
