"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Bell, Shield, Database, Cloud, Save } from "lucide-react"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: {
      anomalyAlerts: true,
      systemAlerts: true,
      performanceAlerts: false,
      emailNotifications: true,
    },
    dataRetention: {
      rawData: 30,
      aggregatedData: 90,
      logs: 7,
    },
    thresholds: {
      temperature: { min: 15, max: 35 },
      humidity: { min: 30, max: 70 },
      vibration: { max: 80 },
    },
  })

  const handleSave = () => {
    console.log("[v0] Saving settings:", settings)
    alert("Settings saved successfully!")
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-balance">Settings</h1>
          <p className="text-muted-foreground mt-1">Configure your IoT analytics platform</p>
        </div>

        {/* Notification Settings */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Bell className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Notification Settings</h2>
          </div>

          <div className="space-y-4">
            {Object.entries(settings.notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</p>
                  <p className="text-xs text-muted-foreground">Receive alerts for this category</p>
                </div>
                <button
                  onClick={() =>
                    setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, [key]: !value },
                    })
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    value ? "bg-primary" : "bg-muted"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${
                      value ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </Card>

        {/* Data Retention */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Database className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Data Retention</h2>
          </div>

          <div className="space-y-4">
            {Object.entries(settings.dataRetention).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</p>
                  <span className="text-sm font-semibold">{value} days</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="365"
                  value={value}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      dataRetention: { ...settings.dataRetention, [key]: Number.parseInt(e.target.value) },
                    })
                  }
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                />
              </div>
            ))}
          </div>
        </Card>

        {/* Sensor Thresholds */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Shield className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Sensor Thresholds</h2>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-sm font-medium">Temperature (°C)</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-muted-foreground">Minimum</label>
                  <input
                    type="number"
                    value={settings.thresholds.temperature.min}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        thresholds: {
                          ...settings.thresholds,
                          temperature: { ...settings.thresholds.temperature, min: Number.parseInt(e.target.value) },
                        },
                      })
                    }
                    className="w-full mt-1 px-3 py-2 rounded-lg border border-border bg-background"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Maximum</label>
                  <input
                    type="number"
                    value={settings.thresholds.temperature.max}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        thresholds: {
                          ...settings.thresholds,
                          temperature: { ...settings.thresholds.temperature, max: Number.parseInt(e.target.value) },
                        },
                      })
                    }
                    className="w-full mt-1 px-3 py-2 rounded-lg border border-border bg-background"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium">Humidity (%)</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-muted-foreground">Minimum</label>
                  <input
                    type="number"
                    value={settings.thresholds.humidity.min}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        thresholds: {
                          ...settings.thresholds,
                          humidity: { ...settings.thresholds.humidity, min: Number.parseInt(e.target.value) },
                        },
                      })
                    }
                    className="w-full mt-1 px-3 py-2 rounded-lg border border-border bg-background"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Maximum</label>
                  <input
                    type="number"
                    value={settings.thresholds.humidity.max}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        thresholds: {
                          ...settings.thresholds,
                          humidity: { ...settings.thresholds.humidity, max: Number.parseInt(e.target.value) },
                        },
                      })
                    }
                    className="w-full mt-1 px-3 py-2 rounded-lg border border-border bg-background"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium">Vibration (Hz)</p>
              <div>
                <label className="text-xs text-muted-foreground">Maximum</label>
                <input
                  type="number"
                  value={settings.thresholds.vibration.max}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      thresholds: {
                        ...settings.thresholds,
                        vibration: { max: Number.parseInt(e.target.value) },
                      },
                    })
                  }
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-border bg-background"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Cloud Configuration */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Cloud className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Multi-Cloud Configuration</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg border border-border">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-[#FF9900]/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-[#FF9900]">AWS</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Amazon Web Services</p>
                  <p className="text-xs text-muted-foreground">Primary ingestion & processing</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-success" />
                <span className="text-xs text-muted-foreground">Connected</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border border-border">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-[#4285F4]/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-[#4285F4]">GCP</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Google Cloud Platform</p>
                  <p className="text-xs text-muted-foreground">Secondary storage & analytics</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-success" />
                <span className="text-xs text-muted-foreground">Connected</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" />
            Save Settings
          </Button>
        </div>
      </div>
    </DashboardLayout>
  )
}
