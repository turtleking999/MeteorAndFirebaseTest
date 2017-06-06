// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by path.js.
import { name as packageName } from "meteor/path";

// Write your tests here!
// Here is an example.
Tinytest.add('path - example', function (test) {
  test.equal(packageName, "path");
});
