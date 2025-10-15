"use client";

import { motion } from "framer-motion";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";
import { formatNumber } from "@/lib/scroll-utils";

interface OptimizedCounterProps {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
  startOnViewport?: boolean;
}

/**
 * Оптимизированный компонент счётчика с синхронизацией со скроллом
 * Автоматически запускается при появлении в viewport
 * Корректно работает при быстрой прокрутке
 */
export function OptimizedCounter({
  value,
  duration = 2000,
  suffix = "",
  prefix = "",
  decimals = 0,
  className = "",
  startOnViewport = true
}: OptimizedCounterProps) {
  const { ref, currentValue } = useAnimatedCounter(
    value,
    duration,
    startOnViewport
  );

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      {prefix}{formatNumber(currentValue, decimals)}{suffix}
    </motion.span>
  );
}

interface AnimatedStatProps {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  icon?: string;
  color?: 'cyan' | 'blue' | 'purple' | 'green' | 'orange';
  delay?: number;
}

/**
 * Компонент анимированной статистики с оптимизированным счётчиком
 */
export function AnimatedStat({
  label,
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  icon,
  color = 'cyan',
  delay = 0
}: AnimatedStatProps) {
  const colorClasses = {
    cyan: {
      gradient: 'from-cyan-400 to-blue-500',
      bg: 'from-cyan-500/5 to-blue-500/10',
      border: 'border-cyan-500/20',
      text: 'text-cyan-400'
    },
    blue: {
      gradient: 'from-blue-400 to-indigo-500',
      bg: 'from-blue-500/5 to-indigo-500/10',
      border: 'border-blue-500/20',
      text: 'text-blue-400'
    },
    purple: {
      gradient: 'from-purple-400 to-pink-500',
      bg: 'from-purple-500/5 to-pink-500/10',
      border: 'border-purple-500/20',
      text: 'text-purple-400'
    },
    green: {
      gradient: 'from-green-400 to-emerald-500',
      bg: 'from-green-500/5 to-emerald-500/10',
      border: 'border-green-500/20',
      text: 'text-green-400'
    },
    orange: {
      gradient: 'from-orange-400 to-red-500',
      bg: 'from-orange-500/5 to-red-500/10',
      border: 'border-orange-500/20',
      text: 'text-orange-400'
    }
  };

  const colors = colorClasses[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${colors.bg} backdrop-blur-xl border ${colors.border} p-6 shadow-xl hover:shadow-2xl transition-all duration-300`}
    >
      {/* Background Effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-2xl`} />
      
      <div className="relative">
        {/* Icon */}
        {icon && (
          <motion.div
            whileHover={{ rotate: 10, scale: 1.1 }}
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center text-white text-xl shadow-lg mb-4`}
          >
            {icon}
          </motion.div>
        )}
        
        {/* Value */}
        <div className="mb-2">
          <OptimizedCounter
            value={value}
            suffix={suffix}
            prefix={prefix}
            decimals={decimals}
            className={`text-3xl font-bold ${colors.text}`}
          />
        </div>
        
        {/* Label */}
        <div className="text-sm text-muted-foreground font-medium">
          {label}
        </div>
      </div>
    </motion.div>
  );
}

interface ProgressBarProps {
  value: number;
  max?: number;
  label: string;
  color?: 'cyan' | 'blue' | 'purple' | 'green' | 'orange';
  delay?: number;
  showPercentage?: boolean;
}

/**
 * Оптимизированный компонент прогресс-бара с анимацией
 */
export function AnimatedProgressBar({
  value,
  max = 100,
  label,
  color = 'cyan',
  delay = 0,
  showPercentage = true
}: ProgressBarProps) {
  const { ref, currentValue } = useAnimatedCounter(
    value,
    2000,
    true
  );

  const percentage = (currentValue / max) * 100;

  const colorClasses = {
    cyan: 'from-cyan-400 to-blue-500',
    blue: 'from-blue-400 to-indigo-500',
    purple: 'from-purple-400 to-pink-500',
    green: 'from-green-400 to-emerald-500',
    orange: 'from-orange-400 to-red-500'
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      className="space-y-2"
    >
      <div className="flex justify-between text-sm">
        <span className="text-foreground font-medium">{label}</span>
        {showPercentage && (
          <span className="text-cyan-600 font-semibold">
            {Math.round(percentage)}%
          </span>
        )}
      </div>
      
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r ${colorClasses[color]} rounded-full`}
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 2, delay: delay + 0.2, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}
