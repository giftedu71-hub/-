"use client";

import { useEffect, useRef, useState } from "react";

type BeachKey =
  | "quiet"
  | "dadaepo"
  | "songdo"
  | "songjeong"
  | "gwangalli"
  | "haeundae";

type Question = {
  id: "crowd" | "mood" | "wave" | "night" | "facility";
  label: string;
  prompt: string;
  answers: string[];
};

const questions: Question[] = [
  {
    id: "crowd",
    label: "혼잡도",
    prompt: "해변에 사람이 어느 정도 있는 것이 좋은가요?",
    answers: [
      "거의 사람이 없는 한적한 곳이 좋다",
      "사람이 많지 않은 곳이 좋다",
      "사람이 어느 정도 있어서 활기찬 곳이 좋다",
      "사람이 많고 북적여야 신난다",
    ],
  },
  {
    id: "mood",
    label: "분위기",
    prompt: "가장 끌리는 해변 분위기는 무엇인가요?",
    answers: [
      "자연 속에서 쉬는 조용하고 여유로운 분위기",
      "서핑과 레저를 즐기는 자유로운 분위기",
      "젊고 감성적인 카페 거리 분위기",
      "화려하고 활기찬 관광지 분위기",
    ],
  },
  {
    id: "wave",
    label: "파도 세기",
    prompt: "물놀이할 때 어떤 파도를 선호하나요?",
    answers: [
      "거의 파도가 없는 잔잔한 바다",
      "가볍게 출렁이는 약한 파도",
      "물놀이를 즐길 수 있을 정도로 파도가 있는 바다",
      "서핑이나 레저를 즐길 수 있는 강한 파도",
    ],
  },
  {
    id: "night",
    label: "야경",
    prompt: "해변의 밤 풍경이 얼마나 중요한가요?",
    answers: [
      "야경은 별로 중요하지 않다",
      "조용한 밤바다 정도면 충분하다",
      "노을이나 은은한 조명이 있으면 좋다",
      "다리와 도시 불빛이 보이는 화려한 야경이 중요하다",
    ],
  },
  {
    id: "facility",
    label: "주변 시설",
    prompt: "해변 주변에 어떤 시설이 있기를 바라나요?",
    answers: [
      "시설이 거의 없어도 조용하면 좋다",
      "편의점과 기본적인 식당만 있으면 된다",
      "카페와 맛집, 주차장 등 편의시설이 많으면 좋다",
      "숙박, 쇼핑, 체험시설까지 다양하게 있어야 한다",
    ],
  },
];

const results: Record<
  BeachKey,
  {
    name: string;
    beach: string;
    icon: string;
    image: string;
    iconLabel: string;
    description: string;
    accent: string;
  }
> = {
  quiet: {
    name: "여유로운 해달형",
    beach: "임랑해수욕장 · 일광해수욕장",
    icon: "",
    image: "/animals/otter.png",
    iconLabel: "편안하게 누워 있는 해달",
    description:
      "사람이 적고 조용한 바다에서 편안하게 쉬는 것을 좋아하며, 화려한 시설보다 한적함과 여유를 중요하게 생각하는 유형이에요.",
    accent: "#66bdb8",
  },
  dadaepo: {
    name: "낭만적인 해파리형",
    beach: "다대포해수욕장",
    icon: "",
    image: "/animals/jellyfish.png",
    iconLabel: "둥둥 떠 있는 해파리",
    description:
      "넓은 해변과 자연 풍경, 노을, 산책을 좋아하며 복잡한 관광지보다 여유로운 분위기를 선호하는 유형이에요.",
    accent: "#9a8ed5",
  },
  songdo: {
    name: "알차게 즐기는 해마형",
    beach: "송도해수욕장",
    icon: "",
    image: "/animals/seahorse.png",
    iconLabel: "카메라를 든 해마",
    description:
      "너무 붐비지도 너무 한적하지도 않은 균형 잡힌 해변을 좋아하며, 관광시설과 편의시설을 함께 이용하고 싶은 유형이에요.",
    accent: "#e3a76b",
  },
  songjeong: {
    name: "파도 타는 돌고래형",
    beach: "송정해수욕장",
    icon: "",
    image: "/animals/dolphin.png",
    iconLabel: "파도를 타는 돌고래",
    description:
      "강한 파도와 서핑, 해양레저 등 활동적인 체험을 좋아하며 자유로운 분위기의 해변을 선호하는 유형이에요.",
    accent: "#3fa6d8",
  },
  gwangalli: {
    name: "감성 타는 가오리형",
    beach: "광안리해수욕장",
    icon: "",
    image: "/animals/ray.png",
    iconLabel: "반짝이는 바다를 헤엄치는 가오리",
    description:
      "광안대교 야경, 카페, 맛집, 사진 촬영과 젊고 감성적인 분위기를 중요하게 생각하는 유형이에요.",
    accent: "#7267cc",
  },
  haeundae: {
    name: "활기찬 범고래형",
    beach: "해운대해수욕장",
    icon: "",
    image: "/animals/orca.png",
    iconLabel: "바다 위로 뛰어오르는 범고래",
    description:
      "사람이 많고 활기찬 대표 관광지를 좋아하며, 숙박, 음식점, 쇼핑, 관광시설 등 다양한 즐길 거리가 있는 곳을 선호하는 유형이에요.",
    accent: "#e66f69",
  },
};

