function sendPayslips(payslips) {
  const label = GmailApp.getUserLabelByName("payslip-template");
  const thread = label.getThreads()[0];
  const template = thread.getMessages()[0];
  
  const sendPayslipEmail = function (payslip) {
  
    const interpolate = function (str) {
      return str.replace(/{{([a-zA-Z_]+)}}/g, function(match, variable){
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
