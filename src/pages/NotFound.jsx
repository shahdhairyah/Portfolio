import { Link } from "react-router-dom";
import { ArrowLeft, Home, SearchX } from "lucide-react";
import { SEO } from "@/components/SEO";
import Aurora from "@/components/reactbits/Aurora";
import BlurText from "@/components/reactbits/BlurText";
import DecryptedText from "@/components/reactbits/DecryptedText";
import DotGrid from "@/components/reactbits/DotGrid";
import StarBorder from "@/components/reactbits/StarBorder";
import ClickSpark from "@/components/reactbits/ClickSpark";

export const NotFound = () => {
  return (
    <ClickSpark color="#ff9a4d" count={12} size={16} radius={40} className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#020202] text-white">
      <SEO
        title="Page Not Found – Shah Dhairya"
        description="The page you're looking for doesn't exist. Return to Shah Dhairya's portfolio homepage."
        path="/404"
        noindex
      />

      <Aurora
        className="absolute inset-0"
        colorStops={["#bf4417", "#ea580c", "#7f1d1d"]}
        speed={0.4}
        amplitude={1}
        opacity={0.35}
      />
      <DotGrid className="opacity-30" dotSize={1.6} gap={30} radius={170} activeColor="#ff9a4d" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,#020202_78%)]" />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#bf4417]/30 bg-[#bf4417]/10 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#ff9a4d]">
          <SearchX size={12} />
          Signal lost
        </span>

        <DecryptedText
          text="404"
          animateOn="view"
          loop
          className="mt-6 block font-display text-[clamp(5rem,22vw,14rem)] font-extrabold leading-none tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white/70 to-[#bf4417]"
        />

        <h1 className="mt-2 text-xl font-bold uppercase tracking-[0.18em] text-white/90 sm:text-3xl">
          <BlurText text="Page Not Found" trigger="load" className="inline-block" />
        </h1>

        <p className="mx-auto mt-5 max-w-md text-sm font-light leading-relaxed text-white/55">
          This route doesn&apos;t exist — or it was moved. Let&apos;s get you back
          to something worth building.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <StarBorder
            as={Link}
            to="/"
            color="#ff9a4d"
            backgroundColor="#1a0d08"
            textColor="#ffffff"
            speed={4.5}
            radius={14}
          >
            <Home size={15} />
            Back Home
          </StarBorder>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-6 py-3.5 text-sm font-medium text-white/60 backdrop-blur-md transition-all duration-300 hover:border-white/25 hover:text-white"
          >
            <ArrowLeft size={15} />
            Explore Projects
          </Link>
        </div>

        <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.26em] text-white/25">
          Error code: ROUTE_NOT_RESOLVED
        </p>
      </div>
    </ClickSpark>
  );
};
