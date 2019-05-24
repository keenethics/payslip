function processPayslips() {
  var data = generateData();
  sendPayslips(data);
}

function processSelectedPayslips() {
  var EMPTY_STRING = '';
  var data = generateData();
  
  var filteredData = [];
  
  for (var i = 0; i < data.length; i++) {
    if (data[i].selected) {
      filteredData[i] = data[i];
    }
  }
  
  var ui = SpreadsheetApp.getUi();
  
  var result = ui.alert(
    EMPTY_STRING,
    t('Send {{count}} payslips?', { count: filteredData.length }),
     filteredData.length ? ui.ButtonSet.YES_NO : ui.ButtonSet.OK
  );
      
  if (result == ui.Button.YES) {
    sendPayslips(filteredData);
  }
}
