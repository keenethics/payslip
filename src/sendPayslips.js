function sendPayslips(payslips) {
  function showDraftLabelErrorMessage() {
    const ui = SpreadsheetApp.getUi();
    const result = ui.alert(
      t('Error on getting email draft'),
      t('You did not add "payslip-template" label to the email draft'),
      ui.ButtonSet.OK
    );
  }
  
  try {
    var label = GmailApp.getUserLabelByName("payslip-template");
    var thread = label.getThreads()[0];
    var template = thread.getMessages()[0];
  } catch(err) {
    return showDraftLabelErrorMessage();
  }
  
  const sendPayslipEmail = function (payslip) {
  
    const interpolate = function (str) {
      var withoutHTML = str.replace(/{{(.+?)}}/g, function (m, g) {
        return '{{' + g.replace(/<[^>]*>/g, '') + '}}';
      });
            
      return withoutHTML.replace(/{{([a-zA-Z_]+)}}/g, function(match, variable){
        return payslip[variable];
      });
    };
    
    const body = interpolate(template.getBody());
    const subject = interpolate(template.getSubject());
    const bcc = scriptProperties.getProperty('bcc');
    
    if (!bcc) throw new Error(t('Please fill: Payslip > Settings > Duplicate message to'));
  
    GmailApp.sendEmail(payslip.email, subject, null, {
      htmlBody: body,
      bcc: bcc
    });
  }
  
  payslips.forEach(sendPayslipEmail);
}
