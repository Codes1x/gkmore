import { CleaningHero } from "@/components/cleaning/cleaning-hero";
import { CleaningBenefits } from "@/components/cleaning/cleaning-benefits";
import { CleaningServices } from "@/components/cleaning/cleaning-services";
import { CleaningPrices } from "@/components/cleaning/cleaning-prices";
import { CleaningReviews } from "@/components/cleaning/cleaning-reviews";
import { CleaningForm } from "@/components/cleaning/cleaning-form";
import { CleaningContacts } from "@/components/cleaning/cleaning-contacts";

export const metadata = {
  title: "Клининг в Сочи — уборка квартир и офисов от 2000 ₽",
  description: "Профессиональная уборка в Сочи. Генеральная, после ремонта, офисная. Звони: +7 (900) 000-00-00",
  keywords: "клининг Сочи, уборка квартир, генеральная уборка, уборка после ремонта, мытье окон, химчистка мебели",
  openGraph: {
    title: "Клининг в Сочи — уборка квартир и офисов от 2000 ₽",
    description: "Профессиональная уборка в Сочи. Генеральная, после ремонта, офисная. Звони: +7 (900) 000-00-00",
    type: "website",
    locale: "ru_RU",
  },
};

export default function CleaningPage() {
  return (
    <div className="min-h-screen bg-white">
      <CleaningHero />
      <CleaningBenefits />
      <CleaningServices />
      <CleaningPrices />
      <CleaningReviews />
      <CleaningForm />
      <CleaningContacts />
    </div>
  );
}
