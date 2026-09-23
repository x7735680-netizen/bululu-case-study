import { useCallback, useEffect, useRef, useState } from "react";
import CaseStudyFooter from "../components/CaseStudyFooter.jsx";
import CaseStudyNav from "../components/CaseStudyNav.jsx";
import CursorImageTrail from "../components/CursorImageTrail.jsx";
import HMBrainstormSlide from "../components/HMBrainstormSlide.jsx";
import ImageFrame from "../components/ImageFrame.jsx";

const heroMeta = "Service Design · User Research · 12 Weeks · NFC + Digital Service";

const HERO_LABEL_TARGETS = {
  kit:  { hash: "#service-workflow", state: "starter-kit" },
  main: { hash: "#service-workflow", state: "sticker-book-closed" },
  app:  { hash: "#service-workflow", state: "digital-guidance" },
};

const researchScenes = [
  { src: "/images/hearing/research/01-school.png",       alt: "School",       label: "SCHOOL",              time: "2–5h",   frequency: "5 Times Weekly", description: "Professional language testing and recovery courses are provided, but personalized services are difficult to achieve." },
  { src: "/images/hearing/research/01-clinic.png",       alt: "Clinic",       label: "ORAL THERAPY CENTER", time: "1–2h",   frequency: "3 Times Weekly", description: "Parents choose teachers and course types independently, allowing for higher personalization, but the professional level varies." },
  { src: "/images/hearing/research/01-organization.png", alt: "Organization", label: "ORGANIZATION",        time: "0.5–1h", frequency: "2 Times Weekly", description: "Some children can be sponsored, but service frequency and quality are unstable." },
  { src: "/images/hearing/research/01-hospital.png",     alt: "Hospital",     label: "HOSPITAL",            time: "1.5–2h", frequency: "Uncertainty",     description: "Professional language tests and rehab courses are provided, but personalized treatment is hard to achieve." },
];

const gaps = [
  { num: "01", title: "专业支持是间断的",                          text: "学校、医院与康复机构能够提供专业训练，但服务频率有限，难以覆盖儿童每天的生活环境。" },
  { num: "02", title: "家长愿意参与，却不知道每天具体该怎么练", text: "家庭缺少的并不是更多康复知识，而是将专业目标转化为简单、明确、可以立即执行的家庭活动。" },
  { num: "03", title: "重复、抽象的训练，难以维持儿童参与",     text: "机械重复、脱离情境的语言训练，与儿童通过游戏、探索和具体情境学习的方式存在冲突。" },
];

const parentInsights = [
  { title: "Parental Role",   text: "I want to be a companion and guide, not someone who pressures the child.",                          variant: "soft" },
  { title: "Home Practices",  text: "Short tasks or story themes fit easily into daily routines and make speaking more enjoyable.",     variant: "blue" },
  { title: "Tool Simplicity", text: "Parents are busy, so simple tools with clear daily tasks help us follow through and make us more willing to practice with our child.", variant: "blue" },
  { title: "Misaligned Goals",text: "Teachers, therapists, and parents often lack shared goals. We don't know what to practice next at home, making it hard to stay consistent.", variant: "soft" },
];

const GAP_SLIDE_SUBTITLES = [
  "从服务链路中，我们发现三个阻碍家庭持续练习的关键断点",
  "173 份问卷进一步验证：家庭参与困难主要集中在两类典型模式",
];

const GAP_CHART_DIMENSIONS = [
  "External support for training",
  "Training frequency for ages 3–9",
  "Weekly home involvement time",
  "Diverse home participation methods",
  "Training frequency ≥4x/week",
];

const GAP_CHART_GROUPS = [
  {
    id: "a",
    title: "子群 A",
    percentage: "35.6%",
    summary: "低频参与，难以开始",
    values: [74, 72, 68, 6, 10],
    barriers: [
      ["缺少指导", "57.1%"],
      ["时间不匹配", "42.9%"],
      ["通勤/成本压力", "38.1%"],
      ["家校机构协调", "23.8%"],
    ],
  },
  {
    id: "b",
    title: "子群 B",
    percentage: "28.8%",
    summary: "协调成本高，家庭承接困难",
    values: [80, 32, 52, 34, 36],
    barriers: [
      ["缺少指导", "73.1%"],
      ["时间不匹配", "73.1%"],
      ["通勤/成本压力", "65.4%"],
      ["家校机构协调", "57.7%"],
    ],
  },
];

const GAP_BUBBLE_SIZES = {
  a: [82, 68, 60, 40],
  b: [82, 82, 70, 58],
};

const PHASE_BARS = [
  { id: 0, label: "Entice & Purchase" },
  { id: 1, label: "First “Aha” Moment" },
  { id: 2, label: "Daily O2O Loop" },
  { id: 3, label: "Feedback & Grow" },
];

const WORKFLOW_ICONS = [
  { id: "01", label: "Therapist / Clinic", sublabel: "Free NFC Sticker", phase: 0, interactive: false },
  { id: "02", label: "Google",             sublabel: "Offline Shop",     phase: 0, interactive: false },
  { id: "03", label: "Phone",              sublabel: "Start NFC Sticker", phase: 1, interactive: true, state: "starter-kit", activePill: "sublabel" },
  { id: "04", label: "Sticker Board",                                  phase: 1, interactive: true, state: "sticker-book-closed" },
  { id: "05", label: "NFC Sticker",                                    phase: 2, interactive: true, state: "sticker-book-open" },
  { id: "06", label: "APP-study",                                      phase: 2, interactive: true, state: "digital-guidance" },
  { id: "07", label: "APP",                                            phase: 3, interactive: true, state: "digital-guidance" },
  { id: "08", label: "APP Pro",                                        phase: 3, interactive: true, state: "learning-progression" },
];

