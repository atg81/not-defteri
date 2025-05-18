// Electron'un dosya sistemi modülü
const fs = require('fs');
const path = require('path');

// Notların saklandığı dosya yolu
const dosyaYolu = path.join(__dirname, 'notlar.json');

// Notları yükle
function notlariYukle() {
  const liste = document.getElementById('notlar-listesi');
  liste.innerHTML = '';

  // Dosya varsa oku
  if (fs.existsSync(dosyaYolu)) {
    const veriler = fs.readFileSync(dosyaYolu, 'utf-8');
    const notlar = JSON.parse(veriler);

    notlar.forEach((not, index) => {
      const li = document.createElement('li');
      li.textContent = not;
      
      // Silme butonu
      const silBtn = document.createElement('button');
      silBtn.textContent = 'Sil';
      silBtn.style.marginLeft = '10px';
      silBtn.onclick = () => notuSil(index);

      li.appendChild(silBtn);
      liste.appendChild(li);
    });
  }
}

// Notu kaydet
function notuKaydet() {
  const notAlani = document.getElementById('not-alani');
  const yeniNot = notAlani.value.trim();

  if (yeniNot === '') return;

  let notlar = [];

  // Dosya varsa eski notları al
  if (fs.existsSync(dosyaYolu)) {
    const veriler = fs.readFileSync(dosyaYolu, 'utf-8');
    notlar = JSON.parse(veriler);
  }

  // Yeni notu ekle ve kaydet
  notlar.push(yeniNot);
  fs.writeFileSync(dosyaYolu, JSON.stringify(notlar, null, 2));

  notAlani.value = '';
  notlariYukle();
}

// Notu sil
function notuSil(index) {
  if (!fs.existsSync(dosyaYolu)) return;

  const veriler = fs.readFileSync(dosyaYolu, 'utf-8');
  const notlar = JSON.parse(veriler);

  notlar.splice(index, 1); // Belirtilen index'teki notu sil

  fs.writeFileSync(dosyaYolu, JSON.stringify(notlar, null, 2));
  notlariYukle();
}

// Tüm notları temizle
function notlariTemizle() {
  if (fs.existsSync(dosyaYolu)) {
    fs.unlinkSync(dosyaYolu); // Dosyayı sil
  }

  notlariYukle(); // Ekranı temizle
}

// Sayfa yüklendiğinde notları getir
window.onload = notlariYukle;
