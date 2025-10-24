"use client"

import { Card } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { AlertCircle, CheckCircle2, Clock } from "lucide-react"

interface QualityMetric {
  label: string
  value: number
  status: "good" | "warning" | "critical"
  description: string
}

export function DataQualityCard() {
  const [metrics, setMetrics] = useState<QualityMetric[]>([
    { label: "Data Freshness", value: 98.2, status: "good", description: "Sub-second ingestion" },
    { label: "Completeness", value: 99.1, status: "good", description: "98% reduction in loss" },
    { label: "Schema Validation", value: 100, status: "good", description: "All records validated" },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((metric) => {
          const variance = (Math.random() - 0.5) * 2
          const newValue = Math.max(95, Math.min(100, metric.value + variance))
          const status = newValue >= 98 ? "good" : newValue >= 95 ? "warning" : "critical"
          return { ...metric, value: newValue, status }
        }),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold">Data Quality SLIs</h2>
          <p className="text-sm text-muted-foreground mt-1">Real-time data quality indicators</p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Updated every 3s</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {metrics.map((metric) => {
          const StatusIcon = metric.status === "good" ? CheckCircle2 : AlertCircle
          const statusColor =
            metric.status === "good"
              ? "text-success"
              : metric.status === "warning"
                ? "text-warning"
                : "text-destructive"

          return (
            <div key={metric.label} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{metric.label}</span>
                <StatusIcon className={`h-4 w-4 ${statusColor}`} />
              </div>
              <div className="space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold tracking-tight">{metric.value.toFixed(1)}</span>
                  <span className="text-sm text-muted-foreground">%</span>
                </div>
                <p className="text-xs text-muted-foreground">{metric.description}</p>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    metric.status === "good"
                      ? "bg-success"
                      : metric.status === "warning"
                        ? "bg-warning"
                        : "bg-destructive"
                  }`}
                  style={{ width: `${metric.value}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
