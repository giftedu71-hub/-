const haeundaeGuideUrl = "https://www.haeundae.go.kr/index.do?menuCd=DOM_000000302001002000";

function addHaeundaeGuide() {
  const card = document.querySelector(".detail");
  const title = card?.querySelector("h2");
  if (!card || !title || card.querySelector(".beach-guide")) return;

  const photoNames = {
    "임랑·일광해수욕장": "imrang-ilgwang-guide.png",
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
    "해운대해수욕장": [["신사꽃게당", "한식", "꽃게탕, 간장게장"], ["전설의 우대갈비 해운대직영점", "한식", "우대갈비"], ["금수복국 해운대본점", "한식", "복국, 복어요리"], ["해운대암소갈비집", "한식", "생갈비, 양념갈비"], ["해운대원조할매국밥", "한식", "소고기국밥, 선지국밥"], ["류센소 본점", "일식", "돈코츠라멘"], ["나마스테 해운대점", "기타", "인도커리, 난"]],
    "광안리해수욕장": [["톤쇼우 광안점", "일식", "버크셔K 특로스카츠, 히레카츠"], ["언양불고기 부산집", "한식", "언양불고기, 된장찌개"], ["수변최고돼지국밥 민락본점", "한식", "돼지국밥, 항정수육"], ["갈삼구이", "한식", "갈미조개, 삼겹살구이"], ["광안리 진양호횟집", "일식", "모둠회, 해산물"], ["디에이블 광안점", "양식", "파스타, 피자"], ["페로어페로 광안리점", "양식", "파스타, 스테이크"]],
    "송정해수욕장": [["송정집", "한식", "물국수, 비빔국수, 생김밥"], ["해운대31cm해물칼국수 송정본점", "한식", "해물칼국수"], ["송정가마솥돼지국밥", "한식", "돼지국밥, 수육"], ["다솥맛집 송정본점", "한식", "해산물솥밥, 전복솥밥"], ["미포집 송정직영점", "한식", "해물장정식, 간장게장"], ["낙불집 송정본점", "한식", "낙지볶음, 낙지불고기"], ["썹버거 송정점", "양식", "수제버거, 감자튀김"]],
    "송도해수욕장": [["송도해솥", "한식", "전복솥밥, 해산물솥밥"], ["송도키친", "한식", "돼지국밥, 수육"], ["김형제고기의철학 부산송도점", "한식", "이베리코 숙성돼지고기"], ["속시원해대구탕 송도점", "한식", "대구탕, 대구뽈찜"], ["조새호오마카세", "일식", "스시 오마카세, 사시미"], ["삿뽀로 송도점", "일식", "모둠회, 일식 코스요리"], ["스테이크팩토리 송도점", "양식", "스테이크, 파스타"]],
  };
  const title = card?.querySelector("h2")?.textContent.trim();
  if (!card || card.querySelector(".restaurant-tag") || !restaurantData[title]) return;
  const tag = [...card.querySelectorAll(".tags span")].find((item) => item.textContent.includes("맛집") || item.textContent.includes("음식점"));
  if (!tag) return;
  tag.textContent = tag.textContent.replace("음식점", "맛집");
  tag.classList.add("restaurant-tag");
  tag.addEventListener("click", () => {
    document.querySelector(".restaurant-modal-backdrop")?.remove();
    const modal = document.createElement("div");
    modal.className = "restaurant-modal-backdrop";
    const categoryCodes = { "한식": "korean", "양식": "western", "일식": "japanese", "중식": "chinese", "기타": "other" };
    modal.innerHTML = `<section class="restaurant-modal" role="dialog" aria-modal="true" aria-label="${title} 맛집 추천"><button class="restaurant-close" aria-label="맛집 목록 닫기">×</button><p>BEACH FOOD PICK</p><h3>${title.replace("해수욕장", "")} 맛집 추천</h3><div class="restaurant-filters"><button class="selected" data-filter="all">전체</button><button data-filter="korean">한식</button><button data-filter="western">양식</button><button data-filter="japanese">일식</button><button data-filter="chinese">중식</button><button data-filter="other">기타</button></div>${restaurantData[title].map(([name, category, menu]) => `<article data-category="${categoryCodes[category]}"><strong>${name}</strong><span>${category}</span><small>${menu || ""}</small></article>`).join("")}</section>`;
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

// Pop-up으로 열리는 주변 시설은 보기만 한 태그와 다르게 표시한다.
function markInteractiveFacilities() {
  document.querySelectorAll(".detail .tags span").forEach((tag) => {
    const label = tag.textContent;
    const isPopup = label.includes("\uB9DB\uC9D1") || label.includes("\uC219\uBC15") || label.includes("\uCF00\uC774\uBE14\uCE74");
    if (!isPopup) return;
    tag.classList.add("interactive-facility");
    tag.setAttribute("role", "button");
    tag.tabIndex = 0;
    tag.setAttribute("aria-label", `${label} \uC815\uBCF4 \uD31D\uC5C5 \uC5F4\uAE30`);
    tag.onkeydown = (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        tag.click();
      }
    };
  });
}

new MutationObserver(markInteractiveFacilities).observe(document.querySelector("#app"), { childList: true, subtree: true });
markInteractiveFacilities();

// OpenStreetMap 타일을 사용하는 실제 부산 지도
function initBusanMap() {
  const mapElement = document.querySelector(".busan-map");
  if (!mapElement || mapElement.dataset.leafletReady || !window.L) return;

  mapElement.dataset.leafletReady = "true";
  mapElement.classList.add("actual-map");
  mapElement.innerHTML = "";
  const map = window.L.map(mapElement, { scrollWheelZoom: true }).setView([35.158, 129.105], 11);
  window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  const beaches = [
    ["haeundae", "해운대", 35.1587, 129.1604],
    ["gwangalli", "광안리", 35.1532, 129.1186],
    ["songjeong", "송정", 35.1783, 129.1994],
    ["songdo", "송도", 35.0773, 129.0207],
    ["dadaepo", "다대포", 35.0465, 128.9678],
    ["quiet", "임랑·일광", 35.2900, 129.2520],
  ];
  beaches.forEach(([key, name, lat, lng]) => {
    const icon = window.L.divIcon({
      className: "beach-map-marker-wrap",
      html: `<span class="beach-map-pin"></span><span class="beach-map-label">${name}</span>`,
      iconSize: [92, 47],
      iconAnchor: [46, 44],
    });
    const marker = window.L.marker([lat, lng], { icon }).addTo(map);
    marker.on("click", () => window.pick(key));
  });
  window.setTimeout(() => map.invalidateSize(), 0);
}

new MutationObserver(initBusanMap).observe(document.querySelector("#app"), { childList: true, subtree: true });
initBusanMap();

// 자유이용권도 요금표와 같이 대인과 소인 금액을 나누어 보여 준다.
new MutationObserver(() => {
  const pass = document.querySelector(".cable-modal .cable-wide");
  if (!pass || pass.classList.contains("cable-pass")) return;
  pass.classList.add("cable-pass");
  pass.innerHTML = "<strong>\uC790\uC720\uC774\uC6A9\uAD8C</strong><span><b>\uB300\uC778</b>35,000\uC6D0</span><span><b>\uC18C\uC778</b>30,000\uC6D0</span><small>\uC6D0\uD558\uB294 \uCE90\uBE48\uC744 \uD558\uB8E8 \uB3D9\uC548 \uBB34\uC81C\uD55C \uD0D1\uC2B9 \u00B7 \uD3C9\uC77C \uC804\uC6A9</small>";
}).observe(document.body, { childList: true, subtree: true });

// 필터를 버튼의 실제 선택 결과에 맞춰 명시적으로 다시 적용한다.
document.addEventListener("click", (event) => {
  const button = event.target.closest(".restaurant-filters button");
  if (!button) return;
  const modal = button.closest(".restaurant-modal");
  if (!modal) return;
  const filter = button.dataset.filter;
  modal.querySelectorAll(".restaurant-filters button").forEach((item) => {
    const selected = item === button;
    item.classList.toggle("selected", selected);
    item.setAttribute("aria-pressed", String(selected));
  });
  modal.querySelectorAll("article[data-category]").forEach((item) => {
    const visible = filter === "all" || item.dataset.category === filter;
    item.hidden = !visible;
    item.style.display = visible ? "grid" : "none";
  });
  let empty = modal.querySelector(".restaurant-empty");
  if (!empty) {
    empty = document.createElement("p");
    empty.className = "restaurant-empty";
    empty.textContent = "해당하는 음식점이 없습니다.";
    modal.appendChild(empty);
  }
  empty.hidden = [...modal.querySelectorAll("article[data-category]")].some((item) => !item.hidden);
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
