import { motion } from "framer-motion";
import { PremiumNavigation } from "../screens/PremiumLanding/sections/PremiumNavigation";
import { PremiumFooter } from "../screens/PremiumLanding/sections/PremiumFooter";
import { Info, MapPin, Phone, Mail, Award, Landmark, FileCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MetaTags } from "../components/seo/MetaTags";
import { useLanguage } from "../contexts/LanguageContext";

const imprintContent = {
  en: {
    metaTitle: "Imprint",
    metaDescription: "Legal information and contact details for the dental practice prototype Dr. Maria Schmidt in Dusseldorf.",
    title: "Imprint",
    subtitleA: "Legal information",
    subtitleB: "April 2024",
    owner: "Practice owner",
    practice: "Dental practice",
    qualification: "Qualification",
    dentist: "Dentist",
    qualificationNote: "awarded in the Federal Republic of Germany",
    licenseNote: "License granted by the District Government of Dusseldorf",
    authoritiesTitle: "Responsible supervisory authorities",
    chamber: "Responsible chamber",
    association: "Statutory Dental Association",
    regulationsTitle: "Professional regulations",
    regulationsText: "The owner is subject to the following professional regulations, which can be viewed on the website of the Dental Chamber North Rhine (www.zaek-nr.de):",
    regulations: ["Dentistry Act", "Healthcare Professions Act NRW", "Professional Code of the Dental Chamber North Rhine", "Fee Schedule for Dentists (GOZ)"],
    disputeTitle: "Dispute resolution",
    disputeText: "The European Commission provides a platform for online dispute resolution. We are neither willing nor obliged to participate in dispute resolution proceedings before a consumer arbitration board.",
    back: "Back to homepage",
  },
  de: {
    metaTitle: "Impressum",
    metaDescription: "Gesetzliche Angaben und Kontaktinformationen der Zahnarztpraxis Dr. Maria Schmidt in Düsseldorf.",
    title: "Impressum",
    subtitleA: "Gesetzliche Angaben",
    subtitleB: "Stand April 2024",
    owner: "Inhaberin",
    practice: "Zahnarztpraxis",
    qualification: "Qualifikation",
    dentist: "Zahnärztin",
    qualificationNote: "verliehen in der Bundesrepublik Deutschland",
    licenseNote: "Approbation erteilt durch die Bezirksregierung Düsseldorf",
    authoritiesTitle: "Zuständige Aufsichtsbehörden",
    chamber: "Zuständige Kammer",
    association: "Kassenzahnärztliche Vereinigung",
    regulationsTitle: "Berufsrechtliche Regelungen",
    regulationsText: "Die Inhaberin unterliegt den folgenden berufsrechtlichen Regelungen, welche über die Website der Zahnärztekammer Nordrhein (www.zaek-nr.de) eingesehen werden können:",
    regulations: ["Zahnheilkundegesetz", "Heilberufegesetz NRW", "Berufsordnung der ZÄK Nordrhein", "Gebührenordnung für Zahnärzte (GOZ)"],
    disputeTitle: "Streitschlichtung",
    disputeText: "Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit. Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
    back: "Zurück zur Startseite",
  },
} as const;

