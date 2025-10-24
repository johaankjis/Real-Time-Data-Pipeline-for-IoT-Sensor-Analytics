"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { Server, Cloud, Network } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

interface ServiceStatus {
  name: string
  status: "operational" | "degraded" | "down"
  uptime: number
  icon: React.ElementType
}

export function SystemHealthCard() {
  const [services, setServices] = useState<ServiceStatus[]>([
    { name: "Kafka Ingestion", status: "operational", uptime: 99.98, icon: Server },
    { name: "AWS Services", status: "operational", uptime: 99.95, icon: Cloud },
    { name: "GCP Services", status: "operational", uptime: 99.92, icon: Cloud },
    { name: "API Gateway", status: "operational", uptime: 99.99, icon: Network },
  ])

  const [resourceData, setResourceData] = useState([
    { name: "CPU", value: 45, color: "#3b82f6" },
    { name: "Memory", value: 62, color: "#10b981" },
    { name: "Network", value: 38, color: "#f59e0b" },
    { name: "Storage", value: 71, color: "#ef4444" },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setServices((prev) =>
        prev.map((service) => {
          const variance = (Math.random() - 0.5) * 0.02
          const newUptime = Math.max(99.5, Math.min(100, service.uptime + variance))
          const status = newUptime > 99.9 ? "operational" : newUptime > 99.5 ? "degraded" : "down"
          return { ...service, uptime: newUptime, status }
        }),
      )

      setResourceData((prev) =>
        prev.map((resource) => ({
          ...resource,
          value: Math.max(20, Math.min(90, resource.value + (Math.random() - 0.5) * 10)),
        })),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card className="p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold">System Health</h2>
          <p className="text-sm text-muted-foreground mt-1">Multi-cloud infrastructure status</p>
        </div>

        <div className="space-y-3">
          {services.map((service) => {
            const Icon = service.icon
            const statusColor =
              service.status === "operational"
                ? "bg-success"
                : service.status === "degraded"
                  ? "bg-warning"
                  : "bg-destructive"

            return (
              <div key={service.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-background">
                    <Icon className="h-4 w-4 text-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{service.name}</p>
                    <p className="text-xs text-muted-foreground">{service.uptime.toFixed(2)}% uptime</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${statusColor} animate-pulse`} />
                  <span className="text-xs font-medium capitalize">{service.status}</span>
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      <Card className="p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Resource Utilization</h2>
          <p className="text-sm text-muted-foreground mt-1">Current system resource usage</p>
        </div>

        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={resourceData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {resourceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4">
          {resourceData.map((resource) => (
            <div key={resource.name} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{resource.name}</span>
                <span className="font-semibold">{resource.value.toFixed(0)}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full transition-all duration-500"
                  style={{ width: `${resource.value}%`, backgroundColor: resource.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
