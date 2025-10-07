import { Header } from "@/components/header";
import { ModernStatsFixed } from "@/components/modern-stats-fixed";
import { ModernHero } from "@/components/modern-hero";
import { ModernBenefits } from "@/components/modern-benefits";
import { ModernAbout } from "@/components/modern-about";
import { ModernModel } from "@/components/modern-model";
import { ModernPortfolio } from "@/components/modern-portfolio";
import { ModernFAQ } from "@/components/modern-faq";
import { ModernReporting } from "@/components/modern-reporting";
import { ModernTech } from "@/components/modern-tech";
import { ModernStandards } from "@/components/modern-standards";
import { ModernCases } from "@/components/modern-cases";
import { ModernPartners } from "@/components/modern-partners";
import { ModernLegal } from "@/components/modern-legal";
import { ModernESG } from "@/components/modern-esg";
import { ModernContacts } from "@/components/modern-contacts";
import { ModernFooter } from "@/components/modern-footer";

export default function Home() {
  return (
    <div className="min-h-dvh font-sans">
      {/* 1. Header */}
      <Header />
      
      {/* 2. Modern Hero */}
      <ModernHero />

      {/* 3. Ключевые факты (анимированные) */}
      <ModernStatsFixed />

      {/* 4. Преимущества / УТП */}
      <ModernBenefits />

      {/* 5. О группе (кто мы) */}
      <ModernAbout />

      {/* 6. Модель сотрудничества (ревшара 30%) */}
      <ModernModel />

      {/* 7. Портфель и масштаб */}
      <ModernPortfolio />

      {/* 8. Закрытие возражений (FAQ‑аккордеон) */}
      <ModernFAQ />

      {/* 9. Прозрачность, отчётность и выплаты */}
      <ModernReporting />

      {/* 10. Технологии и интеграции */}
      <ModernTech />

      {/* 11. Операционные стандарты */}
      <ModernStandards />

      {/* 12. Команда */}
      {/* <ModernTeam /> */}

      {/* 13. Кейсы (3–5 «было → стало») */}
      <ModernCases />

      {/* 14. Партнёрства и доверие */}
      <ModernPartners />

      {/* 15. Юридический блок */}
      <ModernLegal />

      {/* 16. ESG и локальная повестка */}
      <ModernESG />

      {/* 17. Контакты и лид‑форма */}
      <div id="contacts">
        <ModernContacts />
      </div>

      {/* 18. Footer */}
      <ModernFooter />
    </div>
  );
}