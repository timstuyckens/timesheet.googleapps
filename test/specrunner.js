require.config({
  paths: {
  jquery: '../app/bower_components/jquery/dist/jquery.min',
	utils:'../app/scripts/utils',
	knockout:'../app/bower_components/knockout/dist/knockout',
	moment:'../app/bower_components/moment/moment',
	mapperModule:'../app/scripts/mapperModule',
	SettingsViewModel:'../app/scripts/SettingsViewModel',
	overviewCalculationModule:'../app/scripts/overviewCalculationModule',
	timesheetModule:'../app/scripts/timesheetModule',
  timeserviceModule:'../app/scripts/timeserviceModule',
	mocha: 'lib/mocha/mocha',
    chai: 'lib/chai'
  }
});
 
require(['require', 'chai', 'mocha','jquery'], function(require, chai){
  "use strict";
  // Chai
  var should = chai.should();
 
  /*globals mocha */
  mocha.setup('bdd');
 
  require(['spec/mapperTests.js','spec/overviewCalculationTests.js','spec/timesheetTests.js'], function(require) {
    mocha.run();
  });
});
