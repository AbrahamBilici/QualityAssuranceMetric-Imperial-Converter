'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();
  app.route('/api/convert').get((req, res) => {
    const { input } = req.query;





    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);



    if (initNum === "invalid number" && initUnit === "invalid unit") {
      return res.send('invalid number and unit');
    }
    if (initNum === "invalid number") {
      return res.send('invalid number');
    }
    if (initUnit === "invalid unit") {
      return res.send("invalid unit");
    }

    const returnNum = Number(convertHandler.convert(initNum, initUnit));
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    return res.json({ initNum, initUnit, returnNum, returnUnit, string })


  });
};
