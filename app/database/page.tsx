"use client"

import type React from "react"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { Database, HardDrive, Activity, Clock, Search } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

interface DatabaseMetric {
  label: string
  value: string
  change: string
  icon: React.ElementType
}

interface QueryLog {
  id: string
  query: string
  duration: number
  timestamp: string
  status: "success" | "error"
}

export default function DatabasePage() {
  const [metrics, setMetrics] = useState<DatabaseMetric[]>([
    { label: "Total Records", value: "1.2M", change: "+12.5K/hr", icon: Database },
    { label: "Storage Used", value: "2.4 GB", change: "+45 MB/hr", icon: HardDrive },
    { label: "Active Connections", value: "24", change: "Stable", icon: Activity },
    { label: "Avg Query Time", value: "42ms", change: "-8ms", icon: Clock },
  ])

  const [queryLogs, setQueryLogs] = useState<QueryLog[]>([
    {
      id: "1",
      query: "SELECT * FROM sensor_readings WHERE timestamp > NOW() - INTERVAL 1 HOUR",
      duration: 38,
      timestamp: "2s ago",
      status: "success",
    },
    {
      id: "2",
      query: "INSERT INTO sensor_readings (sensor_id, value, timestamp) VALUES (...)",
      duration: 12,
      timestamp: "5s ago",
      status: "success",
    },
    {
      id: "3",
      query: "UPDATE sensor_metadata SET last_reading = NOW() WHERE sensor_id = 'temp-01'",
      duration: 8,
      timestamp: "8s ago",
      status: "success",
    },
    {
      id: "4",
      query: "SELECT AVG(value) FROM sensor_readings GROUP BY sensor_id",
      duration: 156,
      timestamp: "12s ago",
      status: "success",
    },
  ])

  const [performanceData, setPerformanceData] = useState([
    { time: "00:00", reads: 450, writes: 280, queries: 120 },
    { time: "00:05", reads: 520, writes: 310, queries: 145 },
    { time: "00:10", reads: 480, writes: 295, queries: 132 },
    { time: "00:15", reads: 610, writes: 340, queries: 168 },
    { time: "00:20", reads: 550, writes: 315, queries: 151 },
    { time: "00:25", reads: 590, writes: 330, queries: 162 },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      // Update metrics
      setMetrics((prev) =>
        prev.map((metric) => {
          if (metric.label === "Total Records") {
            const current = Number.parseFloat(metric.value.replace("M", ""))
            const newValue = (current + 0.001).toFixed(1)
            return { ...metric, value: `${newValue}M` }
          }
          return metric
        }),
      )

      // Add new query log
      const queries = [
        "SELECT * FROM sensor_readings WHERE sensor_type = 'temperature'",
        "INSERT INTO sensor_readings VALUES (...)",
        "UPDATE sensor_metadata SET status = 'active'",
        "DELETE FROM sensor_readings WHERE timestamp < NOW() - INTERVAL 7 DAY",
      ]

      setQueryLogs((prev) => {
        const newLog: QueryLog = {
          id: Date.now().toString(),
          query: queries[Math.floor(Math.random() * queries.length)],
          duration: Math.floor(Math.random() * 150) + 10,
          timestamp: "just now",
          status: Math.random() > 0.95 ? "error" : "success",
        }
        return [newLog, ...prev.slice(0, 9)]
      })

      // Update performance data
      setPerformanceData((prev) => {
        const newData = [...prev.slice(1)]
        newData.push({
          time: new Date().toLocaleTimeString().slice(0, 5),
          reads: Math.floor(Math.random() * 200) + 400,
          writes: Math.floor(Math.random() * 100) + 250,
          queries: Math.floor(Math.random() * 80) + 100,
        })
        return newData
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-balance">Database Monitoring</h1>
          <p className="text-muted-foreground mt-1">Real-time database performance and query analytics</p>
        </div>

        {/* Database Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => {
            const Icon = metric.icon
            return (
              <Card key={metric.label} className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">{metric.label}</p>
                    <p className="text-2xl font-bold tracking-tight">{metric.value}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{metric.change}</p>
              </Card>
            )
          })}
        </div>

        {/* Performance Chart */}
        <Card className="p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold">Database Performance</h2>
            <p className="text-sm text-muted-foreground mt-1">Operations per second over time</p>
          </div>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
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
                <Legend />
                <Bar dataKey="reads" fill="#3b82f6" name="Reads/sec" />
                <Bar dataKey="writes" fill="#10b981" name="Writes/sec" />
                <Bar dataKey="queries" fill="#f59e0b" name="Queries/sec" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Query Logs */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold">Recent Query Logs</h2>
              <p className="text-sm text-muted-foreground mt-1">Live database query execution</p>
            </div>
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border hover:bg-accent transition-colors">
              <Search className="h-4 w-4" />
              <span className="text-sm">Search</span>
            </button>
          </div>

          <div className="space-y-2">
            {queryLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-start justify-between p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors"
              >
                <div className="flex-1 min-w-0 mr-4">
                  <p className="text-sm font-mono text-foreground truncate">{log.query}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-muted-foreground">{log.timestamp}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span
                      className={`text-xs font-medium ${log.status === "success" ? "text-success" : "text-destructive"}`}
                    >
                      {log.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <p className="text-sm font-semibold">{log.duration}ms</p>
                    <p className="text-xs text-muted-foreground">duration</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Storage Distribution */}
        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Storage Distribution</h2>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Sensor Readings</span>
                  <span className="text-sm font-semibold">1.8 GB (75%)</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: "75%" }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Metadata</span>
                  <span className="text-sm font-semibold">0.4 GB (17%)</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-success" style={{ width: "17%" }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Indexes</span>
                  <span className="text-sm font-semibold">0.2 GB (8%)</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-warning" style={{ width: "8%" }} />
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Connection Pool</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Active Connections</span>
                <span className="text-2xl font-bold">24</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Idle Connections</span>
                <span className="text-2xl font-bold">6</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Max Pool Size</span>
                <span className="text-2xl font-bold">50</span>
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Pool Utilization</span>
                  <span className="text-sm font-semibold">60%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden mt-2">
                  <div className="h-full bg-primary" style={{ width: "60%" }} />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
