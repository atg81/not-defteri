// Electron modüllerini dahil et
const { app, BrowserWindow } = require('electron');
const path = require('path');

// Pencereyi oluşturacak fonksiyon
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,      // Renderer'da Node.js kullanmamızı sağlar
      contextIsolation: false     // nodeIntegration ile birlikte kullanılır
    }
  });

  win.loadFile('index.html');    // Ana HTML dosyasını yükle
}

// Uygulama hazır olduğunda pencereyi oluştur
app.whenReady().then(createWindow);

// Tüm pencereler kapandığında uygulamayı kapat
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Mac için: uygulama aktifse ve pencere yoksa yeni pencere aç
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
