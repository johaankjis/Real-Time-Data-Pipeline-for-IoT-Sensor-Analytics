# Real-Time Data Pipeline for IoT Sensor Analytics

A comprehensive real-time IoT sensor analytics platform built with Next.js, featuring live data visualization, sensor management, database monitoring, and anomaly detection capabilities.

## 🚀 Overview

This application provides a complete solution for monitoring and analyzing IoT sensor data in real-time. It simulates a real-world data pipeline that ingests sensor readings, processes them, and displays comprehensive analytics through an intuitive dashboard interface.

The platform demonstrates modern web application architecture with:
- Real-time data streaming and visualization
- Multi-sensor support (temperature, humidity, pressure, vibration)
- Database performance monitoring
- Data quality metrics and anomaly detection
- Responsive, modern UI with dark mode support

## 🛠️ Technology Stack

### Frontend
- **Next.js 16.0.0** - React framework with App Router
- **React 19.2.0** - UI library
- **TypeScript 5** - Type-safe development
- **Tailwind CSS 4.1.16** - Utility-first CSS framework
- **Recharts** - Data visualization library
- **Lucide React** - Icon library
- **shadcn/ui** - Reusable component library

### Backend & Data
- **Next.js API Routes** - RESTful API endpoints
- **In-memory Data Store** - Simulates MongoDB collections
- **Data Generator** - Simulates Kafka producer for sensor data ingestion

### Development Tools
- **pnpm** - Fast, disk space efficient package manager
- **PostCSS** - CSS processing
- **ESLint** - Code linting

## ✨ Features

### 1. Real-Time Dashboard
- Live system metrics (uptime, latency, data loss, query performance)
- Interactive charts and visualizations
- Data quality indicators
- Throughput metrics
- System health monitoring
- Anomaly detection alerts

### 2. Sensor Management
- Multi-type sensor support (temperature, humidity, pressure, vibration)
- Individual sensor monitoring
- Historical data visualization
- Real-time status updates
- Alert system for anomalies
- Location-based sensor tracking

### 3. Database Monitoring
- Real-time database performance metrics
- Query execution logs
- Storage distribution analytics
- Connection pool monitoring
- Operations per second tracking
- Query performance insights

### 4. Settings & Configuration
- System configuration options
- Data generator controls
- Customizable thresholds

## 📁 Project Structure

```
Real-Time-Data-Pipeline-for-IoT-Sensor-Analytics/
├── app/
│   ├── api/                    # API route handlers
│   │   ├── generator/          # Data generator control
│   │   └── sensors/            # Sensor data endpoints
│   │       ├── ingest/         # Data ingestion endpoint
│   │       ├── readings/       # Fetch sensor readings
│   │       └── stats/          # Sensor statistics
│   ├── database/               # Database monitoring page
│   ├── sensors/                # Sensor management page
│   ├── settings/               # Settings page
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Home/dashboard page
├── components/
│   ├── ui/                     # Reusable UI components
│   ├── anomaly-detection-card.tsx
│   ├── dashboard-layout.tsx    # Main layout component
│   ├── data-quality-card.tsx
│   ├── sensor-stream-card.tsx
│   ├── system-health-card.tsx
│   ├── system-metrics-card.tsx
│   ├── theme-provider.tsx
│   └── throughput-metrics-card.tsx
├── lib/
│   ├── data-generator.ts       # Simulates Kafka producer
│   ├── data-store.ts           # In-memory data store (simulates MongoDB)
│   └── utils.ts                # Utility functions
├── hooks/
│   ├── use-mobile.ts           # Mobile detection hook
│   └── use-toast.ts            # Toast notification hook
├── public/                     # Static assets
├── styles/                     # Additional stylesheets
├── components.json             # shadcn/ui configuration
├── next.config.mjs             # Next.js configuration
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
└── tailwind.config.js          # Tailwind CSS configuration
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ installed
- pnpm package manager (or npm/yarn)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/johaankjis/Real-Time-Data-Pipeline-for-IoT-Sensor-Analytics.git
cd Real-Time-Data-Pipeline-for-IoT-Sensor-Analytics
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
# or
yarn install
```

