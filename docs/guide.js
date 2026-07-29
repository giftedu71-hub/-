const haeundaeGuideUrl = "https://www.haeundae.go.kr/index.do?menuCd=DOM_000000302001002000";

function addHaeundaeGuide() {
  const card = document.querySelector(".detail");
  const title = card?.querySelector("h2");
  if (!card || !title || card.querySelector(".beach-guide")) return;

  const photoNames = {
    "다대포해수욕장": "dadaepo-guide.jpg",
    "송도해수욕장": "songdo-guide.jpg",
    "송정해수욕장": "songjeong-guide.jpg",
    "광안리해수욕장": "gwangalli-guide.jpg",
  };

  const photoName = photoNames[title.textContent.trim()];
  if (photoName) {
    const figure = document.createElement("figure");
    figure.className = "beach-guide beach-guide-photo";
    figure.innerHTML = `<img src="./beaches/${photoName}" alt="${title.textContent.trim()} 전경">`;
    title.insertAdjacentElement("afterend", figure);
    return;
  }

  if (title.textContent.trim() !== "해운대해수욕장") return;

  const link = document.createElement("a");
  link.className = "haeundae-guide beach-guide";
  link.href = haeundaeGuideUrl;
  link.target = "_blank";
  link.rel = "noreferrer";
  link.innerHTML = '<img src="./beaches/haeundae-guide.jpg" alt="해운대해수욕장 전경"><small>사진을 누르면 이용안내(개장시간, 피서용품·편의시설 가격 등)를 볼 수 있어요.</small>';
  title.insertAdjacentElement("afterend", link);
}

new MutationObserver(addHaeundaeGuide).observe(document.querySelector("#app"), { childList: true, subtree: true });
addHaeundaeGuide();
