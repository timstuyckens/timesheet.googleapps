require.config({
  paths: {
    jquery: '../app/scripts/vendor/jquery.min',
	utils:'../app/scripts/utils',
	knockout:'../app/scripts/vendor/knockout-2.2.0',
	moment:'../app/scripts/vendor/moment.min',
	mapperModule:'../app/scripts/mapperModule',
	SettingsViewModel:'../app/scripts/SettingsViewModel',
	overviewCalculationModule:'../app/scripts/overviewCalculationModule',
	timesheetModule:'../app/scripts/timesheetModule',
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
