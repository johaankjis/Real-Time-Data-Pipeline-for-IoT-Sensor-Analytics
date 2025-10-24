"use client"

import { Card } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { AlertTriangle, TrendingUp, Zap } from "lucide-react"

interface Anomaly {
  id: string
  sensorId: string
  sensorName: string
  type: "spike" | "drop" | "pattern"
  severity: "low" | "medium" | "high"
  description: string
  timestamp: string
  value: number
}

export function AnomalyDetectionCard() {
  const [anomalies, setAnomalies] = useState<Anomaly[]>([
    {
      id: "1",
      sensorId: "vib-01",
      sensorName: "Vibration Sensor",
      type: "spike",
      severity: "high",
      description: "Unusual vibration spike detected",
      timestamp: "2m ago",
      value: 87.3,
    },
    {
      id: "2",
      sensorId: "temp-01",
      sensorName: "Temperature Sensor",
      type: "pattern",
      severity: "medium",
      description: "Abnormal temperature pattern",
      timestamp: "5m ago",
      value: 28.4,
    },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly add new anomalies
      if (Math.random() > 0.7) {
        const types: Array<"spike" | "drop" | "pattern"> = ["spike", "drop", "pattern"]
        const severities: Array<"low" | "medium" | "high"> = ["low", "medium", "high"]
        const sensors = [
          { id: "temp-01", name: "Temperature Sensor" },
          { id: "hum-01", name: "Humidity Sensor" },
          { id: "vib-01", name: "Vibration Sensor" },
        ]

        const sensor = sensors[Math.floor(Math.random() * sensors.length)]
        const newAnomaly: Anomaly = {
          id: Date.now().toString(),
          sensorId: sensor.id,
          sensorName: sensor.name,
          type: types[Math.floor(Math.random() * types.length)],
          severity: severities[Math.floor(Math.random() * severities.length)],
          description: "Anomaly detected in sensor readings",
          timestamp: "just now",
          value: Math.random() * 100,
        }

        setAnomalies((prev) => [newAnomaly, ...prev.slice(0, 4)])
      }
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
          <AlertTriangle className="h-5 w-5 text-destructive" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">Anomaly Detection</h2>
          <p className="text-sm text-muted-foreground">ML-powered anomaly detection</p>
        </div>
      </div>

      <div className="space-y-3">
        {anomalies.map((anomaly) => {
          const severityColor =
            anomaly.severity === "high"
              ? "bg-destructive/10 text-destructive border-destructive/20"
              : anomaly.severity === "medium"
                ? "bg-warning/10 text-warning border-warning/20"
                : "bg-muted text-muted-foreground border-border"

          const Icon = anomaly.type === "spike" ? TrendingUp : anomaly.type === "drop" ? TrendingUp : Zap

          return (
            <div key={anomaly.id} className={`p-3 rounded-lg border ${severityColor}`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <Icon className="h-4 w-4 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{anomaly.sensorName}</p>
                    <p className="text-xs opacity-80 mt-0.5">{anomaly.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs opacity-60">{anomaly.timestamp}</span>
                      <span className="text-xs opacity-60">•</span>
                      <span className="text-xs font-mono">{anomaly.value.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
                <span className="text-xs font-medium uppercase px-2 py-1 rounded bg-background/50">
                  {anomaly.severity}
                </span>
              </div>
            </div>
          )
        })}

        {anomalies.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">No anomalies detected</p>
            <p className="text-xs mt-1">System operating normally</p>
          </div>
        )}
      </div>
    </Card>
  )
}
