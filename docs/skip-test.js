const quickTypes = [
  ["quiet", "여유로운 해달형", [1, 1, 1, 1, 1]],
  ["dadaepo", "낭만적인 해파리형", [2, 2, 1, 1, 2]],
  ["songdo", "알차게 즐기는 해마형", [2, 2, 2, 2, 2]],
  ["songjeong", "파도 타는 돌고래형", [3, 2, 2, 2, 3]],
  ["gwangalli", "감성 타는 가오리형", [3, 3, 3, 3, 2]],
  ["haeundae", "활기찬 범고래형", [4, 4, 3, 3, 3]],
];

function renderQuickPicker() {
  app.innerHTML = head() + `<section class="quick-picker"><p class="eyebrow">SKIP THE TEST</p><h1>궁금한 유형을<br>직접 골라보세요</h1><p>원하는 유형을 누르면 결과와 상세 정보를 바로 볼 수 있어요.</p><div class="quick-grid">${quickTypes.map(([key, name]) => `<button onclick="showQuickType('${key}')"><span class="quick-animal ${key}"></span><strong>${name}</strong><small>${beaches[key].beach}</small></button>`).join("")}</div><button class="primary quick-map" onclick="showQuickMap()">바다 보러가기 →</button></section>`;
}

window.showQuickType = (key, fromRelation = false) => {
  const type = quickTypes.find(([itemKey]) => itemKey === key);
  if (fromRelation && !window.relatedTypeViewing) window.myResultAnswers = [...a];
  if (fromRelation) window.returnToOriginalAvailable = true;
  window.relatedTypeViewing = fromRelation || Boolean(window.returnToOriginalAvailable);
  a = type[2];
  window.quickViewing = true;
  screen = "result";
  render();
  scrollTo(0, 0);
};

window.showQuickMap = () => {
  selected = "haeundae";
  screen = "map";
  render();
  scrollTo(0, 0);
};

window.showOtherTypes = () => {
  if (!window.myResultAnswers || !window.relatedTypeViewing) window.myResultAnswers = [...a];
  window.returnToOriginalAvailable = true;
  window.browsingTypesFromResult = true;
  window.quickViewing = false;
  window.relatedTypeViewing = false;
  renderQuickPicker();
};

window.backToQuickTypes = window.showOtherTypes;

window.backToMyResult = () => {
  if (!window.myResultAnswers) return;
  a = [...window.myResultAnswers];
  window.relatedTypeViewing = false;
  window.browsingTypesFromResult = false;
  window.returnToOriginalAvailable = false;
  window.quickViewing = false;
  screen = "result";
  render();
  scrollTo(0, 0);
};

function addQuickBackButton() {
  const actions = document.querySelector(".result-actions");
  if (!actions || actions.querySelector(".quick-back")) return;
  const button = document.createElement("button");
  button.className = "ghost quick-back";
  button.type = "button";
  button.textContent = "다른 유형 보기";
  button.addEventListener("click", window.showOtherTypes);
  actions.prepend(button);
}

function addMyResultButton() {
  const actions = document.querySelector(".result-actions");
  if (!window.returnToOriginalAvailable || !actions || actions.querySelector(".my-result-back")) return;
  const button = document.createElement("button");
  button.className = "primary my-result-back";
  button.type = "button";
  button.textContent = "내 결과로 돌아가기";
  button.addEventListener("click", window.backToMyResult);
  actions.prepend(button);
}

function addSkipButton() {
  const actions = document.querySelector(".card .actions");
  if (!document.querySelector(".answers") || !actions || document.querySelector(".skip-test")) return;
  const button = document.createElement("button");
  button.className = "skip-test";
  button.type = "button";
  button.textContent = "테스트 건너뛰기";
  button.addEventListener("click", renderQuickPicker);
  actions.insertAdjacentElement("afterend", button);
}

new MutationObserver(() => { addSkipButton(); addQuickBackButton(); addMyResultButton(); }).observe(app, { childList: true, subtree: true });
document.addEventListener("click", (event) => {
  if (event.target.closest("button")?.textContent.trim() === "다시 하기") {
    window.quickViewing = false;
    window.relatedTypeViewing = false;
    window.browsingTypesFromResult = false;
    window.returnToOriginalAvailable = false;
    window.myResultAnswers = null;
  }
});
addSkipButton();
addMyResultButton();

let fontScale = 1;
function applyFontScale() {
  document.querySelectorAll("#app *").forEach((element) => {
    const current = parseFloat(getComputedStyle(element).fontSize);
    if (!current) return;
    const base = Number(element.dataset.baseFontSize || current / fontScale);
    element.dataset.baseFontSize = base;
    element.style.fontSize = `${base * fontScale}px`;
  });
}

function addFontSizeControl() {
  if (document.querySelector(".font-size-control")) return;
  const control = document.createElement("div");
  control.className = "font-size-control";
  control.setAttribute("aria-label", "글씨 크기 조절");
  control.innerHTML = '<button type="button" data-size="down" aria-label="글씨 작게">가−</button><button type="button" data-size="reset" aria-label="기본 글씨 크기">기본</button><button type="button" data-size="up" aria-label="글씨 크게">가+</button>';
  control.addEventListener("click", (event) => {
    const direction = event.target.closest("button")?.dataset.size;
    if (!direction) return;
    fontScale = direction === "reset" ? 1 : Math.min(1.3, Math.max(0.9, Number((fontScale + (direction === "up" ? 0.1 : -0.1)).toFixed(1))));
    applyFontScale();
  });
  document.body.appendChild(control);
}

new MutationObserver(() => applyFontScale()).observe(app, { childList: true, subtree: true });
addFontSizeControl();
