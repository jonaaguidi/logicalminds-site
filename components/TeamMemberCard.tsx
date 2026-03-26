"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import ScrollReveal from "./animations/ScrollReveal";

const FloatingLines = dynamic(() => import("./animations/FloatingLines"), { ssr: false });

export interface ExpertiseItem {
  label: string;
  icon: React.ReactNode;
}

export interface TeamMemberData {
  name: string;
  initials: string;
  image?: string;
  role: string;
  location: string;
  linkedin: string;
  calendly?: string;
  bio: string[];
  skills: string[];
  expertise: ExpertiseItem[];
  tools?: string[];
}

export default function TeamMemberCard({ member }: { member: TeamMemberData }) {
  const { t } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative min-h-screen overflow-hidden py-32 sm:py-40">
      {/* 3D FloatingLines background */}
      <FloatingLines
        linesGradient={["#7c3aed", "#a855f7", "#c084fc", "#8b5cf6", "#7c3aed"]}
        enabledWaves={["top", "bottom"]}
        lineCount={[6, 4]}
        lineDistance={[4.5, 5]}
        animationSpeed={0.6}
        interactive
        parallax
        parallaxStrength={0.1}
        bendStrength={-0.3}
        bendRadius={6}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial fade */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,#0a0a0f_80%)]" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div
            ref={cardRef}
            className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] shadow-[0_8px_40px_rgba(124,58,237,0.08)] backdrop-blur-xl"
          >

            <div className="relative p-6 sm:p-8 lg:p-10">
              {/* Top: Avatar + Name + Role */}
              <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start sm:gap-6">
                {/* Avatar */}
                <div className="relative shrink-0">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={96}
                      height={96}
                      className="h-24 w-24 rounded-2xl border border-violet-500/20 object-cover"
                    />
                  ) : (
                    <div className="flex h-24 w-24 items-center justify-center rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/20 to-purple-500/10">
                      <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-3xl font-bold text-transparent">
                        {member.initials}
                      </span>
                    </div>
                  )}
                  {/* Online indicator */}
                  <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-[#0a0a0f] bg-emerald-500" />
                </div>

                {/* Name + Role + Location */}
                <div className="text-center sm:text-left">
                  <h1 className="text-2xl font-bold text-white sm:text-3xl">
                    {member.name}
                  </h1>
                  <p className="mt-1 bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-base font-semibold text-transparent sm:text-lg">
                    {member.role}
                  </p>
                  <div className="mt-2 inline-flex items-center gap-1.5 text-sm text-gray-500">
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0115 0z" />
                    </svg>
                    {member.location}
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="my-6 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent sm:my-8" />

              {/* Bio */}
              <ScrollReveal delay={0.1}>
                <div>
                  <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    {t("team.about")}
                  </h2>
                  <div className="space-y-3">
                    {member.bio.map((paragraph, i) => (
                      <p key={i} className={`text-sm leading-relaxed text-gray-400${i === 0 ? " font-semibold text-gray-300" : ""}`}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Expertise */}
              <ScrollReveal delay={0.2}>
                <div className="mt-6 sm:mt-8">
                  <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    {t("team.expertise")}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {member.expertise.map((item) => (
                      <span
                        key={item.label}
                        className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/20 bg-violet-500/[0.07] px-3 py-1.5 text-xs font-medium text-violet-300"
                      >
                        <span className="h-3.5 w-3.5 shrink-0 [&>svg]:h-full [&>svg]:w-full">{item.icon}</span>
                        {item.label}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Tech Stack */}
              <ScrollReveal delay={0.3}>
                <div className="mt-6 sm:mt-8">
                  <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    {t("team.techStack")}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-xs text-gray-300 transition-colors duration-300 hover:border-violet-500/20 hover:text-white"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Tools */}
              {member.tools && member.tools.length > 0 && (
                <ScrollReveal delay={0.35}>
                  <div className="mt-6 sm:mt-8">
                    <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                      {t("team.tools")}
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {member.tools.map((tool) => (
                        <span
                          key={tool}
                          className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-xs text-gray-300 transition-colors duration-300 hover:border-violet-500/20 hover:text-white"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              )}

              {/* Divider */}
              <div className="my-6 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent sm:my-8" />

              {/* CTAs */}
              <ScrollReveal delay={0.4}>
                <div className="flex flex-col gap-3 sm:flex-row">
                  {member.calendly && (
                    <a
                      href={member.calendly}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center justify-center gap-2.5 rounded-xl border border-violet-500/30 bg-violet-500/10 px-5 py-3 text-sm font-medium text-white backdrop-blur-xl transition-all duration-300 hover:bg-violet-500/20 hover:shadow-[0_0_30px_rgba(124,58,237,0.2)]"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                      </svg>
                      {t("team.scheduleMeet")}
                      <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                    </a>
                  )}
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center gap-2.5 rounded-xl border border-white/[0.1] bg-white/[0.05] px-5 py-3 text-sm font-medium text-white backdrop-blur-xl transition-all duration-300 hover:border-violet-500/30 hover:bg-white/[0.08] hover:shadow-[0_0_30px_rgba(124,58,237,0.15)]"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    {t("team.viewLinkedIn")}
                    <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </a>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </ScrollReveal>

        {/* Back to home */}
        <ScrollReveal delay={0.5}>
          <div className="mt-8 text-center">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors duration-300 hover:text-white"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              {t("team.backHome")}
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
