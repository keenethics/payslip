function onOpen() {
  var spreadsheet = SpreadsheetApp.getActive();
  var menuItems = [
    {name: 'Send all payslips', functionName: 'processPayslips'},
    {name: 'Send selected payslips', functionName: 'processSelectedPayslips'}
  ];
  spreadsheet.addMenu('Payslip Manager', menuItems);
}
