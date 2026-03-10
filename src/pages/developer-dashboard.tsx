import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/src/components/ui/card"
import { Package, Plus, Settings, Trash2, Edit, Save, BarChart } from "lucide-react"
import { useSiteData, Product } from "@/src/context/SiteContext"

export function DeveloperDashboard() {
  const { data, updateData } = useSiteData()
  const [activeTab, setActiveTab] = useState("products")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  // Hardcoded developer ID for demo purposes
  const developerId = "dev-1"
  const developer = data.developers.find(d => d.id === developerId)
  const developerProducts = data.products.filter(p => p.developerId === developerId)

  const [products, setProducts] = useState<Product[]>(developerProducts)
  const [saveMessage, setSaveMessage] = useState("")

  const showMessage = (msg: string) => {
    setSaveMessage(msg)
    setTimeout(() => setSaveMessage(""), 3000)
  }

  const handleSaveProducts = () => {
    const otherProducts = data.products.filter(p => p.developerId !== developerId)
    updateData({ products: [...otherProducts, ...products] })
    showMessage("Products saved successfully!")
  }

  const addProduct = () => {
    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      name: "New Product",
      game: "Game Name",
      cheatType: "Aimbot",
      description: "Description here",
      features: ["Feature 1", "Feature 2"],
      price: "$9.99",
      image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=800&auto=format&fit=crop",
      developerId: developerId,
      reviews: []
    }
    setProducts([...products, newProduct])
  }

  const updateProduct = (id: string, field: keyof Product, value: any) => {
    setProducts(products.map(p => p.id === id ? { ...p, [field]: value } : p))
  }

  const removeProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id))
  }

  const handleFeatureChange = (productId: string, index: number, value: string) => {
    setProducts(products.map(p => {
      if (p.id === productId) {
        const newFeatures = [...p.features]
        newFeatures[index] = value
        return { ...p, features: newFeatures }
      }
      return p
    }))
  }

  const addFeature = (productId: string) => {
    setProducts(products.map(p => {
      if (p.id === productId) {
        return { ...p, features: [...p.features, "New Feature"] }
      }
      return p
    }))
  }

  const removeFeature = (productId: string, index: number) => {
    setProducts(products.map(p => {
      if (p.id === productId) {
        const newFeatures = [...p.features]
        newFeatures.splice(index, 1)
        return { ...p, features: newFeatures }
      }
      return p
    }))
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 max-w-md py-24">
        <Card className="border-neon-cyan/50 bg-surface shadow-[0_0_30px_rgba(34,211,238,0.1)]">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-display font-bold neon-text-cyan">Developer Login</CardTitle>
            <CardDescription>Sign in to manage your listed products.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Button 
              onClick={() => setIsAuthenticated(true)} 
              className="w-full bg-neon-cyan hover:bg-neon-cyan/90 text-black font-bold"
            >
              Login as Developer
            </Button>
            <p className="text-xs text-center text-text-secondary mt-2">
              (For demonstration, clicking this button will simulate a successful login as {developer?.name}.)
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 max-w-7xl py-12 relative">
      {saveMessage && (
        <div className="fixed top-24 right-4 bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 px-4 py-2 rounded-md shadow-lg z-50 backdrop-blur-sm">
          {saveMessage}
        </div>
      )}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold neon-text-cyan">Developer Dashboard</h1>
            <p className="text-text-secondary">Welcome back, {developer?.name}. Manage your offerings here.</p>
          </div>
          <Link to={`/developer/${developerId}`}>
            <Button variant="outline" className="border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black">
              View Public Profile
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="space-y-2">
            <Button 
              variant={activeTab === "products" ? "neon" : "ghost"} 
              className={`w-full justify-start ${activeTab === "products" ? "bg-neon-cyan hover:bg-neon-cyan/90 neon-bg-cyan text-black" : ""}`}
              onClick={() => setActiveTab("products")}
            >
              <Package className="w-4 h-4 mr-2" /> My Products
            </Button>
            <Button 
              variant={activeTab === "stats" ? "neon" : "ghost"} 
              className={`w-full justify-start ${activeTab === "stats" ? "bg-neon-cyan hover:bg-neon-cyan/90 neon-bg-cyan text-black" : ""}`}
              onClick={() => setActiveTab("stats")}
            >
              <BarChart className="w-4 h-4 mr-2" /> Sales & Stats
            </Button>
            <Button 
              variant={activeTab === "settings" ? "neon" : "ghost"} 
              className={`w-full justify-start ${activeTab === "settings" ? "bg-neon-cyan hover:bg-neon-cyan/90 neon-bg-cyan text-black" : ""}`}
              onClick={() => setActiveTab("settings")}
            >
              <Settings className="w-4 h-4 mr-2" /> Profile Settings
            </Button>
          </div>

          {/* Content */}
          <div className="md:col-span-3">
            {activeTab === "products" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Manage Products</h2>
                  <Button onClick={addProduct} variant="outline" className="border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black">
                    <Plus className="w-4 h-4 mr-2" /> Add Product
                  </Button>
                </div>
                
                {products.length === 0 ? (
                  <Card className="bg-surface border-border/50 text-center py-12">
                    <CardContent>
                      <Package className="w-12 h-12 text-text-secondary mx-auto mb-4" />
                      <h3 className="text-xl font-bold mb-2">No Products Yet</h3>
                      <p className="text-text-secondary mb-6">Start listing your software to reach thousands of users.</p>
                      <Button onClick={addProduct} className="bg-neon-cyan hover:bg-neon-cyan/90 text-black">
                        Create First Product
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  products.map((product) => (
                    <Card key={product.id} className="bg-surface border-border/50">
                      <CardContent className="pt-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-text-secondary">Product ID (URL slug)</label>
                            <input 
                              type="text" 
                              value={product.id}
                              onChange={(e) => updateProduct(product.id, "id", e.target.value)}
                              className="w-full bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neon-cyan"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-text-secondary">Name</label>
                            <input 
                              type="text" 
                              value={product.name}
                              onChange={(e) => updateProduct(product.id, "name", e.target.value)}
                              className="w-full bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neon-cyan"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-text-secondary">Game</label>
                            <input 
                              type="text" 
                              value={product.game}
                              onChange={(e) => updateProduct(product.id, "game", e.target.value)}
                              className="w-full bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neon-cyan"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-text-secondary">Cheat Type</label>
                            <input 
                              type="text" 
                              value={product.cheatType}
                              onChange={(e) => updateProduct(product.id, "cheatType", e.target.value)}
                              className="w-full bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neon-cyan"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-text-secondary">Price</label>
                            <input 
                              type="text" 
                              value={product.price}
                              onChange={(e) => updateProduct(product.id, "price", e.target.value)}
                              className="w-full bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neon-cyan"
                            />
                          </div>
                          <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-medium text-text-secondary">Description</label>
                            <input 
                              type="text" 
                              value={product.description}
                              onChange={(e) => updateProduct(product.id, "description", e.target.value)}
                              className="w-full bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neon-cyan"
                            />
                          </div>
                          <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-medium text-text-secondary flex justify-between items-center">
                              Features
                              <Button variant="ghost" size="sm" onClick={() => addFeature(product.id)} className="h-6 px-2 text-neon-cyan hover:text-neon-cyan/80">
                                <Plus className="w-3 h-3 mr-1" /> Add Feature
                              </Button>
                            </label>
                            <div className="space-y-2">
                              {product.features.map((feature, index) => (
                                <div key={index} className="flex gap-2">
                                  <input 
                                    type="text" 
                                    value={feature}
                                    onChange={(e) => handleFeatureChange(product.id, index, e.target.value)}
                                    className="flex-grow bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neon-cyan"
                                  />
                                  <Button variant="ghost" size="sm" onClick={() => removeFeature(product.id, index)} className="text-rose-500 hover:text-rose-400 hover:bg-rose-500/10 px-2">
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-medium text-text-secondary">Image URL</label>
                            <div className="flex gap-2">
                              <input 
                                type="text" 
                                value={product.image}
                                onChange={(e) => updateProduct(product.id, "image", e.target.value)}
                                className="flex-grow bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neon-cyan"
                              />
                              {product.image && (
                                <img src={product.image} alt="preview" className="w-10 h-10 rounded object-cover" />
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end mt-4">
                          <Button onClick={() => removeProduct(product.id)} variant="ghost" className="text-rose-500 hover:text-rose-400 hover:bg-rose-500/10 h-8 px-2">
                            <Trash2 className="w-4 h-4 mr-2" /> Remove
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
                
                {products.length > 0 && (
                  <Button onClick={handleSaveProducts} className="bg-neon-cyan hover:bg-neon-cyan/90 text-black font-bold w-full">
                    <Save className="w-4 h-4 mr-2" /> Save Products
                  </Button>
                )}
              </div>
            )}

            {activeTab === "stats" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Sales & Statistics</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-surface border-border/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-text-secondary font-medium">Total Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-emerald-400">$1,245.00</div>
                      <p className="text-xs text-text-secondary mt-1">+15% from last month</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-surface border-border/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-text-secondary font-medium">Active Licenses</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-neon-cyan">342</div>
                      <p className="text-xs text-text-secondary mt-1">+24 new this week</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-surface border-border/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-text-secondary font-medium">Average Rating</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-yellow-400">4.8 / 5</div>
                      <p className="text-xs text-text-secondary mt-1">Based on 89 reviews</p>
                    </CardContent>
                  </Card>
                </div>
                <Card className="bg-surface border-border/50 mt-6">
                  <CardHeader>
                    <CardTitle>Recent Sales</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex justify-between items-center border-b border-border/50 pb-4 last:border-0 last:pb-0">
                          <div>
                            <p className="font-medium text-white">Order #{1000 + i}</p>
                            <p className="text-sm text-text-secondary">{products[0]?.name || "Product Name"}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-emerald-400">{products[0]?.price || "$9.99"}</p>
                            <p className="text-xs text-text-secondary">2 hours ago</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "settings" && (
              <Card className="bg-surface border-border/50">
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>Update your public developer profile.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-secondary">Developer Name</label>
                    <input 
                      type="text" 
                      defaultValue={developer?.name}
                      className="w-full bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neon-cyan" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-secondary">Bio</label>
                    <textarea 
                      defaultValue={developer?.bio}
                      className="w-full bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neon-cyan h-24" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-secondary">Avatar URL</label>
                    <div className="flex gap-4 items-center">
                      <img src={developer?.avatar} alt="Avatar" className="w-12 h-12 rounded-full border border-border" />
                      <input 
                        type="text" 
                        defaultValue={developer?.avatar}
                        className="flex-grow bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neon-cyan" 
                      />
                    </div>
                  </div>
                  <Button className="bg-neon-cyan hover:bg-neon-cyan/90 text-black font-bold w-full mt-4">
                    <Save className="w-4 h-4 mr-2" /> Save Profile
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
