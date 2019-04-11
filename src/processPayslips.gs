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
  sendPayslips(filteredData);
}
