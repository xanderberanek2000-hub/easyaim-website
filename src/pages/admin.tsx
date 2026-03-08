import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Plus, Settings, Users, Activity } from "lucide-react"

export function Admin() {
  const [activeTab, setActiveTab] = useState("tools")

  return (
    <div className="container mx-auto px-4 max-w-7xl py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold neon-text-purple">Admin Panel</h1>
            <p className="text-text-secondary">Manage cheats, users, and system settings.</p>
          </div>
          <Button variant="outline" size="sm" className="border-neon-purple text-neon-purple hover:bg-neon-purple hover:text-white">
            Logout Admin
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="space-y-2">
            <Button 
              variant={activeTab === "tools" ? "neon" : "ghost"} 
              className={`w-full justify-start ${activeTab === "tools" ? "bg-neon-purple hover:bg-neon-purple/90 neon-bg-purple" : ""}`}
              onClick={() => setActiveTab("tools")}
            >
              <Settings className="w-4 h-4 mr-2" /> Manage Cheats
            </Button>
            <Button 
              variant={activeTab === "users" ? "neon" : "ghost"} 
              className="w-full justify-start"
              onClick={() => setActiveTab("users")}
            >
              <Users className="w-4 h-4 mr-2" /> Users
            </Button>
            <Button 
              variant={activeTab === "activity" ? "neon" : "ghost"} 
              className="w-full justify-start"
              onClick={() => setActiveTab("activity")}
            >
              <Activity className="w-4 h-4 mr-2" /> Activity Logs
            </Button>
          </div>

          {/* Content */}
          <div className="md:col-span-3">
            {activeTab === "tools" && (
              <Card className="border-neon-purple/30">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Add New Cheat</CardTitle>
                    <CardDescription>Create a new product listing for the shop.</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="border-neon-purple text-neon-purple hover:bg-neon-purple hover:text-white">
                    <Plus className="w-4 h-4 mr-2" /> Add Cheat
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-text-secondary">Cheat Name</label>
                      <input type="text" className="w-full bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neon-purple" placeholder="e.g. EasyAim for Apex" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-text-secondary">Game</label>
                      <input type="text" className="w-full bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neon-purple" placeholder="e.g. Apex Legends" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-secondary">Description</label>
                    <textarea className="w-full bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neon-purple h-24" placeholder="Short description of the cheat..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-secondary">Features (comma separated)</label>
                    <input type="text" className="w-full bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neon-purple" placeholder="Aimbot, Triggerbot, Recoil Control" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-text-secondary">Status</label>
                      <select className="w-full bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neon-purple">
                        <option value="online">Online</option>
                        <option value="updating">Updating</option>
                        <option value="maintenance">Maintenance</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-text-secondary">Version</label>
                      <input type="text" className="w-full bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neon-purple" placeholder="v1.0.0" />
                    </div>
                  </div>
                  <Button variant="neon" className="w-full bg-neon-purple hover:bg-neon-purple/90 neon-bg-purple text-white mt-4">
                    Save Cheat
                  </Button>
                </CardContent>
              </Card>
            )}

            {activeTab !== "tools" && (
              <Card className="border-border/50 bg-surface/50 flex items-center justify-center h-64">
                <p className="text-text-secondary">This section is under development.</p>
              </Card>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
