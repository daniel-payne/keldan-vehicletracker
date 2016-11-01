/*global window, define, ertoc, window: true */
define("ertoc/display", [
  "ertoc/data",
  "dijit/registry",
//"dojox/mobile/parser",
  "dojo/dom",
  "dojox/mobile/ListItem",
  "dojo/dom-style"
], function (data, registry, dom, ListItem, style) {
  //
  "use strict";


  window.app.display = {

    resize: function () {

      window.app.display.vehicleListing();
      window.app.display.selectedVehicle();
    },

    clearAll: function () {

      window.app.display.clearVehicleList();
      window.app.display.clearVehicleSummary();
    },

    clearVehicleList: function () {

      registry.byId('RoundRectListVehicles').destroyDescendants();

      style.set("DivWaitIndicatorVehicles", 'display', '');
    },

    clearVehicleSummary: function () {

      style.set("DivWaitIndicatorVehicles", 'display', '');

//      style.set("DivLatestFueling",         'display', 'none');
//      style.set("DivCurrentConsignments",   'display', 'none');
//      style.set("DivDailyMovements",        'display', 'none');
//      style.set("DivUtilizations",          'display', 'none');
//      style.set("DivConsumptions",          'display', 'none');

      dom.byId("SpanVehicleSummarylatestFuelingPrice"                ).innerHTML  = '';
      dom.byId("SpanVehicleSummarylatestFuelingPriceUnit"            ).innerHTML  = '';
      dom.byId("SpanVehicleSummarylatestFuelingConsumptionRate"      ).innerHTML  = '';
      dom.byId("SpanVehicleSummarylatestFuelingConsumptionRateUnit"  ).innerHTML  = '';
      dom.byId("SpanVehicleSummaryCurrentConsignmentsCount"          ).innerHTML  = '';
      dom.byId("SpanVehicleSummaryCurrentConsignmentsTotalWeight"    ).innerHTML  = '';
      dom.byId("SpanVehicleSummaryCurrentConsignmentsTotalWeightUnit").innerHTML  = '';
      
      dom.byId("SpanVehicleSummaryDailyMovementsDistanceUnit").innerHTML          = '';
      dom.byId("SpanVehicleSummaryDailyMovementsFuelCostUnit").innerHTML          = '';
      dom.byId("SpanVehicleSummaryDailyMovementsUnitCostUnit").innerHTML          = '';

      dom.byId("SpanVehicleSummaryDailyMovements00DayName" ).innerHTML            = '';
      dom.byId("SpanVehicleSummaryDailyMovements00Distance").innerHTML            = '';
      dom.byId("SpanVehicleSummaryDailyMovements00FuelCost").innerHTML            = '';
      dom.byId("SpanVehicleSummaryDailyMovements00UnitCost").innerHTML            = '';

      dom.byId("SpanVehicleSummaryDailyMovements01DayName" ).innerHTML            = '';
      dom.byId("SpanVehicleSummaryDailyMovements01Distance").innerHTML            = '';
      dom.byId("SpanVehicleSummaryDailyMovements01FuelCost").innerHTML            = '';
      dom.byId("SpanVehicleSummaryDailyMovements01UnitCost").innerHTML            = '';

      dom.byId("SpanVehicleSummaryDailyMovements02DayName" ).innerHTML            = '';
      dom.byId("SpanVehicleSummaryDailyMovements02Distance").innerHTML            = '';
      dom.byId("SpanVehicleSummaryDailyMovements02FuelCost").innerHTML            = '';
      dom.byId("SpanVehicleSummaryDailyMovements02UnitCost").innerHTML            = '';

      dom.byId("SpanVehicleSummaryDailyMovements03DayName" ).innerHTML            = '';
      dom.byId("SpanVehicleSummaryDailyMovements03Distance").innerHTML            = '';
      dom.byId("SpanVehicleSummaryDailyMovements03FuelCost").innerHTML            = '';
      dom.byId("SpanVehicleSummaryDailyMovements03UnitCost").innerHTML            = '';

      dom.byId("SpanVehicleSummaryDailyMovements04DayName" ).innerHTML            = '';
      dom.byId("SpanVehicleSummaryDailyMovements04Distance").innerHTML            = '';
      dom.byId("SpanVehicleSummaryDailyMovements04FuelCost").innerHTML            = '';
      dom.byId("SpanVehicleSummaryDailyMovements04UnitCost").innerHTML            = '';
 
      registry.byId("chartConsignments").chart.removeSeries("seriesUtilization");
      registry.byId("chartConsignments").chart.removeSeries("seriesEmptyRunning");
      registry.byId("chartConsumptions").chart.removeSeries("seriesConsumptions");
   },

    vehicleListing: function () {

      var list = registry.byId('RoundRectListVehicles');


      list.destroyDescendants();

      data.vehicles.data.forEach(function (vehicle) {

        var newItem = {
          label:     vehicle.vehicleName,
          rightText: vehicle.categoryName,
          moveTo:   "ViewOverview",
          onClick:   window.app.actions.selectVehicle

        };

        if (window.innerWidth < 480) {

          newItem.rightText = '';
        }

        list.addChild(new ListItem(newItem));

      });

      style.set("DivWaitIndicatorVehicles", 'display', 'none');
    },

    selectedVehicle: function () {

      if (data.selectedVehicle === undefined) {
        return;
      }

      dom.byId("SpanSelectedVehicleSummaryName").innerHTML = data.selectedVehicle.vehicleName;

      if (window.innerWidth < 480) {
        dom.byId("SpanSelectedVehicleSummaryCategory").innerHTML = '';
      }
      else {
        dom.byId("SpanSelectedVehicleSummaryCategory").innerHTML = data.selectedVehicle.categoryName;
      }

    },

    selectedVehicleSummary: function () {

      var vehicle = data.selectedVehicle;
      
      style.set("DivWaitIndicatorVehicles", 'display', 'none');

//      style.set("DivLatestFueling",         'display', '');
//      style.set("DivCurrentConsignments",   'display', '');
//      style.set("DivDailyMovements",        'display', '');
//      style.set("DivUtilizations",          'display', '');
//      style.set("DivConsumptions",          'display', '');

      dom.byId("SpanVehicleSummarylatestFuelingPrice").innerHTML                 = vehicle.summary.latestFuelingPrice;
      dom.byId("SpanVehicleSummarylatestFuelingPriceUnit").innerHTML             = vehicle.summary.latestFuelingPriceUnit;
      dom.byId("SpanVehicleSummarylatestFuelingConsumptionRate").innerHTML       = vehicle.summary.latestFuelingConsumptionRate;
      dom.byId("SpanVehicleSummarylatestFuelingConsumptionRateUnit").innerHTML   = vehicle.summary.latestFuelingConsumptionRateUnit;
      dom.byId("SpanVehicleSummaryCurrentConsignmentsCount").innerHTML           = vehicle.summary.currentConsignmentsCount;
      dom.byId("SpanVehicleSummaryCurrentConsignmentsTotalWeight").innerHTML     = vehicle.summary.currentConsignmentsTotalWeight;
      dom.byId("SpanVehicleSummaryCurrentConsignmentsTotalWeightUnit").innerHTML = vehicle.summary.currentConsignmentsTotalWeightUnit;
 
      dom.byId("SpanVehicleSummaryDailyMovementsDistanceUnit").innerHTML         = vehicle.summary.dailyMovementsDistanceUnit;
      dom.byId("SpanVehicleSummaryDailyMovementsFuelCostUnit").innerHTML         = vehicle.summary.dailyMovementsFuelCostUnit;
      dom.byId("SpanVehicleSummaryDailyMovementsUnitCostUnit").innerHTML         = vehicle.summary.dailyMovementsUnitCostUnit;

      dom.byId("SpanVehicleSummaryDailyMovements00DayName" ).innerHTML           = vehicle.summary.dailyMovements[0].DayName;
      dom.byId("SpanVehicleSummaryDailyMovements00Distance").innerHTML           = vehicle.summary.dailyMovements[0].Distance;
      dom.byId("SpanVehicleSummaryDailyMovements00FuelCost").innerHTML           = vehicle.summary.dailyMovements[0].FuelCost;
      dom.byId("SpanVehicleSummaryDailyMovements00UnitCost").innerHTML           = vehicle.summary.dailyMovements[0].UnitCost;
                                                                                                                 
      dom.byId("SpanVehicleSummaryDailyMovements01DayName" ).innerHTML           = vehicle.summary.dailyMovements[1].DayName;
      dom.byId("SpanVehicleSummaryDailyMovements01Distance").innerHTML           = vehicle.summary.dailyMovements[1].Distance;
      dom.byId("SpanVehicleSummaryDailyMovements01FuelCost").innerHTML           = vehicle.summary.dailyMovements[1].FuelCost;
      dom.byId("SpanVehicleSummaryDailyMovements01UnitCost").innerHTML           = vehicle.summary.dailyMovements[1].UnitCost;
                                                                                                                 
      dom.byId("SpanVehicleSummaryDailyMovements02DayName" ).innerHTML           = vehicle.summary.dailyMovements[2].DayName;
      dom.byId("SpanVehicleSummaryDailyMovements02Distance").innerHTML           = vehicle.summary.dailyMovements[2].Distance;
      dom.byId("SpanVehicleSummaryDailyMovements02FuelCost").innerHTML           = vehicle.summary.dailyMovements[2].FuelCost;
      dom.byId("SpanVehicleSummaryDailyMovements02UnitCost").innerHTML           = vehicle.summary.dailyMovements[2].UnitCost;
                                                                                                                 
      dom.byId("SpanVehicleSummaryDailyMovements03DayName" ).innerHTML           = vehicle.summary.dailyMovements[3].DayName;
      dom.byId("SpanVehicleSummaryDailyMovements03Distance").innerHTML           = vehicle.summary.dailyMovements[3].Distance;
      dom.byId("SpanVehicleSummaryDailyMovements03FuelCost").innerHTML           = vehicle.summary.dailyMovements[3].FuelCost;
      dom.byId("SpanVehicleSummaryDailyMovements03UnitCost").innerHTML           = vehicle.summary.dailyMovements[3].UnitCost;
                                                                                                                 
      dom.byId("SpanVehicleSummaryDailyMovements04DayName" ).innerHTML           = vehicle.summary.dailyMovements[4].DayName;
      dom.byId("SpanVehicleSummaryDailyMovements04Distance").innerHTML           = vehicle.summary.dailyMovements[4].Distance;
      dom.byId("SpanVehicleSummaryDailyMovements04FuelCost").innerHTML           = vehicle.summary.dailyMovements[4].FuelCost;
      dom.byId("SpanVehicleSummaryDailyMovements04UnitCost").innerHTML           = vehicle.summary.dailyMovements[4].UnitCost;

      registry.byId("chartConsignments").chart.addSeries("seriesUtilization",   vehicle.summary.utilizationData,     {plot: "plotUtilizations"} );
      registry.byId("chartConsignments").chart.addSeries("seriesEmptyRunning",  vehicle.summary.emptyRunningData,    {plot: "plotEmptyRunning"} );
      registry.byId("chartConsumptions").chart.addSeries("seriesConsumptions",  vehicle.summary.fuelConsumptionData, {plot: "plotConsumptions"} );

      registry.byId("chartConsignments").chart.render();
      registry.byId("chartConsumptions").chart.render();
    },

    connectError: function () {

      window.alert('connect Error');
    },

    dataError: function () {

      window.alert('Data Error');
    }
  };

  return window.app.display;
});