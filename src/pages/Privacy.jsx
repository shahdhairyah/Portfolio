import { motion } from "framer-motion";
import { Shield, Mail, Cookie, Info, Database, Lock } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import PageCTA from "@/components/shared/PageCTA";
import ClickSpark from "@/components/reactbits/ClickSpark";
import DotGrid from "@/components/reactbits/DotGrid";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import ShinyText from "@/components/reactbits/ShinyText";
import { SEO } from "@/components/SEO";

const sections = [
  {
    icon: Info,
    title: "Information I Collect",
    content: "When you visit my portfolio or use the contact form, I may collect your name and email address (when you provide them), and basic usage data like page visits and browser type via analytics."
  },
  {
    icon: Database,
    title: "How I Use Your Information",
    content: "To respond to your messages and inquiries. To improve the website experience. I never sell or share your personal data with third parties."
  },
  {
    icon: Cookie,
    title: "Cookies",
    content: "This site uses minimal cookies for theme preference storage and basic analytics. No tracking cookies are used for advertising purposes."
  },
  {
    icon: Lock,
    title: "Data Security",
    content: "I take reasonable precautions to protect your information. Contact form submissions are transmitted securely and stored only as long as necessary to address your inquiry."
  },
  {
    icon: Mail,
    title: "Contact",
    content: "If you have questions about this policy, reach out at sdhairyah@gmail.com. I'll respond within 48 hours."
  }
];

export const Privacy = () => {
  return (
    <ClickSpark color="#ff9a4d" count={10} size={14} radius={34} className="w-full overflow-hidden bg-[#020202]">
      <SEO
        title="Privacy Policy – Shah Dhairya"
        description="Privacy policy for shahdhairyah.in. Learn how your data is collected, used, and protected when visiting this portfolio."
        path="/privacy"
        noindex
      />

      <PageHeader
        title="PRIVACY"
        kicker="cat privacy.md"
        titleSize="text-[clamp(3rem,12vw,8rem)]"
        subtitle="Your privacy matters. Here's exactly what is collected, how it is used, and how it is protected."
      />

      <section className="relative min-h-screen overflow-hidden py-16 text-white sm:py-24">
        <DotGrid className="opacity-20" dotSize={1.5} gap={32} radius={150} activeColor="#ff9a4d" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020202]/60 to-[#bf4417]/[0.03]" />
        <div className="relative container mx-auto max-w-4xl px-6">
          <div className="mb-10 flex flex-col items-center gap-3 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/60 backdrop-blur-md">
              <Shield size={12} />
              Privacy Policy
            </span>
            <ShinyText
              text="LAST UPDATED · JULY 2026"
              color="#8b8b8b"
              shineColor="#ff9a4d"
              speed={5}
              className="text-[10px] font-semibold uppercase tracking-[0.26em]"
            />
          </div>

          <div className="space-y-4">
            {sections.map((section, i) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: 0.06 * i, duration: 0.5 }}
                >
                  <SpotlightCard className="p-5 sm:p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2.5 rounded-lg bg-[#bf4417]/15 text-[#ff9a4d] border border-[#bf4417]/30 shrink-0">
                        <Icon size={18} />
                      </div>
                      <div>
                        <h2 className="font-bold text-sm sm:text-base mb-2 text-white">{section.title}</h2>
                        <p className="text-sm text-white/70 leading-relaxed">{section.content}</p>
                      </div>
                    </div>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <PageCTA
        eyebrow="QUESTIONS?"
        title="Privacy is a"
        accent="conversation."
        description="If anything here is unclear, or you want your data removed, reach out directly — I'll respond within 48 hours."
        secondaryLabel="Back to About"
        secondaryTo="/about"
      />
    </ClickSpark>
  );
};
