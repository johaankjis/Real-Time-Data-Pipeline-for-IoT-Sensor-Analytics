"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Activity, Thermometer, Droplets, Wind } from "lucide-react"

interface SensorData {
  timestamp: string
  temperature: number
  humidity: number
  pressure: number
  vibration: number
}

interface SensorInfo {
  id: string
  name: string
  type: string
  status: "active" | "inactive"
  icon: React.ElementType
  color: string
}

const sensors: SensorInfo[] = [
  {
    id: "temp-01",
    name: "Temperature Sensor",
    type: "Environmental",
    status: "active",
    icon: Thermometer,
    color: "#ef4444",
  },
  { id: "hum-01", name: "Humidity Sensor", type: "Environmental", status: "active", icon: Droplets, color: "#3b82f6" },
  { id: "press-01", name: "Pressure Sensor", type: "Industrial", status: "active", icon: Wind, color: "#10b981" },
  { id: "vib-01", name: "Vibration Sensor", type: "Industrial", status: "active", icon: Activity, color: "#f59e0b" },
]

export function SensorStreamCard() {
  const [data, setData] = useState<SensorData[]>([])
  const [selectedSensor, setSelectedSensor] = useState<string>("temperature")

  useEffect(() => {
    // Initialize with some data
    const initialData: SensorData[] = []
    const now = Date.now()
    for (let i = 30; i >= 0; i--) {
      initialData.push({
        timestamp: new Date(now - i * 2000).toLocaleTimeString(),
        temperature: 20 + Math.random() * 10,
        humidity: 40 + Math.random() * 20,
        pressure: 1000 + Math.random() * 20,
        vibration: Math.random() * 100,
      })
    }
    setData(initialData)

    // Update data every 2 seconds
    const interval = setInterval(() => {
      setData((prev) => {
        const newData = [...prev.slice(1)]
        newData.push({
          timestamp: new Date().toLocaleTimeString(),
          temperature: 20 + Math.random() * 10,
          humidity: 40 + Math.random() * 20,
          pressure: 1000 + Math.random() * 20,
          vibration: Math.random() * 100,
        })
        return newData
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {/* Sensor List */}
      <Card className="p-6 lg:col-span-1">
        <h2 className="text-lg font-semibold mb-4">Active Sensors</h2>
        <div className="space-y-3">
          {sensors.map((sensor) => {
            const Icon = sensor.icon
            return (
              <button
                key={sensor.id}
                onClick={() => setSelectedSensor(sensor.id.split("-")[0])}
                className="w-full flex items-center gap-3 rounded-lg border border-border bg-card p-3 text-left transition-colors hover:bg-accent"
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${sensor.color}20` }}
                >
                  <Icon className="h-5 w-5" style={{ color: sensor.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{sensor.name}</p>
                  <p className="text-xs text-muted-foreground">{sensor.type}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                  <span className="text-xs text-muted-foreground">Live</span>
                </div>
              </button>
            )
          })}
        </div>

        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Total Sensors</span>
            <span className="font-semibold">{sensors.length}</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-2">
            <span className="text-muted-foreground">Active Streams</span>
            <span className="font-semibold">{sensors.filter((s) => s.status === "active").length}</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-2">
            <span className="text-muted-foreground">Avg Latency</span>
            <span className="font-semibold">0.3s</span>
          </div>
        </div>
      </Card>

      {/* Real-time Chart */}
      <Card className="p-6 lg:col-span-2">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold">Real-Time Sensor Data</h2>
            <p className="text-sm text-muted-foreground mt-1">Live streaming with sub-second latency</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
            <span className="text-sm text-muted-foreground">Streaming</span>
          </div>
        </div>

        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="timestamp"
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
                dataKey="temperature"
                stroke="#ef4444"
                strokeWidth={2}
                dot={false}
                name="Temperature (°C)"
              />
              <Line
                type="monotone"
                dataKey="humidity"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
                name="Humidity (%)"
              />
              <Line
                type="monotone"
                dataKey="pressure"
                stroke="#10b981"
                strokeWidth={2}
                dot={false}
                name="Pressure (hPa)"
              />
              <Line
                type="monotone"
                dataKey="vibration"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={false}
                name="Vibration (Hz)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  )
}
