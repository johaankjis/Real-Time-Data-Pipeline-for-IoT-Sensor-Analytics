"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { ArrowDown, ArrowUp, Clock, Database, Zap } from "lucide-react"

interface Metric {
  label: string
  value: string
  change: number
  icon: React.ElementType
  trend: "up" | "down"
}

export function SystemMetricsCard() {
  const [metrics, setMetrics] = useState<Metric[]>([
    { label: "Uptime", value: "99.94%", change: 0.04, icon: Zap, trend: "up" },
    { label: "Ingestion Latency", value: "0.3s", change: -0.2, icon: Clock, trend: "down" },
    { label: "Data Loss", value: "1.8%", change: -0.4, icon: Database, trend: "down" },
    { label: "Query Performance", value: "42ms", change: -18, icon: Zap, trend: "down" },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((metric) => {
          const variance = (Math.random() - 0.5) * 0.1
          let newValue = Number.parseFloat(metric.value)

          if (metric.label === "Uptime") {
            newValue = Math.min(99.99, Math.max(99.8, newValue + variance * 0.01))
            return { ...metric, value: `${newValue.toFixed(2)}%` }
          } else if (metric.label === "Ingestion Latency") {
            newValue = Math.max(0.2, newValue + variance * 0.1)
            return { ...metric, value: `${newValue.toFixed(1)}s` }
          } else if (metric.label === "Data Loss") {
            newValue = Math.max(0.5, Math.min(3, newValue + variance * 0.2))
            return { ...metric, value: `${newValue.toFixed(1)}%` }
          } else {
            newValue = Math.max(30, Math.min(60, newValue + variance * 5))
            return { ...metric, value: `${Math.round(newValue)}ms` }
          }
        }),
      )
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => {
        const Icon = metric.icon
        const TrendIcon = metric.trend === "up" ? ArrowUp : ArrowDown
        const trendColor =
          metric.label === "Uptime"
            ? metric.trend === "up"
              ? "text-success"
              : "text-destructive"
            : metric.trend === "down"
              ? "text-success"
              : "text-destructive"

        return (
          <Card key={metric.label} className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                  <p className="text-2xl font-bold tracking-tight">{metric.value}</p>
                </div>
              </div>
            </div>
            <div className={cn("mt-3 flex items-center gap-1 text-sm font-medium", trendColor)}>
              <TrendIcon className="h-4 w-4" />
              <span>
                {Math.abs(metric.change)}
                {metric.label === "Uptime"
                  ? "%"
                  : metric.label.includes("Latency")
                    ? "s"
                    : metric.label.includes("Query")
                      ? "ms"
                      : "%"}
              </span>
              <span className="text-muted-foreground font-normal ml-1">vs last hour</span>
            </div>
          </Card>
        )
      })}
    </div>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
