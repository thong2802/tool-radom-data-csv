var headerData = [];

function generateCSV() {
  var headerCount = parseInt(document.getElementById('headerCount').value);
  var rowCount = parseInt(document.getElementById('rowCount').value);

  var csvContent = 'data:text/csv;charset=utf-8,';

  // Get the header values and conditions
  var headers = [];
  var conditions = [];
  for (var i = 1; i <= headerCount; i++) {
    var headerInput = document.getElementById('headerInput_' + i);
    var conditionInput = document.getElementById('conditionInput_' + i);
    headers.push(headerInput.value);
    conditions.push(conditionInput.value);
  }

  headerData = [headers, conditions];
  csvContent += headers.join(',') + '\n';

  var generatedRowCount = 0; // Biến đếm số dòng đã được tạo

  // Generate rows with random data based on conditions
  while (generatedRowCount < rowCount) {
    var row = [];
    for (var k = 0; k < headerCount; k++) {
      // Trích xuất giá trị maxLength từ input
      var maxLengthInput = document.getElementById('maxLengthInput_' + (k + 1));
      var maxLength = parseInt(maxLengthInput.value);

      // Truyền giá trị maxLength vào hàm getRandomData
       row.push(getRandomData(conditions[k], maxLength));
    }
    csvContent += row.join(',') + '\n';
    generatedRowCount++; // Tăng biến đếm số dòng đã được tạo

    if (generatedRowCount >= rowCount) {
      break; // Thoát khỏi vòng lặp nếu đã đạt số dòng mong muốn
    }

  var encodedUri = encodeURI(csvContent);
  var downloadLink = document.getElementById('downloadLink');
  downloadLink.href = encodedUri;
}

  var encodedUri = encodeURI(csvContent);
  var downloadLink = document.getElementById('downloadLink');
  downloadLink.href = encodedUri;
  downloadLink.click();
}

function addHeaderInputs() {
  var headerCount = parseInt(document.getElementById('headerCount').value);
  var headerInputsDiv = document.getElementById('headerInputs');

  headerInputsDiv.innerHTML = '';


  for (var i = 1; i <= headerCount; i++) {
    var inputDiv = document.createElement('div');
    var headerInput = document.createElement('input');
    var maxLengthInput = document.createElement('input');
    var select = document.createElement('select');

    headerInput.type = 'text';
    headerInput.id = 'headerInput_' + i;
    headerInput.placeholder = 'Header ' + i;

    maxLengthInput.type = 'number';
    maxLengthInput.id = 'maxLengthInput_' + i;
    maxLengthInput.placeholder = 'Max Length';

    select.id = 'conditionInput_' + i;
    select.innerHTML = `
      <option value="randomNumber">Random Number</option>
      <option value="randomString">Random String</option>
      <option value="randomKana">Random Kana</option>
      <option value="randomDateYYY/MM/DD">Random Date: YYY/MM/DD</option>
      <option value="randomYearYYYY">Random Date: YYYY</option>
      <option value="randomBoolean">Random Boolean</option>
      <option value="randomMixedStringAndNumber">Random String And Number</option>
      <option value="randomMixedKanaAndNumber">Random Kana And Number</option>
    `;


    inputDiv.appendChild(headerInput);
    inputDiv.appendChild(maxLengthInput);
    inputDiv.appendChild(select);
    headerInputsDiv.appendChild(inputDiv);

  }
}

// Call addHeaderInputs when the headerCount input changes
document.getElementById('headerCount').addEventListener('change', addHeaderInputs);

// Generate initial header inputs
addHeaderInputs();


function getRandomData(condition, maxLength) {
  var randomData = '';

  switch (condition) {
    case 'randomNumber':
      randomData = getRandomNumber(maxLength);
      break;
    case 'randomString':
      randomData = getRandomEnglishWord(maxLength);
      break;
    case 'randomBoolean':
      randomData = Math.random() < 0.5 ? '0' : '1';
      break;
    case 'randomKana':
      randomData = getRandomKana(maxLength);
      break;
    case 'randomDateYYY/MM/DD':
      randomData = getRandomDate();
      break;
    case 'randomYearYYYY':
      randomData = getRandomYear();
      break;
    case 'randomMixedStringAndNumber':
      randomData = getRandomKanaAndNumber();
      break;
    case 'randomMixedKanaAndNumber':
      randomData = getRandomKanaAndNumber();
      break;
    default:
      randomData = '';
  }

  return randomData;
}

function getRandomEnglishWord(maxLength) {
  var randomWord = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  for (var i = 0; i < maxLength; i++) {
    var randomIndex = Math.floor(Math.random() * characters.length);
    randomWord += characters.charAt(randomIndex);
  }

  return randomWord;
}

function getRandomNumber(maxLength) {
  var randomNumber = Math.floor(Math.random() * Math.pow(10, maxLength));
  return randomNumber.toString();
}

function getRandomNumber(maxLength) {
  var maxNumber = BigInt(Math.pow(10, maxLength) - 1);
  var randomNumber = BigInt(Math.floor(Math.random() * Number(maxNumber)));
  return randomNumber.toString();
}

function getRandomKana(maxLength) {
  var randomKana = '';
  var kanaCharacters = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん';

  while (randomKana.length < maxLength) {
    var randomIndex = Math.floor(Math.random() * kanaCharacters.length);
    var additionalKana = kanaCharacters.charAt(randomIndex);
    randomKana += additionalKana;
  }

  if (randomKana.length > maxLength) {
    randomKana = randomKana.slice(0, maxLength);
  }

  return randomKana;
}

function getRandomDate() {
  var randomDate = moment().subtract(Math.floor(Math.random() * 365), 'days');
  return randomDate.format('YYYY/MM/DD');
}

function getRandomYear() {
  var startYear = 1900; // Năm bắt đầu
  var endYear = new Date().getFullYear(); // Năm hiện tại
  var randomYear = Math.floor(Math.random() * (endYear - startYear + 1)) + startYear;
  return randomYear.toString();
}







