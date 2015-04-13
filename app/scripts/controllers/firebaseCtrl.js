'use strict';

/**
* @ngdoc function
* @name firebasemyadminApp.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the firebasemyadminApp
*/
angular.module('fireBaseMyAdmin')
.controller('FirebaseCtrl', function (FirebaseAuth, Firebase, FirebaseQuery) {
  console.log('FirebaseCtrl');

  var _this = this;

  this.firebase = {
    logged : false,
    error : {},
    URL : 'https://public-demo-fbma.firebaseio.com/',
    demoURL : 'https://public-demo-fbma.firebaseio.com/',
    authKey : 'Zj6m6ibvHEd8AvKzEROTveaTDU5sEUbOitiABa58',
    demoAuthKey : 'Zj6m6ibvHEd8AvKzEROTveaTDU5sEUbOitiABa58',
    path : '',
    query: '',
    actionType : 'firebaseObject',
    result : ''
  }



  this.login = function(){
    FirebaseAuth.login(this.firebase).then(function(){
      console.log('LOGGED');
      _this.firebase.logged = true;
    },function(error){
      //console.log('LOGIN ERROR');
      _this.firebase.logged = false;
      _this.firebase.error.message = 'URL or Auth key are wrong';
      _this.firebase.error.type = 'danger';
    });
  };
  this.login();

  this.closeAlert = function(){
    _this.firebase.error = {};
  };


  this.execute = function(){
    var firebaseInstance = Firebase.getNew(this.firebase);
    switch (this.firebase.actionType){
      case 'firebaseObject':
        FirebaseQuery.getObject(firebaseInstance).then(function(data){
            _this.firebase.result = data;
            console.log(_this.firebase.result);
        });
        break;
      case 'firebaseArray':
        FirebaseQuery.getArray(firebaseInstance).then(function(data){
            _this.firebase.result = data;
            console.log('lenght',data.length);
            console.log(_this.firebase.result);
        });
        break;
    }

  };


})
.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("main");
  //
  // Now set up the states
  $stateProvider
  .state('main', {
    url: '/main',
    controller:'FirebaseCtrl as fbma',
    templateUrl: 'views/main.html'
  })


});
