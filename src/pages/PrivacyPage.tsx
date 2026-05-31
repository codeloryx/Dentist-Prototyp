import { motion } from "framer-motion";
import { PremiumNavigation } from "../screens/PremiumLanding/sections/PremiumNavigation";
import { PremiumFooter } from "../screens/PremiumLanding/sections/PremiumFooter";
import { ShieldCheck, FileText, Lock, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MetaTags } from "../components/seo/MetaTags";
import { useLanguage } from "../contexts/LanguageContext";

const privacyContent = {
  en: {
    metaTitle: "Privacy Policy",
    metaDescription: "Information about the processing of personal data in the dental practice prototype Dr. Maria Schmidt.",
    title: "Privacy Policy",
    subtitle: "Transparency & security for your data",
    responsibleTitle: "1. Controller",
    responsibleText: "The controller responsible for data processing on this website is:",
    practice: "Dental Practice Dr. Maria Schmidt",
    logTitle: "2. Server log files",
    logText: "When you visit our website, your browser automatically sends information to our server (Supabase/host). These log files include:",
    logItems: ["IP address (anonymized)", "Date and time of request", "Browser type and operating system", "Referrer URL (previously visited page)"],
    legalBasisSecurity: "Legal basis: Art. 6(1)(f) GDPR (legitimate interest in system security).",
    purposeTitle: "3. Purpose limitation & storage",
    purposeText: "Your data (name, email, phone) is collected exclusively for handling appointment bookings.",
    storageTitle: "Storage period",
    storageText: "Your data is deleted as soon as the purpose of storage no longer applies or statutory retention periods have expired.",
    tlsTitle: "TLS encryption",
    tlsText: "For security, we use TLS encryption. Your data is transmitted securely and cannot be read by third parties.",
    legalBasisContract: "Legal basis: Art. 6(1)(b) GDPR (contract fulfillment).",
    cookiesTitle: "4. Cookies",
    cookiesText: "We use only technically necessary cookies to maintain login status and store preferences. No third-party tracking takes place.",
    rightsTitle: "5. Your data subject rights",
    rightsIntro: "You have the following rights regarding your personal data:",
    rights: ["Right of access (Art. 15 GDPR)", "Right to rectification or erasure", "Right to restriction of processing", "Right to lodge a complaint with a supervisory authority"],
    back: "Back to homepage",
  },
  de: {
    metaTitle: "Datenschutz",
    metaDescription: "Informationen zur Verarbeitung Ihrer personenbezogenen Daten in der Zahnarztpraxis Dr. Maria Schmidt.",
    title: "Datenschutz",
    subtitle: "Transparenz & Sicherheit für Ihre Daten",
    responsibleTitle: "1. Verantwortliche Stelle",
    responsibleText: "Verantwortlich für die Datenverarbeitung auf dieser Webseite ist:",
    practice: "Zahnarztpraxis Dr. Maria Schmidt",
    logTitle: "2. Server-Logfiles",
    logText: "Beim Aufruf unserer Webseite werden automatisch Informationen durch Ihren Browser an unseren Server (Supabase/Host) übermittelt. Diese Logfiles umfassen:",
    logItems: ["IP-Adresse (anonymisiert)", "Datum und Uhrzeit der Abfrage", "Browsertyp und Betriebssystem", "Referrer URL (zuvor besuchte Seite)"],
    legalBasisSecurity: "Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (Berechtigtes Interesse an Systemsicherheit).",
    purposeTitle: "3. Zweckbindung & Speicherung",
    purposeText: "Die Erfassung Ihrer Daten (Name, E-Mail, Telefon) erfolgt ausschließlich zur Abwicklung Ihrer Terminbuchungen.",
    storageTitle: "Speicherdauer",
    storageText: "Ihre Daten werden gelöscht, sobald der Zweck der Speicherung entfällt oder gesetzliche Aufbewahrungsfristen abgelaufen sind.",
    tlsTitle: "TLS-Verschlüsselung",
    tlsText: "Zur Sicherheit nutzen wir eine TLS-Verschlüsselung. Ihre Daten werden sicher und unlesbar für Dritte übertragen.",
    legalBasisContract: "Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung).",
    cookiesTitle: "4. Cookies",
    cookiesText: "Wir nutzen ausschließlich technisch notwendige Cookies zur Gewährleistung Ihres Loginstatus und Speicherung Ihrer Präferenzen. Es findet kein Tracking durch Drittanbieter statt.",
    rightsTitle: "5. Ihre Betroffenenrechte",
    rightsIntro: "Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie betreffenden personenbezogenen Daten:",
    rights: ["Recht auf Auskunft (Art. 15 DSGVO)", "Recht auf Berichtigung oder Löschung", "Recht auf Einschränkung der Verarbeitung", "Beschwerderecht bei einer Aufsichtsbehörde"],
    back: "Zurück zur Startseite",
  },
} as const;

