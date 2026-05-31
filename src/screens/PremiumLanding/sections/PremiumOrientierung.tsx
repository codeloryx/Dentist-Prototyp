import { useLanguage } from "../../../contexts/LanguageContext";
import { premiumLandingContent } from "../premiumLandingContent";

export const PremiumOrientierung = (): JSX.Element => {
  const { language } = useLanguage();
  const content = premiumLandingContent[language].orientation;

  return (
    <section
      id="orientierung"
      className="scroll-mt-28 border-b border-stone-200/60 bg-white"
    >
      <div className="mx-auto grid max-w-6xl gap-16 px-6 py-24 lg:grid-cols-2 lg:items-center">
        <div className="relative order-2 lg:order-1">
          <div className="relative overflow-hidden rounded-[2.5rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.12)]">
            <img
              src="/premium_smile_lounge.jpg"
              alt={content.imageAlt}
              className="w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
            />
          </div>
          {/* Glass floating badge */}
          <div className="absolute -bottom-6 -right-6 hidden rounded-2xl border border-white/40 bg-white/70 p-6 shadow-xl backdrop-blur-xl md:block">
            <p className="font-montserrat text-[10px] font-bold uppercase tracking-widest text-stone-900">
              {content.badgeTitle}
            </p>
            <p className="mt-1 font-lato text-xs text-stone-500">
              {content.badgeText}
            </p>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <p className="font-montserrat text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
            {content.eyebrow}
          </p>
          <h2 className="mt-4 font-montserrat text-3xl font-black tracking-tight text-stone-900 md:text-5xl">
            {content.title}
          </h2>
          
          <div className="mt-10 space-y-12">
            <div className="relative pl-8">
              <div className="absolute left-0 top-0 h-full w-px bg-blue-100" />
              <div className="absolute left-[-4px] top-1.5 h-2 w-2 rounded-full bg-blue-600" />
              <p className="font-lato text-lg leading-relaxed text-stone-700">
                {content.text}
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              <div className="space-y-3 rounded-2xl border border-stone-100 bg-stone-50/50 p-6 transition-colors hover:border-blue-100 hover:bg-white">
                <p className="font-montserrat text-xs font-bold uppercase tracking-widest text-stone-900">{content.cards[0].title}</p>
                <p className="font-lato text-sm leading-relaxed text-stone-600">
                  {content.cards[0].text}
                </p>
              </div>

              <div className="space-y-3 rounded-2xl border border-stone-100 bg-stone-50/50 p-6 transition-colors hover:border-blue-100 hover:bg-white">
                <p className="font-montserrat text-xs font-bold uppercase tracking-widest text-stone-900">{content.cards[1].title}</p>
                <p className="font-lato text-sm leading-relaxed text-stone-600">
                  {content.cards[1].text}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
