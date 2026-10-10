import { useState, useEffect, useRef, useCallback, lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { HelmetProvider } from "react-helmet-async";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import WelcomeScreen from "@/components/WelcomeScreen";
import ChatbotWidget from "@/components/ChatbotWidget";
import ErrorBoundary from "@/components/ErrorBoundary";
import { CursorAccent } from "@/components/CursorAccent";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";
const lazyPage = (loader, name) =>
  lazy(() => loader().then((mod) => ({ default: mod[name] })));

/* Route-based code splitting — each page loads only when it is visited. */
const Home = lazyPage(() => import("@/pages/Home"), "Home");
const About = lazyPage(() => import("@/pages/About"), "About");
const Skills = lazyPage(() => import("@/pages/Skills"), "Skills");
const Projects = lazyPage(() => import("@/pages/Projects"), "Projects");
const ProjectCaseStudy = lazyPage(() => import("@/pages/ProjectCaseStudy"), "ProjectCaseStudy");
const Achievements = lazyPage(() => import("@/pages/Achievements"), "Achievements");
const AchievementDetails = lazyPage(() => import("@/pages/AchievementDetails"), "AchievementDetails");
const Contact = lazyPage(() => import("@/pages/Contact"), "Contact");
const Resume = lazyPage(() => import("@/pages/Resume"), "Resume");
const Privacy = lazyPage(() => import("@/pages/Privacy"), "Privacy");
const Terms = lazyPage(() => import("@/pages/Terms"), "Terms");
const NotFound = lazyPage(() => import("@/pages/NotFound"), "NotFound");

const RouteFallback = () => (
  <div className="flex min-h-screen w-full items-center justify-center bg-[#020202]">
    <div className="flex flex-col items-center gap-4">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#bf4417] via-[#ea580c] to-[#991b1b] font-syne text-sm font-extrabold text-white shadow-[0_0_20px_rgba(191,68,23,0.45)]">
        SD
      </span>
      <span className="h-1 w-24 overflow-hidden rounded-full bg-white/10">
        <span className="block h-full w-1/2 animate-marquee-left rounded-full bg-gradient-to-r from-[#bf4417] to-[#ff9a4d]" />
      </span>
    </div>
  </div>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const PageTransition = () => {
  const { pathname } = useLocation();
  const first = useRef(true);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setPlaying(true);
    const t = setTimeout(() => setPlaying(false), 750);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <AnimatePresence>
      {playing && (
        <motion.div key={pathname} className="fixed inset-0 z-[95] pointer-events-none">
          <motion.div
            className="absolute inset-0 bg-[#020202]"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: [0, 1, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, times: [0, 0.4, 0.6, 1], ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.div
            className="absolute top-1/2 left-0 right-0 h-px bg-gold"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: [0, 1, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, times: [0, 0.4, 0.6, 1], ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

function App() {
  const [welcomeComplete, setWelcomeComplete] = useState(() => {
    try {
      return localStorage.getItem("welcomeShown") === "true";
    } catch {
      return false;
    }
  });

  const [welcomeDismissed, setWelcomeDismissed] = useState(welcomeComplete);

  const handleWelcomeComplete = useCallback(() => {
    try {
      localStorage.setItem("welcomeShown", "true");
    } catch {
      /* ignore storage errors */
    }
    setWelcomeComplete(true);
    setTimeout(() => setWelcomeDismissed(true), 1000);
  }, []);

  return (
    <ErrorBoundary>
    <HelmetProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        disableTransitionOnChange
      >
        <MotionConfig reducedMotion="user">
          <Toaster />
          <BrowserRouter>
            <ScrollToTop />
            <Navbar />
            <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="skills" element={<Skills />} />
              <Route path="projects" element={<Projects />} />
              <Route path="projects/:slug" element={<ProjectCaseStudy />} />
              <Route path="achievements" element={<Achievements />} />
              <Route path="achievements/:slug" element={<AchievementDetails />} />
              <Route path="contact" element={<Contact />} />
              <Route path="resume" element={<Resume />} />
              <Route path="privacy" element={<Privacy />} />
              <Route path="terms" element={<Terms />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            </Suspense>
            <Footer />
            <ChatbotWidget />
            <CursorAccent />
            <PageTransition />
            <Analytics />
          </BrowserRouter>
          {!welcomeDismissed && (
            <WelcomeScreen onWelcomeComplete={handleWelcomeComplete} />
          )}
        </MotionConfig>
      </ThemeProvider>
    </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
