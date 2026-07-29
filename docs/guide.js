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
    "송정해수욕장": [["송정집", "한식", "물국수, 비빔국수, 생김밥"], ["해운대31cm해물칼국수 송정본점", "한식", "해물칼국수"], ["송정가마솥돼지국밥", "한식", "돼지국밥, 수육"], ["다솥맛집 송정본점", "한식", "해산물솥밥, 전복솥밥"], ["미포집 송정직영점", "한식", "해물장정식, 간장게장"], ["낙불집 송정본점", "한식", "낙지볶음, 낙지불고기"], ["송정물총칼국수", "한식", "물총조개칼국수, 해물파전"]],
    "송도해수욕장": [["송도해솥", "한식", "전복솥밥, 해산물솥밥"], ["송도키친", "한식", "돼지국밥, 수육"], ["김형제고기의철학 부산송도점", "한식", "이베리코 숙성돼지고기"], ["우연지 부산송도점", "한식", "한우 모둠구이, 등심, 안심, 치마살"], ["상월대오마카세", "일식", "스시 오마카세, 사시미"], ["왕밀면냉면", "한식", "밀면, 비빔밀면, 만두"], ["최진사댁", "한식", "조개구이, 해산물구이"]],
  };
  const restaurantLinks = {
    "신사꽃게당": "https://map.naver.com/p/search/신사꽃게당%20해운대", "전설의 우대갈비 해운대직영점": "https://map.naver.com/p/search/전설의%20우대갈비%20해운대직영점", "금수복국 해운대본점": "https://map.naver.com/p/search/금수복국%20해운대본점", "해운대암소갈비집": "https://map.naver.com/p/search/해운대암소갈비집", "해운대원조할매국밥": "https://map.naver.com/p/search/해운대원조할매국밥", "류센소 본점": "https://map.naver.com/p/search/류센소%20본점", "나마스테 해운대점": "https://map.naver.com/p/search/나마스테%20해운대점",
    "톤쇼우 광안점": "https://map.naver.com/p/search/톤쇼우%20광안점", "언양불고기 부산집": "https://map.naver.com/p/search/언양불고기%20부산집", "수변최고돼지국밥 민락본점": "https://map.naver.com/p/search/수변최고돼지국밥%20민락본점", "갈삼구이": "https://map.naver.com/p/search/갈삼구이%20광안리", "광안리 진양호횟집": "https://map.naver.com/p/search/광안리%20진양호횟집", "디에이블 광안점": "https://map.naver.com/p/search/디에이블%20광안점", "페로어페로 광안리점": "https://map.naver.com/p/search/페로어페로%20광안리점",
    "송도해솥": "https://map.naver.com/p/search/송도해솥%20부산", "송도키친": "https://map.naver.com/p/search/송도키친%20부산", "김형제고기의철학 부산송도점": "https://map.naver.com/p/search/김형제고기의철학%20부산송도점", "우연지 부산송도점": "https://map.naver.com/p/search/우연지%20부산송도점", "상월대오마카세": "https://map.naver.com/p/search/상월대%20부산%20송도", "왕밀면냉면": "https://map.naver.com/p/search/왕밀면냉면%20부산%20송도", "최진사댁": "https://map.naver.com/p/search/최진사댁%20부산%20송도",
    "송정집": "https://map.naver.com/p/search/송정집%20부산/place/37153861?c=15.00,0,0,0,dh&placePath=%3Fbk_query%253D%2525EC%252586%2525A1%2525EC%2525A0%252595%2525EC%2525A7%252591%252520%2525EB%2525B6%252580%2525EC%252582%2525B0%2526entry%253Dbmp", "해운대31cm해물칼국수 송정본점": "https://map.naver.com/p/search/해운대31cm해물칼국수%20송정본점", "송정가마솥돼지국밥": "https://map.naver.com/p/search/송정가마솥돼지국밥", "다솥맛집 송정본점": "https://map.naver.com/p/search/다솥맛집%20송정본점", "미포집 송정직영점": "https://map.naver.com/p/search/미포집%20송정직영점", "낙불집 송정본점": "https://map.naver.com/p/search/낙불집%20송정본점", "송정물총칼국수": "https://map.naver.com/p/search/송정물총칼국수%20부산",
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
    restaurantHint.textContent = "(음식점을 클릭하면 네이버 지도에서 자세히 볼 수 있습니다.)";
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
      button.classList.toggle("is-active", window.restaurantMarkers?.has(name));
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
    "해운대해수욕장": [["파노라마 라운지 웨스틴조선 부산", "고급스러운 해변 전망"], ["스타벅스 해운대점", "접근성이 좋고 이용이 편리함"], ["옵스 해운대점", "부산 대표 베이커리와 디저트"], ["산리오 러버스 클럽 해운대점", "캐릭터 테마 카페"], ["코오리마찌 해운대해리단길점", "당고와 일본풍 디저트"], ["로우앤스윗 해리단길점", "에스프레소와 베이커리"], ["엣지993", "루프탑 오션뷰"]],
    "광안리해수욕장": [["차선책", "광안대교 전망, 저당 디저트"], ["컵앤컵", "루프탑, 광안대교 전망"], ["워킹홀리데이", "해변 바로 앞 오션뷰"], ["샌디스", "케이크, 통창 바다 전망"], ["별침대", "독특한 좌석과 야경"], ["카페이플", "제철 과일 디저트, 조용한 공간"], ["카페오뜨 광안비치점", "광안대교 전망"]],
  };
  const cafeLinks = {
    "할리스 부산송정점": "https://map.naver.com/p/search/할리스%20부산송정점", "투썸플레이스 부산송정힐스점": "https://map.naver.com/p/search/투썸플레이스%20부산송정힐스점", "하삼동커피 송정점": "https://map.naver.com/p/search/하삼동커피%20송정점%20부산", "카페리프": "https://map.naver.com/p/search/카페리프%20송정%20부산", "인얼스커피 송정점": "https://map.naver.com/p/search/인얼스커피%20송정점", "드래그하우스": "https://map.naver.com/p/search/드래그하우스%20송정%20부산", "더레스트마린": "https://map.naver.com/p/search/더레스트마린%20송정",
    "파노라마 라운지 웨스틴조선 부산": "https://map.naver.com/p/search/파노라마라운지%20웨스틴조선%20부산", "스타벅스 해운대점": "https://map.naver.com/p/search/스타벅스%20해운대점", "옵스 해운대점": "https://map.naver.com/p/search/%EC%98%B5%EC%8A%A4%20%ED%95%B4%EC%9A%B4%EB%8C%80%EC%A0%90/place/20309509?c=15.00,0,0,0,dh&placePath=%2Fhome%3Fentry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202607291316%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%98%B5%EC%8A%A4%20%ED%95%B4%EC%9A%B4%EB%8C%80%EC%A0%90", "산리오 러버스 클럽 해운대점": "https://map.naver.com/p/search/산리오러버스클럽%20해운대점", "코오리마찌 해운대해리단길점": "https://map.naver.com/p/search/코오리마찌%20해운대해리단길점", "로우앤스윗 해리단길점": "https://map.naver.com/p/search/로우앤스윗%20해리단길점", "엣지993": "https://map.naver.com/p/search/엣지993%20해운대",
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
      button.classList.toggle("is-active", window.restaurantMarkers?.has(name));
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
  const selectedTitle = document.querySelector(".detail h2")?.textContent.trim();
  const beachFocus = {
    "해운대해수욕장": [35.1587, 129.1604], "광안리해수욕장": [35.1532, 129.1186], "송정해수욕장": [35.1783, 129.1994],
    "송도해수욕장": [35.0773, 129.0207], "다대포해수욕장": [35.0465, 128.9678], "임랑·일광해수욕장": [35.2900, 129.2520],
  };
  const focus = beachFocus[selectedTitle];
  const map = window.L.map(mapElement, { scrollWheelZoom: true }).setView(focus || [35.158, 129.105], focus ? 14 : 11);
  window.busanLeafletMap = map;
  window.showAllBeaches = () => {
    map.flyTo([35.158, 129.105], 11, { duration: 0.7 });
    const layout = mapElement.closest(".map-layout");
    layout?.classList.add("all-beaches");
    window.setTimeout(() => map.invalidateSize(), 0);
    document.querySelectorAll(".beach-quick-selector button").forEach((button) => button.classList.toggle("active", button.dataset.key === "all"));
  };
  window.restaurantMarkerLayer = window.L.layerGroup().addTo(map);
  window.restaurantMarkers = new Map();
  window.customMarkerLayer = window.L.layerGroup().addTo(map);
  window.customMarkers = new Set();
  window.customMarkingMode = false;
  window.customMarkerColor = "#7657d9";
  const colorChoices = ["#7657d9", "#158f96", "#eb7a67", "#e4ad25"];
  const palette = document.createElement("div");
  palette.className = "custom-marker-palette";
  palette.hidden = true;
  palette.setAttribute("aria-label", "내 마커 색상 선택");
  palette.innerHTML = colorChoices.map((color, index) => `<button type="button" data-color="${color}" aria-label="마커 색상 ${index + 1}" style="--marker-choice:${color}"></button>`).join("");
  palette.querySelectorAll("button").forEach((button) => button.addEventListener("click", (event) => {
    event.stopPropagation();
    window.customMarkerColor = button.dataset.color;
    palette.querySelectorAll("button").forEach((item) => item.classList.toggle("is-selected", item === button));
  }));
  palette.querySelector("button")?.classList.add("is-selected");
  mapElement.closest(".map-layout")?.appendChild(palette);
  window.toggleCustomMarking = () => {
    window.customMarkingMode = !window.customMarkingMode;
    const button = document.querySelector(".custom-marker-toggle");
    button?.classList.toggle("is-active", window.customMarkingMode);
    if (button) button.textContent = window.customMarkingMode ? "마킹 종료" : "직접 마킹";
    palette.hidden = !window.customMarkingMode;
    mapElement.classList.toggle("custom-marking-mode", window.customMarkingMode);
    mapElement.closest(".map-layout")?.classList.toggle("has-custom-marker-tools", window.customMarkingMode || window.customMarkers.size > 0);
  };
  window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);
  const fullscreenButton = document.createElement("button");
  fullscreenButton.className = "map-fullscreen-toggle";
  fullscreenButton.type = "button";
  fullscreenButton.textContent = "전체 화면";
  fullscreenButton.setAttribute("aria-label", "지도 전체 화면으로 보기");
  fullscreenButton.addEventListener("click", (event) => {
    event.stopPropagation();
    const active = mapElement.classList.toggle("is-map-fullscreen");
    fullscreenButton.textContent = active ? "전체 화면 닫기" : "전체 화면";
    fullscreenButton.setAttribute("aria-label", active ? "지도 전체 화면 닫기" : "지도 전체 화면으로 보기");
    window.setTimeout(() => map.invalidateSize(), 0);
  });
  mapElement.appendChild(fullscreenButton);

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
      iconSize: [124, 57],
      iconAnchor: [62, 54],
    });
    const marker = window.L.marker([lat, lng], { icon }).addTo(map);
    marker.on("click", () => window.pick(key));
  });
  map.on("click", (event) => {
    if (!window.customMarkingMode) return;
    const name = window.prompt("이 마커의 이름을 입력하세요.", "내 마커");
    if (name === null) return;
    const icon = window.L.divIcon({ className: "custom-map-marker-wrap", html: `<span class="custom-map-pin" style="--custom-marker-color:${window.customMarkerColor}"></span>`, iconSize: [28, 36], iconAnchor: [14, 32], tooltipAnchor: [0, -26] });
    const marker = window.L.marker(event.latlng, { icon }).addTo(window.customMarkerLayer).bindTooltip(`${name.trim() || "내 마커"} · 클릭해서 삭제`, { direction: "top", permanent: true, className: "custom-marker-label" });
    marker.on("click", () => {
      window.customMarkerLayer.removeLayer(marker);
      window.customMarkers.delete(marker);
      updateCustomMarkerClear();
    });
    window.customMarkers.add(marker);
    updateCustomMarkerClear();
  });
  window.setTimeout(() => map.invalidateSize(), 0);
}

