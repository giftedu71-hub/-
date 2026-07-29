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
  const restaurantData = {
    "해운대해수욕장": [["신사꽃게탕", "한식"], ["전설의 우대갈비", "한식"], ["금수복국 해운대본점", "한식"], ["해운대암소갈비집", "한식"]],
    "광안리해수욕장": [["수변최고돼지국밥 광안점", "한식"], ["톤쇼우 광안점", "일식"]],
    "송정해수욕장": [["문토스트", "기타"], ["송정집", "한식"]],
    "송도해수욕장": [["천하포면 부산송도", "일식"], ["해변횟집", "한식"]],
  };
  const title = card?.querySelector("h2")?.textContent.trim();
  if (!card || card.querySelector(".restaurant-tag") || !restaurantData[title]) return;
  const tag = [...card.querySelectorAll(".tags span")].find((item) => item.textContent.includes("맛집"));
  if (!tag) return;
  tag.classList.add("restaurant-tag");
  tag.addEventListener("click", () => {
    document.querySelector(".restaurant-modal-backdrop")?.remove();
    const modal = document.createElement("div");
    modal.className = "restaurant-modal-backdrop";
    const categoryCodes = { "한식": "korean", "양식": "western", "일식": "japanese", "중식": "chinese", "기타": "other" };
    modal.innerHTML = `<section class="restaurant-modal" role="dialog" aria-modal="true" aria-label="${title} 맛집 추천"><button class="restaurant-close" aria-label="맛집 목록 닫기">×</button><p>BEACH FOOD PICK</p><h3>${title.replace("해수욕장", "")} 맛집 추천</h3><div class="restaurant-filters"><button class="selected" data-filter="all">전체</button><button data-filter="korean">한식</button><button data-filter="western">양식</button><button data-filter="japanese">일식</button><button data-filter="chinese">중식</button><button data-filter="other">기타</button></div>${restaurantData[title].map(([name, category]) => `<article data-category="${categoryCodes[category]}"><strong>${name}</strong><span>${category}</span></article>`).join("")}</section>`;
    modal.querySelectorAll(".restaurant-filters button").forEach((button) => button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      modal.querySelectorAll(".restaurant-filters button").forEach((item) => item.classList.toggle("selected", item === button));
      modal.querySelectorAll("article[data-category]").forEach((item) => { item.hidden = !(filter === "all" || item.dataset.category === filter); });
    }));
    modal.addEventListener("click", (event) => { if (event.target === modal || event.target.closest(".restaurant-close")) modal.remove(); });
    document.body.appendChild(modal);
  });
}

function addLodgingList() {
  const card = document.querySelector(".detail");
  if (!card || card.querySelector(".lodging-tag") || card.querySelector("h2")?.textContent.trim() !== "해운대해수욕장") return;
  const tag = [...card.querySelectorAll(".tags span")].find((item) => item.textContent.includes("숙박"));
  if (!tag) return;
  tag.classList.add("lodging-tag");
  tag.addEventListener("click", () => {
    document.querySelector(".lodging-modal-backdrop")?.remove();
    const stays = [["토유료칸호텔", "9.5", "도보 약 3분"], ["해운대 엘본 더 스테이", "9.5", "도보 약 6분"], ["L7 해운대 바이 롯데", "9.0", "도보 약 3분"], ["소노문 해운대", "9.0", "도보 약 4분"], ["UH 컨티넨탈 센터포인트", "9.0", "해수욕장 인근"], ["코브 스테이 해운대", "8.8", "도보 약 5분"], ["하운드호텔 해운대 시그니처", "8.8", "도보 약 7분"]];
    const modal = document.createElement("div");
    modal.className = "lodging-modal-backdrop";
    modal.innerHTML = `<section class="lodging-modal" role="dialog" aria-modal="true" aria-label="해운대 숙박시설 추천"><button class="lodging-close" aria-label="숙박 목록 닫기">×</button><p>HAEUNDAE STAY PICK</p><h3>해운대 숙박시설</h3>${stays.map(([name, rating, distance], index) => `<article><b>${index + 1}</b><strong>${name}</strong><span>평점 ${rating} · ${distance}</span></article>`).join("")}</section>`;
    modal.addEventListener("click", (event) => { if (event.target === modal || event.target.closest(".lodging-close")) modal.remove(); });
    document.body.appendChild(modal);
  });
}

