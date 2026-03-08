import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { CheckCircle2, AlertTriangle, XCircle, Clock } from "lucide-react"
import { useSiteData } from "@/src/context/SiteContext"

const getStatusIcon = (status: string) => {
  switch (status) {
    case "online":
      return <CheckCircle2 className="w-5 h-5 text-emerald-500" />
    case "updating":
      return <Clock className="w-5 h-5 text-amber-500 animate-spin-slow" />
    case "maintenance":
      return <AlertTriangle className="w-5 h-5 text-rose-500" />
    default:
      return <XCircle className="w-5 h-5 text-gray-500" />
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "online":
      return "text-emerald-500 bg-emerald-500/10 border-emerald-500/30"
    case "updating":
      return "text-amber-500 bg-amber-500/10 border-amber-500/30"
    case "maintenance":
      return "text-rose-500 bg-rose-500/10 border-rose-500/30"
    default:
      return "text-gray-500 bg-gray-500/10 border-gray-500/30"
  }
}

export function Status() {
  const { data } = useSiteData()
  
  const onlineCount = data.statuses.filter(s => s.status === "online").length
  const updatingCount = data.statuses.filter(s => s.status === "updating").length
  const maintenanceCount = data.statuses.filter(s => s.status === "maintenance").length

  return (
    <div className="container mx-auto px-4 max-w-5xl py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display font-bold mb-4 neon-text-cyan">System Status</h1>
          <p className="text-text-secondary text-lg">Real-time status of all our cheats and services.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-emerald-500/5 border-emerald-500/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-emerald-500">Online</CardTitle>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-500">{onlineCount}</div>
              <p className="text-xs text-text-secondary">Fully operational cheats</p>
            </CardContent>
          </Card>
          <Card className="bg-amber-500/5 border-amber-500/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-amber-500">Updating</CardTitle>
              <Clock className="w-4 h-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-500">{updatingCount}</div>
              <p className="text-xs text-text-secondary">Cheats currently updating</p>
            </CardContent>
          </Card>
          <Card className="bg-rose-500/5 border-rose-500/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-rose-500">Maintenance</CardTitle>
              <AlertTriangle className="w-4 h-4 text-rose-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-rose-500">{maintenanceCount}</div>
              <p className="text-xs text-text-secondary">Cheats under maintenance</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {data.statuses.map((item) => (
            <Card key={item.id} className="border-border/50 bg-surface/50 hover:bg-surface transition-colors">
              <CardContent className="flex flex-col sm:flex-row items-center justify-between p-6">
                <div className="flex items-center mb-4 sm:mb-0">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 border ${getStatusColor(item.status)}`}>
                    {getStatusIcon(item.status)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{item.tool}</h3>
                    <p className="text-sm text-text-secondary">{item.game} • {item.version}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                  <span 
                    className="text-xs text-text-secondary mt-2 flex items-center cursor-help"
                    title={item.updatedAt || item.lastUpdated}
                  >
                    <Clock className="w-3 h-3 mr-1" /> Last updated: {item.lastUpdated}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
