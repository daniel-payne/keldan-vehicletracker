/*global window, define, ertoc, window: true */
define("ertoc/data", [
  "dojo/store/Memory",
  "dojo/request/xhr",
  "dojox/encoding/base64"
], function (Memory, xhr, base64) {
  //
  "use strict";


  window.app.data = {

    currentUser: {
      userEmail: undefined,
      sessionGUID: undefined,
      authentication: undefined,
      authorization: undefined
    },


    selectedVehicleUtilization:  [26.8, 26.2,  27.4,  25.3, 26.4,  0.0,  26.5,  26.3],
    selectedVehicleEmptyRunning: [ -21,  -12, -21.3, -23.2, -6.3, -100, -12.3, -27.3],
    selectedVehicleConsumptions: [23.5, 26.8,  19.5,  21.3, 24.6, 22.8,  21.4,  18.9],

    selectedVehicle: undefined,

    selectedDataPoints: 5,

    vehicles: new Memory({ idProperty: 'vehicleName' }),

    retreveSession: function (userEmail, password) {

      var data           = window.app.data;
      var authentication = userEmail + ':' + password;
      var bytes          = authentication.getBytes();
      var baseAuth       = base64.encode(bytes);

      data.currentUser.userEmail      = userEmail;
      data.currentUser.authentication = baseAuth;
                                                                                                            
      return xhr('./data/sessions.json', { method: 'GET', handleAs: 'json', preventCache: true, headers: { Authentication: data.currentUser.authentication, Accept: 'application/json'} }).then(function (response) {

        var bytes          = response.SessionGUID.getBytes();
        var baseAuth       = base64.encode(bytes);

        data.currentUser.sessionGUID   = response.SessionGUID;
        data.currentUser.authorization = baseAuth;

      }, function (error) {

        data.currentUser.sessionGUID = undefined;

        window.alert(error);
      });
    },

    retreveVehicles: function () {

      var data = window.app.data;

      return xhr('./data/vehicles.json', { method: 'GET', handleAs: 'json', preventCache: true, headers: { Authorization: data.currentUser.authorization, Accept: 'application/json'} }).then(function (response) {

        data.vehicles.data = response;
      });

    },

    retreveVehicleSummary: function (vehicle) {

      var data          = window.app.data;
      var updateVehicle = vehicle;

      if (updateVehicle.summary !== undefined) {
        return updateVehicle;
      }

      return xhr('./data/vehicles/' + vehicle.vehicleGUID + '/summary.json?Duration=' + data.selectedDataPoints, { method: 'GET', handleAs: 'json', preventCache: true, headers: { Authorization: data.currentUser.authorization, Accept: 'application/json'} }).then(function (response) {
 
        updateVehicle.summary = response;
      }, function(error){
      
        window.alert(error);
      });

    }

  };

  return window.app.data;
});