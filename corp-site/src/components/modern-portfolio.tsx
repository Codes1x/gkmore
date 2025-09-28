"use client";

import { motion, useInView, useMotionValue, useSpring, animate } from "framer-motion";
import { useRef, useState, useEffect } from "react";

function AnimatedNumber({ value, delay = 0, suffix = "" }: { value: number; delay?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness: 100, damping: 30 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (inView) {
      const controls = animate(motionValue, value, { 
        duration: 2, 
        delay: delay,
        ease: "easeOut" 
      });
      return () => controls.stop();
    }
  }, [inView, motionValue, value, delay]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(Math.round(latest));
    });
    return () => unsubscribe();
  }, [springValue]);

  return <span ref={ref}>{displayValue.toLocaleString()}{suffix}</span>;
}

function MetricCard({ label, value, icon, color = "cyan", delay = 0, suffix = "" }: {
  label: string;
  value: number;
  icon: string;
  color?: string;
  delay?: number;
  suffix?: string;
}) {
  const colorClasses = {
    cyan: "from-cyan-400 to-blue-500 border-cyan-500/30 text-white",
    green: "from-green-400 to-emerald-500 border-green-500/30 text-white",
    purple: "from-purple-400 to-violet-500 border-purple-500/30 text-white"
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} bg-opacity-20 backdrop-blur-sm border p-4 hover:shadow-xl transition-all duration-300`}
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
      
      <div className="relative flex items-center justify-between">
        <div>
          <div className={`text-2xl sm:text-3xl font-bold text-white drop-shadow-lg`}>
            <AnimatedNumber value={value} delay={delay} suffix={suffix} />
          </div>
          <div className="text-sm text-muted-foreground mt-1">{label}</div>
        </div>
        <motion.div
          whileHover={{ rotate: 10, scale: 1.1 }}
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses].split(' ').slice(0, 2).join(' ')} flex items-center justify-center text-white text-xl shadow-lg`}
        >
          {icon}
        </motion.div>
      </div>
    </motion.div>
  );
}

