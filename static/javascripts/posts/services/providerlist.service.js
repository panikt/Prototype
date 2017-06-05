/**
* Posts
* @namespace thinkster.posts.services
*/
(function () {
  'use strict';

  angular
    .module('prototype.posts.services')
    .factory('ProviderList', ProviderList);

  ProviderList.$inject = ['$http'];


  function ProviderList($http) {
    var ProviderList = {
      all: all
    };

    return ProviderList;

    ////////////////////
    /**
    * @name all
    * @desc Get all Accouont
    * @returns {Promise}
    */
    function all() {
      return $http.get('/api/v1/accounts/');
    }
  }
})();