window.clearRestaurantMarkers = () => {
  window.restaurantMarkerLayer?.clearLayers();
  window.restaurantMarkers?.clear();
  document.querySelectorAll(".restaurant-map-button").forEach((button) => { button.textContent = "지도 표시"; button.classList.remove("is-active"); });
  updateRestaurantMarkerClear();
};

function updateRestaurantMarkerClear() {
  const button = document.querySelector(".restaurant-marker-clear");
  if (button) button.hidden = !(window.restaurantMarkers?.size > 0);
}

window.clearCustomMarkers = () => {
  window.customMarkerLayer?.clearLayers();
  window.customMarkers?.clear();
  updateCustomMarkerClear();
};

function updateCustomMarkerClear() {
  const button = document.querySelector(".custom-marker-clear");
  const layout = document.querySelector(".map-layout");
  const hasMarkers = window.customMarkers?.size > 0;
  if (button) button.hidden = !hasMarkers;
  layout?.classList.toggle("has-custom-marker-tools", Boolean(window.customMarkingMode || hasMarkers));
}

const fixedPlaceAddresses = {
  "신사꽃게당": "부산광역시 해운대구 우동 627-1", "전설의 우대갈비 해운대직영점": "부산광역시 해운대구 중동 1412-7", "금수복국 해운대본점": "부산광역시 해운대구 중동1로43번길 23", "해운대암소갈비집": "부산광역시 해운대구 중동2로10번길 32-10", "해운대원조할매국밥": "부산광역시 해운대구 구남로21번길 27", "류센소 본점": "부산광역시 해운대구 우동 641-15", "나마스테 해운대점": "부산광역시 해운대구 우동 626-4",
  "톤쇼우 광안점": "부산광역시 수영구 광안해변로279번길 13", "언양불고기 부산집": "부산광역시 수영구 남천바다로 32", "수변최고돼지국밥 민락본점": "부산광역시 수영구 광안해변로370번길 9-32", "갈삼구이": "부산광역시 수영구 민락동 181-86", "광안리 진양호횟집": "부산광역시 수영구 민락동 110-50", "디에이블 광안점": "부산광역시 수영구 민락동 181-223", "페로어페로 광안리점": "부산광역시 수영구 남천바다로 38-6",
  "송도해솥": "부산광역시 서구 송도해변로 133 4층", "송도키친": "부산광역시 서구 송도해변로 113 페어필드 바이 메리어트 부산 송도비치 22층", "상월대오마카세": "부산광역시 서구 송도해변로 10 4층", "왕밀면냉면": "부산광역시 서구 충무대로 122-1 프레스코 2층", "최진사댁": "부산광역시 서구 암남동 620-24", "송정집": "부산광역시 해운대구 송정동 437-9", "해운대31cm해물칼국수 송정본점": "부산광역시 해운대구 송정동 158-2", "송정가마솥돼지국밥": "부산광역시 해운대구 송정동 139-18", "다솥맛집 송정본점": "부산광역시 해운대구 송정동 313-10", "미포집 송정직영점": "부산광역시 해운대구 송정동 798-2", "낙불집 송정본점": "부산광역시 해운대구 송정동 442-5",
  "할리스 부산송정점": "부산광역시 해운대구 송정동 443-5", "투썸플레이스 부산송정힐스점": "부산광역시 해운대구 송정동 446-2", "하삼동커피 송정점": "부산광역시 해운대구 송정중앙로 23", "카페리프": "부산광역시 해운대구 송정동 297-17", "인얼스커피 송정점": "부산광역시 해운대구 송정동 436-4", "드래그하우스": "부산광역시 해운대구 송정동 442-3", "더레스트마린": "부산광역시 해운대구 송정동 288-61",
  "파노라마 라운지 웨스틴조선 부산": "부산광역시 해운대구 동백로 67 웨스틴 조선 부산 1층", "스타벅스 해운대점": "부산광역시 해운대구 구남로 49", "옵스 해운대점": "부산광역시 해운대구 해운대해변로 265", "산리오 러버스 클럽 해운대점": "부산광역시 해운대구 우동1로 56-4", "로우앤스윗 해리단길점": "부산광역시 해운대구 우동1로38번가길 1", "엣지993": "부산광역시 해운대구 달맞이길62번길 78",
  "차선책": "부산광역시 수영구 광안해변로 237 3층", "컵앤컵": "부산광역시 수영구 광안해변로 177 4층", "워킹홀리데이": "부산광역시 수영구 광안해변로 235 3층", "샌디스": "부산광역시 수영구 광안해변로 201", "별침대": "부산광역시 수영구 광안해변로 203", "카페오뜨 광안비치점": "부산광역시 수영구 광안해변로 209",
};

