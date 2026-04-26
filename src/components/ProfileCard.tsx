import { useEffect, useRef, useState } from "react";
import {
  AirbnbMark,
  AirbnbModalMark,
  AntigravityLogo,
  ChatGPTMark,
  ClaudeLogo,
  CursorAIIcon,
  CursorLogo,
  CVIcon,
  DribbbleIcon,
  FandomMark,
  FigmaDarkLogo,
  FigmaLogo,
  HandIcon,
  IkeaMark,
  InstagramIcon,
  LinkedInIcon,
  LocationIcon,
  LovableLogo,
  SoundOff,
  SoundOn,
  UbdMark,
} from "./icons";
import airbnbBanner from "@/assets/airbnb-banner.jpg";
import fandomBanner from "@/assets/fandom-banner.jpg";
import universityBanner from "@/assets/university-banner.jpg";
import chatgptBanner from "@/assets/chatgpt-banner.png";
import ikeaBanner from "@/assets/ikea-banner.png";

type NotchState = "default" | "active" | "auto-hidden" | "dismissed";

const skillData = [
  { img: "/skills/ui.png", text: "UI Design for Visual and Accessibility" },
  { img: "/skills/ux.png", text: "UX Strategy for Problem Solving" },
  { img: "/skills/interaction.png", text: "Interaction Design for Usability and Feedback" },
  { img: "/skills/ai.png", text: "Design to Development Translation for Ai Coding" },
  { img: "/skills/development.png", text: "AI-Assisted Design Workflow" },
];

const projectData = [
  {
    banner: airbnbBanner,
    Icon: AirbnbModalMark,
    title: "Create a Flight Ticket Booking Feature for Airbnb to Create a More Integrated Travel Experience",
    desc: "Airbnb has helped millions of people find and book places to stay, yet it leaves users to figure out how to get there on their own.",
    href: "https://www.notion.so/Create-a-Flight-Ticket-Booking-Feature-for-Airbnb-to-Create-a-More-Integrated-Travel-Experience-315f02b6a8af8074a844f88abf6f93e4?source=copy_link",
  },
  {
    banner: fandomBanner,
    Icon: FandomMark,
    title: "Create an Anti-Spoiler feature for a better exploration experience in Wikifandom",
    desc: "Hundreds of millions of people visit Fandom Wiki every month to learn about their favorite characters, yet many end up encountering spoilers that ruin their viewing experience.",
    href: "https://www.notion.so/Create-an-Anti-Spoiler-feature-for-a-better-exploration-experience-in-Wikifandom-315f02b6a8af80619103d590ebdd547e?source=copy_link",
  },
  {
    banner: universityBanner,
    Icon: UbdMark,
    title: "Redesigned the course registration layout to accelerate course selection with improved information clarity and visual hierarchy.",
    desc: "Course registration is a high-stakes and often stressful moment, but unclear information structure makes it difficult for students to understand their options.",
    href: "https://www.notion.so/Redesigned-the-course-registration-layout-to-accelerate-course-selection-with-improve-information-cl-315f02b6a8af805d91c5ce88f7d4e258?source=copy_link",
  },
  {
    banner: chatgptBanner,
    Icon: ChatGPTMark,
    title: "Redesign ChatGPT-4o For Optimizing Chat Organization and Visual Accessibility Features",
    desc: "ChatGPT empowers millions of users to generate ideas, learn, and solve problems, yet its cluttered chat history and limited organization make it difficult to retrieve information.",
    href: "https://www.notion.so/Redesign-ChatGPT-4o-For-Optimizing-Chat-Organization-and-Visual-Accessibility-Features-43a68404e4e940beab6b35fcd607f6a0?source=copy_link",
  },
  {
    banner: ikeaBanner,
    Icon: IkeaMark,
    title: "Redesigning IKEA Indonesia to Simplify Navigation, Enhance Product Discovery, and Streamline Checkout",
    desc: "IKEA has inspired millions of people to design and furnish their homes, yet its mobile app struggles with cluttered navigation and limited product clarity.",
    href: "https://www.notion.so/Redesign-Ikea-Indonesia-to-simplify-checkout-steps-bef1543332694b28b35f71fb4b05920c?source=copy_link",
  },
];