const mapBeaches: Array<{
  key: BeachKey;
  shortName: string;
  title: string;
  note: string;
  atmosphere: string;
  crowd: number;
  waveStrength: "강한 파도" | "약한 파도";
  waveHeight: string;
  waveDescription: string;
  facilities: string[];
  nightImage: string;
  nightAlt: string;
  position: string;
}> = [
  {
    key: "quiet",
    shortName: "임랑·일광",
    title: "임랑·일광",
    note: "한적한 쉼과 잔잔한 바다",
    atmosphere: "조용하고 소박한 분위기",
    crowd: 1,
    waveStrength: "약한 파도",
    waveHeight: "(예상 유의파고 0.3~0.8m)",
    waveDescription: "자연스러운 물결이 있는 해변",
    facilities: ["🌿 조용한 휴식", "🚶 산책", "👨‍👩‍👧 가족 여행"],
    nightImage: "/beaches/imrang-ilgwang.png",
    nightAlt: "임랑과 일광 해수욕장의 밤 풍경",
    position: "marker-quiet",
  },
  {
    key: "songjeong",
    shortName: "송정",
    title: "송정해수욕장",
    note: "서핑과 자유로운 레저",
    atmosphere: "자유롭고 역동적인 분위기",
    crowd: 4,
    waveStrength: "강한 파도",
    waveHeight: "(예상 유의파고 0.6m~1.0m 이상)",
    waveDescription: "서핑을 즐기기 좋은 역동적인 파도가 있는 해변",
    facilities: ["🏄 서핑", "☕ 카페", "🍽 맛집", "🌊 해양레저"],
    nightImage: "/beaches/songjeong.png",
    nightAlt: "송정해수욕장의 밤 풍경",
    position: "marker-songjeong",
  },
  {
    key: "haeundae",
    shortName: "해운대",
    title: "해운대해수욕장",
    note: "부산을 대표하는 활기찬 관광지",
    atmosphere: "활기차고 화려한 분위기",
    crowd: 6,
    waveStrength: "약한 파도",
    waveHeight: "(예상 유의파고 0.3~0.8m)",
    waveDescription: "바다의 느낌을 즐길 수 있는 적당한 파도가 있는 해변",
    facilities: ["🍽 맛집", "☕ 카페", "🛍 쇼핑", "🏨 숙박", "🎡 관광"],
    nightImage: "/beaches/haeundae.png",
    nightAlt: "해운대해수욕장의 화려한 야경",
    position: "marker-haeundae",
  },
  {
    key: "gwangalli",
    shortName: "광안리",
    title: "광안리해수욕장",
    note: "광안대교 야경과 감성적인 카페",
    atmosphere: "젊고 낭만적인 분위기",
    crowd: 5,
    waveStrength: "약한 파도",
    waveHeight: "(예상 유의파고 0~0.5m)",
    waveDescription: "편안하고 안정적인 바다를 느낄 수 있는 해변",
    facilities: ["☕ 카페거리", "🍽 맛집", "🌉 야경 감상", "🚶 산책"],
    nightImage: "/beaches/gwangalli.png",
    nightAlt: "광안대교가 보이는 광안리해수욕장 야경",
    position: "marker-gwangalli",
  },
  {
    key: "songdo",
    shortName: "송도",
    title: "송도해수욕장",
    note: "바다와 관광시설의 균형",
    atmosphere: "편안하고 가족 친화적인 분위기",
    crowd: 3,
    waveStrength: "약한 파도",
    waveHeight: "(예상 유의파고 0~0.6m)",
    waveDescription: "비교적 잔잔하여 물놀이를 즐기기 좋은 해변",
    facilities: ["🚡 케이블카", "👨‍👩‍👧 가족 나들이", "🍽 음식점"],
    nightImage: "/beaches/songdo.png",
    nightAlt: "송도해수욕장의 밤 풍경",
    position: "marker-songdo",
  },
  {
    key: "dadaepo",
    shortName: "다대포",
    title: "다대포해수욕장",
    note: "넓은 모래사장과 아름다운 노을",
    atmosphere: "감성적이고 여유로운 분위기",
    crowd: 2,
    waveStrength: "약한 파도",
    waveHeight: "(예상 유의파고: 0~0.5m)",
    waveDescription: "여유롭게 산책과 물놀이를 즐기기 좋은 해변",
    facilities: ["🌅 노을 감상", "🚶 산책", "🌿 자연경관", "📸 사진 명소"],
    nightImage: "/beaches/dadaepo.jpg",
    nightAlt: "다대포해수욕장 주변의 밤 풍경",
    position: "marker-dadaepo",
  },
];

