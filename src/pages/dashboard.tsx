import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Key, Download, Clock, ShieldAlert, CheckCircle2, Copy, History, CreditCard } from "lucide-react"

import { useSiteData } from "@/src/context/SiteContext"

export function Dashboard() {
  const { data } = useSiteData()
  const [verified, setVerified] = useState(false)
  const [verifying, setVerifying] = useState(false)

  // Mock purchase history data
  const purchaseHistory = [
    {
      id: "ORD-10293",
      product: "Itz Easy for Roblox (1 Month)",
      date: "Oct 15, 2023",
      amount: "$14.99",
      status: "Completed",
      paymentMethod: "Crypto (LTC)"
    },
    {
      id: "ORD-09842",
      product: "Itz Easy Lite (Lifetime)",
      date: "Sep 02, 2023",
      amount: "$49.99",
      status: "Completed",
      paymentMethod: "Crypto (BTC)"
    }
  ]

  const handleVerify = () => {
    setVerifying(true)
    setTimeout(() => {
      setVerified(true)
      setVerifying(false)
    }, 2000)
  }

  return (
    <div className="container mx-auto px-4 max-w-7xl py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold neon-text-cyan">{data.dashboardTitle || "Dashboard"}</h1>
            <p className="text-text-secondary">{data.dashboardSubtitle || "Welcome back, user@example.com"}</p>
          </div>
          <Button variant="outline" size="sm">Logout</Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Active Subscriptions */}
            <Card className="border-neon-cyan/30">
              <CardHeader>
                <CardTitle className="flex items-center"><Key className="w-5 h-5 mr-2 text-neon-cyan" /> Active Licenses</CardTitle>
                <CardDescription>Manage your active subscriptions and license keys.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {data.products.slice(0, 2).map((product, index) => (
                  <div key={product.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-border rounded-lg bg-surface-hover">
                    <div>
                      <h4 className="font-bold text-lg">{product.name}</h4>
                      <p className="text-sm text-text-secondary flex items-center mt-1">
                        <Clock className="w-4 h-4 mr-1 text-amber-400" /> Expires in {index === 0 ? "14 days" : "Lifetime"}
                      </p>
                    </div>
                    <div className="mt-4 sm:mt-0 flex items-center gap-2">
                      <code className="bg-bg px-3 py-1.5 rounded text-neon-cyan font-mono text-sm border border-border">
                        {index === 0 ? "A1B2-C3D4-E5F6-G7H8" : "L1F3-T1M3-K3Y9-X8Z7"}
                      </code>
                      <Button variant="ghost" size="icon" title="Copy Key">
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Downloads */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center"><Download className="w-5 h-5 mr-2 text-neon-blue" /> Downloads</CardTitle>
                <CardDescription>Download the latest version of your purchased cheats.</CardDescription>
              </CardHeader>
              <CardContent>
                {!verified ? (
                  <div className="p-6 border border-amber-500/30 bg-amber-500/5 rounded-lg text-center space-y-4">
                    <ShieldAlert className="w-12 h-12 text-amber-500 mx-auto" />
                    <h3 className="text-xl font-bold text-amber-500">Verification Required</h3>
                    <p className="text-text-secondary max-w-md mx-auto">
                      To prevent abuse and ensure the security of our cheats, please complete a quick verification step before downloading.
                    </p>
                    <Button 
                      variant="outline" 
                      className="border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-bg"
                      onClick={handleVerify}
                      disabled={verifying}
                    >
                      {verifying ? "Verifying..." : "Complete Verification"}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {data.products.slice(0, 2).map((product) => (
                      <div key={`dl-${product.id}`} className="flex flex-col sm:flex-row items-center justify-between p-4 border border-emerald-500/30 bg-emerald-500/5 rounded-lg">
                        <div className="flex items-center mb-4 sm:mb-0">
                          <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center mr-4">
                            <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                          </div>
                          <div>
                            <h4 className="font-bold">{product.name} Loader</h4>
                            <p className="text-sm text-text-secondary">Updated 2 days ago</p>
                          </div>
                        </div>
                        <Button variant="neon" className="w-full sm:w-auto">
                          <Download className="w-4 h-4 mr-2" /> Download
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Purchase History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center"><History className="w-5 h-5 mr-2 text-neon-purple" /> Purchase History</CardTitle>
                <CardDescription>View your past orders and transactions.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {purchaseHistory.map((order) => (
                    <div key={order.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-border rounded-lg bg-surface-hover transition-colors hover:border-neon-purple/30">
                      <div className="mb-4 sm:mb-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-md">{order.product}</h4>
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded border border-emerald-500/20">
                            {order.status}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-text-secondary gap-4">
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" /> {order.date}
                          </span>
                          <span className="flex items-center">
                            <CreditCard className="w-3 h-3 mr-1" /> {order.paymentMethod}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="font-bold text-lg">{order.amount}</span>
                        <span className="text-xs text-text-secondary font-mono mt-1">{order.id}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Account Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-border">
                  <span className="text-text-secondary">Status</span>
                  <span className="font-bold text-emerald-400 flex items-center">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse" /> Active
                  </span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-border">
                  <span className="text-text-secondary">Member Since</span>
                  <span className="font-medium">Oct 2023</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Hardware ID</span>
                  <span className="font-mono text-xs bg-surface-hover px-2 py-1 rounded">Locked</span>
                </div>
                <Button variant="outline" className="w-full mt-4 text-xs">Reset HWID</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
