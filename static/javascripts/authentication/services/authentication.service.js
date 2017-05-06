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
        }).then(registerSuccessFn, registerErrorFn);

    /**
    * @name registerSuccessFn
    * @desc Log the new user in
    */
    function registerSuccessFn(data, status, headers, config) {
      Authentication.login(email, password);
    }

    /**
    * @name registerErrorFn
    * @desc Log "Epic failure!" to the console
    */
    function registerErrorFn(data, status, headers, config) {
      console.error('Epic failure!');
    }
}


    function login(email, password) {
      return $http.post('/api/v1/auth/login/', {
        email: email, password: password
      }).then(loginSuccessFn, loginErrorFn);

      function loginSuccessFn(data, status, headers, config) {
        Authentication.setAuthenticatedAccount(data.data);

        window.location = '/';
      }


      function loginErrorFn(data, status, headers, config) {
        console.error('Epic failure!');
      }
    }

// log out
    function logout() {
      return $http.post('/api/v1/auth/logout/')
        .then(logoutSuccessFn, logoutErrorFn);


      function logoutSuccessFn(data, status, headers, config) {
        Authentication.unauthenticate();

        window.location = '/';
      }


      function logoutErrorFn(data, status, headers, config) {
        console.error('Epic failure!');
      }
    }


    function getAuthenticatedAccount() {
      if (!$cookies.get('authenticatedAccount')) {
        return;
      }

      return JSON.parse($cookies.get('authenticatedAccount'));
    }

    function isAuthenticated() {
      return !!$cookies.get('authenticatedAccount');
    }

    function setAuthenticatedAccount(account) {
  //    $cookies.authenticatedAccount = JSON.stringify(account);
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 10);

      $cookies.put( 'authenticatedAccount',
                    JSON.stringify(account),
                    {
                        'expires':expireDate
                    });
    }

    function unauthenticate() {
       $cookies.remove('authenticatedAccount');
    }
    var Authentication = {
      register:register,
      login:login,
      logout:logout,
      getAuthenticatedAccount:getAuthenticatedAccount,
      isAuthenticated:isAuthenticated,
      setAuthenticatedAccount:setAuthenticatedAccount,
      unauthenticate:unauthenticate
    };

    return Authentication;
  }


})();
