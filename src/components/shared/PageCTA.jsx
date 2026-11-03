import { Link } from "react-router-dom";
import { ArrowUpRight, Code2, Mail, MapPin, Send } from "lucide-react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { EASE } from "@/components/home/ease";
import { identity } from "@/data/profile";
import BlurText from "@/components/reactbits/BlurText";
import GradientText from "@/components/reactbits/GradientText";
import Magnet from "@/components/reactbits/Magnet";
import ShinyText from "@/components/reactbits/ShinyText";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import StarBorder from "@/components/reactbits/StarBorder";

const PageCTA = ({
  eyebrow = "GET IN TOUCH",
  title = "Let's build something",
  accent = "remarkable.",
  description = "Have a project in mind or want to collaborate? I'm always open to discussing new opportunities and creative ideas.",
  secondaryLabel = "View Projects",
  secondaryTo = "/projects",
}) => (
  <section className="relative w-full px-6 py-24 md:py-32">
    <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(#bf4417_0%,transparent_70%)] opacity-[0.12] blur-[120px]" />

    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: EASE }}
      className="relative z-10 mx-auto max-w-4xl"
    >
      <SpotlightCard
        className="rounded-[2rem] border-white/10 bg-[#070707]/85 px-6 py-14 text-center backdrop-blur-xl sm:px-12 md:py-20"
        color="rgba(234, 88, 12, 0.24)"
        size={520}
      >
        <ShinyText
          text={eyebrow}
          color="#8b8b8b"
          shineColor="#ff9a4d"
          speed={4}
          className="text-[10px] font-semibold uppercase tracking-[0.26em]"
        />
        <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
          <BlurText text={title} className="block" />
          <GradientText className="mt-1 block" speed={7} glow={0.3}>
            {accent}
          </GradientText>
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-sm font-light leading-relaxed text-white/50">
          {description}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Magnet className="inline-block" maxOffset={10} strength={0.22}>
            <StarBorder
              as="a"
              href={`mailto:${identity.email}`}
              color="#ff9a4d"
              backgroundColor="#1a0d08"
              textColor="#ffffff"
              speed={4}
              radius={14}
            >
              <Send size={15} />
              Contact Me
            </StarBorder>
          </Magnet>
          <Magnet className="inline-block" maxOffset={8} strength={0.16}>
            <Link
              to={secondaryTo}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-6 py-3.5 text-sm font-medium text-white/55 transition-all duration-300 hover:border-white/25 hover:text-white"
            >
              <Code2 size={15} className="text-[#bf4417]" />
              {secondaryLabel}
              <ArrowUpRight size={14} />
            </Link>
          </Magnet>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 border-t border-white/[0.06] pt-8 text-[10px] uppercase tracking-[0.16em] text-white/35">
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={11} className="text-[#bf4417]" />
            {identity.location}
          </span>
          <span className="h-3 w-px bg-white/10" />
          <a
            href={`mailto:${identity.email}`}
            className="inline-flex items-center gap-1.5 transition-colors hover:text-white/70"
          >
            <Mail size={11} />
            {identity.email}
          </a>
        </div>
      </SpotlightCard>
    </motion.div>
  </section>
);

PageCTA.propTypes = {
  eyebrow: PropTypes.string,
  title: PropTypes.string,
  accent: PropTypes.string,
  description: PropTypes.string,
  secondaryLabel: PropTypes.string,
  secondaryTo: PropTypes.string,
};

export default PageCTA;