function HotelCard({ hotel, index }: {
  hotel: {
    name: string;
    rooms: number;
    adr: number;
    revpar: number;
    geo: string;
    img: string;
    description: string;
    features: string[];
    occupancy: { low: number; high: number };
  };
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      whileHover={{ y: -10, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/15 backdrop-blur-xl border border-white/20 shadow-2xl hover:border-white/30 transition-all duration-500"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
          animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Floating Particles */}
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400/20 rounded-full"
            animate={{
              x: [0, 20, 0],
              y: [0, -10, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            style={{
              left: `${20 + i * 30}%`,
              top: `${10 + i * 20}%`,
            }}
          />
        ))}
      </div>

      <div className="relative p-8">
        {/* Header */}
        <div className="flex items-start gap-6 mb-8">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="shrink-0 w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-2xl"
          >
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 7V2H6V7H2V20H22V7H18ZM8 4H16V7H8V4ZM20 18H4V9H20V18ZM6 11H8V16H6V11ZM10 11H12V16H10V11ZM14 11H16V16H14V11Z"/>
              </svg>
            </div>
          </motion.div>
          
          <div className="flex-1">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.2 + 0.3, duration: 0.6 }}
              className="text-xl sm:text-2xl font-bold text-foreground mb-2 leading-tight drop-shadow-sm"
            >
              {hotel.name}
            </motion.h3>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.2 + 0.4, duration: 0.6 }}
              className="flex items-center gap-2 text-muted-foreground"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              {hotel.geo}
            </motion.div>
          </div>
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.2 + 0.5, duration: 0.6 }}
          className="text-muted-foreground mb-6 leading-relaxed drop-shadow-sm"
        >
          {hotel.description}
        </motion.p>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.2 + 0.6, duration: 0.6 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {hotel.features.map((feature, i) => (
            <motion.span
              key={feature}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.2 + 0.7 + i * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
              className="px-3 py-1 rounded-full bg-gradient-to-r from-cyan-400/20 to-blue-500/30 border border-cyan-500/30 text-xs font-medium text-white backdrop-blur-sm drop-shadow-sm"
            >
              {feature}
            </motion.span>
          ))}
        </motion.div>

        {/* Metrics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.2 + 0.8, duration: 0.6 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          <MetricCard
            label="номеров"
            value={hotel.rooms}
            icon="🏠"
            color="cyan"
            delay={index * 0.2 + 1}
          />
          <MetricCard
            label="ADR"
            value={hotel.adr}
            icon="💰"
            color="green"
            delay={index * 0.2 + 1.1}
          />
          <MetricCard
            label="RevPAR"
            value={hotel.revpar}
            icon="📊"
            color="purple"
            delay={index * 0.2 + 1.2}
          />
        </motion.div>

        {/* Occupancy Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.2 + 0.9, duration: 0.6 }}
          className="mb-8"
        >
          <div className="text-sm font-semibold text-foreground mb-3">Сезонная загрузка</div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-gradient-to-r from-orange-400/10 to-red-500/20 border border-orange-500/20 p-3">
              <div className="text-2xl font-bold text-orange-600">
                <AnimatedNumber value={hotel.occupancy.low} delay={index * 0.2 + 1.3} suffix="%" />
              </div>
              <div className="text-xs text-muted-foreground">Низкий сезон</div>
            </div>
            <div className="rounded-xl bg-gradient-to-r from-green-400/10 to-emerald-500/20 border border-green-500/20 p-3">
              <div className="text-2xl font-bold text-green-600">
                <AnimatedNumber value={hotel.occupancy.high} delay={index * 0.2 + 1.4} suffix="%" />
              </div>
              <div className="text-xs text-muted-foreground">Высокий сезон</div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.2 + 1, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <motion.a
            href="/portfolio"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 px-6 py-3 border border-white/30 text-foreground font-medium rounded-xl hover:bg-white/10 transition-all duration-300 text-center"
          >
            Подробнее
          </motion.a>
          
          <motion.a
            href="/contacts"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300 text-center"
          >
            Запросить предложение
          </motion.a>
        </motion.div>
      </div>

      {/* Shine Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        animate={isHovered ? { x: ['-100%', '100%'] } : {}}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        style={{ transform: 'skewX(-20deg)' }}
      />
    </motion.div>
  );
}

export function ModernPortfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  const hotels = [
    {
      name: "Sea Family Resort & Spa",
      rooms: 122,
      adr: 10114,
      revpar: 8053,
      geo: "1‑я линия у моря",
      img: "/window.svg",
      description: "Премиальный семейный курорт с полным спектром SPA-услуг, расположенный на первой линии моря. Идеально подходит для семейного отдыха с детьми.",
      features: ["Семейный курорт", "SPA-центр", "1-я линия", "Детская зона", "Ресторан", "Бассейн"],
      occupancy: { low: 45, high: 93 }
    },
    {
      name: "Апарт-отель на Лучезарной",
      rooms: 38,
      adr: 18861,
      revpar: 16352,
      geo: "4 минуты пешком по ровной поверхности",
      img: "/file.svg",
      description: "Современный апарт-отель бизнес-класса в тихом районе. Просторные номера-студии с кухонной зоной для длительного проживания.",
      features: ["Апартаменты", "Кухня", "Бизнес-класс", "Тихий район", "Парковка", "Wi-Fi"],
      occupancy: { low: 52, high: 87 }
    }
  ];

  const totalStats = {
    totalRooms: hotels.reduce((sum, hotel) => sum + hotel.rooms, 0),
    avgADR: Math.round(hotels.reduce((sum, hotel) => sum + hotel.adr, 0) / hotels.length),
    avgRevPAR: Math.round(hotels.reduce((sum, hotel) => sum + hotel.revpar, 0) / hotels.length),
    properties: hotels.length
  };

  return (
    <section className="relative py-12 sm:py-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
        
        {/* Floating Orbs */}
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-purple-400/8 to-pink-500/12 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ left: '5%', top: '10%' }}
        />
        
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-cyan-400/8 to-blue-500/12 blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ right: '10%', bottom: '15%' }}
        />
      </div>

      <div ref={containerRef} className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-purple-600 text-sm font-medium mb-6 backdrop-blur-sm"
          >
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
            Наш портфель
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4"
          >
            Портфель и <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">масштаб</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed"
          >
            Управляем объектами разного типа и масштаба. От семейных курортов до бизнес-апартаментов — 
            каждый проект получает индивидуальный подход и максимальную отдачу.
          </motion.p>
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          <MetricCard
            label="объектов"
            value={totalStats.properties}
            icon="🏢"
            color="purple"
            delay={0.8}
          />
          <MetricCard
            label="номеров"
            value={totalStats.totalRooms}
            icon="🏠"
            color="cyan"
            delay={0.9}
          />
          <MetricCard
            label="средний ADR"
            value={totalStats.avgADR}
            icon="💰"
            color="green"
            delay={1.0}
          />
          <MetricCard
            label="средний RevPAR"
            value={totalStats.avgRevPAR}
            icon="📈"
            color="purple"
            delay={1.1}
          />
        </motion.div>

        {/* Hotel Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="grid lg:grid-cols-2 gap-8 mb-16"
        >
          {hotels.map((hotel, index) => (
            <HotelCard key={hotel.name} hotel={hotel} index={index} />
          ))}
        </motion.div>

        {/* Key Insights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 p-8 sm:p-12 shadow-2xl"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Ключевые показатели</h3>
            <p className="text-muted-foreground">Наш опыт работы с разными типами размещения</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "👨‍👩‍👧‍👦", title: "Целевые аудитории", desc: "Семьи, пары, бизнес-гости" },
              { icon: "🏖️", title: "Локации", desc: "1-я линия моря, городские районы" },
              { icon: "📊", title: "Сезонность", desc: "45-52% зима, 87-93% лето" },
              { icon: "⭐", title: "Сервис", desc: "От 3* до 5* уровня обслуживания" }
            ].map((insight, index) => (
              <motion.div
                key={insight.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 2 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="text-3xl mb-3">{insight.icon}</div>
                <h4 className="font-semibold text-foreground mb-2">{insight.title}</h4>
                <p className="text-sm text-muted-foreground">{insight.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
