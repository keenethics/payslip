function openHelp() {
  var html = HtmlService.createHtmlOutputFromFile('help');
  SpreadsheetApp.getUi()
      .showModalDialog(html, t('Help'));
}
