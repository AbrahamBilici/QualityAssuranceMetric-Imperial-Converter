const returnUnits = {
  gal: "L",
  L: "gal",
  mi: "km",
  km: "mi",
  lbs: "kg",
  kg: "lbs",
}


const unitNames = {
  gal: "gallons",
  mi: "miles",
  km: "kilometers",
  lbs: "pounds",
  kg: "kilograms",
}
const shortUnits = ["gal", "mi", "km", "lbs", "kg"]
function ConvertHandler() {





  this.getNum = function (input) {

    const letter = /^[a-zA-Z]+$/.exec(input);
    const noLetters = /^\d+(?:\.\d+)?(?:\/\d+(?:\.\d+)?)?$/;
    const pattern = /^\d+(?:\.\d+)?(?:\/\d+(?:\.\d+)?)?[a-zA-Z]+$/;
    const numbers = /^(.*?)(?=[a-zA-Z])/;


    if (input === "") {
      return 1;
    }


    if (letter !== null) {

      return 1;

    }

    if (input[0] === ".") {

      const newInput = 0 + input;


      if (noLetters.test(newInput) === true) {
        const result = noLetters.exec(newInput)[0];
        if (result.includes("/")) {
          const parts = result.split("/");
          const numerator = parseFloat(parts[0]);
          const denominator = parseFloat(parts[1]);
          const num = numerator / denominator;
          return num;
        } else {
          const num = Number(result);
          return num;
        }

      }

      if (pattern.test(newInput) === true) {
        const result = numbers.exec(newInput)[0];
        if (result.includes("/")) {
          const parts = result.split("/");
          const numerator = parseFloat(parts[0]);
          const denominator = parseFloat(parts[1]);
          const num = numerator / denominator;
          return num;
        } else {
          const num = Number(result);
          return num;
        }

      }
    }


    const newInput = input;

    if (noLetters.test(newInput) === true) {
      const result = noLetters.exec(newInput)[0];

      if (result.includes("/")) {
        const parts = result.split("/");
        const numerator = parseFloat(parts[0]);
        const denominator = parseFloat(parts[1]);
        const num = numerator / denominator;
        return num;
      } else {
        const num = Number(result);
        return num;
      }

    }

    if (pattern.test(newInput) === true) {
      const result = numbers.exec(newInput)[0];
      if (result.includes("/")) {
        const parts = result.split("/");
        const numerator = parseFloat(parts[0]);
        const denominator = parseFloat(parts[1]);
        const num = numerator / denominator;
        return num;
      } else {
        const num = Number(result);
        return num;
      }

    }

    return 'invalid number';



  };








  this.getUnit = function (input) {

    const pattern = /[a-zA-Z]+$/;
    const chk = pattern.test(input);
    const result = pattern.exec(input);

    if (chk === true) {
      if (result[0].toLowerCase() === "l") {
        return "L"
      } else if (shortUnits.includes(result[0].toLowerCase()) === true) {
        return result[0].toLowerCase();
      } else {

        return "invalid unit";
      }


    } else {
      return 'invalid unit';
    }



  };





  this.getReturnUnit = function (initUnit) {
    return returnUnits[initUnit];
  };

  this.spellOutUnit = function (unit) {
    const lowercaseUnit = unit.toLowerCase();
    if (lowercaseUnit === "l") {
      return "liters";
    } else {
      return unitNames[lowercaseUnit];
    }
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    const conversionRate = {
      gal: galToL,
      L: 1 / galToL,
      mi: miToKm,
      km: 1 / miToKm,
      lbs: lbsToKg,
      kg: 1 / lbsToKg
    }

    const numericInitNum = parseFloat(initNum);
    const returnRate = conversionRate[initUnit] * numericInitNum;
    return Number(returnRate.toFixed(5));

  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    const unitName = this.spellOutUnit(initUnit);
    const returnUnitName = this.spellOutUnit(returnUnit);
    let result = `${initNum} ${unitName} converts to ${returnNum} ${returnUnitName}`;

    return result;
  };

}

module.exports = ConvertHandler;