const fixedPlaceCoordinates = {
  "금수복국 해운대본점": [35.1621620, 129.1642443], "해운대암소갈비집": [35.1633332, 129.1656741], "해운대원조할매국밥": [35.1627301, 129.1609919], "톤쇼우 광안점": [35.1563957, 129.1248902], "언양불고기 부산집": [35.1492695, 129.1129034], "수변최고돼지국밥 민락본점": [35.1560780, 129.1341146],
  "송정집": [35.17686779660262, 129.19681887567634], "해운대31cm해물칼국수 송정본점": [35.18167301453993, 129.2001405545811], "송정가마솥돼지국밥": [35.18205044454625, 129.20018413643209], "다솥맛집 송정본점": [35.178394652007505, 129.19793005574235], "미포집 송정직영점": [35.17267437321957, 129.19763865652777], "낙불집 송정본점": [35.18047, 129.19963],
  "송정물총칼국수": [35.17632166448883, 129.19665700194804], "송도해솥": [35.07385931499843, 129.0158679534335], "송도키친": [35.07769298934426, 129.01926108157895], "김형제고기의철학 부산송도점": [35.075285711305895, 129.01602350688307], "우연지 부산송도점": [35.07385931499843, 129.0158679534335], "왕밀면냉면": [35.081292779105326, 129.0251035596277], "상월대오마카세": [35.070625920443895, 129.0186231337873],
  "할리스 부산송정점": [35.18076, 129.19986], "투썸플레이스 부산송정힐스점": [35.18132, 129.20013], "하삼동커피 송정점": [35.1829854, 129.2028381], "카페리프": [35.180837511596394, 129.20290904526888], "인얼스커피 송정점": [35.17743219558118, 129.1971820139762], "드래그하우스": [35.18038, 129.19976], "더레스트마린": [35.17930525147386, 129.20512698996163], "언양불고기 부산집": [35.147998017155174, 129.11352613968913], "디에이블 광안점": [35.15328368556618, 129.12475429073945], "페로어페로 광안리점": [35.1482187139021, 129.1140907238066], "차선책": [35.15470351808011, 129.119943150911], "컵앤컵": [35.15047369470459, 129.11577998341534], "워킹홀리데이": [35.15475884265314, 129.11974734520334], "카페이플": [35.15018064436417, 129.1135149601854], "류센소 본점": [35.16157237536048, 129.15621690598704], "나마스테 해운대점": [35.160267455566796, 129.1604648571793],
  "파노라마 라운지 웨스틴조선 부산": [35.155938272597325, 129.15397116162632], "스타벅스 해운대점": [35.1616735, 129.1603502], "옵스 해운대점": [35.16277404319039, 129.1628559194935], "산리오 러버스 클럽 해운대점": [35.1636139, 129.1565233], "로우앤스윗 해리단길점": [35.165142159233696, 129.15811784268658], "엣지993": [35.1578569, 129.1723282],
  "샌디스": [35.1384781, 129.1129089], "별침대": [35.1557532, 129.1245832], "카페오뜨 광안비치점": [35.1557220, 129.1325461],
};

