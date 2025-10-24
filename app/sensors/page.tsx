"use client"

import type React from "react"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { Activity, Thermometer, Droplets, Wind, TrendingUp, AlertTriangle } from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface SensorReading {
  id: string
  sensorId: string
  sensorType: string
  value: number
  unit: string
  timestamp: string
  metadata: {
    location?: string
    deviceId?: string
    quality: string
  }
}

interface SensorDetail {
  id: string
  name: string
  type: string
  icon: React.ElementType
  color: string
  unit: string
  currentValue: number
  trend: "up" | "down" | "stable"
  status: "healthy" | "warning" | "critical"
  location: string
  lastUpdate: string
}

export default function SensorsPage() {
  const [sensors, setSensors] = useState<SensorDetail[]>([
    {
      id: "temp-01",
      name: "Temperature Sensor",
      type: "temperature",
      icon: Thermometer,
      color: "#ef4444",
      unit: "°C",
      currentValue: 24.5,
      trend: "stable",
      status: "healthy",
      location: "Building A - Floor 2",
      lastUpdate: "2s ago",
    },
    {
      id: "hum-01",
      name: "Humidity Sensor",
      type: "humidity",
      icon: Droplets,
      color: "#3b82f6",
      unit: "%",
      currentValue: 52.3,
      trend: "down",
      status: "healthy",
      location: "Building A - Floor 2",
      lastUpdate: "3s ago",
    },
    {
      id: "press-01",
      name: "Pressure Sensor",
      type: "pressure",
      icon: Wind,
      color: "#10b981",
      unit: "hPa",
      currentValue: 1013.2,
      trend: "up",
      status: "healthy",
      location: "Building B - Basement",
      lastUpdate: "1s ago",
    },
    {
      id: "vib-01",
      name: "Vibration Sensor",
      type: "vibration",
      icon: Activity,
      color: "#f59e0b",
      unit: "Hz",
      currentValue: 45.8,
      trend: "up",
      status: "warning",
      location: "Factory Floor - Machine 3",
      lastUpdate: "1s ago",
    },
  ])

  const [selectedSensor, setSelectedSensor] = useState<string>("temp-01")
  const [historicalData, setHistoricalData] = useState<any[]>([])

  useEffect(() => {
    // Initialize historical data
    const data = []
    const now = Date.now()
    for (let i = 20; i >= 0; i--) {
      data.push({
        time: new Date(now - i * 5000).toLocaleTimeString(),
        value: 20 + Math.random() * 10,
      })
    }
    setHistoricalData(data)

    // Update sensor values and historical data
    const interval = setInterval(() => {
      setSensors((prev) =>
        prev.map((sensor) => {
          const variance = (Math.random() - 0.5) * 2
          let newValue = sensor.currentValue + variance

          if (sensor.type === "temperature") {
            newValue = Math.max(18, Math.min(32, newValue))
          } else if (sensor.type === "humidity") {
            newValue = Math.max(30, Math.min(70, newValue))
          } else if (sensor.type === "pressure") {
            newValue = Math.max(1000, Math.min(1020, newValue))
          } else {
            newValue = Math.max(0, Math.min(100, newValue))
          }

          const trend = variance > 0.5 ? "up" : variance < -0.5 ? "down" : "stable"
          const status =
            sensor.type === "vibration" && newValue > 80
              ? "critical"
              : newValue > 60 && sensor.type === "vibration"
                ? "warning"
                : "healthy"

          return { ...sensor, currentValue: newValue, trend, status }
        }),
      )

      setHistoricalData((prev) => {
        const newData = [...prev.slice(1)]
        newData.push({
          time: new Date().toLocaleTimeString(),
          value: 20 + Math.random() * 10,
        })
        return newData
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const selectedSensorData = sensors.find((s) => s.id === selectedSensor)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-balance">Sensor Management</h1>
          <p className="text-muted-foreground mt-1">Monitor and manage all IoT sensors in real-time</p>
        </div>

        {/* Sensor Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {sensors.map((sensor) => {
            const Icon = sensor.icon
            const statusColor =
              sensor.status === "healthy"
                ? "text-success"
                : sensor.status === "warning"
                  ? "text-warning"
                  : "text-destructive"

            return (
              <Card
                key={sensor.id}
                className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
                  selectedSensor === sensor.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedSensor(sensor.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${sensor.color}20` }}
                  >
                    <Icon className="h-6 w-6" style={{ color: sensor.color }} />
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-medium ${statusColor}`}>
                    <div className="h-2 w-2 rounded-full bg-current animate-pulse" />
                    {sensor.status}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">{sensor.name}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold tracking-tight">{sensor.currentValue.toFixed(1)}</span>
                    <span className="text-sm text-muted-foreground">{sensor.unit}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <TrendingUp className="h-3 w-3" />
                    <span>{sensor.trend}</span>
                    <span>•</span>
                    <span>{sensor.lastUpdate}</span>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Detailed View */}
        {selectedSensorData && (
          <div className="grid gap-4 lg:grid-cols-3">
            {/* Sensor Info */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Sensor Details</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Sensor ID</p>
                  <p className="font-mono text-sm mt-1">{selectedSensorData.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="text-sm mt-1">{selectedSensorData.location}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="text-sm mt-1 capitalize">{selectedSensorData.type}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Current Reading</p>
                  <p className="text-2xl font-bold mt-1">
                    {selectedSensorData.currentValue.toFixed(1)} {selectedSensorData.unit}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        selectedSensorData.status === "healthy"
                          ? "bg-success"
                          : selectedSensorData.status === "warning"
                            ? "bg-warning"
                            : "bg-destructive"
                      }`}
                    />
                    <span className="text-sm capitalize">{selectedSensorData.status}</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Historical Chart */}
            <Card className="p-6 lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold">Historical Data</h2>
                  <p className="text-sm text-muted-foreground mt-1">Last 2 minutes of readings</p>
                </div>
              </div>

              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={historicalData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={selectedSensorData.color} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={selectedSensorData.color} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="time"
                      stroke="hsl(var(--muted-foreground))"
                      tick={{ fill: "hsl(var(--muted-foreground))" }}
                    />
                    <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--popover))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke={selectedSensorData.color}
                      strokeWidth={2}
                      fill="url(#colorValue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        )}

        {/* Alerts */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-warning" />
            <h2 className="text-lg font-semibold">Recent Alerts</h2>
          </div>
          <div className="space-y-3">
            {sensors
              .filter((s) => s.status !== "healthy")
              .map((sensor) => (
                <div key={sensor.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-2 w-2 rounded-full ${sensor.status === "warning" ? "bg-warning" : "bg-destructive"}`}
                    />
                    <div>
                      <p className="text-sm font-medium">{sensor.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {sensor.status === "warning" ? "Elevated readings detected" : "Critical threshold exceeded"}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{sensor.lastUpdate}</span>
                </div>
              ))}
            {sensors.filter((s) => s.status !== "healthy").length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">No active alerts</p>
            )}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}
