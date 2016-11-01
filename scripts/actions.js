/*global define, app, window, vehicleName, require: true */
define([
  "ertoc/data",
  "ertoc/display",
  "dijit/registry",
  "dojo/when",
  "dojo/dom-style",

  "dojox/geo/openlayers/GfxLayer",
  "dojox/geo/openlayers/Point",
  "dojox/geo/openlayers/GeometryFeature", 
  "dojox/geo/openlayers/widget/Map", 
  "dojox/geo/openlayers/Layer"

], function (data, display, registry, when, style, GfxLayer, Point, GeometryFeature) {
  //
  "use strict";
  //Global vairaible so that it can be accessed in HTML snippits
  window.app.actions = {
    //
    connect: function (userEmail, password) {

      display.clearAll();

      data.retreveSession(userEmail, password).then(

        function () { return data.retreveVehicles().then(display.vehicleListing, display.dataError); },

        display.connectError
      );
    },

    selectVehicle: function () {

       data.selectedVehicle = window.app.data.vehicles.query(  { vehicleName: this.label}  )[0];

       display.selectedVehicle();

       display.clearVehicleSummary();

       when(data.retreveVehicleSummary(data.selectedVehicle), display.selectedVehicleSummary ) ;
    },

    clearSummaries: function() {

      window.app.data.vehicles.data.forEach(function(vehicle){  
        
        vehicle.summary = undefined;
      });

//       display.selectedVehicle();

//       display.clearVehicleSummary();

//       when(data.retreveVehicleSummary(data.selectedVehicle), display.selectedVehicleSummary ) ;
    },
    
    showMap: function(){

      var currentView = registry.byId('ViewOverview');

      currentView.performTransition('ViewMap',1,"flip",null);

      style.set("DivMapCanvas", 'width',  window.innerWidth  + 'px');
      style.set("DivMapCanvas", 'height', window.innerHeight + 'px');

      var map      = registry.byId('DivMapCanvas');

      var layer    = new GfxLayer();
      var point    = new Point({ x: data.selectedVehicle.summary.currentLongitude, y: data.selectedVehicle.summary.currentLatitude});
      var feature  = new GeometryFeature(point);

      feature.setStroke({
        color: [ 73, 107, 155 ], 
        style: "solid", 
        width: 5
      });
      feature.setShapeProperties({
        r : 20
      });
       
      layer.addFeature(feature);
       
      map.map.addLayer(layer);

      map.map.fitTo({
        position : [ data.selectedVehicle.summary.currentLongitude, data.selectedVehicle.summary.currentLatitude ],
        extent : 0.3
      });
    },
    
    showSummary: function(){
      
      var currentView = registry.byId('ViewMap');

      currentView.performTransition('ViewOverview',1,"flip",null);

    } 
  };

  //
  return window.app.actions;
});