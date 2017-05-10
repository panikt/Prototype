/**
* Posts
* @namespace thinkster.posts.services
*/
(function () {
  'use strict';

  angular
    .module('prototype.images.services')
    .factory('Images', Images);

  Images.$inject = ['$http'];

  /**
  * @namespace Posts
  * @returns {Factory}
  */
  function Images($http) {
    var Images = {
      get: get,
      all: all,
    };

    return Images;

    ////////////////////

    function all() {
      return $http.get('/api/v1/images/');
    }



    function get(imagename) {
      return $http.get('/api/v1/images/' + imagename + '/images/');
    }
  }
})();