new MutationObserver(() => { addHaeundaeGuide(); addRestaurantList(); addLodgingList(); }).observe(document.querySelector("#app"), { childList: true, subtree: true });
addHaeundaeGuide();
addRestaurantList();
addLodgingList();

document.addEventListener("click", (event) => {
  const tag = event.target.closest(".tags span");
  const title = document.querySelector(".detail h2")?.textContent.trim();
  if (!tag || !tag.textContent.includes("숙박") || title !== "해운대해수욕장") return;
  document.querySelector(".lodging-modal-backdrop")?.remove();
  const stays = [["토유료칸호텔", "9.5", "도보 약 3분"], ["해운대 엘본 더 스테이", "9.5", "도보 약 6분"], ["L7 해운대 바이 롯데", "9.0", "도보 약 3분"], ["소노문 해운대", "9.0", "도보 약 4분"], ["UH 컨티넨탈 센터포인트", "9.0", "해수욕장 인근"], ["코브 스테이 해운대", "8.8", "도보 약 5분"], ["하운드호텔 해운대 시그니처", "8.8", "도보 약 7분"]];
  const modal = document.createElement("div");
  modal.className = "lodging-modal-backdrop";
  modal.innerHTML = `<section class="lodging-modal" role="dialog" aria-modal="true" aria-label="해운대 숙박시설 추천"><button class="lodging-close" aria-label="숙박 목록 닫기">×</button><p>HAEUNDAE STAY PICK</p><h3>해운대 숙박시설</h3>${stays.map(([name, rating, distance], index) => `<article><b>${index + 1}</b><strong>${name}</strong><span>평점 ${rating} · ${distance}</span></article>`).join("")}</section>`;
  modal.addEventListener("click", (itemEvent) => { if (itemEvent.target === modal || itemEvent.target.closest(".lodging-close")) modal.remove(); });
  document.body.appendChild(modal);
});

document.addEventListener("click", (event) => {
  const tag = event.target.closest(".tags span");
  const title = document.querySelector(".detail h2")?.textContent.trim();
  if (!tag || !tag.textContent.includes("케이블카") || title !== "송도해수욕장") return;
  document.querySelector(".cable-modal-backdrop")?.remove();
  const modal = document.createElement("div");
  modal.className = "cable-modal-backdrop";
  modal.innerHTML = `<section class="cable-modal" role="dialog" aria-modal="true" aria-label="송도 해상케이블카 요금"><button class="cable-close" aria-label="케이블카 요금표 닫기">×</button><p>SONGDO CABLE CAR</p><h3>케이블카 요금 안내</h3><div class="cable-table"><div class="cable-head"><span>상품</span><span>대인</span><span>소인</span></div><div><strong>크리스탈크루즈<br><small>(크리스탈캐빈) · 왕복</small></strong><span>24,000원</span><span>18,000원</span></div><div><strong>크리스탈크루즈<br><small>(크리스탈캐빈) · 편도</small></strong><span>19,000원</span><span>15,000원</span></div><div><strong>에어크루즈<br><small>(일반캐빈) · 왕복</small></strong><span>19,000원</span><span>14,000원</span></div><div><strong>에어크루즈<br><small>(일반캐빈) · 편도</small></strong><span>15,000원</span><span>12,000원</span></div></div><article class="cable-wide"><strong>자유이용권</strong><span>35,000원 / 30,000원</span><small>원하는 캐빈을 하루 동안 무제한 탑승 · 평일 전용</small></article><article class="cable-wide"><strong>스피디크루즈</strong><span>크리스탈 55,000원 / 에어 45,000원</span><small>대기 없이 탑승 · 1인당 요금</small></article><article class="cable-wide"><strong>프리미엄크루즈</strong><span>크리스탈 340,000원 / 에어 270,000원</span><small>대기 없이 탑승 · 캐빈 1대당(최대 8명)</small></article><a class="cable-more" href="https://busanaircruise.co.kr/main/main.html" target="_blank" rel="noreferrer">자세히 알아보기 →</a></section>`;
  modal.addEventListener("click", (itemEvent) => { if (itemEvent.target === modal || itemEvent.target.closest(".cable-close")) modal.remove(); });
  document.body.appendChild(modal);
});