3. Start the development server:
```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

### Build for Production

```bash
pnpm build
pnpm start
```

## 📡 API Endpoints

### Data Generator

**Start/Stop Data Generator**
```
POST /api/generator
Body: { "action": "start" | "stop" }
```

**Get Generator Status**
```
GET /api/generator
Response: { "success": true, "status": { "isRunning": boolean, "activeStreams": number } }
```

### Sensor Data

**Ingest Sensor Reading**
```
POST /api/sensors/ingest
Body: {
  "sensorId": string,
  "sensorType": "temperature" | "humidity" | "pressure" | "vibration",
  "value": number,
  "unit": string,
  "metadata": {
    "location": string,
    "deviceId": string,
    "quality": "good" | "warning" | "critical"
  }
}
```

**Get Sensor Readings**
```
GET /api/sensors/readings?limit=50&type=temperature
Query Parameters:
  - limit: number (default: 50)
  - type: string (optional, filter by sensor type)
```

**Get Sensor Statistics**
```
GET /api/sensors/stats
Response: {
  "totalReadings": number,
  "avgLatency": number,
  "dataQuality": number,
  "activeSensors": number
}
```

## 🧩 Key Components

### Data Generator (`lib/data-generator.ts`)
Simulates a Kafka producer that generates realistic sensor data at regular intervals:
- Temperature readings every 2 seconds
- Humidity readings every 2.5 seconds
- Pressure readings every 3 seconds
- Vibration readings every 1.5 seconds

### Data Store (`lib/data-store.ts`)
In-memory data store that simulates MongoDB collections:
- Stores up to 1000 recent sensor readings
- Maintains 100 aggregated metrics
- Provides query methods for data retrieval and statistics

### Dashboard Cards
- **SystemMetricsCard**: Displays uptime, latency, data loss, and query performance
- **DataQualityCard**: Shows data validation and quality metrics
- **ThroughputMetricsCard**: Visualizes data ingestion rates
- **SystemHealthCard**: Monitors overall system health
- **AnomalyDetectionCard**: Identifies and alerts on anomalies
- **SensorStreamCard**: Real-time sensor data visualization

## 🎨 UI Components

The application uses shadcn/ui components library with custom styling:
- Cards, Buttons, Badges
- Charts (Area, Bar, Line)
- Alerts and Dialogs
- Forms and Inputs
- Navigation components
- Data tables

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for custom configuration:
```env
# Add your environment variables here
# Example:
# NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Data Generator Configuration
Modify sensor generation intervals and parameters in `lib/data-generator.ts`:
```typescript
// Temperature readings interval
setInterval(() => {
  // Generate reading
}, 2000) // Change interval here
```

### Data Store Limits
Adjust data retention limits in `lib/data-store.ts`:
```typescript
private maxReadings = 1000 // Keep last 1000 readings
private maxMetrics = 100   // Keep last 100 aggregated metrics
```

## 🧪 Development

### Code Structure Guidelines
- Use TypeScript for type safety
- Follow React best practices
- Implement responsive designs
- Use Tailwind CSS utility classes
- Keep components modular and reusable

### Adding New Sensor Types
1. Update the `SensorReading` interface in `lib/data-store.ts`
2. Add generation logic in `lib/data-generator.ts`
3. Update UI components to display new sensor type
4. Add appropriate icons and colors

### Linting
```bash
pnpm lint
```

## 🚀 Deployment

This application can be deployed to various platforms:

### Vercel (Recommended)
1. Push your code to GitHub
2. Import the repository in Vercel
3. Deploy with default settings

### Other Platforms
- **Netlify**: Configure as a Next.js site
- **AWS**: Use AWS Amplify or EC2 with Node.js
- **Docker**: Create a Dockerfile and deploy to any container platform

## 🌐 Multi-Cloud Architecture

The application is designed with multi-cloud support in mind:
- **AWS**: Data ingestion and processing
- **GCP**: Analytics and machine learning capabilities
- Easily extendable to other cloud providers

## 🔐 Security Considerations

- Input validation on all API endpoints
- Type checking with TypeScript
- No sensitive data exposure in client-side code
- CORS configuration for API routes
- Secure data handling practices

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Charts powered by [Recharts](https://recharts.org/)
- Icons from [Lucide](https://lucide.dev/)

## 📞 Support

For questions, issues, or suggestions:
- Open an issue in the GitHub repository
- Contact the maintainers

## 🗺️ Roadmap

Future enhancements planned:
- [ ] Real database integration (MongoDB, PostgreSQL)
- [ ] Actual Kafka integration for data streaming
- [ ] User authentication and authorization
- [ ] Advanced analytics and ML models
- [ ] Export functionality for reports
- [ ] Mobile application
- [ ] WebSocket support for real-time updates
- [ ] Alert notification system (email, SMS)
- [ ] Historical data analysis tools
- [ ] Sensor calibration interface

---

**Note**: This application currently uses simulated data for demonstration purposes. For production use, integrate with real IoT devices and databases.
