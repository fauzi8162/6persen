// Fungsi untuk mengonversi daftar ke checkbox list
function createCheckboxList(items) {
    const checkboxList = document.getElementById('checkboxList');
    checkboxList.innerHTML = ''; // Reset the list

    items.forEach(item => {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        const span = document.createElement('span');
        span.textContent = item;

        li.appendChild(checkbox);
        li.appendChild(span);

        checkbox.addEventListener('change', function () {
            if (checkbox.checked) {
                li.classList.add('checked');
            } else {
                const confirmUncheck = confirm(`Apakah tidak jadi mencoret "${item}"?`);
                if (confirmUncheck) {
                    li.classList.remove('checked');
                } else {
                    checkbox.checked = true;
                }
            }
        });

        checkboxList.appendChild(li);
    });
}

// Fungsi untuk memproses input textarea
document.getElementById('processButton').addEventListener('click', function () {
    const textInput = document.getElementById('textInput').value;
    if (!textInput.trim()) {
        alert('Silakan masukkan daftar terlebih dahulu!');
        return;
    }
	hideElement(["processButton", "textInput", "shareButton"]);
    const items = textInput.split('\n').filter(item => item.trim() !== '');
    createCheckboxList(items);
});

// Fungsi untuk membuat URL dengan data
document.getElementById('shareButton').addEventListener('click', function () {
    const textInput = document.getElementById('textInput').value;
    if (!textInput.trim()) {
        alert('Silakan masukkan daftar terlebih dahulu!');
        return;
    }
	hideElement(["processButton", "textInput", "shareButton"]);
    const encodedData = encodeURIComponent(textInput);
    const url = `${window.location.origin}${window.location.pathname}#data=${encodedData}`;

    // Tampilkan URL
    const generatedUrl = document.getElementById('generatedUrl');
    generatedUrl.textContent = `Bagikan URL ini: ${url}`;
    generatedUrl.style.color = 'blue';
    generatedUrl.style.cursor = 'pointer';

    // Salin URL ke clipboard saat diklik
    generatedUrl.addEventListener('click', () => {
        navigator.clipboard.writeText(url);
        alert('URL disalin ke clipboard!');
    });
});

// Fungsi untuk membaca data dari URL
window.addEventListener('load', function () {
    const hash = window.location.hash;
    if (hash.startsWith('#data=')) {
        const decodedData = decodeURIComponent(hash.slice(6));
        const items = decodedData.split('\n').filter(item => item.trim() !== '');
        createCheckboxList(items);

        // Isi textarea dengan data untuk referensi
        document.getElementById('textInput').value = decodedData;
		hideElement(["processButton", "textInput", "shareButton"]);
    }
});

function hideElement(arrElm){
	for(var i = 0;i<arrElm.length;i++) document.getElementById(arrElm[i]).style.display = "none";
}
