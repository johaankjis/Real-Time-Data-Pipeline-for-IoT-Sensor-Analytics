import { DashboardLayout } from "@/components/dashboard-layout"
import { SensorStreamCard } from "@/components/sensor-stream-card"
import { SystemMetricsCard } from "@/components/system-metrics-card"
import { DataQualityCard } from "@/components/data-quality-card"
import { AnomalyDetectionCard } from "@/components/anomaly-detection-card"
import { SystemHealthCard } from "@/components/system-health-card"
import { ThroughputMetricsCard } from "@/components/throughput-metrics-card"

export default function HomePage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-balance">IoT Sensor Analytics</h1>
            <p className="text-muted-foreground mt-1">Real-time data pipeline monitoring and analytics</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5">
              <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
              <span className="text-sm font-medium">Live</span>
            </div>
          </div>
        </div>

        {/* System Metrics Overview */}
        <SystemMetricsCard />

        {/* Data Quality Metrics */}
        <DataQualityCard />

        <ThroughputMetricsCard />

        <SystemHealthCard />

        <AnomalyDetectionCard />

        {/* Sensor Streams */}
        <SensorStreamCard />
      </div>
    </DashboardLayout>
  )
}
