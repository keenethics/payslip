# Payslip
## <span style="color:red">DEPRECATED!!</span>
## Introduction
Payslip is [Container-bound Script](https://developers.google.com/apps-script/guides/bound), for google sheet. It can help you send payslips only by one button click! Enjoy 😉

## Installing
1. To create a bound script, open a Google Sheets file, then select Tools > Script editor. To reopen the script in the future, do the same thing. Because bound scripts do not appear in Google Drive, that menu is the only way to find or open the script.
2. Set some name for your project (a top left corner).
3. Copy all files from <b>src</b> folder to your project. For now, you need manually create scripts files in the project and copy-paste files names and files contents.
4. Remove initially created <b>.gs</b> file from the project.
5. Close script editor tab and reload sheet page. After these manipulations you will see new menu item - <b>Payslip Manager</b>.
You on the right way 🤘

## Setting up
1. Open script editor Tools > Script editor.
2. Open file `sendPayslips.gs` and replace `BCC_RECIPIENT` string with an email address which will receive copies of every sent payslip.