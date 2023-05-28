const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
    test("convertHandler should correctly read a whole number input", () => {
        assert.strictEqual(convertHandler.getNum("3mi"), 3, "reading 3");
    });

    test("convertHandler should correctly read a decimal number input", () => {
        assert.strictEqual(convertHandler.getNum("3.1mi"), 3.1, "reading 3.1");
    });

    test("convertHandler should correctly read a fractional input", () => {
        assert.strictEqual(convertHandler.getNum("3/2mi"), 1.5, "reading 1.5");
    });

    test("convertHandler should correctly read a fractional input with a decimal", () => {
        assert.strictEqual(convertHandler.getNum("1.5/2.5mi"), 0.6, "reading 0.6");
    });

    test("convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3)", () => {
        assert.strictEqual(convertHandler.getNum("3/2/3"), "invalid number", "not reading double-fraction");
    });

    test("convertHandler should correctly default to a numerical input of 1 when no numerical input is provided", () => {
        assert.strictEqual(convertHandler.getNum("L"), 1, "default to 1");
    });

    test("convertHandler should correctly read each valid input unit", () => {
        assert.strictEqual(convertHandler.getUnit("4mi"), "mi", "reading mi");
        assert.strictEqual(convertHandler.getUnit("4gal"), "gal", "reading gal");
        assert.strictEqual(convertHandler.getUnit("4L"), "L", "reading L");
        assert.strictEqual(convertHandler.getUnit("4km"), "km", "reading km");
        assert.strictEqual(convertHandler.getUnit("4lbs"), "lbs", "reading lbs");
        assert.strictEqual(convertHandler.getUnit("4kg"), "kg", "reading kg");
    });

    test("convertHandler should correctly return an error for an invalid input unit", () => {
        assert.strictEqual(convertHandler.getUnit("5.6miksg"), "invalid unit", "not reading invalid unit");
    });

    test("convertHandler should return the correct return unit for each valid input unit", () => {
        assert.strictEqual(convertHandler.getReturnUnit("gal"), "L", "gal returns correctly to L");
        assert.strictEqual(convertHandler.getReturnUnit("mi"), "km", "mi returns correctly to km");
        assert.strictEqual(convertHandler.getReturnUnit("L"), "gal", "L returns correctly to gal");
        assert.strictEqual(convertHandler.getReturnUnit("km"), "mi", "km returns correctly to mi");
        assert.strictEqual(convertHandler.getReturnUnit("kg"), "lbs", "kg returns correctly to lbs");
        assert.strictEqual(convertHandler.getReturnUnit("lbs"), "kg", "lbs returns correctly to kg");
    });

    test("convertHandler should correctly return the spelled-out string unit for each valid input unit", () => {
        assert.strictEqual(convertHandler.spellOutUnit("GAL"), "gallons", "GAL returns correctly to gallons");
        assert.strictEqual(convertHandler.spellOutUnit("MI"), "miles", "MI returns correctly to miles");
        assert.strictEqual(convertHandler.spellOutUnit("L"), "liters", "L returns correctly to liters");
        assert.strictEqual(convertHandler.spellOutUnit("KM"), "kilometers", "KM returns correctly to kilometers");
        assert.strictEqual(convertHandler.spellOutUnit("KG"), "kilograms", "KG returns correctly to kilograms");
        assert.strictEqual(convertHandler.spellOutUnit("LBS"), "pounds", "LBS returns correctly to pounds");
    });

    test("convertHandler should correctly convert gal to L", () => {
        assert.approximately(convertHandler.convert(2, "gal"), 7.57082, 0.001, "converts 2gal to 7.57082L");
    });

    test("convertHandler should correctly convert L to gal", () => {
        assert.approximately(convertHandler.convert(2, "L"), 0.52834, 0.001, "converts 2L to 0.52834gal");
    });

    test("convertHandler should correctly convert mi to km", () => {
        assert.approximately(convertHandler.convert(2, "mi"), 3.21868, 0.001, "converts 2mi to 3.21868km");
    });

    test("convertHandler should correctly convert km to mi", () => {
        assert.approximately(convertHandler.convert(2, "km"), 1.24275, 0.001, "converts 2km to 1.24275mi");
    });

    test("convertHandler should correctly convert lbs to kg", () => {
        assert.approximately(convertHandler.convert(2, "lbs"), 0.90718, 0.001, "converts 2lbs to 0.90718kg");
    });

    test("convertHandler should correctly convert kg to lbs", () => {
        assert.approximately(convertHandler.convert(2, "kg"), 4.40925, 0.001, "converts 2kg to 4.40925lbs");
    });
});
