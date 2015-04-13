;(function() {
  "use strict";
  angular.module('fireBaseMyAdmin')


  .factory("AngularFire", ['$firebase', function($firebase) {
    var getNew = function(URL){

      var ref = new Firebase(URL);
      return $firebase(ref);
    };
    return {
      getNew : getNew
    }
  }])

  .factory("Firebase", function() {
    var getNew = function(firebaseObj){
      //console.log(firebaseObj);
      //return new Firebase(firebaseObj.URL);
      var firebasePath = firebaseObj.URL
      if(firebaseObj.path){
        firebasePath += firebaseObj.path;
      }
      var newFirebaseEval = 'new Firebase("' + firebasePath + '")';
      if(firebaseObj.query){
        newFirebaseEval += firebaseObj.query;
      }
      newFirebaseEval += ';';
      console.log('EVAL',newFirebaseEval);
      return eval(newFirebaseEval);
    };
    return {
      getNew : getNew
    }
  })

  .factory("FirebaseAuth", function($q,Firebase,$firebaseAuth) {

    var _login = function(firebaseObj){
      //console.log(firebaseObj);
      var fireAuth = $firebaseAuth(Firebase.getNew(firebaseObj));
      var deferred = $q.defer();

      try {
        fireAuth.$authWithCustomToken(firebaseObj.authKey).then(function(authData) {
          console.log("Logged in as:", authData.uid);
          deferred.resolve(authData);
        })
        .catch(function(error) {
          console.log(error);
          deferred.reject(error);
        });
      } catch (e) {
        deferred.reject(e);
      }

      return deferred.promise;
    };

    return {
      login : _login
    }
  })

  .factory("FirebaseQuery", function($q,Firebase,$firebaseObject,$firebaseArray) {

    var _getObject = function(FirebaseInstance){
      var deferred = $q.defer();

      var firebaseObject = $firebaseObject(FirebaseInstance);

      firebaseObject.$loaded().then(function() {
          deferred.resolve(firebaseObject);
      },function(error){
          deferred.reject(error);
      });

      return deferred.promise;
    };

    var _getArray = function(FirebaseInstance){
      var deferred = $q.defer();

      var firebaseArray = $firebaseArray(FirebaseInstance);

      firebaseArray.$loaded().then(function() {
          deferred.resolve(firebaseArray);
      },function(error){
          deferred.reject(error);
      });

      return deferred.promise;
    };

    return {
      getObject : _getObject,
      getArray : _getArray
    }
  })

})();
