'use client'

import Image from 'next/image'
import { GraduationCap, Sparkles, Compass, Target, Award } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'
import { profile } from '@/data/profile'
import { certificates } from '@/data/certificates'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { GalleryModalAccordion } from '@/components/ui/gallery-modal-accordion'
import { Reveal } from '@/components/animations/Reveal'

export function About() {
  const { lang, t } = useLanguage()

  const detailIcons = [Compass, Sparkles, Target, GraduationCap]

  const certificateItems = certificates.map((cert) => ({
    id: cert.id,
    url: cert.url,
    title: lang === 'id' ? cert.title.id : cert.title.en,
    description: lang === 'id' ? cert.description.id : cert.description.en,
    tags: cert.tags,
    issuer: cert.issuer,
    date: lang === 'id' ? cert.date.id : cert.date.en,
    credentialId: cert.credentialId,
  }))

  return (
    <section id="about" className="py-20 md:py-32 relative overflow-hidden bg-primary">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeading
          indicator={t.about.indicator}
          heading={t.about.heading}
        />

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Portrait & Personal Spec Card */}
          <div className="lg:col-span-5 space-y-6">
            <Reveal direction="left">
              
            <div className="group relative rounded-3xl overflow-hidden border border-border bg-card p-3 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-secondary [perspective:1000px]">
                <Image
                  src={profile.profileImage}
                  alt={profile.fullName}
                  fill
                  unoptimized
                  className="object-cover object-top transition-all duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
                  sizes="(max-width: 1024px) 384px, 420px"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 group-hover:from-black/90" />

                {/* Profile information */}
                <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-2xl bg-black/85 backdrop-blur-md border border-white/10 shadow-lg transition-all duration-500 group-hover:-translate-y-2 group-hover:border-blue-400/40">
                  <span className="text-xs font-semibold tracking-wider text-blue-300 uppercase block mb-1">
                    Profile
                  </span>
                  <p className="font-heading text-lg font-bold text-white transition-colors duration-300 group-hover:text-blue-200">
                    {profile.fullName}
                  </p>
                </div>
              </div>

              <div className="pt-3 px-2 flex items-center justify-between text-xs text-text-secondary font-medium">
                <span>    Status</span>
                <span className="text-accent font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Aktif &amp; Terbuka
                </span>
              </div>
            </div>

            </Reveal>

            {/* Philosophy Bento Card */}
            <Reveal delay={0.15} direction="left">
              <div className="p-6 rounded-3xl border border-border bg-card shadow-sm">
                <p className="text-xs font-semibold tracking-wider text-accent uppercase mb-2">
                  Prinsip Kerja
                </p>
                <p className="text-text-primary text-base font-medium italic">
                  &ldquo;Mengubah ide menjadi pengalaman digital yang bermanfaat dan teruji.&rdquo;
                </p>
                <p className="text-xs text-text-secondary mt-2 text-balance">
                  Memadukan pemahaman teori informatika dengan ketelitian implementasi.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Editorial Bio + Bento Grid Info */}
          <div className="lg:col-span-7 space-y-6">
            {/* Bio Card */}
            <Reveal>
              <div className="p-8 md:p-10 rounded-3xl border border-border bg-card shadow-lg">
                <span className="text-xs font-semibold tracking-wider text-accent uppercase block mb-4">
                  Biografi
                </span>
                <div className="text-text-secondary text-base md:text-lg leading-relaxed whitespace-pre-line space-y-4">
                  {t.about.intro}
                </div>
              </div>
            </Reveal>

            {/* Education Bento Feature */}
            <Reveal delay={0.1}>
              <div className="group p-8 rounded-3xl border border-border bg-card hover:border-accent transition-all duration-300 shadow-lg">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-accent-soft border border-accent/25 flex items-center justify-center text-accent shrink-0">
                      <GraduationCap size={22} />
                    </div>
                    <div>
                      <span className="text-xs font-semibold tracking-wider text-accent uppercase block">
                        Pendidikan Akademik
                      </span>
                      <h3 className="font-heading text-xl md:text-2xl font-bold text-text-primary">
                        {t.about.education.university}
                      </h3>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-secondary border border-border text-text-secondary">
                    Lulusan Baru
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div>
                    <span className="text-xs text-text-muted font-medium uppercase block">
                      Program Studi
                    </span>
                    <p className="text-sm font-semibold text-text-primary mt-1">
                      {t.about.education.degree}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-text-muted font-medium uppercase block">
                      Lokasi Kampus
                    </span>
                    <p className="text-sm font-semibold text-text-primary mt-1">
                      {t.about.education.location}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-text-muted font-medium uppercase block">
                      IPK
                    </span>
                    <p className="text-sm font-semibold text-text-primary mt-1">
                      3.77
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* 4 Detail Grid Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {t.about.details.map((d, i) => {
                const Icon = detailIcons[i % detailIcons.length]
                return (
                  <Reveal key={d.label} delay={0.15 + i * 0.05}>
                    <div className="group h-full p-5 rounded-2xl border border-border bg-card hover:border-accent hover:bg-card-hover transition-all duration-200 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-text-muted uppercase group-hover:text-accent transition-colors">
                          {d.label}
                        </span>
                        <Icon size={15} className="text-text-muted group-hover:text-accent transition-colors" />
                      </div>
                      <p className="text-sm font-semibold text-text-primary leading-snug">
                        {d.value}
                      </p>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </div>

        {/* Certifications & Credentials Showcase */}
        <Reveal delay={0.2}>
          <div className="mt-10 md:mt-14 p-6 sm:p-8 md:p-10 rounded-3xl border border-border bg-card shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 md:mb-8">
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-accent-soft border border-accent/25 flex items-center justify-center text-accent shrink-0">
                  <Award size={22} />
                </div>
                <div>
                  <span className="text-xs font-semibold tracking-wider text-accent uppercase block mb-1">
                    {lang === 'id' ? 'Sertifikasi & Kredensial' : 'Certifications & Credentials'}
                  </span>
                  <h3 className="font-heading text-xl md:text-2xl font-bold text-text-primary">
                    {lang === 'id'
                      ? 'Lisensi, Pelatihan & Pengalaman Terverifikasi'
                      : 'Verified Licenses, Training & Field Experience'}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2.5 self-start sm:self-end">
                <span className="text-xs text-text-muted hidden md:inline">
                  {lang === 'id'
                    ? 'Arahkan kursor untuk pratinjau • Klik untuk detail'
                    : 'Hover to preview • Click to inspect'}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-secondary border border-border text-text-secondary shrink-0">
                  {certificateItems.length} {lang === 'id' ? 'Sertifikat' : 'Certificates'}
                </span>
              </div>
            </div>

            <GalleryModalAccordion items={certificateItems} lang={lang} />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
