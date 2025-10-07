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
      <ModernFAQFixed />

      {/* 9. Прозрачность, отчётность и выплаты */}
      <ModernReporting />


      {/* 10. Операционные стандарты */}
      <ModernStandards />

      {/* 11. Команда */}
      {/* <ModernTeam /> */}

      {/* 12. Кейсы (3–5 «было → стало») */}
      <ModernCases />

      {/* 13. Партнёрства и доверие */}
      <ModernPartners />

      {/* 14. Юридический блок */}
      <ModernLegal />


      {/* 15. Контакты и лид‑форма */}
      <div id="contacts">
        <ModernContacts />
      </div>

      {/* 16. Footer */}
      <ModernFooter />
    </div>
  );
}