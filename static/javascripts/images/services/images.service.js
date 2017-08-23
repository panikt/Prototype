/**
* Posts
* @namespace thinkster.posts.services
*/
(function () {
  'use strict';

  angular
    .module('prototype.images.services')
    .factory('Images', Images);

  Images.$inject = ['$http', 'Upload'];

  /**
  * @namespace Posts
  * @returns {Factory}
  */
  function Images($http, Upload) {
    var Images = {
      get: get,
      all: all,
      save: save,
      upload: upload,
    };

    return Images;

    ////////////////////

    function all() {
      return $http.get('/api/v1/images/');
    }



    function get(imagename) {
      return $http.get('/api/v1/images/' + imagename + '/images/');
    }


    function save(imageItem) {

      var fd = new FormData();
      fd.append('image', imageItem);
      var randomNum = Math.random().toString(36).substring(7);
      fd.append('name', randomNum );

      return $http.post('/api/v1/images/', fd, {
          'transformRequest': angular.identity,
          'headers': {'Content-Type': undefined },
        });
    }


    function upload(file, name) {
      var randomNum = Math.random().toString(36).substring(7);
      var blob = Upload.dataUrltoBlob(file, name);
      return  Upload.upload({
            url: '/api/v1/images/',
            data: {
                name:randomNum,
                image: blob
            },
          });
      }

  }

})();