const APP_UI_SLIDES = [
  { src: "/images/hearing/app/07-app-01-home.png",             alt: "Home",            title: "HOME",          description: "查看当前学习路径与可进入的场景任务" },
  { src: "/images/hearing/app/07-app-02-finding-sticker.png",  alt: "Scenario",        title: "SCENARIO",      description: "从熟悉的家庭场景进入对应语言练习" },
  { src: "/images/hearing/app/07-app-03-word-pronounce.png",  alt: "Word Learning",   title: "WORD LEARNING", description: "建立真实物品与词语之间的对应关系" },
  { src: "/images/hearing/app/07-app-04-word-spell.png",       alt: "Pronunciation",   title: "PRONUNCIATION", description: "通过听、说和重复尝试完成发音练习" },
  { src: "/images/hearing/app/07-app-05-word-read.png",        alt: "Feedback",        title: "FEEDBACK",      description: "在练习完成后获得即时可见的学习反馈" },
  { src: "/images/hearing/app/07-app-06-award-page.png",       alt: "Practice",        title: "PRACTICE",      description: "通过短时任务在不同情境中重复使用词语" },
  { src: "/images/hearing/app/07-app-07-conversation.png",     alt: "Conversation",    title: "CONVERSATION",  description: "与 Bululu 完成围绕当前主题的简单对话" },
  { src: "/images/hearing/app/07-app-08-profile.png",          alt: "Progress",        title: "PROGRESS",      description: "查看当前阶段的学习进度与完成情况" },
];

const PROGRESS_STAGES = [
  { title: "Foundations",   description: "Basic vocabulary and context expression enlightenment", scenarios: "10", words: "100+", keywords: [{ label: "Discover", description: "Word Recognition · Matching Combine" }, { label: "Combine", description: "Action Relationships · Word Combinations" }, { label: "Express", description: "Functional Expression · Basic Emotions" }] },
  { title: "Expansion",     description: "Vocabulary Expansion and Scenario Transfer",            scenarios: "15", words: "200+", keywords: [{ label: "Expand",   description: "Vocabulary Expansion · Scenario Coverage" }, { label: "Connect",  description: "Cross-Scenario Relationship · Expression Transfer" }, { label: "Describe", description: "Complete Short Sentences · State Emotions" }] },
  { title: "Communication", description: "Abstract Expression and Social Communication",          scenarios: "20", words: "500+", keywords: [{ label: "Organize", description: "Information Organization · Continuous Expression" }, { label: "Reason",   description: "Abstract Understanding · Causes and Effects" }, { label: "Interact", description: "Social Communication · Emotional Response" }] },
];

const reflectionImages = [
  { src: "/images/hearing/character/09-bululu-01.png", alt: "Bululu 1" },
  { src: "/images/hearing/character/09-bululu-02.png", alt: "Bululu 2" },
  { src: "/images/hearing/character/09-bululu-03.png", alt: "Bululu 3" },
];

const reflectionGalleryImages = [
  { src: "/images/hearing/picture/01.JPG", alt: "" },
  { src: "/images/hearing/picture/02.JPG", alt: "" },
  { src: "/images/hearing/picture/03.JPG", alt: "" },
  { src: "/images/hearing/picture/04.JPG", alt: "" },
];

