// preload file은 렌더러 프로세스에서 실행됨
// preload file은 Renderer globals(window, document...)와 Node.js 환경(process...) 모두 액세스 가능
// main.js webPreferences 추가

window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.textContent = text;
  };

  for (const dependency of ["chrome", "node", "electron"]) {
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }
});
