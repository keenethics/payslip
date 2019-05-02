var t = i18n(Session.getActiveUserLocale());

var scriptProperties = PropertiesService.getScriptProperties();

function onOpen() {
  var spreadsheet = SpreadsheetApp.getActive();
  
  var menuItems = [
    {name: t('Send selected payslips'), functionName: 'processSelectedPayslips'},
    {name: t('Settings'), functionName: 'openSettings'},
    {name: t('Help'), functionName: 'openHelp'}
  ];
  
  spreadsheet.addMenu(t('Payslip'), menuItems);
}