const haeundaeGuideUrl = "https://www.haeundae.go.kr/index.do?menuCd=DOM_000000302001002000";

function addHaeundaeGuide() {
  const card = document.querySelector(".detail");
  const title = card?.querySelector("h2");
  if (!card || !title || card.querySelector(".beach-guide")) return;

  const photoNames = {
    "다대포해수욕장": "dadaepo-guide.jpg",
    "송도해수욕장": "songdo-guide.jpg",
    "송정해수욕장": "songjeong-guide.jpg",
  };

  const photoName = photoNames[title.textContent.trim()];
  if (photoName) {
    const figure = document.createElement("figure");
    figure.className = "beach-guide beach-guide-photo";
    figure.innerHTML = `<img src="./beaches/${photoName}" alt="${title.textContent.trim()} 전경">`;
    title.insertAdjacentElement("afterend", figure);
    return;
  }

  const guideLinks = {
    "해운대해수욕장": { image: "haeundae-guide.jpg", url: haeundaeGuideUrl },
    "광안리해수욕장": { image: "gwangalli-guide.jpg", url: "https://www.suyeong.go.kr/tour/index.suyeong?menuCd=DOM_000001102002004000" },
  };
  const guide = guideLinks[title.textContent.trim()];
  if (!guide) return;

  const link = document.createElement("a");
  link.className = "haeundae-guide beach-guide";
  link.href = guide.url;
  link.target = "_blank";
  link.rel = "noreferrer";
  link.innerHTML = `<img src="./beaches/${guide.image}" alt="${title.textContent.trim()} 전경"><small>사진을 누르면 이용안내(개장시간, 피서용품·편의시설 가격 등)를 볼 수 있어요.</small>`;
  title.insertAdjacentElement("afterend", link);
}

function addRestaurantList() {
  const card = document.querySelector(".detail");
  if (!card || card.querySelector(".restaurant-tag") || card.querySelector("h2")?.textContent.trim() !== "해운대해수욕장") return;
  const tag = [...card.querySelectorAll(".tags span")].find((item) => item.textContent.includes("맛집"));
  if (!tag) return;
  tag.classList.add("restaurant-tag");
  tag.addEventListener("click", () => {
    document.querySelector(".restaurant-modal-backdrop")?.remove();
    const modal = document.createElement("div");
    modal.className = "restaurant-modal-backdrop";
    modal.innerHTML = '<section class="restaurant-modal" role="dialog" aria-modal="true" aria-label="해운대 맛집 추천"><button class="restaurant-close" aria-label="맛집 목록 닫기">×</button><p>HAEUNDAE FOOD PICK</p><h3>해운대 맛집 추천</h3><article><strong>신사꽃게탕</strong><span>한식</span></article><article><strong>전설의 우대갈비</strong><span>한식</span></article><article><strong>금수복국 해운대본점</strong><span>한식</span></article><article><strong>해운대암소갈비집</strong><span>한식</span></article></section>';
    modal.addEventListener("click", (event) => { if (event.target === modal || event.target.closest(".restaurant-close")) modal.remove(); });
    document.body.appendChild(modal);
  });
}

new MutationObserver(() => { addHaeundaeGuide(); addRestaurantList(); }).observe(document.querySelector("#app"), { childList: true, subtree: true });
addHaeundaeGuide();
addRestaurantList();
