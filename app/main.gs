/**
 * @OnlyCurrentDoc  Limits the script to only accessing the current spreadsheet.
 */

var DIALOG_TITLE = 'Graphpaperize Dialog';
var DEFAULT_WIDTH = 20;
var DEFAULT_HEIGHT = 20;

/**
 * Adds a custom menu with items to show the sidebar and dialog.
 *
 * @param {Object} e The event parameter for a simple onOpen trigger.
 */
function onOpen(e) {
  SpreadsheetApp.getUi()
      .createAddonMenu()
      .addItem('Show dialog', 'showDialog')
      .addToUi();
}

/**
 * Runs when the add-on is installed; calls onOpen() to ensure menu creation and
 * any other initializion work is done immediately.
 *
 * @param {Object} e The event parameter for a simple onInstall trigger.
 */
function onInstall(e) {
  onOpen(e);
}

/**
 * Opens a dialog. The dialog structure is described in the Dialog.html
 * project file.
 */
function showDialog() {
  var ui = HtmlService.createTemplateFromFile('Dialog')
      .evaluate()
      .setWidth(400)
      .setHeight(190);
  SpreadsheetApp.getUi().showModalDialog(ui, DIALOG_TITLE);
}

/**
 * Convert a current sheet to Graph paper
 *
 * @param {String} action An identifier for the action to take.
 */
function doGraphpaperize(width, height) {
  var sheets = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = sheets.getActiveSheet();
  var columnWidth = !width ? DEFAULT_WIDTH : width;
  var columnHeight = !height ? DEFAULT_HEIGHT : height;
  var columnNum = sheet.getMaxColumns();
  for (var i = 1; i <= columnNum; i++) {
    sheet.setColumnWidth(i, columnWidth);
  }
  var rowNum = sheet.getMaxRows();
  for (var i = 1; i <= rowNum; i++) {
    sheet.setRowHeight(i, columnHeight);
  }
}