const ProfileCard = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  // Notch state machines
  const [toolsState, setToolsState] = useState<NotchState>("default");
  const [skillState, setSkillState] = useState<NotchState>("default");
  const lastScroll = useRef(0);
  const toolsRef = useRef<HTMLDivElement>(null);
  const skillRef = useRef<HTMLDivElement>(null);
  const toolsBtnRef = useRef<HTMLButtonElement>(null);
  const skillBtnRef = useRef<HTMLButtonElement>(null);

  // Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalExpanded, setModalExpanded] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const isMinimizing = useRef(false);

  const toggleSound = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setMuted(videoRef.current.muted);
  };

  // Tools view-more
  const handleToolsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (skillState === "active") setSkillState("dismissed");
    setToolsState((s) => (s === "active" ? "dismissed" : "active"));
  };
  const handleSkillClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (toolsState === "active") setToolsState("dismissed");
    setSkillState((s) => (s === "active" ? "dismissed" : "active"));
  };

  // Scroll behavior for notches
  useEffect(() => {
    const onScroll = () => {
      const top = window.pageYOffset || document.documentElement.scrollTop;
      const delta = top - lastScroll.current;
      if (Math.abs(delta) < 10) {
        lastScroll.current = top;
        return;
      }
      setToolsState((s) => {
        if (s === "dismissed" || s === "default") return s;
        if (delta > 0 && s === "active") return "auto-hidden";
        if (delta < 0 && s === "auto-hidden") return "active";
        return s;
      });
      setSkillState((s) => {
        if (s === "dismissed" || s === "default") return s;
        if (delta > 0 && s === "active") return "auto-hidden";
        if (delta < 0 && s === "auto-hidden") return "active";
        return s;
      });
      lastScroll.current = top <= 0 ? 0 : top;
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Click-outside dismissal
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (toolsBtnRef.current?.contains(t) || skillBtnRef.current?.contains(t)) return;
      if (toolsState === "active" && toolsRef.current && !toolsRef.current.contains(t)) {
        setToolsState("dismissed");
      }
      if (skillState === "active" && skillRef.current && !skillRef.current.contains(t)) {
        setSkillState("dismissed");
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [toolsState, skillState]);

  // Modal body lock + escape
  useEffect(() => {
    if (modalOpen) document.body.classList.add("modal-open");
    else document.body.classList.remove("modal-open");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && modalOpen) closeModal();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [modalOpen]);

  const openModal = () => {
    setModalOpen(true);
    setModalExpanded(false);
    requestAnimationFrame(() => {
      if (modalRef.current) modalRef.current.scrollTop = 0;
    });
  };
  const closeModal = () => {
    setModalOpen(false);
    setTimeout(() => setModalExpanded(false), 400);
  };
  const minimizeModal = () => {
    isMinimizing.current = true;
    setModalExpanded(false);
    setTimeout(() => (isMinimizing.current = false), 600);
  };

  // Scroll-to-expand
  const onModalScroll = () => {
    if (isMinimizing.current) return;
    if (modalRef.current && modalRef.current.scrollTop > 50 && !modalExpanded) {
      setModalExpanded(true);
    }
  };

  // Drag-to-dismiss (mobile pill gesture)
  const dragStartY = useRef<number | null>(null);
  const [dragDeltaY, setDragDeltaY] = useState(0);
  const isDragging = useRef(false);

  const onHeaderTouchStart = (e: React.TouchEvent) => {
    // Only allow drag-to-dismiss when modal is at scroll-top
    if (modalRef.current && modalRef.current.scrollTop > 0) return;
    dragStartY.current = e.touches[0].clientY;
    isDragging.current = false;
  };

  const onHeaderTouchMove = (e: React.TouchEvent) => {
    if (dragStartY.current === null) return;
    const delta = e.touches[0].clientY - dragStartY.current;
    // Only track downward drag
    if (delta > 0) {
      isDragging.current = true;
      setDragDeltaY(delta);
    }
  };

  const onHeaderTouchEnd = () => {
    if (dragStartY.current === null) return;
    if (isDragging.current && dragDeltaY > 100) {
      // Threshold reached — close modal
      closeModal();
    }
    // Reset
    dragStartY.current = null;
    isDragging.current = false;
    setDragDeltaY(0);
  };

  const notchClass =
    toolsState === "active"
      ? "notch-content notch-visible"
      : toolsState === "default"
        ? "notch-content"
        : "notch-content notch-hidden";

  const skillClass =
    skillState === "active"
      ? "skill-notch skill-notch-visible"
      : skillState === "default"
        ? "skill-notch"
        : "skill-notch skill-notch-hidden";

  return (
    <div className="page-shell">
      <main className="card">
        <div className="main-content">
          {/* Video */}
          <div className="video-container">
            <video ref={videoRef} autoPlay muted loop playsInline>
              <source src="/ghibli.mp4" type="video/mp4" />
            </video>
            <div className="video-overlay" />
            <button className="sound-toggle" onClick={toggleSound} aria-label="Toggle sound">
              {muted ? <SoundOff width={16} height={16} /> : <SoundOn width={16} height={16} />}
            </button>
          </div>

          {/* Profile + Socials */}
          <div className="profile-row">
            <div className="profile-picture">
              <img src="/profile.jpg" alt="Rener Aljustyo" />
              <div className="status-indicator">
                <div className="status-dot" />
                <div className="status-pulse" />
              </div>
            </div>
            <div className="account-section">
              <a href="https://www.linkedin.com/in/rener-aljustyo-302535266/" target="_blank" rel="noopener noreferrer" className="account-item account-linkedin" data-tooltip="LinkedIn" aria-label="LinkedIn">
                <LinkedInIcon />
              </a>
              <a href="https://www.instagram.com/rener.fig" target="_blank" rel="noopener noreferrer" className="account-item account-instagram" data-tooltip="Instagram" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href="https://www.dribbble.com/griceskie" target="_blank" rel="noopener noreferrer" className="account-item account-dribbble" data-tooltip="Dribbble" aria-label="Dribbble">
                <DribbbleIcon />
              </a>
            </div>
          </div>

          {/* Text Content */}
          <div className="text-content">
            <div className="name-section">
              <h1 className="name">
                Rener Aljustyo <span className="profession">(Designer)</span>
              </h1>
            </div>
            <p className="description">
              Trying to make an impact through design and nocode tools with Ai.... open to working on new projects, let's connect
            </p>
            <a href="https://www.google.com/maps/place/Jakarta" target="_blank" rel="noopener noreferrer" className="location">
              <LocationIcon width={16} height={16} />
              <span>Jakarta, ID</span>
            </a>
          </div>

          {/* Skills */}
          <div className="skill-content">
            <div className="section-header">
              <span className="section-title">Skills</span>
              <button ref={skillBtnRef} className="view-more" onClick={handleSkillClick}>
                View more
              </button>
            </div>
            <div className="skill-container">
              <span className="skill-item skill-red">UI/UX Design</span>
              <span className="skill-item skill-yellow">Ai Agent</span>
              <span className="skill-item skill-green">Product Design</span>
            </div>
          </div>

          {/* Tools */}
          <div className="tools-content">
            <div className="section-header">
              <span className="section-title">Tools</span>
              <button ref={toolsBtnRef} className="view-more" onClick={handleToolsClick}>
                View more
              </button>
            </div>
            <div className="tools-container">
              <div className="tool-item">
                <FigmaLogo /> <span>Figma</span>
              </div>
              <div className="tool-item">
                <LovableLogo /> <span>Lovable</span>
              </div>
              <div className="tool-item">
                <CursorLogo /> <span>Cursor</span>
              </div>
            </div>
          </div>

          {/* Project */}
          <div className="project-content">
            <div className="section-header">
              <span className="section-title">Project</span>
              <button className="view-more" onClick={(e) => { e.preventDefault(); openModal(); }}>
                View more
              </button>
            </div>
            <div className="project-item">
              <div className="project-logo">
                <AirbnbMark width={42} height={42} />
              </div>
              <div className="project-info">
                <h3 className="project-title">
                  Airbnb <span className="project-highlight">Flights</span>
                </h3>
                <p className="project-subtitle">For More Integrated Travel Experience</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="action-content">
            <a href="https://drive.google.com/file/d/15VuRvFxnNjngOREHTvxt_q-UfgEypaTc/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="action-btn action-cv">
              <CVIcon />
              <span>Read my CV</span>
            </a>
            <a href="https://wa.me/6289507116946?text=Hi%20Rener,%20great%20to%20connect%20with%20you!%20%F0%9F%98%8A%0AI%E2%80%99d%20like%20to%20share%20some%20project%20details:%0ABrief%20Project:%0ATimeline:%0ABudget:%0AContact:" target="_blank" rel="noopener noreferrer" className="action-btn action-touch">
              <HandIcon />
              <span>Get in touch</span>
            </a>
          </div>
        </div>

        {/* Available banner */}
        <div className="available-content">
          <span>Available for Freelance & Fulltime</span>
        </div>
      </main>

      {/* Tools dock notch */}
      <div ref={toolsRef} className={notchClass}>
        <div className="notch-item" data-tooltip="Figma"><FigmaDarkLogo /></div>
        <div className="notch-item" data-tooltip="Cursor"><CursorAIIcon /></div>
        <div className="notch-item" data-tooltip="Antigravity"><AntigravityLogo /></div>
        <div className="notch-item" data-tooltip="Lovable"><LovableLogo /></div>
        <div className="notch-item" data-tooltip="Claude"><ClaudeLogo /></div>
      </div>

      {/* Skill notch */}
      <div ref={skillRef} className={skillClass}>
        {skillData.map((s) => (
          <div key={s.text} className="skill-notch-item">
            <div className="skill-notch-image">
              <img src={s.img} alt="" loading="lazy" />
            </div>
            <span className="skill-notch-text">{s.text}</span>
          </div>
        ))}
      </div>

      {/* Project Modal */}
      <div
        className={`project-modal-overlay${modalOpen ? " active" : ""}`}
        onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
      >
        <div
          ref={modalRef}
          className={`project-modal${modalExpanded ? " expanded" : ""}`}
          onScroll={onModalScroll}
          style={dragDeltaY > 0 ? {
            transform: `translateY(${dragDeltaY}px)`,
            opacity: Math.max(0.2, 1 - dragDeltaY / 300),
            transition: 'none',
          } : undefined}
        >
          <div
            className="project-modal-header"
            onTouchStart={onHeaderTouchStart}
            onTouchMove={onHeaderTouchMove}
            onTouchEnd={onHeaderTouchEnd}
          >
            <div className="traffic-light">
              <button className="traffic-dot red" aria-label="Close" data-tooltip="Close" onClick={closeModal} />
              <button className="traffic-dot yellow" aria-label="Minimize" data-tooltip="Minimize" onClick={minimizeModal} />
              <button className="traffic-dot green" aria-label="Expand" data-tooltip="Maximize" onClick={() => setModalExpanded(true)} />
            </div>
            <span className="modal-title">My Project</span>
          </div>
          <div className="project-modal-container">
            {projectData.map((p) => (
              <div key={p.title} className="project-modal-content">
                <div className="project-banner">
                  <img src={p.banner} alt="" loading="lazy" />
                </div>
                <div className="project-icon">
                  <p.Icon />
                </div>
                <div className="project-text-modal">
                  <h3 className="project-modal-title">{p.title}</h3>
                  <p className="project-modal-desc">{p.desc}</p>
                </div>
                <a className="project-action" href={p.href} target="_blank" rel="noopener noreferrer">
                  Read more
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