export default function PrivacyPage() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const copy = privacyContent[language];

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-900 antialiased">
      <MetaTags 
        title={copy.metaTitle} 
        description={copy.metaDescription}
        canonical="https://dentist-prototyp.vercel.app/datenschutz"
      />
      <PremiumNavigation />
      
      <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-stone-900 text-white rounded-2xl flex items-center justify-center">
              <ShieldCheck size={28} />
            </div>
            <div>
              <h1 className="text-4xl font-montserrat font-black uppercase tracking-tight text-stone-900">
                {copy.title}
              </h1>
              <p className="text-stone-400 font-bold uppercase tracking-widest text-xs mt-1">
                {copy.subtitle}
              </p>
            </div>
          </div>

          <div className="prose prose-stone max-w-none space-y-12">
            {/* Sektion 1: Verantwortlichkeit */}
            <section className="bg-white/50 backdrop-blur-sm border border-stone-200/50 p-8 rounded-[2rem] shadow-sm">
              <div className="flex items-center gap-3 mb-4 text-stone-900 font-montserrat font-black uppercase tracking-wide">
                <FileText size={20} className="text-emerald-500" />
                <h2 className="text-xl m-0">{copy.responsibleTitle}</h2>
              </div>
              <p className="text-stone-600 leading-relaxed font-medium">
                {copy.responsibleText}<br /><br />
                <strong>{copy.practice}</strong><br />
                Charlottenring 12, 40227 Düsseldorf<br />
                E-Mail: Dr.Schmidt@praxis.de
              </p>
            </section>

            {/* Sektion 2: Logfiles */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 mb-6 text-stone-900 border-l-4 border-emerald-500 pl-4">
                 <h2 className="text-2xl font-montserrat font-black uppercase tracking-wide">{copy.logTitle}</h2>
              </div>
              <p className="text-stone-600 leading-relaxed font-medium">
                {copy.logText}
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm text-stone-500 font-medium list-disc pl-5">
                {copy.logItems.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <p className="text-[12px] text-stone-400 font-bold italic uppercase tracking-wider">
                {copy.legalBasisSecurity}
              </p>
            </section>

            {/* Sektion 3: Datenerfassung & Zweck */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 mb-6 text-stone-900 border-l-4 border-emerald-500 pl-4">
                 <h2 className="text-2xl font-montserrat font-black uppercase tracking-wide">{copy.purposeTitle}</h2>
              </div>
              <p className="text-stone-600 leading-relaxed font-medium">
                {copy.purposeText}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="p-6 bg-stone-100/50 rounded-2xl border border-stone-200/30">
                    <h3 className="font-black text-stone-900 uppercase text-xs tracking-widest mb-2 flex items-center gap-2">
                       <Lock size={14} className="text-stone-400" /> {copy.storageTitle}
                    </h3>
                    <p className="text-[13px] text-stone-500 font-medium">{copy.storageText}</p>
                 </div>
                 <div className="p-6 bg-stone-100/50 rounded-2xl border border-stone-200/30">
                    <h3 className="font-black text-stone-900 uppercase text-xs tracking-widest mb-2 flex items-center gap-2">
                       <ShieldCheck size={14} className="text-stone-400" /> {copy.tlsTitle}
                    </h3>
                    <p className="text-[13px] text-stone-500 font-medium">{copy.tlsText}</p>
                 </div>
              </div>
              <p className="text-[12px] text-stone-400 font-bold italic uppercase tracking-wider">
                {copy.legalBasisContract}
              </p>
            </section>

            {/* Sektion 4: Cookies */}
            <section className="bg-stone-900 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
               <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6 text-emerald-500">
                    <Globe size={24} />
                    <h2 className="text-xl font-montserrat font-black uppercase tracking-wide text-white">{copy.cookiesTitle}</h2>
                  </div>
                  <p className="text-stone-300 leading-relaxed font-medium mb-6">
                    {copy.cookiesText}
                  </p>
               </div>
            </section>

            {/* Sektion 5: Betroffenenrechte */}
            <section className="border-t border-stone-200 pt-12">
              <h2 className="text-xl font-montserrat font-black uppercase tracking-wide mb-6 text-stone-900">{copy.rightsTitle}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-stone-600 text-[13px] font-medium leading-relaxed">
                <div>{copy.rightsIntro}</div>
                <ul className="space-y-1 list-disc pl-5 text-stone-500">
                   {copy.rights.map((right) => <li key={right}>{right}</li>)}
                </ul>
              </div>
            </section>
          </div>

          <div className="mt-16 text-center">
             <button 
                onClick={() => navigate("/")}
                className="inline-flex items-center gap-2 text-stone-400 hover:text-stone-900 font-black uppercase tracking-[0.2em] text-[10px] bg-white px-6 py-3 rounded-full border border-stone-100 transition-all shadow-sm hover:shadow-md"
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
