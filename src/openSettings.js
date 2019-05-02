function openSettings() {

  var htmlOutput = HtmlService
    .createTemplateFromFile('settings.html')
    .evaluate()
    .setTitle(t('Payslip settings'));
    
  SpreadsheetApp.getUi().showSidebar(htmlOutput);
}
