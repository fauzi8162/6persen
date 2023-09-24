const addButton = document.getElementById('addButton');
const processButton = document.getElementById('processButton');
const inputContainer = document.getElementById('inputContainer');
const btnContainer = document.getElementById('btnAddOk');
const resultContainer = document.getElementById('resultContainer');
const sendWaContainer = document.getElementById('sendwaContainer');
const resultLabel = document.getElementById('resultLabel');

	sendWaContainer.style.display = 'none'; // sembunyikan sendWaContainer
var arrDate = [];
var arrNominal = [];

function validateAndFormatInput(input) {
  const inputValue = input.value;
  const lastTypedCharacter = inputValue[inputValue.length - 1];
  //console.log('Last Typed Character:', lastTypedCharacter);
  const numericValue = inputValue.replace(/\D/g, ''); // Hanya mengambil karakter angka
  const numericCheck = lastTypedCharacter.replace(/\D/g, ''); // Hanya mengambil karakter angka

  if (lastTypedCharacter !== numericCheck) {
    alert('Data harus angka saja, ga perlu ada titik');
    input.value = numericValue;
   // return;
  }

  const formattedValue = formatAngka(numericValue);
  input.value = formattedValue;
}

const textInputs = document.querySelectorAll('.text-input');
for (const input of textInputs) {
  input.addEventListener('input', () => {
    validateAndFormatInput(input);
  });
}

addButton.addEventListener('click', () => {
  const newInputGroup = document.createElement('div');
  newInputGroup.classList.add('input-group');
  newInputGroup.innerHTML = `
    <input type="date" class="date-input" required>
    <input type="text" class="text-input" placeholder="Input text" required>
  `;
  inputContainer.insertBefore(newInputGroup, btnContainer);

  const newTextInputs = newInputGroup.querySelectorAll('.text-input');
  for (const input of newTextInputs) {
    input.addEventListener('input', () => {
      validateAndFormatInput(input);
    });
  }
});

processButton.addEventListener('click', () => {
  const dateInputs = document.querySelectorAll('.date-input');
  const textInputs = document.querySelectorAll('.text-input');

  let result = '';

  for (let i = 0; i < textInputs.length; i++) {
    const dateValue = dateInputs[i].value;
    const textValue = textInputs[i].value.replace(/\D/g, '');
	arrDate.push(dateValue);
	arrNominal.push(textValue);
    //result += `Input ${i + 1} - Date: ${dateValue}, Text: ${textValue}\n`;
  }
  
  prosesText(arrDate, arrNominal);
});

// Fungsi untuk mengubah format bulan dari angka menjadi nama bulan
function getMonthName(monthNumber) {
    const months = [
        "Januari", "Februari", "Maret", "April",
        "Mei", "Juni", "Juli", "Agustus",
        "September", "Oktober", "November", "Desember"
    ];
    return months[monthNumber - 1];
}
// Fungsi untuk mengubah format tanggal
function normalizeDate(dateString) {
    var parts = dateString.split('-');
   // console.log(parts);
    var day = parts[2];
    var month = parts[1];
    var year = parts[0].substring(2);
    var formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
}

