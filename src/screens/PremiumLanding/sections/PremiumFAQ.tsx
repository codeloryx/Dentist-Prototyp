import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useLanguage } from "../../../contexts/LanguageContext";
import { premiumLandingContent } from "../premiumLandingContent";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQItemComponent = ({ item, index }: { item: FAQItem; index: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className="border-b border-stone-200/60"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-8 text-left transition-colors hover:text-blue-600"
      >
        <span className="font-montserrat text-lg font-bold tracking-tight text-stone-900 md:text-xl">
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "circOut" }}
          className="ml-4 flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 text-stone-400"
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-8 font-lato text-base leading-relaxed text-stone-600 md:text-lg lg:max-w-3xl">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const PremiumFAQ = (): JSX.Element => {
  const { language } = useLanguage();
  const content = premiumLandingContent[language].faq;

  return (
    <section id="faq" className="scroll-mt-28 bg-[#faf8f5] overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 py-32">
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          {/* Header */}
          <div className="lg:sticky lg:top-36 lg:h-fit">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 text-blue-600">
                <HelpCircle size={20} />
                <p className="font-montserrat text-xs font-bold uppercase tracking-[0.3em]">
                  {content.eyebrow}
                </p>
              </div>
              <h2 className="mt-6 font-montserrat text-4xl font-black leading-tight tracking-tighter text-stone-900 md:text-5xl">
                {content.title}
              </h2>
              <div className="mt-8 h-px w-12 bg-blue-200" />
              <p className="mt-8 font-lato text-lg leading-relaxed text-stone-600">
                {content.text}
              </p>
            </motion.div>
          </div>

          {/* List */}
          <div className="flex flex-col">
            {content.items.map((faq, index) => (
              <FAQItemComponent key={index} item={faq} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
