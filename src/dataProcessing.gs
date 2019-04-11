function generateData() {
  const payslipData = [];
  const variables = {};
  var forexRate, name;
  var empData = {};
  var value = 0;
  var deductions = 0;
  const UAH_DEDUCTION_COLUMNS = ["advanced", "accountingService", "unifiedSocialFee", "unifiedTax", "bankFees", "otherDeductions"];
  const sheet = SpreadsheetApp.getActiveSheet();
  const data = sheet.getDataRange().getValues();
  for (var j = 0; j < data[0].length; j++) {
    name = data[0][j];
    if (name.trim()) variables[name] = j;
  };
  
  for (var i = 2; i < data.length; i++) {
    empData = {};
    value = 0;
    deductions = 0;
    forexRate = parseFloat(data[i][variables['forexRate']]);
    
    for (name in variables) {
      empData[name] = data[i][variables[name]];
      if (!empData[name] && name !== 'selected') empData[name] = 0;
      if (UAH_DEDUCTION_COLUMNS.indexOf(name) >-1 && empData[name]) {
        deductions =  deductions + parseFloat(empData[name]);
        value = parseFloat(empData[name]) / parseFloat(forexRate);
        empData[name] = value;
      }
    }

    empData.totalDeductions = parseFloat(deductions) / parseFloat(forexRate);
    empData.total_USD = parseFloat(empData.totalEarnings) - parseFloat(empData.totalDeductions);
    empData.wages = parseFloat(empData.coef || 1) * parseFloat(empData.wage);
    empData.month = getDateString(empData.payPeriodStart);
    empData.paymentDate = getPaymentDate(empData.payPeriodStart);
    empData.payPeriodStart = getDateString(empData.payPeriodStart, true);
    empData.payPeriodEnd = getDateString(empData.payPeriodEnd, true);
    
    payslipData.push(formatRowData(empData));
  }
  return payslipData;
}

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

function getPaymentDate (startDate) {
  var date = new Date(startDate);
  date.setMonth(date.getMonth() + 1);
  date.setDate(10);
  return getDateString(date, true);
}

function formatCurrency(number) {
  if (isNaN(number)) return number;
  return parseFloat(number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function formatRowData (empData) {
  const NON_CUR_FIELDS = ["name", "payPeriodStart", "payPeriodEnd","paymentDate", "month", "coef", "email", "selected"];
  var keys = Object.keys(empData);
  var name, formatedData = {};
  for (var i = 0; i < keys.length; i++) {
    name = keys[i];
    if (NON_CUR_FIELDS.indexOf(name) === -1) {
      formatedData[name] = formatCurrency(parseFloat(empData[name]));
    } else {
      formatedData[name] = empData[name];
    }
  }
  return formatedData;
}