export default function ImpressumPage() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const copy = imprintContent[language];

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-900 antialiased">
      <MetaTags 
        title={copy.metaTitle} 
        description={copy.metaDescription}
        canonical="https://dentist-prototyp.vercel.app/impressum"
      />
      <PremiumNavigation />
      
      <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header Section */}
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-stone-900 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-stone-900/20">
              <Info size={28} />
            </div>
            <div>
              <h1 className="text-4xl font-montserrat font-black uppercase tracking-tight text-stone-900">
                {copy.title}
              </h1>
              <p className="text-stone-400 font-bold uppercase tracking-widest text-[10px] mt-1 space-x-2">
                <span>{copy.subtitleA}</span>
                <span className="text-stone-200">|</span>
                <span>{copy.subtitleB}</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Kontakt & Inhaber */}
            <section className="bg-white border border-stone-200/60 p-8 rounded-[2.5rem] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-6 text-stone-100 group-hover:text-stone-200 transition-colors">
                  <MapPin size={48} />
               </div>
               <h2 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-600 mb-6 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {copy.owner}
               </h2>
               <div className="space-y-1 text-stone-800 font-bold text-lg leading-tight mb-6">
                  <p>{copy.practice}</p>
                  <p>Dr. Maria Schmidt</p>
               </div>
               <div className="space-y-3 text-stone-500 font-medium text-sm">
                  <p className="flex items-center gap-3">
                     <MapPin size={16} className="text-stone-300" />
                     Charlottenring 12, 40227 Düsseldorf
                  </p>
                  <p className="flex items-center gap-3">
                     <Phone size={16} className="text-stone-300" />
                     0211-1593482
                  </p>
                  <p className="flex items-center gap-3">
                     <Mail size={16} className="text-stone-300" />
                     Dr.Schmidt@praxis.de
                  </p>
               </div>
            </section>

            {/* Berufsbezeichnung */}
            <section className="bg-stone-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col justify-between">
               <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl" />
               <div>
                  <h2 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-500 mb-6 flex items-center gap-2">
                     <Award size={16} />
                     {copy.qualification}
                  </h2>
                  <div className="space-y-2">
                     <p className="text-2xl font-montserrat font-black uppercase leading-none">{copy.dentist}</p>
                     <p className="text-stone-400 text-xs font-medium italic">{copy.qualificationNote}</p>
                  </div>
               </div>
               <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-[10px] text-stone-500 font-bold uppercase tracking-widest leading-relaxed">
                     {copy.licenseNote}
                  </p>
               </div>
            </section>
          </div>

          {/* Aufsichtsbehörden & Rechtliches */}
          <div className="space-y-12">
            <section className="space-y-6">
              <div className="flex items-center gap-3 mb-6 text-stone-900 border-l-4 border-emerald-500 pl-4">
                 <h2 className="text-xl font-montserrat font-black uppercase tracking-wide">{copy.authoritiesTitle}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="p-6 bg-white border border-stone-100 rounded-3xl flex items-start gap-4">
                    <Landmark className="text-stone-400 shrink-0" size={20} />
                    <div>
                       <h3 className="font-black text-stone-900 text-[11px] uppercase tracking-wider mb-1">{copy.chamber}</h3>
                       <p className="text-stone-500 text-[13px] font-medium leading-relaxed">
                          Zahnärztekammer Nordrhein (Körperschaft des öffentlichen Rechts)<br />
                          Emanuel-Leutze-Str. 8, 40547 Düsseldorf
                       </p>
                    </div>
                 </div>
                 <div className="p-6 bg-white border border-stone-100 rounded-3xl flex items-start gap-4">
                    <FileCheck className="text-stone-400 shrink-0" size={20} />
                    <div>
                       <h3 className="font-black text-stone-900 text-[11px] uppercase tracking-wider mb-1">{copy.association}</h3>
                       <p className="text-stone-500 text-[13px] font-medium leading-relaxed">
                          KZV Nordrhein<br />
                          Lindemannstraße 34-42, 40237 Düsseldorf
                       </p>
                    </div>
                 </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-lg font-montserrat font-black uppercase tracking-wide text-stone-900">{copy.regulationsTitle}</h2>
              <p className="text-stone-500 text-sm font-medium leading-relaxed">
                {copy.regulationsText}
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-stone-400 font-bold uppercase tracking-widest list-none">
                 {copy.regulations.map((regulation) => (
                   <li key={regulation} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-stone-300" />
                      {regulation}
                   </li>
                 ))}
              </ul>
            </section>

            <section className="p-8 bg-stone-50 rounded-[2rem] border border-stone-100 italic">
               <h2 className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-4">{copy.disputeTitle}</h2>
               <p className="text-stone-500 text-[12px] leading-relaxed">
                  {copy.disputeText}
               </p>
            </section>
          </div>

          {/* Back Button */}
          <div className="mt-16 text-center">
             <button 
                onClick={() => navigate("/")}
                className="inline-flex items-center gap-2 text-stone-400 hover:text-stone-900 font-black uppercase tracking-[0.2em] text-[10px] bg-white px-8 py-4 rounded-full border border-stone-100 transition-all shadow-sm hover:shadow-md active:scale-95"
             >
                ← {copy.back}
             </button>
          </div>
        </motion.div>
      </main>

      <PremiumFooter />
    </div>
  );
}
