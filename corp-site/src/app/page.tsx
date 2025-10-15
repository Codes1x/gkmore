import { Header } from "@/components/header";
import { ModernStatsFixed } from "@/components/modern-stats-fixed";
import { ModernHero } from "@/components/modern-hero";
import { ModernBenefits } from "@/components/modern-benefits";
import { ModernAbout } from "@/components/modern-about";
import { ModernModel } from "@/components/modern-model";
import { ModernPortfolio } from "@/components/modern-portfolio";
import { ModernFAQFixed } from "@/components/modern-faq-fixed";
import { ModernReporting } from "@/components/modern-reporting";
import { ModernStandards } from "@/components/modern-standards";
import { ModernCases } from "@/components/modern-cases";
import { ModernPartners } from "@/components/modern-partners";
import { ModernLegal } from "@/components/modern-legal";
import { ModernContacts } from "@/components/modern-contacts";
import { ModernFooter } from "@/components/modern-footer";
import { LazySection } from "@/components/lazy-section";

export default function Home() {
  return (
    <div className="min-h-dvh font-sans">
      {/* 1. Header - загружается сразу */}
      <Header />
      
      {/* 2. Modern Hero - загружается сразу (первый экран) */}
      <ModernHero />

      {/* 3. Ключевые факты (анимированные) - lazy loading */}
      <LazySection threshold={0.1} rootMargin="150px 0px">
        <ModernStatsFixed />
      </LazySection>

      {/* 4. Преимущества / УТП - lazy loading */}
      <LazySection threshold={0.1} rootMargin="100px 0px">
        <ModernBenefits />
      </LazySection>

      {/* 5. О группе (кто мы) - lazy loading */}
      <LazySection threshold={0.1} rootMargin="100px 0px">
        <ModernAbout />
      </LazySection>

      {/* 6. Модель сотрудничества (ревшара 30%) - lazy loading */}
      <LazySection threshold={0.1} rootMargin="100px 0px">
        <ModernModel />
      </LazySection>

      {/* 7. Портфель и масштаб - lazy loading */}
      <LazySection threshold={0.1} rootMargin="100px 0px">
        <ModernPortfolio />
      </LazySection>

      {/* 8. Закрытие возражений (FAQ‑аккордеон) - lazy loading */}
      <LazySection threshold={0.1} rootMargin="100px 0px">
        <ModernFAQFixed />
      </LazySection>

      {/* 9. Прозрачность, отчётность и выплаты - lazy loading */}
      <LazySection threshold={0.1} rootMargin="100px 0px">
        <ModernReporting />
      </LazySection>

      {/* 10. Операционные стандарты - lazy loading */}
      <LazySection threshold={0.1} rootMargin="100px 0px">
        <ModernStandards />
      </LazySection>

      {/* 11. Команда */}
      {/* <ModernTeam /> */}

      {/* 12. Кейсы (3–5 «было → стало») - lazy loading */}
      <LazySection threshold={0.1} rootMargin="100px 0px">
        <ModernCases />
      </LazySection>

      {/* 13. Партнёрства и доверие - lazy loading */}
      <LazySection threshold={0.1} rootMargin="100px 0px">
        <ModernPartners />
      </LazySection>

      {/* 14. Юридический блок - lazy loading */}
      <LazySection threshold={0.1} rootMargin="100px 0px">
        <ModernLegal />
      </LazySection>

      {/* 15. Контакты и лид‑форма - lazy loading */}
      <LazySection id="contacts" threshold={0.1} rootMargin="100px 0px">
        <ModernContacts />
      </LazySection>

      {/* 16. Footer - lazy loading */}
      <LazySection threshold={0.1} rootMargin="50px 0px">
        <ModernFooter />
      </LazySection>
    </div>
  );
}