window.toggleRestaurantMarker = async (name, button) => {
  const map = window.busanLeafletMap;
  const layer = window.restaurantMarkerLayer;
  if (!map || !layer) return;
  if (window.restaurantMarkers?.has(name)) {
    layer.removeLayer(window.restaurantMarkers.get(name));
    window.restaurantMarkers.delete(name);
    button.textContent = "지도 표시";
    button.classList.remove("is-active");
    updateRestaurantMarkerClear();
    return;
  }
  try {
    button.disabled = true;
    button.textContent = "표시 중";
    let location = fixedPlaceCoordinates[name];
    if (!location) {
      const query = fixedPlaceAddresses[name] || `${name} 부산광역시`;
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&accept-language=ko&q=${encodeURIComponent(query)}`);
      const places = await response.json();
      if (!places[0]) throw new Error("not found");
      location = [Number(places[0].lat), Number(places[0].lon)];
    }
    const marker = window.L.marker(location).addTo(layer).bindPopup(`<strong>${name}</strong>`).openPopup();
    window.restaurantMarkers.set(name, marker);
    map.flyTo(location, 16, { duration: 0.8 });
    button.textContent = "표시삭제";
    button.classList.add("is-active");
    updateRestaurantMarkerClear();
  } catch {
    button.textContent = "지도 표시";
    window.alert("지도에서 위치를 찾지 못했어요. 정확한 도로명 주소 또는 위도·경도를 알려주시면 고정 마커로 추가할 수 있어요.");
  } finally {
    button.disabled = false;
  }
};

function addRestaurantMarkerClear() {
  const panel = document.querySelector(".map-panel");
  if (!panel || panel.querySelector(".restaurant-marker-clear")) return;
  const button = document.createElement("button");
  button.className = "ghost restaurant-marker-clear";
  button.type = "button";
  button.textContent = "일괄 표시삭제";
  button.addEventListener("click", () => window.clearRestaurantMarkers?.());
  panel.appendChild(button);
  updateRestaurantMarkerClear();
}

function addCustomMarkerToggle() {
  const panel = document.querySelector(".map-panel");
  if (!panel || panel.querySelector(".custom-marker-toggle")) return;
  const button = document.createElement("button");
  button.className = "ghost custom-marker-toggle";
  button.type = "button";
  button.textContent = "직접 마킹";
  button.title = "버튼을 누른 뒤 지도 위치를 클릭하면 내 마커가 추가됩니다.";
  button.addEventListener("click", () => window.toggleCustomMarking?.());
  panel.appendChild(button);
}

function addCustomMarkerClear() {
  const layout = document.querySelector(".map-layout");
  if (!layout || layout.querySelector(".custom-marker-clear")) return;
  const button = document.createElement("button");
  button.className = "ghost custom-marker-clear";
  button.type = "button";
  button.textContent = "내 마킹 일괄삭제";
  button.addEventListener("click", () => window.clearCustomMarkers?.());
  layout.appendChild(button);
  updateCustomMarkerClear();
}

function addBeachQuickSelector() {
  const heading = document.querySelector(".map-heading");
  const activeTitle = document.querySelector(".detail h2")?.textContent.trim();
  if (!heading || !activeTitle || heading.querySelector(".beach-quick-selector")) return;
  const beaches = [["haeundae", "해운대해수욕장"], ["gwangalli", "광안리해수욕장"], ["songjeong", "송정해수욕장"], ["songdo", "송도해수욕장"], ["dadaepo", "다대포해수욕장"], ["quiet", "임랑·일광해수욕장"]];
  const selector = document.createElement("div");
  selector.className = "beach-quick-selector";
  selector.setAttribute("aria-label", "해수욕장 빠른 선택");
  const allButton = document.createElement("button");
  allButton.type = "button";
  allButton.dataset.key = "all";
  allButton.textContent = "전체";
  allButton.addEventListener("click", () => window.showAllBeaches?.());
  selector.appendChild(allButton);
  beaches.forEach(([key, title]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.key = key;
    button.className = title === activeTitle ? "active" : "";
    button.textContent = title.replace("해수욕장", "");
    button.addEventListener("click", () => window.pick(key));
    selector.appendChild(button);
  });
  heading.querySelector("p:last-of-type")?.insertAdjacentElement("afterend", selector);
}

function addTypeRelations() {
  const resultCard = document.querySelector(".result-card");
  const animal = resultCard?.querySelector(".animal");
  const recommend = resultCard?.querySelector(".recommend");
  const resultInfo = resultCard?.querySelector(".result-info");
  if (!resultCard || !animal || !recommend || !resultInfo || resultCard.querySelector(".type-relations")) return;
  const key = ["quiet", "dadaepo", "songdo", "songjeong", "gwangalli", "haeundae"].find((item) => animal.classList.contains(item));
  const relations = {
    quiet: [["dadaepo", "낭만적인 해파리형"], ["haeundae", "활기찬 범고래형"]], dadaepo: [["quiet", "여유로운 해달형"], ["haeundae", "활기찬 범고래형"]],
    songdo: [["gwangalli", "감성 타는 가오리형"], ["quiet", "여유로운 해달형"]], songjeong: [["gwangalli", "감성 타는 가오리형"], ["quiet", "여유로운 해달형"]],
    gwangalli: [["haeundae", "활기찬 범고래형"], ["quiet", "여유로운 해달형"]], haeundae: [["gwangalli", "감성 타는 가오리형"], ["quiet", "여유로운 해달형"]],
  };
  const [similar, opposite] = relations[key] || [];
  if (!similar || !opposite) return;
  const section = document.createElement("section");
  section.className = "type-relations";
  section.innerHTML = `<button type="button" data-type="${similar[0]}"><span>비슷한 유형</span><strong>${similar[1]}</strong></button><button type="button" data-type="${opposite[0]}"><span>반대되는 유형</span><strong>${opposite[1]}</strong></button>`;
  section.querySelectorAll("button").forEach((button) => button.addEventListener("click", () => window.showQuickType?.(button.dataset.type, true)));
  animal.insertAdjacentElement("afterend", recommend);
  resultInfo.insertAdjacentElement("afterend", section);
}

new MutationObserver(initBusanMap).observe(document.querySelector("#app"), { childList: true, subtree: true });
initBusanMap();
new MutationObserver(addRestaurantMarkerClear).observe(document.querySelector("#app"), { childList: true, subtree: true });
addRestaurantMarkerClear();
new MutationObserver(addCustomMarkerToggle).observe(document.querySelector("#app"), { childList: true, subtree: true });
addCustomMarkerToggle();
new MutationObserver(addCustomMarkerClear).observe(document.querySelector("#app"), { childList: true, subtree: true });
addCustomMarkerClear();
new MutationObserver(addBeachQuickSelector).observe(document.querySelector("#app"), { childList: true, subtree: true });
addBeachQuickSelector();
new MutationObserver(addTypeRelations).observe(document.querySelector("#app"), { childList: true, subtree: true });
addTypeRelations();

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
