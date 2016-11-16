var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http',
  function($scope, $http){

  //REFRESH
  var refresh = function(){
    $http.get('/users').success(function(response){
      console.log("Got Data!");
      $scope.users = response;
    });
  }
  refresh();

  //ADD
  $scope.addEducation = function(){
    console.log($scope.education);
    $http.post('/users', $scope.education).success(function(response){
      console.log(response);
      refresh();
    });
  };
  $scope.addSkill = function(){
    console.log($scope.skill);
    $http.post('/users', $scope.skill).success(function(response){
      console.log(response);
      refresh();
    });
  };
  $scope.addProject = function(){
    console.log($scope.project);
    $http.post('/users', $scope.project).success(function(response){
      console.log(response);
      refresh();
    });
  };

  //REMOVE
  $scope.remove = function(id){
    console.log(id);
    $http.delete('/users/' + id).success(function(response){
      refresh();
    });
  };

  //EDIT
  $scope.editEducation = function(id){
    console.log(id);
    $http.get('/users/' + id).success(function(response){
      $scope.education = response;
    });
  };
  $scope.editSkill = function(id){
      console.log(id);
      $http.get('/users/' + id).success(function(response){
        $scope.skill = response;
      });
  };
  $scope.editProject = function(id){
      console.log(id);
      $http.get('/users/' + id).success(function(response){
        $scope.project = response;
      });
  };

  //UPDATE
  $scope.updateEducation = function(){
    console.log($scope.education._id);
    $http.put('/users/' + $scope.education._id, $scope.education).success(function(response){
      refresh();
    });
  };
  $scope.updateSkill= function(){
    console.log($scope.skill._id);
    $http.put('/users/' + $scope.skill._id, $scope.skill).success(function(response){
      refresh();
    });
  };
  $scope.updateProject= function(){
    console.log($scope.project._id);
    $http.put('/users/' + $scope.project._id, $scope.project).success(function(response){
      refresh();
    });
  };

  //DESELECT
  $scope.deselectEducation = function(){
    $scope.education = "";
  }
  $scope.deselectSkill = function(){
    $scope.skill = "";
  }
  $scope.deselectproject = function(){
    $scope.project = "";
  }


}]);
