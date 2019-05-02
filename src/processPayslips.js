function processPayslips() {
  var data = generateData();
  sendPayslips(data);
}

function processSelectedPayslips() {
  var data = generateData();
  
  var filteredData = [];
  
  for (var i = 0; i < data.length; i++) {
    if (data[i].selected) {
      filteredData[i] = data[i];
    }
  }
  
  var ui = SpreadsheetApp.getUi(); 
  var result = ui.alert(
     t('Send {{count}} payslips?', { count: filteredData.length }),
     '',
      ui.ButtonSet.YES_NO);
      
  if (result == ui.Button.YES) {
    sendPayslips(filteredData);
  }
}
