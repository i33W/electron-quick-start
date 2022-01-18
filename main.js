// main.js는 메인 프로세스 entry file 임, 메인 프로세스는 Node.js를 실행함(그러므로 CommonJS 사용 가능)
const { app, BrowserWindow } = require("electron");
// electron main process에서는 다양한 모듈을 지원함
// (1. 창 관리 2. 앱 생명주기 관리 3. 네이티브 APIs)
// app 모듈은 앱 생명주기를 관리함
// BrowserWindow 모듈은 전체 창을 관리함
const path = require("path");

const createWindow = () => {
  const win = new BrowserWindow({
    // win이라는 BrowserWindow 인스턴스 생성
    // app.whenReady() 이후 win 생성 가능
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    // macOS 일 때, 창 종료 != 앱 종료, 사용 가능한 창 없을 때 앱 활성화하면 새 창 열림
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  // non-macOS 일 때, 창 종료 => 앱 종료
  if (process.platform !== "darwin") app.quit();
});
