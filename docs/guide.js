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
  const restaurantLinks = {
    "신사꽃게당": "https://map.naver.com/p/search/신사꽃게당%20해운대", "전설의 우대갈비 해운대직영점": "https://map.naver.com/p/search/전설의%20우대갈비%20해운대직영점", "금수복국 해운대본점": "https://map.naver.com/p/search/금수복국%20해운대본점", "해운대암소갈비집": "https://map.naver.com/p/search/해운대암소갈비집", "해운대원조할매국밥": "https://map.naver.com/p/search/해운대원조할매국밥", "류센소 본점": "https://map.naver.com/p/search/류센소%20본점", "나마스테 해운대점": "https://map.naver.com/p/search/나마스테%20해운대점",
    "톤쇼우 광안점": "https://map.naver.com/p/search/톤쇼우%20광안점", "언양불고기 부산집": "https://map.naver.com/p/search/언양불고기%20부산집", "수변최고돼지국밥 민락본점": "https://map.naver.com/p/search/수변최고돼지국밥%20민락본점", "갈삼구이": "https://map.naver.com/p/search/갈삼구이%20광안리", "광안리 진양호횟집": "https://map.naver.com/p/search/광안리%20진양호횟집", "디에이블 광안점": "https://map.naver.com/p/search/디에이블%20광안점", "페로어페로 광안리점": "https://map.naver.com/p/search/페로어페로%20광안리점",
    "송도해솥": "https://map.naver.com/p/search/송도해솥%20부산", "송도키친": "https://map.naver.com/p/search/송도키친%20부산", "김형제고기의철학 부산송도점": "https://map.naver.com/p/search/김형제고기의철학%20부산송도점", "속시원해대구탕 송도점": "https://map.naver.com/p/search/속시원해대구탕%20송도점", "조새호오마카세": "https://map.naver.com/p/search/조새호오마카세%20부산", "삿뽀로 송도점": "https://map.naver.com/p/search/삿뽀로%20송도점%20부산", "스테이크팩토리 송도점": "https://map.naver.com/p/search/스테이크팩토리%20송도점%20부산",
    "송정집": "https://map.naver.com/p/search/송정집%20부산/place/37153861?c=15.00,0,0,0,dh&placePath=%3Fbk_query%253D%2525EC%252586%2525A1%2525EC%2525A0%252595%2525EC%2525A7%252591%252520%2525EB%2525B6%252580%2525EC%252582%2525B0%2526entry%253Dbmp", "해운대31cm해물칼국수 송정본점": "https://map.naver.com/p/search/해운대31cm해물칼국수%20송정본점", "송정가마솥돼지국밥": "https://map.naver.com/p/search/송정가마솥돼지국밥", "다솥맛집 송정본점": "https://map.naver.com/p/search/다솥맛집%20송정본점", "미포집 송정직영점": "https://map.naver.com/p/search/미포집%20송정직영점", "낙불집 송정본점": "https://map.naver.com/p/search/낙불집%20송정본점", "썹버거 송정점": "https://map.naver.com/p/search/썹버거%20송정점",
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
    const restaurantHint = document.createElement("small");
    restaurantHint.className = "restaurant-link-hint";
    restaurantHint.textContent = "음식점 이름을 클릭하면 네이버 지도에서 확인할 수 있어요.";
    modal.querySelector(".restaurant-modal h3")?.insertAdjacentElement("afterend", restaurantHint);
    modal.querySelectorAll("article strong").forEach((nameElement) => {
      const url = restaurantLinks[nameElement.textContent];
      if (!url) return;
      const link = document.createElement("a");
      link.className = "restaurant-link";
      link.href = url;
      link.target = "_blank";
      link.rel = "noreferrer";
      link.textContent = nameElement.textContent;
      nameElement.replaceWith(link);
    });
    modal.querySelectorAll("article").forEach((article) => {
      const name = article.querySelector("strong, .restaurant-link")?.textContent;
      if (!name) return;
      const button = document.createElement("button");
      button.className = "restaurant-map-button";
      button.type = "button";
      button.dataset.restaurantName = name;
      button.textContent = window.restaurantMarkers?.has(name) ? "표시삭제" : "지도 표시";
      button.addEventListener("click", () => window.toggleRestaurantMarker?.(name, button));
      article.appendChild(button);
    });
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

function addCafeList() {
  const card = document.querySelector(".detail");
  const cafeData = {
    "송정해수욕장": [["할리스 부산송정점", "해변 바로 앞, 오션뷰"], ["투썸플레이스 부산송정힐스점", "넓은 좌석, 해변 전망"], ["하삼동커피 송정점", "저렴한 가격, 테이크아웃"], ["카페리프", "송정 바다 전망"], ["인얼스커피 송정점", "커피와 디저트"], ["드래그하우스", "조용하고 감성적인 분위기"], ["더레스트마린", "대형 루프탑 오션뷰"]],
    "해운대해수욕장": [["파노라마 라운지 웨스틴조선 부산", "고급스러운 해변 전망"], ["스타벅스 해운대점", "접근성이 좋고 이용이 편리함"], ["랑데자뷰 해운대점", "제주풍 인테리어"], ["산리오 러버스 클럽 해운대점", "캐릭터 테마 카페"], ["코오리마찌 해운대해리단길점", "당고와 일본풍 디저트"], ["로우앤스윗 해리단길점", "에스프레소와 베이커리"], ["엣지993", "루프탑 오션뷰"]],
    "광안리해수욕장": [["차선책", "광안대교 전망, 저당 디저트"], ["컵앤컵", "루프탑, 광안대교 전망"], ["워킹홀리데이", "해변 바로 앞 오션뷰"], ["샌디스", "케이크, 통창 바다 전망"], ["별침대", "독특한 좌석과 야경"], ["카페이플", "제철 과일 디저트, 조용한 공간"], ["카페오뜨 광안비치점", "광안대교 전망"]],
  };
  const cafeLinks = {
    "할리스 부산송정점": "https://map.naver.com/p/search/할리스%20부산송정점", "투썸플레이스 부산송정힐스점": "https://map.naver.com/p/search/투썸플레이스%20부산송정힐스점", "하삼동커피 송정점": "https://map.naver.com/p/search/하삼동커피%20송정점%20부산", "카페리프": "https://map.naver.com/p/search/카페리프%20송정%20부산", "인얼스커피 송정점": "https://map.naver.com/p/search/인얼스커피%20송정점", "드래그하우스": "https://map.naver.com/p/search/드래그하우스%20송정%20부산", "더레스트마린": "https://map.naver.com/p/search/더레스트마린%20송정",
    "파노라마 라운지 웨스틴조선 부산": "https://map.naver.com/p/search/파노라마라운지%20웨스틴조선%20부산", "스타벅스 해운대점": "https://map.naver.com/p/search/스타벅스%20해운대점", "랑데자뷰 해운대점": "https://map.naver.com/p/search/랑데자뷰%20해운대점", "산리오 러버스 클럽 해운대점": "https://map.naver.com/p/search/산리오러버스클럽%20해운대점", "코오리마찌 해운대해리단길점": "https://map.naver.com/p/search/코오리마찌%20해운대해리단길점", "로우앤스윗 해리단길점": "https://map.naver.com/p/search/로우앤스윗%20해리단길점", "엣지993": "https://map.naver.com/p/search/엣지993%20해운대",
    "차선책": "https://map.naver.com/p/search/차선책%20광안리", "컵앤컵": "https://map.naver.com/p/search/컵앤컵%20광안리", "워킹홀리데이": "https://map.naver.com/p/search/워킹홀리데이%20광안리", "샌디스": "https://map.naver.com/p/search/샌디스%20광안리", "별침대": "https://map.naver.com/p/search/별침대%20광안리", "카페이플": "https://map.naver.com/p/search/카페이플%20광안리", "카페오뜨 광안비치점": "https://map.naver.com/p/search/카페오뜨%20광안비치점",
  };
  const title = card?.querySelector("h2")?.textContent.trim();
  if (!card || card.querySelector(".cafe-tag") || !cafeData[title]) return;
  const tag = [...card.querySelectorAll(".tags span")].find((item) => item.textContent.includes("카페"));
  if (!tag) return;
  tag.classList.add("cafe-tag");
  tag.addEventListener("click", () => {
    document.querySelector(".cafe-modal-backdrop")?.remove();
    const modal = document.createElement("div");
    modal.className = "cafe-modal-backdrop";
    modal.innerHTML = `<section class="cafe-modal" role="dialog" aria-modal="true" aria-label="${title} 카페 추천"><button class="cafe-close" aria-label="카페 목록 닫기">×</button><p>BEACH CAFE PICK</p><h3>${title.replace("해수욕장", "")} 카페 추천</h3>${cafeData[title].map(([name, note]) => `<article><strong>${name}</strong><small>${note}</small></article>`).join("")}</section>`;
    modal.querySelectorAll("article strong").forEach((nameElement) => {
      const url = cafeLinks[nameElement.textContent];
      if (!url) return;
      const link = document.createElement("a");
      link.className = "cafe-link";
      link.href = url;
      link.target = "_blank";
      link.rel = "noreferrer";
      link.textContent = nameElement.textContent;
      nameElement.replaceWith(link);
    });
    modal.querySelectorAll("article").forEach((article) => {
      const name = article.querySelector("strong, .cafe-link")?.textContent;
      if (!name) return;
      const button = document.createElement("button");
      button.className = "restaurant-map-button cafe-map-button";
      button.type = "button";
      button.dataset.restaurantName = name;
      button.textContent = window.restaurantMarkers?.has(name) ? "표시삭제" : "지도 표시";
      button.addEventListener("click", () => window.toggleRestaurantMarker?.(name, button));
      article.appendChild(button);
    });
    modal.addEventListener("click", (event) => { if (event.target === modal || event.target.closest(".cafe-close")) modal.remove(); });
    document.body.appendChild(modal);
  });
}

new MutationObserver(() => { addHaeundaeGuide(); addRestaurantList(); addLodgingList(); addCafeList(); }).observe(document.querySelector("#app"), { childList: true, subtree: true });
addHaeundaeGuide();
addRestaurantList();
addLodgingList();
addCafeList();

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
    const isPopup = label.includes("\uB9DB\uC9D1") || label.includes("\uC219\uBC15") || label.includes("\uCF00\uC774\uBE14\uCE74") || label.includes("\uCE74\uD398");
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

function addFacilityHint() {
  const tags = document.querySelector(".detail .row.facility .tags");
  const row = tags?.closest(".row");
  if (!tags || !row || row.nextElementSibling?.classList.contains("facility-hint")) return;
  const hint = document.createElement("small");
  hint.className = "facility-hint";
  hint.textContent = "(색있는 카테고리를 클릭해보세요)";
  row.insertAdjacentElement("afterend", hint);
}

new MutationObserver(addFacilityHint).observe(document.querySelector("#app"), { childList: true, subtree: true });
addFacilityHint();

// OpenStreetMap 타일을 사용하는 실제 부산 지도
function initBusanMap() {
  const mapElement = document.querySelector(".busan-map");
  if (!mapElement || mapElement.dataset.leafletReady || !window.L) return;

  mapElement.dataset.leafletReady = "true";
  mapElement.classList.add("actual-map");
  mapElement.innerHTML = "";
  const map = window.L.map(mapElement, { scrollWheelZoom: true }).setView([35.158, 129.105], 11);
  window.busanLeafletMap = map;
  window.restaurantMarkerLayer = window.L.layerGroup().addTo(map);
  window.restaurantMarkers = new Map();
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

window.clearRestaurantMarkers = () => {
  window.restaurantMarkerLayer?.clearLayers();
  window.restaurantMarkers?.clear();
  document.querySelectorAll(".restaurant-map-button").forEach((button) => { button.textContent = "지도 표시"; });
};

window.toggleRestaurantMarker = async (name, button) => {
  const map = window.busanLeafletMap;
  const layer = window.restaurantMarkerLayer;
  if (!map || !layer) return;
  if (window.restaurantMarkers?.has(name)) {
    layer.removeLayer(window.restaurantMarkers.get(name));
    window.restaurantMarkers.delete(name);
    button.textContent = "지도 표시";
    return;
  }
  try {
    button.disabled = true;
    button.textContent = "표시 중";
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&accept-language=ko&q=${encodeURIComponent(`${name} 부산광역시`)}`);
    const places = await response.json();
    if (!places[0]) throw new Error("not found");
    const location = [Number(places[0].lat), Number(places[0].lon)];
    const marker = window.L.marker(location).addTo(layer).bindPopup(`<strong>${name}</strong>`).openPopup();
    window.restaurantMarkers.set(name, marker);
    map.flyTo(location, 16, { duration: 0.8 });
    button.textContent = "표시삭제";
  } catch {
    button.textContent = "지도 표시";
    window.alert("지도에서 위치를 찾지 못했어요. 정확한 도로명 주소 또는 위도·경도를 알려주시면 고정 마커로 추가할 수 있어요.");
  } finally {
    button.disabled = false;
  }
};

function addRestaurantMarkerClear() {
  const actions = document.querySelector(".map-actions");
  if (!actions || actions.querySelector(".restaurant-marker-clear")) return;
  const button = document.createElement("button");
  button.className = "ghost restaurant-marker-clear";
  button.type = "button";
  button.textContent = "표시한 음식점 지우기";
  button.addEventListener("click", () => window.clearRestaurantMarkers?.());
  actions.prepend(button);
}

new MutationObserver(initBusanMap).observe(document.querySelector("#app"), { childList: true, subtree: true });
initBusanMap();
new MutationObserver(addRestaurantMarkerClear).observe(document.querySelector("#app"), { childList: true, subtree: true });
addRestaurantMarkerClear();

// 자유이용권도 요금표와 같이 대인과 소인 금액을 나누어 보여 준다.
new MutationObserver(() => {
  const pass = document.querySelector(".cable-modal .cable-wide");
  if (!pass || pass.classList.contains("cable-pass")) return;
  pass.classList.add("cable-pass");
  pass.innerHTML = "<strong>\uC790\uC720\uC774\uC6A9\uAD8C</strong><span>35,000\uC6D0</span><span>30,000\uC6D0</span><small>\uC6D0\uD558\uB294 \uCE90\uBE48\uC744 \uD558\uB8E8 \uB3D9\uC548 \uBB34\uC81C\uD55C \uD0D1\uC2B9 \u00B7 \uD3C9\uC77C \uC804\uC6A9</small>";
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