function baseResult(total: number): BeachKey {
  if (total <= 7) return "quiet";
  if (total <= 9) return "dadaepo";
  if (total <= 11) return "songdo";
  if (total <= 13) return "songjeong";
  if (total <= 16) return "gwangalli";
  return "haeundae";
}

function calculateResult(answers: number[]) {
  const total = answers.reduce((sum, value) => sum + value, 0);
  const base = baseResult(total);
  const fourPointIndexes = answers
    .map((value, index) => (value === 4 ? index : -1))
    .filter((index) => index !== -1);

  if (fourPointIndexes.length === 0) {
    return { key: base, total, reason: "총점에 가장 잘 맞는 해변을 찾았어요." };
  }

  if (fourPointIndexes.length === 1) {
    const strong = fourPointIndexes[0];
    const key: BeachKey =
      strong === 0
        ? "haeundae"
        : strong === 1
          ? "haeundae"
          : strong === 2
            ? "songjeong"
            : strong === 3
              ? answers[1] === 1
                ? "dadaepo"
                : "gwangalli"
              : answers[0] >= 3
                ? "haeundae"
                : "songdo";

    const reasons = [
      "북적이고 활기찬 곳을 원하는 취향을 우선했어요.",
      "화려하고 활기찬 관광지 분위기 취향을 우선했어요.",
      "강한 파도와 레저를 원하는 취향을 우선했어요.",
      "화려한 야경을 원하는 취향을 우선했어요.",
      answers[0] >= 3
        ? "다양한 시설과 활기찬 분위기를 함께 고려했어요."
        : "다양한 시설은 원하지만 혼잡함은 덜한 곳을 골랐어요.",
    ];

    return { key, total, reason: reasons[strong] };
  }

  const scores: Record<BeachKey, number> = {
    quiet: 0,
    dadaepo: 0,
    songdo: 0,
    songjeong: 0,
    gwangalli: 0,
    haeundae: 0,
  };
  scores[base] += 3;

  const moodMap: BeachKey[] = [
    total <= 7 ? "quiet" : "dadaepo",
    "songjeong",
    "gwangalli",
    "haeundae",
  ];
  const moodChoice = moodMap[answers[1] - 1];
  scores[moodChoice] += 3;

  if (answers[0] === 4) scores.haeundae += 2;
  if (answers[1] === 4) {
    scores.haeundae += 2;
  }
  if (answers[2] === 4) scores.songjeong += 4;
  if (answers[3] === 4) {
    scores[answers[1] === 1 ? "dadaepo" : "gwangalli"] += 4;
  }
  if (answers[4] === 4) {
    scores[answers[0] >= 3 ? "haeundae" : "songdo"] += 4;
  }

  const tieOrder: BeachKey[] = [
    moodChoice,
    base,
    "songjeong",
    "gwangalli",
    "haeundae",
    "songdo",
    "dadaepo",
    "quiet",
  ];
  const key = tieOrder.reduce((best, candidate) =>
    scores[candidate] > scores[best] ? candidate : best,
  );

  return {
    key,
    total,
    reason: "강하게 드러난 취향과 선택한 분위기, 총점을 함께 비교했어요.",
  };
}

