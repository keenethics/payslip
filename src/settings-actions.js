function setSettingsData(data) {  
  scriptProperties.setProperties(data);
  return scriptProperties.getProperties();
};

function getSettings(){
  return scriptProperties.getProperties();
};

function clearAllSettings(){
  return PropertiesService
    .getScriptProperties()
    .deleteAllProperties()
    .getProperties();
};

function showSuccessSavedSettingsAlert() {
  var ui = SpreadsheetApp.getUi();
  var isOk = ui.alert(t('Settings successfully saved'));
  return isOk == ui.Button.OK;
};
