(function() {
  'use strict';

  // define module and factory
  angular
    .module('prototype.authentication.services')
    .factory('Authentication', Authentication);

  // define injection
  Authentication.$inject = ['$cookies','$http'];

  // constructor function
  function Authentication($cookies, $http) {

    // sub method
    function register(email, password, username) {
      return $http.post('/api/v1/accounts/', {
        username: username,
        password: password,
        email: email
      });
    }


    var Authentication = {
      register:register

    };

    return Authentication;
  }
})();
