function openHelp() {
  var html = HtmlService.createHtmlOutputFromFile('help').setWidth(800);
  SpreadsheetApp.getUi()
      .showModalDialog(html, t('Help'));
}