export default function Home() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [selectedMapBeach, setSelectedMapBeach] = useState<BeachKey>("haeundae");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const result = showResult ? calculateResult(answers) : null;
  const activeMapBeach =
    mapBeaches.find((beach) => beach.key === selectedMapBeach) ?? mapBeaches[0];
  const resultBeach = result
    ? mapBeaches.find((beach) => beach.key === result.key) ?? mapBeaches[0]
    : null;
  const question = questions[step];
  const selected = answers[step];

  useEffect(() => {
    headingRef.current?.focus();
  }, [step, showResult, showMap]);

  function choose(value: number) {
    setAnswers((current) => {
      const next = [...current];
      next[step] = value;
      return next;
    });
  }

  function next() {
    if (!selected) return;
    if (step === questions.length - 1) {
      setShowResult(true);
      return;
    }
    setStep((current) => current + 1);
  }

  function reset() {
    setAnswers([]);
    setStep(0);
    setShowResult(false);
    setShowMap(false);
    setSelectedMapBeach("haeundae");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openMap() {
    if (result) setSelectedMapBeach(result.key);
    setShowMap(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="site-shell">
      <div className="sun-glow" aria-hidden="true" />
      <div className="wave wave-one" aria-hidden="true" />
      <div className="wave wave-two" aria-hidden="true" />

      <header className="brand">
        <span className="brand-mark" aria-hidden="true">
          〰
        </span>
        <span>BUSAN BEACH MATCH</span>
      </header>

      {showMap ? (
        <section className="map-screen">
          <div className="map-heading">
            <p className="eyebrow">BEACH EXPLORER</p>
            <h1 ref={headingRef} tabIndex={-1}>
              다른 부산 바다도
              <br />
              둘러볼까요?
            </h1>
            <p>지도 위 이름을 누르면 각 해수욕장의 매력을 확인할 수 있어요.</p>
          </div>

          <div className="map-layout">
            <div className="busan-map" aria-label="부산 주요 해수욕장 지도">
              <div className="map-land" aria-hidden="true">
                <span className="map-river river-one" />
                <span className="map-river river-two" />
              </div>
              <span className="east-sea" aria-hidden="true">동해</span>
              <span className="south-sea" aria-hidden="true">남해</span>
              {mapBeaches.map((beach) => (
                <button
                  key={beach.key}
                  type="button"
                  className={`map-marker ${beach.position} ${selectedMapBeach === beach.key ? "active" : ""}`}
                  aria-pressed={selectedMapBeach === beach.key}
                  onClick={() => setSelectedMapBeach(beach.key)}
                >
                  <i aria-hidden="true" />
                  <span>{beach.shortName}</span>
                </button>
              ))}
            </div>

            <aside className="map-panel">
              <div className="selected-beach-card" key={activeMapBeach.key} aria-live="polite">
                <p>선택한 해수욕장</p>
                <h2>{activeMapBeach.title}</h2>
                <span className="map-note">{activeMapBeach.note}</span>

                <dl className="beach-details">
                  <div>
                    <dt>분위기</dt>
                    <dd>{activeMapBeach.atmosphere}</dd>
                  </div>
                  <div className="crowd-detail">
                    <dt>혼잡도</dt>
                    <dd
                      className="crowd-dots"
                      aria-label={`혼잡도 6단계 중 ${activeMapBeach.crowd}단계`}
                    >
                      {Array.from({ length: 6 }, (_, index) => (
                        <i
                          key={index}
                          className={index < activeMapBeach.crowd ? "filled" : ""}
                          aria-hidden="true"
                        />
                      ))}
                    </dd>
                  </div>
                  <div className="wave-detail">
                    <dt>파도 세기</dt>
                    <dd>
                      <strong>{activeMapBeach.waveStrength}</strong>
                      <small>{activeMapBeach.waveHeight}</small>
                      <p>{activeMapBeach.waveDescription}</p>
                    </dd>
                  </div>
                  <div className="facility-detail">
                    <dt>주변 시설</dt>
                    <dd>
                      {activeMapBeach.facilities.map((facility) => (
                        <span key={facility}>{facility}</span>
                      ))}
                    </dd>
                  </div>
                </dl>
              </div>
              <figure className="night-view" key={`${activeMapBeach.key}-night`}>
                <figcaption>
                  <span>야경</span>
                  <strong>{activeMapBeach.shortName}</strong>
                </figcaption>
                <img
                  src={activeMapBeach.nightImage}
                  alt={activeMapBeach.nightAlt}
                  className={activeMapBeach.key === "haeundae" ? "focus-lower" : undefined}
                />
              </figure>
              <div className="map-actions">
                <button className="map-back-button" type="button" onClick={() => setShowMap(false)}>
                  ← 결과로 돌아가기
                </button>
                <button className="map-restart-button" type="button" onClick={reset}>
                  처음부터 테스트하기
                </button>
              </div>
            </aside>
          </div>
        </section>
      ) : !showResult ? (
        <section className="quiz-layout">
          <aside className="intro">
            <p className="eyebrow">나와 닮은 부산 바다는?</p>
            <h1>
              파도처럼
              <br />
              마음 가는 대로
            </h1>
            <p className="intro-copy">
              다섯 번의 선택이면 충분해요.
              <br />
              지금의 나에게 꼭 맞는 부산 바다를 만나보세요.
            </p>
            <div className="mini-beach" aria-hidden="true">
              <span>☀</span>
              <i />
              <b>〰 〰 〰</b>
            </div>
          </aside>

          <section className="quiz-card" aria-label="부산 해수욕장 성향 테스트">
            <div className="progress-row">
              <span>
                <strong>{String(step + 1).padStart(2, "0")}</strong>
                <em>/ {String(questions.length).padStart(2, "0")}</em>
              </span>
              <span className="topic">{question.label}</span>
            </div>
            <div className="progress-track" aria-hidden="true">
              <span style={{ width: `${((step + 1) / questions.length) * 100}%` }} />
            </div>

            <h2 ref={headingRef} tabIndex={-1}>
              {question.prompt}
            </h2>

            <div className="answer-list" role="radiogroup" aria-label={question.prompt}>
              {question.answers.map((answer, index) => {
                const value = index + 1;
                const isSelected = selected === value;
                return (
                  <button
                    className={`answer ${isSelected ? "selected" : ""}`}
                    key={answer}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => choose(value)}
                  >
                    <span className="answer-letter">{String.fromCharCode(65 + index)}</span>
                    <span>{answer}</span>
                    <i aria-hidden="true">{isSelected ? "✓" : "→"}</i>
                  </button>
                );
              })}
            </div>

            <div className="quiz-actions">
              <button
                className="back-button"
                type="button"
                disabled={step === 0}
                onClick={() => setStep((current) => current - 1)}
              >
                ← 이전
              </button>
              <button className="next-button" type="button" disabled={!selected} onClick={next}>
                {step === questions.length - 1 ? "결과 보기" : "다음 질문"} <span>→</span>
              </button>
            </div>
          </section>
        </section>
      ) : (
        result && (
          <section className="result-wrap">
            <div className="result-card" style={{ "--accent": results[result.key].accent } as React.CSSProperties}>
              <p className="result-kicker">당신과 닮은 부산 바다</p>
              <h1 ref={headingRef} tabIndex={-1}>
                {results[result.key].name}
              </h1>
              <div
                className={`result-icon result-icon-${result.key} sprite-icon`}
                role="img"
                aria-label={results[result.key].iconLabel}
              >
                <img src={results[result.key].image} alt="" />
              </div>
              <p className="result-description">{results[result.key].description}</p>

              <div className="recommendation">
                <span>추천 해수욕장</span>
                <strong>{results[result.key].beach}</strong>
              </div>

              {resultBeach && (
                <section className="result-beach-info" aria-label={`${resultBeach.title} 상세 정보`}>
                  <h2>{resultBeach.title} 한눈에 보기</h2>
                  <dl className="beach-details">
                    <div>
                      <dt>분위기</dt>
                      <dd>{resultBeach.atmosphere}</dd>
                    </div>
                    <div className="crowd-detail">
                      <dt>혼잡도</dt>
                      <dd className="crowd-dots" aria-label={`혼잡도 6단계 중 ${resultBeach.crowd}단계`}>
                        {Array.from({ length: 6 }, (_, index) => (
                          <i key={index} className={index < resultBeach.crowd ? "filled" : ""} aria-hidden="true" />
                        ))}
                      </dd>
                    </div>
                    <div className="wave-detail">
                      <dt>파도 세기</dt>
                      <dd>
                        <strong>{resultBeach.waveStrength}</strong>
                        <small>{resultBeach.waveHeight}</small>
                        <p>{resultBeach.waveDescription}</p>
                      </dd>
                    </div>
                    <div className="facility-detail">
                      <dt>주변 즐길거리</dt>
                      <dd>
                        {resultBeach.facilities.map((facility) => (
                          <span key={facility}>{facility}</span>
                        ))}
                      </dd>
                    </div>
                  </dl>
                </section>
              )}

              <div className="result-meta">
                <span>총점 {result.total}점</span>
                <p>{result.reason}</p>
              </div>

              <div className="result-actions">
                <button className="restart-button" type="button" onClick={reset}>
                  다시 하기 <span>↻</span>
                </button>
                <button className="explore-button" type="button" onClick={openMap}>
                  다른 바다 알아보기 <span>⌖</span>
                </button>
              </div>
            </div>
          </section>
        )
      )}

      <footer>
        <span>BUSAN · KOREA</span>
        <span>당신의 여름이 시작되는 곳</span>
      </footer>
    </main>
  );
}