function prosesText(date, nominal){
	// Normalisasi data tanggal
	var formatDate = date.map(function(dateString) {
		var parts = dateString.split('-');
		var day = parseInt(parts[2]);
		var month = getMonthName(parseInt(parts[1]));
		var year = parseInt(parts[0]);
		return [day, month, year];
	});
	
	// Normalisasi data tanggal, untuk kebutuhan chat
	var formatDate2 = date.map(function(dateString) {
    return normalizeDate(dateString);
});
	var sBulan = formatDate[[[0]]][1];
	var sTahun = formatDate[[[0]]][2];
	var txtHeader1 = "Total Pemasukan Bulan " + sBulan + " " + sTahun + " :" + "<br><br>";
	var txt2 = [];
	var totNom = 0;
	for(var i = 0; i< date.length;i++){
		txt2.push(formatDate2[i].replace(/-/g, ".") + " Pemasukan : Rp " + formatAngka(nominal[i]) + "<br>");
		totNom = totNom + parseInt(nominal[i]);
	}
	var totPersen = (totNom * (nPersen/100));
	var totalNominal = formatAngka(totNom.toString());
	var totalPersen = formatAngka(totPersen.toString());
	var totalNomMinPersen = formatAngka((totNom - totPersen).toString());
	var txt3 = "<br>Rp " + totalNominal + " x " + nPersen + "% = Rp " + totalPersen;
	var txt4 = "<br><br>Total Setor = Rp " + totalNominal + " - Rp " + totalPersen + " = " + totalNomMinPersen;
	var txt5 = "<br><br>Setoran Rp " + totalNomMinPersen;
	
	console.log("datebiasa ", date);
	console.log("date untuk chat ", formatDate2);
	console.log("formatDate ", formatDate[[[0]]][1]);
	console.log("nominal ", nominal);
	
	myText = txtHeader1 + txt2.join("") + txt3  + txt4 + txt5;
	resultLabel.innerHTML  = myText;
	resultContainer.style.display = 'block'; // Menampilkan resultContainer
	sendWaContainer.style.display = 'block'; // Menampilkan sendWaContainer
}

/* resultContainer.addEventListener('click', () => {
  const resultText = resultLabel.textContent;

  if (resultText) {
    const textArea = document.createElement('textarea');
    textArea.value = resultText;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);

    alert('Teks berhasil disalin ke clipboard!');
  }
}); */


/* function copyTextWithNewlines() {
  var textWithNewlines = "Baris pertama\nBaris kedua";
  
  navigator.clipboard.writeText(textWithNewlines)
    .then(function() {
      alert("Teks berhasil disalin dengan baris baru!");
    })
    .catch(function(error) {
      console.error("Gagal menyalin teks:", error);
    });
}
 */
 myText = "";
 function copyTextWithLineBreaks() {
  var textWithLineBreaks = myText;
  var tempElement = document.createElement("div");
  tempElement.innerHTML = textWithLineBreaks;
  document.body.appendChild(tempElement);
  
  var range = document.createRange();
  range.selectNode(tempElement);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  
  try {
    document.execCommand("copy");
    alert('Teks berhasil disalin ke clipboard!');
  } catch (error) {
    console.error("Gagal menyalin teks:", error);
  }
  
  window.getSelection().removeAllRanges();
  document.body.removeChild(tempElement);
}

//resultContainer.addEventListener("click", copyTextWithNewlines);
resultContainer.addEventListener("click", copyTextWithLineBreaks);



function tampilkanInput() {
            const inputValue = prompt("Masukkan nomor wa jgn tulis angka 0 pertama: \nContoh = 89665123456");
            
            if (inputValue !== null) {
				var openUrl = "https://api.whatsapp.com/send?phone=62" + inputValue + "&text=" + formatTextForWhatsAppAPI(myText);
				console.log(openUrl);
				window.open(openUrl)
               // alert("Anda memasukkan: " + inputValue);
            } else {
                //alert("Anda membatalkan input.");
            }
        }
sendWaContainer.addEventListener("click", tampilkanInput);


function formatTextForWhatsAppAPI(text) {
  // Mengganti karakter-karakter yang diperlukan
  const formattedText = text
    .replace(/<br>/g, '%0A') // Mengganti <br> menjadi %0A (baris baru)
    .replace(/ /g, '%20') // Mengganti spasi menjadi %20
    .replace(/:/g, '%3A') // Mengganti titik dua (:) menjadi %3A
    .replace(/6%/g, '6%25') // Mengganti titik dua (:) menjadi %3A
    .replace(/Rp/g, '%20Rp'); // Mengganti Rp menjadi %20Rp (spasi di depan Rp)

  return formattedText;
}

function formatAngka(number) {
  return number.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