export default function HearingCaseStudy() {
  const [activeState, setActiveState] = useState("starter-kit");
  const [appSlideIdx, setAppSlideIdx] = useState(0);
  const [reflectionGalleryExpanded, setReflectionGalleryExpanded] = useState(false);
  const [gapSlideIndex, setGapSlideIndex] = useState(0);
  const [gapTransition, setGapTransition] = useState(null);
  const [gapHoveredBar, setGapHoveredBar] = useState(null);
  const [gapHoveredCluster, setGapHoveredCluster] = useState(null);
  const [gapAutoplayPaused, setGapAutoplayPaused] = useState(false);
  const [gapAutoplayVersion, setGapAutoplayVersion] = useState(0);
  const [hmwSlide, setHmwSlide] = useState(0);
  const [hmwAutoplayPaused, setHmwAutoplayPaused] = useState(false);
  const [hmwAutoplayVersion, setHmwAutoplayVersion] = useState(0);
  const gapAutoplayTimerRef = useRef(null);
  const gapTransitionTimerRef = useRef(null);
  const gapAnimationFrameRef = useRef(null);
  const gapPointerStartRef = useRef(null);
  const gapSliderRef = useRef(null);
  const hmwPointerStartRef = useRef(null);
  const hmwAutoplayTimerRef = useRef(null);

  const clearGapAutoplay = useCallback(() => {
    window.clearTimeout(gapAutoplayTimerRef.current);
  }, []);

  const pauseGapAutoplay = useCallback(() => {
    clearGapAutoplay();
    setGapAutoplayPaused(true);
  }, [clearGapAutoplay]);

  const resumeGapAutoplay = useCallback(() => {
    clearGapAutoplay();
    setGapAutoplayPaused(false);
    setGapAutoplayVersion((version) => version + 1);
  }, [clearGapAutoplay]);

  const pauseHmwAutoplay = useCallback(() => {
    window.clearTimeout(hmwAutoplayTimerRef.current);
    setHmwAutoplayPaused(true);
  }, []);

  const resumeHmwAutoplay = useCallback(() => {
    window.clearTimeout(hmwAutoplayTimerRef.current);
    setHmwAutoplayPaused(false);
    setHmwAutoplayVersion((version) => version + 1);
  }, []);

  const goToGapSlide = useCallback((targetIndex) => {
    if (gapTransition || targetIndex === gapSlideIndex) return;

    setGapTransition({ from: gapSlideIndex, to: targetIndex, phase: "prepare" });
    gapAnimationFrameRef.current = window.requestAnimationFrame(() => {
      setGapTransition({ from: gapSlideIndex, to: targetIndex, phase: "moving" });
    });
    window.clearTimeout(gapTransitionTimerRef.current);
    gapTransitionTimerRef.current = window.setTimeout(() => {
      setGapSlideIndex(targetIndex);
      setGapTransition(null);
      setGapHoveredBar(null);
      setGapHoveredCluster(null);
    }, 650);
  }, [gapSlideIndex, gapTransition]);

  const handleGapPointerDown = (event) => {
    gapPointerStartRef.current = event.clientX;
    event.currentTarget.setPointerCapture?.(event.pointerId);
    pauseGapAutoplay();
  };

  const handleGapPointerUp = (event) => {
    const startX = gapPointerStartRef.current;
    gapPointerStartRef.current = null;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
    if (startX == null) return;
    const deltaX = event.clientX - startX;
    if (Math.abs(deltaX) < 50) {
      resumeGapAutoplay();
      return;
    }
    goToGapSlide((deltaX < 0 ? gapSlideIndex + 1 : gapSlideIndex - 1 + 2) % 2);
    resumeGapAutoplay();
  };

  const handleGapKeyDown = (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    pauseGapAutoplay();
    goToGapSlide((event.key === "ArrowRight" ? gapSlideIndex + 1 : gapSlideIndex - 1 + 2) % 2);
    resumeGapAutoplay();
  };

  const handleHmwPointerDown = (event) => {
    hmwPointerStartRef.current = event.clientX;
    pauseHmwAutoplay();
  };

  const handleHmwPointerUp = (event) => {
    const startX = hmwPointerStartRef.current;
    hmwPointerStartRef.current = null;
    if (startX == null) {
      resumeHmwAutoplay();
      return;
    }

    const deltaX = event.clientX - startX;
    if (Math.abs(deltaX) < 50) {
      resumeHmwAutoplay();
      return;
    }
    setHmwSlide((current) => (deltaX < 0 ? Math.min(current + 1, 1) : Math.max(current - 1, 0)));
    resumeHmwAutoplay();
  };

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return undefined;
    const legacyTargets = document.querySelectorAll(".cs-a, .cs-rule");
    const textTargets = document.querySelectorAll("[data-text-reveal]");
    if (!("IntersectionObserver" in window)) {
      legacyTargets.forEach((el) => el.classList.add("is-in"));
      textTargets.forEach((el) => el.classList.add("is-visible"));
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const target = entry.target;
          if (target.matches("[data-text-reveal]")) target.classList.add("is-visible");
          if (target.matches(".cs-a, .cs-rule")) target.classList.add("is-in");
          io.unobserve(target);
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );
    [...legacyTargets, ...textTargets].forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return undefined;

    const observedTargets = [
      { selector: ".concept-tags", className: "is-visible", threshold: 0.28 },
      { selector: ".progression-stages", className: "is-visible", threshold: 0.22 },
    ];
    const observers = observedTargets.flatMap(({ selector, className, threshold }) => {
      const target = document.querySelector(selector);
      if (!target) return [];

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add(className);
          observer.unobserve(entry.target);
        },
        { threshold },
      );
      observer.observe(target);
      return [observer];
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, [activeState]);

  useEffect(() => {
    const raf = window.requestAnimationFrame(() => {
      document.querySelector(".hero-copy")?.classList.add("is-entered");
    });

    return () => window.cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (activeState !== "digital-guidance") return undefined;
    if (typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }
    const id = setInterval(() => {
      setAppSlideIdx((i) => (i + 1) % APP_UI_SLIDES.length);
    }, 2000);
    return () => clearInterval(id);
  }, [activeState]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const schedule = () => {
      window.clearTimeout(gapAutoplayTimerRef.current);
      if (gapAutoplayPaused || gapTransition) return;
      gapAutoplayTimerRef.current = window.setTimeout(() => {
        goToGapSlide((gapSlideIndex + 1) % 2);
      }, 10000);
    };

    schedule();
    return () => {
      window.clearTimeout(gapAutoplayTimerRef.current);
    };
  }, [gapAutoplayPaused, gapAutoplayVersion, gapSlideIndex, gapTransition, goToGapSlide]);

  useEffect(() => {
    if (typeof window === "undefined" || hmwAutoplayPaused) return undefined;
    hmwAutoplayTimerRef.current = window.setTimeout(() => {
      setHmwSlide((current) => (current + 1) % 2);
    }, 10000);
    return () => window.clearTimeout(hmwAutoplayTimerRef.current);
  }, [hmwAutoplayPaused, hmwAutoplayVersion, hmwSlide]);

  useEffect(() => () => {
    window.clearTimeout(gapAutoplayTimerRef.current);
    window.clearTimeout(gapTransitionTimerRef.current);
    window.cancelAnimationFrame(gapAnimationFrameRef.current);
    window.clearTimeout(hmwAutoplayTimerRef.current);
  }, []);

  useEffect(() => {
    if (activeState !== "digital-guidance") setAppSlideIdx(0);
  }, [activeState]);

  const handleHeroLabel = (key) => {
    const target = HERO_LABEL_TARGETS[key];
    if (!target) return;
    setActiveState(target.state);
    window.requestAnimationFrame(() => {
      const el = document.querySelector(target.hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const handleServiceWorkflowJump = (event) => {
    event.preventDefault();
    setActiveState("starter-kit");
    window.requestAnimationFrame(() => {
      document.querySelector("#service-workflow")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  const toggleReflectionGallery = () => {
    setReflectionGalleryExpanded((expanded) => !expanded);
  };

  const handleReflectionGalleryKeyDown = (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    toggleReflectionGallery();
  };

  const currentPhase = WORKFLOW_ICONS.find((i) => i.state === activeState)?.phase ?? 0;
  const currentAppSlide = APP_UI_SLIDES[appSlideIdx] || APP_UI_SLIDES[0];

  const getGapSlideClass = (index) => {
    if (!gapTransition) {
      return `gap-slide ${gapSlideIndex === index ? "is-current" : "is-hidden"}`;
    }
    if (gapTransition.from === index) return "gap-slide is-current is-exiting";
    if (gapTransition.to === index) return `gap-slide is-incoming is-${gapTransition.phase}`;
    return "gap-slide is-hidden";
  };

  const getGapSubtitleClass = (index) => {
    if (!gapTransition) return `gap-slide-subtitle-item ${gapSlideIndex === index ? "is-current" : "is-hidden"}`;
    if (gapTransition.from === index) return "gap-slide-subtitle-item is-current is-exiting";
    if (gapTransition.to === index) return `gap-slide-subtitle-item is-incoming is-${gapTransition.phase}`;
    return "gap-slide-subtitle-item is-hidden";
  };

  return (
    <main className="hearing-page">
      <CaseStudyNav />

      <section className="hero-section" id="overview" aria-labelledby="hero-title">
        <div className="hero-copy">
          <img className="hero-logo-image hero-reveal" src="/images/hearing/brand/bululu-logo.png" alt="Bululu" />
          <p className="hero-label hero-reveal">Service Design · 2025</p>
          <h1 id="hero-title" className="hero-title hero-reveal">
            <span>让口语康复</span>
            <span>进入儿童的日常生活</span>
          </h1>
          <p className="hero-summary hero-reveal">一套面向3-6岁听障儿童家庭的口语学习服务，将专业康复目标转化为低门槛、游戏化的日常练习。</p>
          <p className="hero-meta-line hero-reveal">{heroMeta}</p>
        </div>

        <div className="hero-visual" aria-label="Project hero visuals">
          <div className="hero-card hero-card-kit" data-hero-card="kit">
            <ImageFrame src="/images/hearing/kit/kit-closed.png" alt="Starter Kit 实体包装" loading="eager" fetchPriority="high" />
            <a className="hero-card-label" href="#service-workflow" onClick={handleServiceWorkflowJump} aria-label="Starter Kit">Service Workflow</a>
          </div>
          <div className="hero-card hero-card-main" data-hero-card="main">
            <ImageFrame src="/images/hearing/stickers/06-sticker-book-open.png" alt="打开的 NFC 学习贴纸书" loading="eager" fetchPriority="high" />
            <a className="hero-card-label" href="#service-workflow" onClick={(e) => { e.preventDefault(); handleHeroLabel("main"); }} aria-label="Sticker Book">Sticker Book</a>
          </div>
          <div className="hero-card hero-card-app" data-hero-card="app">
            <ImageFrame src="/images/hearing/app/app-entry-phone.png" alt="儿童数字学习入口" loading="eager" fetchPriority="high" />
            <a className="hero-card-label" href="#service-workflow" onClick={(e) => { e.preventDefault(); handleHeroLabel("app"); }} aria-label="App">App</a>
          </div>
        </div>
      </section>

      {/* ─── 01 · CHALLENGE ─── */}
      <section className="case-section section-reference" id="challenge" aria-labelledby="challenge-title">
        <div className="case-section-inner">
          <div className="challenge-copy reveal-group" data-text-reveal>
            <p className="ref-section-label text-reveal" id="challenge-title">01 / CHALLENGE</p>
            <h2 className="ref-title">
              <span className="reveal-line"><span className="reveal-line-inner">口语康复需要持续发生，</span></span>
              <span className="reveal-line"><span className="reveal-line-inner">但专业服务往往是间断的。</span></span>
            </h2>

            <div className="challenge-contrast">
              <div>
                <p className="challenge-contrast-mark text-reveal">持续 · 高频</p>
                <p className="case-body-reference text-reveal">儿童语言发展需要在真实日常中反复练习</p>
              </div>
              <div>
                <p className="challenge-contrast-mark text-reveal">间断 · 低频</p>
                <p className="case-body-reference text-reveal">专业康复主要发生在学校、医院和康复机构，难以覆盖日常</p>
              </div>
            </div>
          </div>

          <div className="challenge-service-grid">
            {researchScenes.map((scene) => (
              <figure key={scene.src} className="challenge-service-card">
                <div className="challenge-card-media">
                  <img src={scene.src} alt={scene.alt} loading="lazy" />
                  <div className="challenge-card-overlay">
                    <div className="challenge-card-overlay-left">
                      <h3 className="challenge-card-title">{scene.label}</h3>
                    </div>
                    <div className="challenge-card-stats">
                      <span className="challenge-card-time">{scene.time}</span>
                      <span className="challenge-card-frequency">{scene.frequency}</span>
                    </div>
                  </div>
                </div>
                <figcaption className="challenge-service-caption">{scene.description}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 02 · FINDING THE GAP ─── */}
      <section className="case-section section-reference" id="finding-gap" aria-labelledby="finding-gap-title">
        <div className="case-section-inner">
          <div className="finding-gap-header reveal-group" data-text-reveal>
            <p className="ref-section-label text-reveal" id="finding-gap-title">02 / FINDING THE GAP</p>
            <h2 className="ref-title">
              <span className="reveal-line"><span className="reveal-line-inner">问题不只是“练得不够”，</span></span>
              <span className="reveal-line"><span className="reveal-line-inner">而是服务在进入家庭后发生了<em>断裂</em></span></span>
            </h2>
          </div>

          <div className="gap-slide-subtitle reveal-group" data-text-reveal aria-live="polite">
            {GAP_SLIDE_SUBTITLES.map((subtitle, index) => (
              <p key={subtitle} className={getGapSubtitleClass(index)}>
                <span className="text-reveal">{subtitle}</span>
              </p>
            ))}
          </div>

          <div
            className="gap-slider reveal-group"
            data-text-reveal
            aria-roledescription="carousel"
            aria-label="Finding the Gap slides"
            ref={gapSliderRef}
            tabIndex="0"
            onMouseEnter={pauseGapAutoplay}
            onMouseLeave={resumeGapAutoplay}
            onFocusCapture={pauseGapAutoplay}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) resumeGapAutoplay();
            }}
            onKeyDown={handleGapKeyDown}
            onPointerDown={handleGapPointerDown}
            onPointerUp={handleGapPointerUp}
            onPointerCancel={() => {
              gapPointerStartRef.current = null;
              resumeGapAutoplay();
            }}
            onLostPointerCapture={() => {
              gapPointerStartRef.current = null;
              resumeGapAutoplay();
            }}
          >
            <div className="gap-slider-viewport">
              <article
                className={`${getGapSlideClass(0)} gap-slide--overview`}
                aria-label="Slide 1 of 2"
                aria-hidden={gapSlideIndex !== 0 && gapTransition?.to !== 0}
              >
                <div className="gap-row">
                  {gaps.map((g) => (
                    <article key={g.num} className="gap-card">
                      <span className="gap-num text-reveal">{g.num}</span>
                      <h3 className="gap-title text-reveal">{g.title}</h3>
                      <p className="gap-text text-reveal">{g.text}</p>
                    </article>
                  ))}
                </div>

                <div className="parent-insight-row">
                  <figure className="parent-portrait">
                    <img src="/images/hearing/research/02-parent-interview.png" alt="家长访谈 — Li Yan, 41 year-old" loading="lazy" />
                    <span className="parent-tag text-reveal">Li Yan, 41 year-old</span>
                  </figure>

                  <div className="parent-insights">
                    {parentInsights.map((ins) => (
                      <article
                        key={ins.title}
                        className={`parent-insight parent-insight--${ins.variant}`}
                      >
                        <h4 className="parent-insight-title text-reveal">{ins.title}</h4>
                        <p className="parent-insight-text text-reveal">{ins.text}</p>
                      </article>
                    ))}
                  </div>
                </div>
              </article>

              <article
                className={`${getGapSlideClass(1)} gap-slide--chart`}
                aria-label="Slide 2 of 2"
                aria-hidden={gapSlideIndex !== 1 && gapTransition?.to !== 1}
              >
                <p className="gap-chart-intro text-reveal">
                  基于 173 份问卷样本，我们对家庭训练相关数据进行标准化，<br />
                  并采用 K-means 聚类识别典型参与模式；随后结合 9 项调研维度进行重编码与画像归纳。
                </p>

                <div className="gap-cluster-grid">
                  {GAP_CHART_GROUPS.map((group) => {
                    const clusterHovered = gapHoveredCluster === group.id;
                    return (
                      <article
                        key={group.id}
                        className={`gap-cluster gap-cluster--${group.id}${clusterHovered ? " has-bubble-hover" : ""}`}
                      >
                        <div className="gap-cluster-heading">
                          <h3 className="text-reveal">{group.title}</h3>
                          <strong className="text-reveal">{group.percentage}</strong>
                          <p className="text-reveal">{group.summary}</p>
                        </div>

                        <div className="gap-chart-area">
                          <div className="gap-bubble-card-wrap">
                            <button
                              type="button"
                              className="gap-bubble-card"
                              aria-label={`${group.title} 家庭参与障碍`}
                              onMouseEnter={() => {
                                pauseGapAutoplay();
                                setGapHoveredCluster(group.id);
                              }}
                                onMouseLeave={() => {
                                  setGapHoveredCluster(null);
                                  resumeGapAutoplay();
                                }}
                              onFocus={() => {
                                pauseGapAutoplay();
                                setGapHoveredCluster(group.id);
                              }}
                              onBlur={() => {
                                setGapHoveredCluster(null);
                                resumeGapAutoplay();
                              }}
                            >
                              <span className="gap-barrier-copy">
                              <span className="gap-bubble-card-title text-reveal">家庭参与障碍</span>
                                <span className="gap-bubble-list">
                                  {group.barriers.map(([label], index) => (
                                    <span className="gap-bubble-row" key={label}>
                                      <span className={`gap-bubble-dot gap-bubble-dot--${index}`} />
                                      <span className="text-reveal">{label}</span>
                                    </span>
                                  ))}
                                </span>
                              </span>
                              <span className="gap-bubble-cluster" aria-hidden="true">
                                {group.barriers.map(([label, value], index) => (
                                  <span
                                    className={`gap-bubble gap-bubble--${index}`}
                                    key={label}
                                    style={{ "--bubble-size": `${GAP_BUBBLE_SIZES[group.id][index]}px` }}
                                  >
                                    <span className="text-reveal">{value}</span>
                                  </span>
                                ))}
                              </span>
                            </button>
                          </div>

                          <div className="gap-bar-chart" aria-label={`${group.title} 相对特征强度`}>
                            <div className="gap-bar-axis-label text-reveal">相对特征强度</div>
                            <div className="gap-bars">
                              {group.values.map((value, index) => {
                                const barHovered = gapHoveredBar?.groupId === group.id && gapHoveredBar.index === index;
                                const anotherBarHovered = gapHoveredBar?.groupId === group.id && gapHoveredBar.index !== index;
                                return (
                                  <button
                                    type="button"
                                    className={`gap-bar-column${barHovered ? " is-hovered" : ""}${anotherBarHovered ? " is-dimmed" : ""}`}
                                    key={`${group.id}-${index}`}
                                    style={{ "--bar-value": value, "--bar-scale": value / 100, "--bar-delay": `${index * 70}ms` }}
                                    aria-label={`${GAP_CHART_DIMENSIONS[index]}，相对强度：${value}`}
                                    onMouseEnter={() => {
                                      pauseGapAutoplay();
                                      setGapHoveredBar({ groupId: group.id, index });
                                    }}
                                    onMouseLeave={() => {
                                      setGapHoveredBar(null);
                                      resumeGapAutoplay();
                                    }}
                                    onFocus={() => {
                                      pauseGapAutoplay();
                                      setGapHoveredBar({ groupId: group.id, index });
                                    }}
                                    onBlur={() => {
                                      setGapHoveredBar(null);
                                      resumeGapAutoplay();
                                    }}
                                  >
                                    <span className="gap-bar-tooltip" role="tooltip">
                                      <span className="text-reveal">{GAP_CHART_DIMENSIONS[index]}</span>
                                      <span className="text-reveal">相对强度：{value}</span>
                                    </span>
                                    <span className="gap-bar-fill" />
                                    <span className="gap-bar-label text-reveal">{GAP_CHART_DIMENSIONS[index]}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>

                <div className="gap-chart-summary-wrap">
                  <div className="gap-chart-summary">
                    <strong className="gap-chart-summary-number text-reveal">64.4%</strong>
                    <div className="gap-chart-summary-content">
                      <h3 className="text-reveal">外部支持主导 × 家庭指导缺口显著</h3>
                      <div className="gap-chart-summary-columns">
                        <ul>
                          <li className="text-reveal">以外部支持推动为主</li>
                          <li className="text-reveal">家庭练习时间与投入有限</li>
                        </ul>
                        <ul>
                          <li className="text-reveal">需要低门槛的家庭引导</li>
                          <li className="text-reveal">需要可衔接的闭环工具支持</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>

          <div className="gap-slider-indicator" aria-label="Select Finding the Gap slide">
            {[0, 1].map((index) => (
              <button
                type="button"
                key={index}
                className={gapSlideIndex === index ? "is-active" : ""}
                aria-label={`切换到第 ${index + 1} 页`}
                aria-pressed={gapSlideIndex === index}
                onClick={() => {
                  pauseGapAutoplay();
                  goToGapSlide(index);
                  resumeGapAutoplay();
                }}
              >
                <span />
              </button>
            ))}
          </div>

          <div className="core-insight reveal-group" data-text-reveal>
            <p className="core-insight-label text-reveal">CORE INSIGHT</p>
            <p className="core-insight-text">
              <span className="reveal-line"><span className="reveal-line-inner">真正缺失的不是更多康复内容，</span></span>
              <span className="reveal-line"><span className="reveal-line-inner">而是<em>专业康复与家庭日常之间的连接</em>。</span></span>
            </p>
          </div>
        </div>
      </section>

      {/* ─── 03 · HOW MIGHT WE ─── */}
      <section className="case-section section-reference hmw-section" id="how-might-we" aria-labelledby="how-might-we-title">
        <div className="case-section-inner">
          <header className="hmw-header reveal-group" data-text-reveal>
            <p className="ref-section-label text-reveal" id="how-might-we-title">03 / HOW MIGHT WE</p>
            <h2 className="ref-title">
              <span className="reveal-line"><span className="reveal-line-inner">如何把专业康复目标，</span></span>
              <span className="reveal-line"><span className="reveal-line-inner">转化为自然发生在家庭日常中的口语练习？</span></span>
            </h2>
          </header>

          <div className="hmw-slider-shell">
            <div
              className="hmw-slider"
              aria-roledescription="carousel"
              aria-label="How Might We slides"
              tabIndex="0"
              onMouseEnter={pauseHmwAutoplay}
              onMouseLeave={resumeHmwAutoplay}
              onFocusCapture={pauseHmwAutoplay}
              onBlurCapture={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) resumeHmwAutoplay();
              }}
              onPointerDown={handleHmwPointerDown}
              onPointerUp={handleHmwPointerUp}
              onPointerCancel={() => {
                hmwPointerStartRef.current = null;
                resumeHmwAutoplay();
              }}
            >
            <div className="hmw-slider-track" style={{ "--hmw-slide": hmwSlide }}>
              <article className="hmw-slide hmw-slide--brainstorm" aria-label="Slide 1 of 2" aria-hidden={hmwSlide !== 0}>
                <HMBrainstormSlide />
              </article>

              <article className="hmw-slide hmw-slide--research" aria-label="Slide 2 of 2" aria-hidden={hmwSlide !== 1}>
                <div className="hmw-research-layout">
                  <div className="hmw-research-copy">
                    <p className="case-body-reference hmw-research-copy-item"><strong>3–6 岁</strong>儿童更容易通过贴、撕、装饰等动手行为参与表达</p>
                    <p className="case-body-reference hmw-research-copy-item">清晰、具象的视觉线索，能降低儿童理解训练内容的认知负担</p>
                    <p className="case-body-reference hmw-research-copy-item">天蓝和暖黄是听障儿童更易接受的颜色</p>
                  </div>
                  <div className="hmw-research-visual">
                    <div className="sticker-research-quotes">
                      <p className="sticker-research-quote sticker-research-quote--first">“Deaf children prefer color more frequently than hearing children, indicating that the preference for color persists longer among deaf children compared to their hearing peers”</p>
                      <p className="sticker-research-quote sticker-research-quote--alt">“Sky blue, warm orange, and green were more easily accepted by deaf children.”</p>
                      <svg className="sticker-quote-connector" viewBox="0 0 94 86" aria-hidden="true"><path d="M8 6c1 38 20 64 67 66" /><path d="m66 62 10 10-11 8" /></svg>
                    </div>
                    <figure className="sticker-child-image"><img src="/images/hearing/research/03-sticker-expression.png" alt="儿童彩色手部创作" loading="lazy" /></figure>
                  </div>
                </div>
              </article>
            </div>
            </div>
          </div>

          <div className="hmw-slider-indicator" aria-label="Select How Might We slide">
            {[0, 1].map((index) => <button type="button" key={index} className={hmwSlide === index ? "is-active" : ""} aria-label={`切换到第 ${index + 1} 页`} aria-pressed={hmwSlide === index} onClick={() => { pauseHmwAutoplay(); setHmwSlide(index); resumeHmwAutoplay(); }}><span /></button>)}
          </div>
        </div>
      </section>

      {/* ─── 04 · HOW THE SERVICE WORKS ─── */}
      <section className="case-section section-reference service-section" id="service-workflow" aria-labelledby="service-title">
        <div className="case-section-inner">
          <div className="service-header reveal-group" data-text-reveal>
            <p className="ref-section-label text-reveal" id="service-title">04 / HOW THE SERVICE WORKS</p>
            <h2 className="ref-title service-title">
              <span className="reveal-line"><span className="reveal-line-inner">从专业目标到家庭练习，</span></span>
              <span className="reveal-line"><span className="reveal-line-inner">一套跨越实体与数字触点的学习服务</span></span>
            </h2>
          </div>

          <div className="service-stage-bar">
            {PHASE_BARS.map((phase) => (
              <div
                key={phase.id}
                className={`service-stage-cell${currentPhase === phase.id ? " service-stage-cell--active" : ""}`}
              >
                {phase.label}
              </div>
            ))}
          </div>

          <div className="service-node-grid">
            {WORKFLOW_ICONS.map((icon) => {
              const isActive = activeState === icon.state;
              return (
                <button
                  key={icon.id}
                  className={
                    "service-node" +
                    (isActive ? " service-node--active" : "") +
                    (!icon.interactive ? " service-node--static" : "")
                  }
                  onClick={() => icon.interactive && setActiveState(icon.state)}
                  type="button"
                  disabled={!icon.interactive}
                  aria-pressed={icon.interactive ? isActive : undefined}
                >
                  <span className="service-node-icon-wrap">
                    <img
                      src={`/images/hearing/service/04-service-workflow-icon-${icon.id}.png`}
                      alt=""
                      loading="lazy"
                      width={133}
                      height={113}
                    />
                  </span>
                  <span className="service-node-chip-group">
                    {icon.sublabel ? (
                      <>
                        <span className={`service-node-pill${isActive && icon.activePill !== "sublabel" ? " service-node-pill--active" : ""}`}>{icon.label}</span>
                        <span className={`service-node-pill${isActive ? " service-node-pill--active" : ""}`}>{icon.sublabel}</span>
                      </>
                    ) : (
                      <span className={`service-node-pill${isActive ? " service-node-pill--active" : ""}`}>{icon.label}</span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="service-content" data-state={activeState}>

            {activeState === "starter-kit" && (
              <CursorImageTrail>
              <div className="service-content-layout service-content-layout--starter">
                <div className="service-content-text">
                  <h3 className="service-content-title">STARTER KIT</h3>
                  <p className="service-content-lede">阅读步骤卡片并下载 APP</p>
                </div>
                <div className="service-content-visual">
                  <div className="starter-kit-stage">
                    <div className="starter-callout-column" aria-hidden="true">
                      <span className="starter-callout starter-callout-step">
                        <span className="starter-callout-text">步骤卡</span>
                        <span className="starter-callout-line" />
                      </span>
                      <span className="starter-callout starter-callout-sticker">
                        <span className="starter-callout-text">启动贴纸</span>
                        <span className="starter-callout-line" />
                      </span>
                    </div>
                    <div className="starter-product-wrap">
                    <img src="/images/hearing/kit/04-starter-kit-open.png" alt="Starter Kit 打开状态" loading="lazy" />
                    </div>
                  </div>
                </div>
              </div>
              </CursorImageTrail>
            )}

            {(activeState === "sticker-book-closed" || activeState === "sticker-book-open") && (
              <CursorImageTrail>
              <div className={`sticker-book-scene${activeState === "sticker-book-open" ? " is-open" : " is-closed"}`}>
                <div className="sticker-book-copy">
                  <h3 className="service-content-title">STICKER BOOK</h3>
                  <p className="service-content-lede">把专业支持带回家庭，让真实物体成为学习入口</p>
                </div>
                <button
                  className="sticker-book-toggle"
                  onClick={() => setActiveState(activeState === "sticker-book-open" ? "sticker-book-closed" : "sticker-book-open")}
                  type="button"
                  aria-label={activeState === "sticker-book-open" ? "收起贴纸册" : "打开贴纸册"}
                >
                  <img className="sticker-book-closed-image" src="/images/hearing/stickers/05-sticker-book-closed.png" alt="合上的贴纸册" loading="lazy" width={1026} height={792} />
                  <img className="sticker-book-open-image" src="/images/hearing/stickers/06-sticker-book-open.png" alt="打开的贴纸册" loading="lazy" width={1793} height={679} />
                </button>
                <span className="sticker-scene-callout sticker-scene-callout--deco">助听设备装饰贴纸<span className="callout-line" /></span>
                <span className="sticker-scene-callout sticker-scene-callout--nfc"><span className="callout-line" />NFC贴纸</span>
              </div>
              </CursorImageTrail>
            )}

            {activeState === "digital-guidance" && (
              <>
                <CursorImageTrail>
                <div className="digital-layout">
                  <div className="service-content-text">
                    <h3 className="service-content-title">DIGITAL GUIDANCE</h3>
                    <p className="service-content-lede">实体触发，数字内容完成即时学习反馈</p>
                    <div className="app-slide-copy">
                      <p className="app-slide-title">{currentAppSlide.title}</p>
                      <p className="app-slide-description">{currentAppSlide.description}</p>
                    </div>
                  </div>
                  <div className="digital-phone">
                    {APP_UI_SLIDES.map((slide, idx) => (
                      <img
                        key={slide.src}
                        className={`digital-phone-ui${appSlideIdx === idx ? " digital-phone-ui--active" : ""}`}
                        src={slide.src}
                        alt={slide.alt}
                        loading="lazy"
                        width={309}
                        height={593}
                      />
                    ))}
                    <img className="digital-phone-cover" src="/images/hearing/app/07-app-cover.png" alt="APP 外框" loading="lazy" width={309} height={593} />
                  </div>
                </div>
                </CursorImageTrail>
                <div className="app-progress">
                  <span className="app-progress-label">APP UI</span>
                  <span className="app-progress-track">
                    {APP_UI_SLIDES.map((_, idx) => (
                      <span
                        key={idx}
                        className={`app-progress-dot${appSlideIdx === idx ? " app-progress-dot--active" : ""}`}
                      />
                    ))}
                  </span>
                  <span className="app-progress-count">{String(appSlideIdx + 1).padStart(2, "0")} / {String(APP_UI_SLIDES.length).padStart(2, "0")}</span>
                </div>
              </>
            )}

            {activeState === "learning-progression" && (
              <CursorImageTrail>
              <div className="service-content-layout service-content-layout--narrow">
                <div className="service-content-text">
                  <h3 className="service-content-title">LEARNING PROGRESSION</h3>
                  <p className="service-content-lede">从认知物体，<br />逐渐走向表达与沟通</p>
                </div>
                <div className="service-content-visual" style={{ alignItems: "stretch" }}>
                  <div className="progression-stages">
                    {PROGRESS_STAGES.map((stage, idx) => (
                      <article key={stage.title} className="prog-stage">
                        <div className="prog-stage-head">
                          <h4 className="prog-stage-title">Stage {idx + 1}: {stage.title}</h4>
                          <p className="prog-stage-desc">{stage.description}</p>
                          <div className="prog-stage-stats">
                            <span><strong>{stage.scenarios}</strong> scenarios</span>
                            <span><strong>{stage.words}</strong> words</span>
                          </div>
                        </div>
                        <div className="prog-stage-keywords">
                          {stage.keywords.map((kw) => (
                            <div key={kw.label} className="prog-keyword">
                              <span className="prog-keyword-pill">{kw.label}</span>
                              <span className="prog-keyword-desc">{kw.description}</span>
                            </div>
                          ))}
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
              </CursorImageTrail>
            )}
          </div>
        </div>
      </section>

      {/* ─── 05 · REFLECTION ─── */}
      <section className="case-section section-reference reflection-section" id="reflection" aria-labelledby="reflection-title">
        <div className="case-section-inner">
          <div className="reflection-bululu">
            {reflectionImages.map((img) => (
              <img key={img.src} src={img.src} alt={img.alt} loading="lazy" />
            ))}
          </div>
          <div className="reflection-header reveal-group" data-text-reveal>
            <p className="ref-section-label text-reveal" id="reflection-title">05 / REFLECTION</p>
            <h2 className="ref-title reflection-title">
              <span className="reveal-line"><span className="reveal-line-inner">最终方案不是增加一个新的儿童学</span></span>
              <span className="reveal-line"><span className="reveal-line-inner">习 App，而是把机构康复支持延伸</span></span>
              <span className="reveal-line"><span className="reveal-line-inner">到家庭日常。</span></span>
            </h2>
          </div>
          <hr className="ref-blue-rule" />

          <div className="reflection-content">
            <div
              className={`reflection-gallery${reflectionGalleryExpanded ? " is-expanded" : ""}`}
              role="button"
              tabIndex={0}
              aria-label="展开或收起 Reflection 照片"
              aria-expanded={reflectionGalleryExpanded}
              onClick={toggleReflectionGallery}
              onKeyDown={handleReflectionGalleryKeyDown}
            >
              {reflectionGalleryImages.map((img, index) => (
                <figure key={img.src} className={`polaroid polaroid-${index + 1}`}>
                  <div className="polaroid-photo">
                    <img src={img.src} alt={img.alt} loading="lazy" />
                  </div>
                </figure>
              ))}
            </div>
            <div className="reflection-copy reveal-group" data-text-reveal>
              <p className="case-body-reference text-reveal">
                项目最初从“儿童语言学习产品”出发。研究让我意识到，真正需要被设计的并不是更多学习内容，而是专业康复、家庭和儿童之间的服务连续性。
              </p>
              <p className="case-body-reference text-reveal">
                因此，最终方案的重点从“设计一个 App”转向“设计一套能够进入家庭日常的服务系统”。
              </p>
            </div>
          </div>
        </div>
      </section>

      <CaseStudyFooter />
    </main>
  );
}
