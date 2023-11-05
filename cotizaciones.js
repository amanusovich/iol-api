function loginIOL () {
  const urlLogin = 'https://api.invertironline.com/token'
  const headers = {'Content-Type': 'application/x-www-form-urlencoded'};
  const payload = 'username=your-username&password=your-password&grant_type=password';
  const options = {
    'headers': headers,
    'method': 'post',
    'payload': payload
  }
  const response = UrlFetchApp.fetch(urlLogin, options)
  return JSON.parse(response.getContentText()).access_token;
}

const apiKey = 'your-api-key'

function cotizaciones ({
  instrumento = 'ggal',
  pais = 'argentina',
  panelCotizacionInstrumento = 'acciones',
  row = 1,
  col = 1
} = {}) {
  const accessToken = loginIOL();
  const url = `https://api.invertironline.com/api/v2/Cotizaciones/${instrumento}/${pais}/Todos?cotizacionInstrumentoModel.instrumento=${panelCotizacionInstrumento}&cotizacionInstrumentoModel.pais=${pais}&api_key=${apiKey}`;
  const headers = { 'Authorization': 'Bearer ' + accessToken };
  const options = {
    'headers': headers
  };
  const response = UrlFetchApp.fetch(url, options);
  const json = JSON.parse(response.getContentText());
  const titulos = json.titulos;

  let data = [['Símbolo', 'Último precio', 'Variación porcentual']];
  titulos.forEach((titulo) => data.push([titulo.simbolo, titulo.ultimoPrecio, titulo.variacionPorcentual]));

  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const cotizacionesSpreadsheet = activeSpreadsheet.getSheetByName('cotizaciones');

  cotizacionesSpreadsheet.getRange(row, col, 200, 3).clearContent();
  const range = cotizacionesSpreadsheet.getRange(row, col, data.length, 3);
  range.setValues(data);
  range.setBackground('#b6d7a8');
  
  SpreadsheetApp.flush();
  range.setBackground('white');
}

function cotizacionesTrigger() {
  cotizaciones();
  cotizaciones({ panelCotizacionInstrumento: 'titulosPublicos', col: 5 });
  cotizaciones({ panelCotizacionInstrumento: 'obligacionesNegociables', col: 9 });
}
