var app = angular.module('IoTApp', [])
app.factory('WatsonIoT',function(){
  return IBMIoTF.IotfApplication;
})

app.controller('main',['$scope','WatsonIoT',function($scope,WIoT){
  $scope.main ={}
  $scope.main.APIKey =""
  $scope.main.AuthToken =""
  $scope.main.OrgId =""
  $scope.main.EventLog =""
  var appClient  = null;

  $scope.main.connect = function(){
    $scope.main.EventLog =""
    appClient  = new WIoT( {
      "org" : $scope.main.OrgId,
      "id" :Date.now()+"",
      "domain": "internetofthings.ibmcloud.com",
      "auth-key" : $scope.main.APIKey,
      "auth-token" : $scope.main.AuthToken
    }
    )
    appClient.connect();
    appClient.on("connect", function () {
        //appClient.subscribeToDeviceEvents();
        appClient.subscribeToRuleTriggerEvents();
    });
    window.onbeforeunload = function () {
      appClient.disconnect();
       // handle the exit event
    };
    // appClient.on("deviceEvent", function (deviceType, deviceId, eventType, format, payload) {
    //   $scope.main.EventLog =("Device Event from :: "+deviceType+" : "+deviceId+" of event "+eventType+" with payload : "+payload)+'\n' +$scope.main.EventLog ;
    //   $scope.$digest();
    //   console.log("Device Event from :: "+deviceType+" : "+deviceId+" of event "+eventType+" with payload : "+payload);
    // });
    appClient.on("ruleTrigger", function (logicalInterfaceId, ruleId, payload) {
      $scope.main.EventLog =("Event from :: "+logicalInterfaceId+" : "+ruleId+" of event with payload : "+payload)+'\n' +$scope.main.EventLog ;
      $scope.$digest();
      console.log("Event from :: "+logicalInterfaceId+" : "+ruleId+" of event with payload : "+payload);
    });
  }


}]);
