function i18n(locale) {  
  const uk = {
    'Send selected payslips': 'Відправити вибраним',
    'Settings': 'Налаштування',
    'Payslip': 'Платіжний лист',
    'Payslip settings': 'Налаштування',
    'Help': 'Довідка',
    'Send {{count}} payslips?': {
      compute: function(values) {
        if (values.count === 0) return 'Виберіть адресатів для відправки.';
        if (values.count === 1) return 'Надсилаємо 1 лист?';
        if (values.count >= 2 && values.count <= 4) return 'Надсилаємо {{count}} листи?';
        if (values.count > 4) return 'Надсилаємо {{count}} листів?';
        return 'Надсилаємо {{count}} листів?';
      }
     },
     'Duplicate message to': 'Дублювати повідомлення на',
     'Save settings': 'Зберегти налаштування',
     'Please fill: Payslip > Settings > Duplicate message to': 'Будь ласка, заповніть: Платіжний лист > Налаштування > Дублювати повідомлення на',
     'Settings successfully saved': 'Налаштування успішно збережено'
  };
  
  const en = {
    'Send {{count}} payslips?': {
      compute: function(values) {
        if (values.count === 0) return 'Choose an addressee.';
        if (values.count === 1) return 'Send one payslip?';
        return 'Send {{count}} payslips?';
      }
     }
  };

  function init(translations) {
    return function t(key, values) {      
      var result = translations[key] || key;
      
      if(typeof result === 'object') {
        result = result.compute(values);
      }
      
      if (!values) return result;
      
      return result.replace(/{{(.+)}}/g, function(match, variable){
        return values[variable];
      });
    }
  }
  
  switch(locale) {
    case 'ru':
    case 'uk': return init(uk);
    default: return init(en);
  }
}
