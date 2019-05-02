/**
 * Generate neccessary data for all employees 
 *
 * @return {Array.<Object>} list of employee's data for payslips
 */
function generateData() {
  const payslipData = [];
  const variables = {};
  var empData, name;
  const sheet = SpreadsheetApp.getActiveSheet();
  const data = sheet.getDataRange().getValues();
  for (var j = 0; j < data[0].length; j++) {
    name = data[0][j];
    if (name.trim()) variables[name] = j;
  };
  
  for (var i = 2; i < data.length; i++) {
    empData = {};    
    for (name in variables) {
      empData[name] = data[i][variables[name]];
      if (!empData[name] && name !== 'selected') empData[name] = 0;
    }

    empData.wages = empData.wages || parseFloat(empData.coef || 1) * parseFloat(empData.wage);
    empData.month = getDateString(empData.payPeriodStart);
    empData.paymentDate = getPaymentDate(empData.payPeriodStart);
    empData.payPeriodStart = getDateString(empData.payPeriodStart, true);
    empData.payPeriodEnd = getDateString(empData.payPeriodEnd, true);
    
    if (isValidRow(empData)) {
      payslipData.push(formatRowData(empData));
    }
  }
  return payslipData;
}

/**
 * Checks whether a row contains all required fields
 *
 * @param {Array.<string|number|boolean>} row A row of sheet with employee data
 * @return {boolean} is the input row valid or not
 */
function isValidRow (row) {
  var key;
  const REQUIRED_FIELDS = ["name", "payPeriodStart", "payPeriodEnd","paymentDate", "month", "email", "selected", "cur__forexRate"];
  for (var j = 0; j < REQUIRED_FIELDS.length; j++) {
    key = REQUIRED_FIELDS[j];
    if (!row[key] || row[key] === 0) return false;
  };
  return true;
}

/**
 * Formats date value 
 *
 * @param {string} srt A string that contains date expression
 * @param {boolean} dotFormat Return 'dd.mm.yyyy' or 'MMMM yyyy' formatted date 
 * @return {string} A formatted date string
 */
function getDateString (str, dotFormat) {
  var mLong = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const date = new Date (str);
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  if (dotFormat) {
    var day = date.getDate();
    if (day < 10) {
      day = '0' + day;
    }
    if (month < 10) {
      month = '0' + month;
    }
    return day + "." + month + "." + year;
  }
  return mLong[month] + ' ' + year;
}

/**
 * Get a date of payment
 *
 * @param {string} startDate A string that contains date expression
 * @return {string} A formatted date string that represents the Payment date
 */
function getPaymentDate (startDate) {
  var date = new Date(startDate);
  date.setMonth(date.getMonth() + 1);
  date.setDate(10);
  return getDateString(date, true);
}

/**
 * Formats currency value 
 *
 * @param {number|string} number Number to format
 * @return {string} A formatted currency string
 */
function formatCurrency(number) {
  if (isNaN(number)) return number;
  return parseFloat(number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

/**
 * Formats each field in the emaployee data that contains a currency value
 *
 * @param {Object} empData Input data of the employee
 * @return {Object} An object with currency formatted fileds 
 */
function formatRowData (empData) {
  var keys = Object.keys(empData);
  var name, prefix, formatedData = {};
  for (var i = 0; i < keys.length; i++) {
    name = keys[i];
    prefix = name.split("__")[0];
    if (prefix === 'cur' || prefix === 'deduction') {
      formatedData[name] = formatCurrency(parseFloat(empData[name]));
    } else {
      formatedData[name] = empData[name];
    }
  }
  return formatedData;
}
