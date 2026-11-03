import { Code2, FileCode2, Database, Layers, Flame } from "lucide-react";
import PropTypes from "prop-types";
import Aurora from "@/components/reactbits/Aurora";
import BlurText from "@/components/reactbits/BlurText";
import ShinyText from "@/components/reactbits/ShinyText";
import GradientText from "@/components/reactbits/GradientText";
import Ticker from "@/components/shared/Ticker";

const DefaultIcons = [
  { icon: Code2, pos: "top-[15%] left-[1%]", speed: "4s", size: 24 },
  { icon: FileCode2, pos: "bottom-[20%] left-[1%]", speed: "5s", size: 22 },
  { icon: Layers, pos: "top-[18%] right-[1%]", speed: "4.5s", size: 24 },
  { icon: Database, pos: "bottom-[18%] right-[1%]", speed: "3.8s", size: 22 },
  { icon: Flame, pos: "top-[45%] left-[1%]", speed: "5.2s", size: 18 },
];

const PageHeader = ({ title, subtitle, titleSize, kicker }) => {
  const lines = title.split("\n");

  return (
    <div className="relative flex min-h-[360px] w-full flex-col items-center justify-center overflow-hidden bg-[#020202] pb-24 pt-20 md:min-h-[440px]">
      <Aurora
        className="absolute inset-0"
        colorStops={["#bf4417", "#ea580c", "#7f1d1d"]}
        speed={0.45}
        amplitude={1}
        opacity={0.5}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_5%,#020202_75%)]" />
      <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:54px_54px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />

      {DefaultIcons.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <div
            key={index}
            className={`absolute ${item.pos} z-20 hidden rounded-xl border border-[#bf4417]/30 bg-white/5 p-3 text-[#bf4417] backdrop-blur-md animate-bounce xl:block`}
            style={{ animationDuration: item.speed }}
          >
            <IconComponent size={item.size} />
          </div>
        );
      })}

      <div className="relative z-10 w-full px-4 text-center">
        <ShinyText
          text="SHAH DHAIRYA · PORTFOLIO"
          color="#8b8b8b"
          shineColor="#ff9a4d"
          speed={5}
          className="text-[10px] font-semibold uppercase tracking-[0.28em]"
        />

        {kicker && (
          <p className="mt-5 font-mono text-[11px] tracking-[0.08em] text-white/50 sm:text-xs">
            <span className="text-emerald-400">➜</span>{" "}
            <span className="text-sky-400">~</span>{" "}
            <span className="text-white/45">{kicker}</span>
          </p>
        )}

        <h1
          className={`mt-4 select-none font-extrabold uppercase leading-[0.88] tracking-tight text-white ${
            titleSize || "text-[clamp(2.25rem,11vw,9.5rem)]"
          }`}
        >
          {lines.map((line, index) => {
            const isAccent = lines.length > 1 && index === lines.length - 1;
            return isAccent ? (
              <GradientText
                key={`${line}-${index}`}
                className="block"
                speed={7}
                glow={0.2}
              >
                {line}
              </GradientText>
            ) : (
              <BlurText
                key={`${line}-${index}`}
                as="span"
                text={line}
                trigger="load"
                delay={90 + index * 60}
                className="block"
              />
            );
          })}
        </h1>

        <div className="mx-auto mt-3 h-px w-24 bg-gradient-to-r from-transparent via-[#bf4417] to-transparent" />

        {subtitle && (
          <p className="mx-auto mt-6 max-w-2xl text-base font-light tracking-wide text-white/65 sm:text-lg md:text-xl">
            {subtitle}
          </p>
        )}

        <div className="mt-4 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/30">
          <GradientText speed={8}>Full-Stack Developer</GradientText>
          <span className="text-white/20">/</span>
          <span>Digital Architect</span>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 bg-black/30 backdrop-blur-sm">
        <Ticker />
      </div>
    </div>
  );
};

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  titleSize: PropTypes.string,
  kicker: PropTypes.string,
};

export default PageHeader;
