"use client"

import { Card } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Activity } from "lucide-react"

interface ThroughputData {
  time: string
  ingestion: number
  processing: number
  storage: number
}

export function ThroughputMetricsCard() {
  const [data, setData] = useState<ThroughputData[]>([])

  useEffect(() => {
    // Initialize data
    const initialData: ThroughputData[] = []
    const now = Date.now()
    for (let i = 20; i >= 0; i--) {
      initialData.push({
        time: new Date(now - i * 3000).toLocaleTimeString(),
        ingestion: 800 + Math.random() * 400,
        processing: 600 + Math.random() * 300,
        storage: 500 + Math.random() * 250,
      })
    }
    setData(initialData)

    // Update data every 3 seconds
    const interval = setInterval(() => {
      setData((prev) => {
        const newData = [...prev.slice(1)]
        newData.push({
          time: new Date().toLocaleTimeString(),
          ingestion: 800 + Math.random() * 400,
          processing: 600 + Math.random() * 300,
          storage: 500 + Math.random() * 250,
        })
        return newData
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const avgIngestion = data.length > 0 ? data.reduce((sum, d) => sum + d.ingestion, 0) / data.length : 0
  const avgProcessing = data.length > 0 ? data.reduce((sum, d) => sum + d.processing, 0) / data.length : 0
  const avgStorage = data.length > 0 ? data.reduce((sum, d) => sum + d.storage, 0) / data.length : 0

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Activity className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Throughput Metrics</h2>
            <p className="text-sm text-muted-foreground">Events per second across pipeline stages</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
          <span className="text-sm text-muted-foreground">Live</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 rounded-lg bg-muted/50">
          <p className="text-xs text-muted-foreground mb-1">Avg Ingestion</p>
          <p className="text-2xl font-bold">{avgIngestion.toFixed(0)}</p>
          <p className="text-xs text-muted-foreground">events/s</p>
        </div>
        <div className="text-center p-3 rounded-lg bg-muted/50">
          <p className="text-xs text-muted-foreground mb-1">Avg Processing</p>
          <p className="text-2xl font-bold">{avgProcessing.toFixed(0)}</p>
          <p className="text-xs text-muted-foreground">events/s</p>
        </div>
        <div className="text-center p-3 rounded-lg bg-muted/50">
          <p className="text-xs text-muted-foreground mb-1">Avg Storage</p>
          <p className="text-2xl font-bold">{avgStorage.toFixed(0)}</p>
          <p className="text-xs text-muted-foreground">events/s</p>
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="time"
              stroke="hsl(var(--muted-foreground))"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
              tickLine={{ stroke: "hsl(var(--border))" }}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
              tickLine={{ stroke: "hsl(var(--border))" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                color: "hsl(var(--popover-foreground))",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="ingestion"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
              name="Ingestion (events/s)"
            />
            <Line
              type="monotone"
              dataKey="processing"
              stroke="#10b981"
              strokeWidth={2}
              dot={false}
              name="Processing (events/s)"
            />
            <Line
              type="monotone"
              dataKey="storage"
              stroke="#f59e0b"
              strokeWidth={2}
              dot={false}
              name="Storage (events/s)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
