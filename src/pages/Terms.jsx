import { motion } from "framer-motion";
import { Scale, FileText, Code, Mail, RefreshCw, AlertCircle } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import PageCTA from "@/components/shared/PageCTA";
import ClickSpark from "@/components/reactbits/ClickSpark";
import DotGrid from "@/components/reactbits/DotGrid";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import ShinyText from "@/components/reactbits/ShinyText";
import { SEO } from "@/components/SEO";

const sections = [
  {
    icon: FileText,
    title: "Use of Content",
    content: "All content on this portfolio — including code snippets, design assets, and project descriptions — is my original work unless otherwise noted. You may view and share it with attribution, but not reproduce or distribute it as your own without permission."
  },
  {
    icon: Code,
    title: "Project Code",
    content: "Source code for open-source projects is governed by the license included in each repository. For proprietary work showcased here, the code is not available for reuse without explicit written permission."
  },
  {
    icon: Mail,
    title: "Contact & Inquiries",
    content: "By reaching out through the contact form, you agree to be contacted at the email address you provide. Your information will only be used for communication related to your inquiry and will not be shared with third parties."
  },
  {
    icon: RefreshCw,
    title: "Changes to Terms",
    content: "These terms may be updated periodically to reflect changes in practices or legal requirements. Continued use of this site after changes constitutes acceptance of the updated terms."
  },
  {
    icon: AlertCircle,
    title: "Limitation of Liability",
    content: "This portfolio is provided 'as is' without any warranties. I am not liable for any damages arising from the use of this site or the projects displayed."
  }
];

export const Terms = () => {
  return (
    <ClickSpark color="#ff9a4d" count={10} size={14} radius={34} className="w-full overflow-hidden bg-[#020202]">
      <SEO
        title="Terms of Service – Shah Dhairya"
        description="Terms of service for shahdhairyah.in. Guidelines governing the use of this portfolio and its content."
        path="/terms"
        noindex
      />

      <PageHeader
        title={"TERMS OF\nSERVICE"}
        kicker="cat terms.md"
        titleSize="text-[clamp(2.5rem,11vw,8rem)]"
        subtitle="Clear, fair guidelines for using this portfolio, its content, and its code."
      />

      <section className="relative min-h-screen overflow-hidden py-16 text-white sm:py-24">
        <DotGrid className="opacity-20" dotSize={1.5} gap={32} radius={150} activeColor="#ff9a4d" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020202]/60 to-[#bf4417]/[0.03]" />
        <div className="relative container mx-auto max-w-4xl px-6">
          <div className="mb-10 flex flex-col items-center gap-3 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/60 backdrop-blur-md">
              <Scale size={12} />
              Terms of Service
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
        eyebrow="NEED CLARITY?"
        title="Let's keep things"
        accent="simple."
        description="If any term needs clarification or you're planning a collaboration, a quick message is the fastest way to sort it out."
        secondaryLabel="Get in Touch"
        secondaryTo="/contact"
      />
    </ClickSpark>
  );
};
