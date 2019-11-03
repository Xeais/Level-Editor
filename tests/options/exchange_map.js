var fs = require("fs");
var path = require("path");
var dir = path.resolve(__dirname, "../../tests/files/");
var helper = require("../helper");

module.exports =
{
  "importMap": function(test, external, makeShot, mapname) 
  {
    if(!external)
      test.open("index.html");

    mapname = mapname || "Testimport";

    console.log("Exchange - Import map: " + mapname);
    var mapfile = path.resolve(dir, mapname + ".mpr");

    test.click("#optionButton")
      .setValue("#mapFile", mapfile)
      .click("#import")
      .wait(100)
      .execute(function()
      {
        this.data("mapSizeX", window.terrain.mapSizeX);
        this.data("mapSizeY", window.terrain.mapSizeY);
        this.assert.ok(window.store.getItem("draft") === window.terrain.exportData(), "Draft should be saved.");
      })
      .assert.val("#mapName", helper.getFilename(mapname + ".mpr"), "Map name is \"" + helper.getFilename(mapname + ".wfto\".")).assert.notVisible("#options");

    makeShot && test.screenshot("./tests/images/:browser/" + mapname + "_import.png");

    if(external)
      return test;
    else
      test.done();
  },
  "importCSVMap": function(test, external, makeShot, mapname, width, height, border) 
  {
    if(!external)
      test.open("index.html");

    mapname = mapname || "Testimport";
    width = width || 40;
    height = height || 40;
    border = border || 1;

    console.log("Exchange - Import CSV map: " + mapname);
    var mapfile = path.resolve(dir, mapname + ".csv");

    test.click("#optionButton")
      .setValue("#csv", mapfile)
      .setValue("#csvBorder", "'" + border + "'")
      .click("#importcsv")
      .wait(100)
      .execute(function()
      {
        this.data("mapSizeX", window.terrain.mapSizeX);
        this.data("mapSizeY", window.terrain.mapSizeY);
        this.assert.ok(window.store.getItem("draft") === window.terrain.exportData(), "Draft should be saved.");
      })
      .assert.val("#mapName", helper.getFilename(mapname + ".csv"), "Map name is \"" + helper.getFilename(mapname + ".csv\"."))
      .assert.notVisible("#options");

    makeShot && test.screenshot("./tests/images/:browser/" + mapname + "_csvimport.png");

    if(external)
      return test;
    else
      test.done();
  },
  "exportMap": function(test, external, mapname)
  {
    if(!external)
      test.open("index.html");

    test.done();
    /* mapname = mapname || "Testimport";
       test.click("#optionButton")
           .setValue("#mapFile", dir + mapname + ".mpr")
           .click("#import")
           .click("#optionButton")
           .click("#export");
  
       if(external) 
         return test;
       else 
         test.done(); */
  }
};