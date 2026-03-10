import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Settings, Users, Activity, Shield, Plus, Trash2, Save, MessageSquare, HelpCircle, Server, Gamepad2, LayoutTemplate } from "lucide-react"
import { useSiteData, Game, Product, Testimonial, FAQ, StatusItem, FeatureCard } from "@/src/context/SiteContext"

export function Admin() {
  const { data, updateData } = useSiteData()
  const [activeTab, setActiveTab] = useState("general")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  // Local state for editing
  const [siteName, setSiteName] = useState(data.siteName)
  const [heroTitle, setHeroTitle] = useState(data.heroTitle)
  const [heroSubtitle, setHeroSubtitle] = useState(data.heroSubtitle)
  const [paymentInstructions, setPaymentInstructions] = useState(data.paymentInstructions)
  const [discordLink, setDiscordLink] = useState(data.discordLink)
  const [twitterLink, setTwitterLink] = useState(data.twitterLink)
  const [facebookLink, setFacebookLink] = useState(data.facebookLink)
  const [supportTicketLink, setSupportTicketLink] = useState(data.supportTicketLink)
  const [aboutUsTitle, setAboutUsTitle] = useState(data.aboutUsTitle)
  const [aboutUsContent, setAboutUsContent] = useState(data.aboutUsContent)
  const [shopTitle, setShopTitle] = useState(data.shopTitle || "Store")
  const [shopSubtitle, setShopSubtitle] = useState(data.shopSubtitle || "Browse our selection of premium gaming cheats.")
  const [dashboardTitle, setDashboardTitle] = useState(data.dashboardTitle || "User Dashboard")
  const [dashboardSubtitle, setDashboardSubtitle] = useState(data.dashboardSubtitle || "Manage your licenses, downloads, and account settings.")
  
  const [featureCards, setFeatureCards] = useState<FeatureCard[]>(data.featureCards || [])
  const [games, setGames] = useState<Game[]>(data.games)
  const [products, setProducts] = useState<Product[]>(data.products)
  const [testimonials, setTestimonials] = useState<Testimonial[]>(data.testimonials)
  const [faqs, setFaqs] = useState<FAQ[]>(data.faqs)
  const [statuses, setStatuses] = useState<StatusItem[]>(data.statuses)
  const [saveMessage, setSaveMessage] = useState("")

  const showMessage = (msg: string) => {
    setSaveMessage(msg)
    setTimeout(() => setSaveMessage(""), 3000)
  }

  const handleSaveGeneral = () => {
    updateData({ 
      siteName, heroTitle, heroSubtitle, paymentInstructions, 
      discordLink, twitterLink, facebookLink, supportTicketLink, 
      aboutUsTitle, aboutUsContent, shopTitle, shopSubtitle, 
      dashboardTitle, dashboardSubtitle 
    })
    showMessage("General settings saved!")
  }

  const handleSaveFeatureCards = () => {
    updateData({ featureCards })
    showMessage("Feature cards saved!")
  }

  const handleSaveGames = () => {
    updateData({ games })
    showMessage("Games saved!")
  }

  const handleSaveProducts = () => {
    updateData({ products })
    showMessage("Products saved!")
  }

  const handleSaveTestimonials = () => {
    updateData({ testimonials })
    showMessage("Testimonials saved!")
  }

  const handleSaveFaqs = () => {
    updateData({ faqs })
    showMessage("FAQs saved!")
  }

  const handleSaveStatuses = () => {
    updateData({ statuses })
    showMessage("Statuses saved!")
  }

  const addFeatureCard = () => {
    const newCard: FeatureCard = {
      id: `feat-${Date.now()}`,
      icon: "Crosshair",
      title: "New Feature",
      description: "Description here",
      colorClass: "neon-cyan"
    }
    setFeatureCards([...featureCards, newCard])
  }

  const updateFeatureCard = (id: string, field: keyof FeatureCard, value: string) => {
    setFeatureCards(featureCards.map(f => f.id === id ? { ...f, [field]: value } : f))
  }

  const removeFeatureCard = (id: string) => {
    setFeatureCards(featureCards.filter(f => f.id !== id))
  }

  const addGame = () => {
    const newGame: Game = {
      id: `game-${Date.now()}`,
      name: "New Game",
      status: "Coming Soon",
      description: "Description here",
      imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop"
    }
    setGames([...games, newGame])
  }

  const updateGame = (id: string, field: keyof Game, value: string) => {
    setGames(games.map(g => g.id === id ? { ...g, [field]: value } : g))
  }

  const removeGame = (id: string) => {
    setGames(games.filter(g => g.id !== id))
  }

  const addProduct = () => {
    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      name: "New Cheat",
      game: "Game Name",
      cheatType: "Aimbot",
      description: "Description here",
      features: ["Feature 1", "Feature 2"],
      price: "From $9.99",
      image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=800&auto=format&fit=crop",
      developerId: "dev-1",
      reviews: []
    }
    setProducts([...products, newProduct])
  }

  const updateProduct = (id: string, field: keyof Product, value: any) => {
    setProducts(products.map(p => p.id === id ? { ...p, [field]: value } : p))
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

  const removeProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id))
  }

  const addTestimonial = () => {
    const newTestimonial: Testimonial = {
      id: `test-${Date.now()}`,
      author: "New User",
      initial: "N",
      colorClass: "neon-purple",
      text: "Great product!",
      rating: 5
    }
    setTestimonials([...testimonials, newTestimonial])
  }

  const updateTestimonial = (id: string, field: keyof Testimonial, value: any) => {
    setTestimonials(testimonials.map(t => t.id === id ? { ...t, [field]: value } : t))
  }

  const removeTestimonial = (id: string) => {
    setTestimonials(testimonials.filter(t => t.id !== id))
  }

  const addFaq = () => {
    const newFaq: FAQ = {
      id: `faq-${Date.now()}`,
      question: "New Question?",
      answer: "New Answer.",
      category: "General"
    }
    setFaqs([...faqs, newFaq])
  }

  const updateFaq = (id: string, field: keyof FAQ, value: string) => {
    setFaqs(faqs.map(f => f.id === id ? { ...f, [field]: value } : f))
  }

  const removeFaq = (id: string) => {
    setFaqs(faqs.filter(f => f.id !== id))
  }

  const addStatus = () => {
    const newStatus: StatusItem = {
      id: `status-${Date.now()}`,
      tool: "New Cheat",
      game: "Game Name",
      status: "online",
      lastUpdated: "Just now",
      updatedAt: new Date().toLocaleString(),
      version: "v1.0"
    }
    setStatuses([...statuses, newStatus])
  }

  const updateStatus = (id: string, field: keyof StatusItem, value: string) => {
    setStatuses(statuses.map(s => s.id === id ? { ...s, [field]: value } : s))
  }

  const removeStatus = (id: string) => {
    setStatuses(statuses.filter(s => s.id !== id))
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 max-w-md py-24">
        <Card className="border-neon-purple/50 bg-surface shadow-[0_0_30px_rgba(168,85,247,0.1)]">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-display font-bold neon-text-purple">Admin Login</CardTitle>
            <CardDescription>Authenticate via Discord to access the admin panel.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Button 
              onClick={() => setIsAuthenticated(true)} 
              className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white"
            >
              <MessageSquare className="w-4 h-4 mr-2" /> Login with Discord
            </Button>
            <p className="text-xs text-center text-text-secondary mt-2">
              (For demonstration, clicking this button will simulate a successful Discord OAuth login and grant admin access.)
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
            <h1 className="text-3xl font-display font-bold neon-text-purple">Admin Panel</h1>
            <p className="text-text-secondary">Manage site content and settings.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="space-y-2">
            <Button 
              variant={activeTab === "general" ? "neon" : "ghost"} 
              className={`w-full justify-start ${activeTab === "general" ? "bg-neon-purple hover:bg-neon-purple/90 neon-bg-purple" : ""}`}
              onClick={() => setActiveTab("general")}
            >
              <Settings className="w-4 h-4 mr-2" /> General Settings
            </Button>
            <Button 
              variant={activeTab === "features" ? "neon" : "ghost"} 
              className={`w-full justify-start ${activeTab === "features" ? "bg-neon-purple hover:bg-neon-purple/90 neon-bg-purple" : ""}`}
              onClick={() => setActiveTab("features")}
            >
              <LayoutTemplate className="w-4 h-4 mr-2" /> Feature Cards
            </Button>
            <Button 
              variant={activeTab === "games" ? "neon" : "ghost"} 
              className={`w-full justify-start ${activeTab === "games" ? "bg-neon-purple hover:bg-neon-purple/90 neon-bg-purple" : ""}`}
              onClick={() => setActiveTab("games")}
            >
              <Activity className="w-4 h-4 mr-2" /> Games
            </Button>
            <Button 
              variant={activeTab === "products" ? "neon" : "ghost"} 
              className={`w-full justify-start ${activeTab === "products" ? "bg-neon-purple hover:bg-neon-purple/90 neon-bg-purple" : ""}`}
              onClick={() => setActiveTab("products")}
            >
              <Shield className="w-4 h-4 mr-2" /> Products (Cheats)
            </Button>
            <Button 
              variant={activeTab === "testimonials" ? "neon" : "ghost"} 
              className={`w-full justify-start ${activeTab === "testimonials" ? "bg-neon-purple hover:bg-neon-purple/90 neon-bg-purple" : ""}`}
              onClick={() => setActiveTab("testimonials")}
            >
              <MessageSquare className="w-4 h-4 mr-2" /> Testimonials
            </Button>
            <Button 
              variant={activeTab === "faqs" ? "neon" : "ghost"} 
              className={`w-full justify-start ${activeTab === "faqs" ? "bg-neon-purple hover:bg-neon-purple/90 neon-bg-purple" : ""}`}
              onClick={() => setActiveTab("faqs")}
            >
              <HelpCircle className="w-4 h-4 mr-2" /> FAQs
            </Button>
            <Button 
              variant={activeTab === "statuses" ? "neon" : "ghost"} 
              className={`w-full justify-start ${activeTab === "statuses" ? "bg-neon-purple hover:bg-neon-purple/90 neon-bg-purple" : ""}`}
              onClick={() => setActiveTab("statuses")}
            >
              <Server className="w-4 h-4 mr-2" /> Statuses
            </Button>
          </div>

          {/* Content */}
          <div className="md:col-span-3">
            {activeTab === "general" && (
              <Card className="border-neon-purple/30 bg-surface">
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>Update global site information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-secondary">Site Name</label>
                    <input 
                      type="text" 
                      value={siteName}
                      onChange={(e) => setSiteName(e.target.value)}
                      className="w-full bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neon-purple" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-secondary">Hero Title</label>
                    <input 
                      type="text" 
                      value={heroTitle}
                      onChange={(e) => setHeroTitle(e.target.value)}
                      className="w-full bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neon-purple" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-secondary">Hero Subtitle</label>
                    <textarea 
                      value={heroSubtitle}
                      onChange={(e) => setHeroSubtitle(e.target.value)}
                      className="w-full bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neon-purple h-24" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-secondary">Payment Instructions (Checkout Note)</label>
                    <textarea 
                      value={paymentInstructions}
                      onChange={(e) => setPaymentInstructions(e.target.value)}
                      className="w-full bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neon-purple h-24" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-secondary">Discord Link</label>
                    <input 
                      type="text" 
                      value={discordLink}
                      onChange={(e) => setDiscordLink(e.target.value)}
                      className="w-full bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neon-purple" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-secondary">Twitter Link</label>
                    <input 
                      type="text" 
                      value={twitterLink}
                      onChange={(e) => setTwitterLink(e.target.value)}
                      className="w-full bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neon-purple" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-secondary">Facebook Link</label>
                    <input 
                      type="text" 
                      value={facebookLink}
                      onChange={(e) => setFacebookLink(e.target.value)}
                      className="w-full bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neon-purple" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-secondary">Support Ticket Link</label>
                    <input 
                      type="text" 
                      value={supportTicketLink}
                      onChange={(e) => setSupportTicketLink(e.target.value)}
                      className="w-full bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neon-purple" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-secondary">About Us Title</label>
                    <input 
                      type="text" 
                      value={aboutUsTitle}
                      onChange={(e) => setAboutUsTitle(e.target.value)}
                      className="w-full bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neon-purple" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-secondary">About Us Content</label>
                    <textarea 
                      value={aboutUsContent}
                      onChange={(e) => setAboutUsContent(e.target.value)}
                      className="w-full bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neon-purple h-32" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-secondary">Shop Title</label>
                    <input 
                      type="text" 
                      value={shopTitle}
                      onChange={(e) => setShopTitle(e.target.value)}
                      className="w-full bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neon-purple" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-secondary">Shop Subtitle</label>
                    <input 
                      type="text" 
                      value={shopSubtitle}
                      onChange={(e) => setShopSubtitle(e.target.value)}
                      className="w-full bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neon-purple" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-secondary">Dashboard Title</label>
                    <input 
                      type="text" 
                      value={dashboardTitle}
                      onChange={(e) => setDashboardTitle(e.target.value)}
                      className="w-full bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neon-purple" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-secondary">Dashboard Subtitle</label>
                    <input 
                      type="text" 
                      value={dashboardSubtitle}
                      onChange={(e) => setDashboardSubtitle(e.target.value)}
                      className="w-full bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neon-purple" 
                    />
                  </div>
                  <Button onClick={handleSaveGeneral} className="bg-neon-purple hover:bg-neon-purple/90 text-white w-full mt-4">
                    <Save className="w-4 h-4 mr-2" /> Save Settings
                  </Button>
                </CardContent>
              </Card>
            )}

            {activeTab === "features" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Manage Feature Cards</h2>
                  <Button onClick={addFeatureCard} variant="outline" className="border-neon-purple text-neon-purple hover:bg-neon-purple hover:text-white">
                    <Plus className="w-4 h-4 mr-2" /> Add Feature Card
                  </Button>
                </div>
                
                {featureCards.map((card) => (
                  <Card key={card.id} className="bg-surface border-border/50">
                    <CardContent className="pt-6 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-text-secondary">Title</label>
                          <input 
                            type="text" 
                            value={card.title}
                            onChange={(e) => updateFeatureCard(card.id, "title", e.target.value)}
                            className="w-full bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neon-purple"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-text-secondary">Icon (Lucide name)</label>
                          <input 
                            type="text" 
                            value={card.icon}
                            onChange={(e) => updateFeatureCard(card.id, "icon", e.target.value)}
                            className="w-full bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neon-purple"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-text-secondary">Color Class</label>
                          <select 
                            value={card.colorClass}
                            onChange={(e) => updateFeatureCard(card.id, "colorClass", e.target.value)}
                            className="w-full bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neon-purple"
                          >
                            <option value="neon-cyan">Cyan</option>
                            <option value="neon-purple">Purple</option>
                            <option value="neon-blue">Blue</option>
                            <option value="neon-green">Green</option>
                            <option value="neon-rose">Rose</option>
                          </select>
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-sm font-medium text-text-secondary">Description</label>
                          <input 
                            type="text" 
                            value={card.description}
                            onChange={(e) => updateFeatureCard(card.id, "description", e.target.value)}
                            className="w-full bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neon-purple"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end mt-4">
                        <Button onClick={() => removeFeatureCard(card.id)} variant="ghost" className="text-rose-500 hover:text-rose-400 hover:bg-rose-500/10 h-8 px-2">
                          <Trash2 className="w-4 h-4 mr-2" /> Remove
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <Button onClick={handleSaveFeatureCards} className="bg-neon-purple hover:bg-neon-purple/90 text-white w-full">
                  <Save className="w-4 h-4 mr-2" /> Save Feature Cards
                </Button>
              </div>
            )}

            {activeTab === "games" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Manage Games</h2>
                  <Button onClick={addGame} variant="outline" className="border-neon-purple text-neon-purple hover:bg-neon-purple hover:text-white">
                    <Plus className="w-4 h-4 mr-2" /> Add Game
                  </Button>
                </div>
                
                {games.map((game) => (
                  <Card key={game.id} className="bg-surface border-border/50">
                    <CardContent className="pt-6 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-text-secondary">Game Name</label>
                          <input 
                            type="text" 
                            value={game.name}
                            onChange={(e) => updateGame(game.id, "name", e.target.value)}
                            className="w-full bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neon-purple"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-text-secondary">Status</label>
                          <select 
                            value={game.status}
                            onChange={(e) => updateGame(game.id, "status", e.target.value as any)}
                            className="w-full bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neon-purple"
                          >
                            <option value="Supported">Supported</option>
                            <option value="Coming Soon">Coming Soon</option>
                          </select>
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-sm font-medium text-text-secondary">Description</label>
                          <input 
                            type="text" 
                            value={game.description}
                            onChange={(e) => updateGame(game.id, "description", e.target.value)}
                            className="w-full bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neon-purple"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-sm font-medium text-text-secondary">Image URL (leave blank for default icon)</label>
                          <div className="flex gap-2">
                            <input 
                              type="text" 
                              value={game.imageUrl}
                              onChange={(e) => updateGame(game.id, "imageUrl", e.target.value)}
                              className="flex-grow bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neon-purple"
                            />
                            {game.imageUrl ? (
                              <img src={game.imageUrl} alt="preview" className="w-10 h-10 rounded object-cover" />
                            ) : (
                              <div className="w-10 h-10 rounded bg-surface-hover flex items-center justify-center border border-border">
                                <Gamepad2 className="w-5 h-5 text-text-secondary" />
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-sm font-medium text-text-secondary">Product Link (optional)</label>
                          <input 
                            type="text" 
                            value={game.productLink || ""}
                            onChange={(e) => updateGame(game.id, "productLink", e.target.value)}
                            className="w-full bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neon-purple"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end mt-4">
                        <Button onClick={() => removeGame(game.id)} variant="ghost" className="text-rose-500 hover:text-rose-400 hover:bg-rose-500/10 h-8 px-2">
                          <Trash2 className="w-4 h-4 mr-2" /> Remove
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <Button onClick={handleSaveGames} className="bg-neon-purple hover:bg-neon-purple/90 text-white w-full">
                  <Save className="w-4 h-4 mr-2" /> Save Games
                </Button>
              </div>
            )}

            {activeTab === "products" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Manage Products</h2>
                  <Button onClick={addProduct} variant="outline" className="border-neon-purple text-neon-purple hover:bg-neon-purple hover:text-white">
                    <Plus className="w-4 h-4 mr-2" /> Add Product
                  </Button>
                </div>
                
                {products.map((product) => (
                  <Card key={product.id} className="bg-surface border-border/50">
                    <CardContent className="pt-6 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-text-secondary">Product ID (URL slug)</label>
                          <input 
                            type="text" 
                            value={product.id}
                            onChange={(e) => updateProduct(product.id, "id", e.target.value)}
                            className="w-full bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neon-purple"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-text-secondary">Name</label>
                          <input 
                            type="text" 
                            value={product.name}
                            onChange={(e) => updateProduct(product.id, "name", e.target.value)}
                            className="w-full bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neon-purple"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-text-secondary">Game</label>
                          <input 
                            type="text" 
                            value={product.game}
                            onChange={(e) => updateProduct(product.id, "game", e.target.value)}
                            className="w-full bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neon-purple"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-text-secondary">Cheat Type</label>
                          <input 
                            type="text" 
                            value={product.cheatType}
                            onChange={(e) => updateProduct(product.id, "cheatType", e.target.value)}
                            className="w-full bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neon-purple"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-text-secondary">Price</label>
                          <input 
                            type="text" 
                            value={product.price}
                            onChange={(e) => updateProduct(product.id, "price", e.target.value)}
                            className="w-full bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neon-purple"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-sm font-medium text-text-secondary">Description</label>
                          <input 
                            type="text" 
                            value={product.description}
                            onChange={(e) => updateProduct(product.id, "description", e.target.value)}
                            className="w-full bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neon-purple"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-sm font-medium text-text-secondary flex justify-between items-center">
                            Features
                            <Button variant="ghost" size="sm" onClick={() => addFeature(product.id)} className="h-6 px-2 text-neon-purple hover:text-neon-purple/80">
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
                                  className="flex-grow bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neon-purple"
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
                              className="flex-grow bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neon-purple"
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
                ))}
                
                <Button onClick={handleSaveProducts} className="bg-neon-purple hover:bg-neon-purple/90 text-white w-full">
                  <Save className="w-4 h-4 mr-2" /> Save Products
                </Button>
              </div>
            )}

            {activeTab === "testimonials" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Manage Testimonials</h2>
                  <Button onClick={addTestimonial} variant="outline" className="border-neon-purple text-neon-purple hover:bg-neon-purple hover:text-white">
                    <Plus className="w-4 h-4 mr-2" /> Add Testimonial
                  </Button>
                </div>
                
                {testimonials.map((testimonial) => (
                  <Card key={testimonial.id} className="bg-surface border-border/50">
                    <CardContent className="pt-6 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-text-secondary">Author</label>
                          <input 
                            type="text" 
                            value={testimonial.author}
                            onChange={(e) => updateTestimonial(testimonial.id, "author", e.target.value)}
                            className="w-full bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neon-purple"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-text-secondary">Initial</label>
                          <input 
                            type="text" 
                            value={testimonial.initial}
                            onChange={(e) => updateTestimonial(testimonial.id, "initial", e.target.value)}
                            className="w-full bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neon-purple"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-text-secondary">Color Class</label>
                          <select 
                            value={testimonial.colorClass}
                            onChange={(e) => updateTestimonial(testimonial.id, "colorClass", e.target.value)}
                            className="w-full bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neon-purple"
                          >
                            <option value="neon-purple">Purple</option>
                            <option value="neon-blue">Blue</option>
                            <option value="neon-cyan">Cyan</option>
                            <option value="neon-green">Green</option>
                            <option value="neon-rose">Rose</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-text-secondary">Rating (1-5)</label>
                          <input 
                            type="number" 
                            min="1"
                            max="5"
                            value={testimonial.rating}
                            onChange={(e) => updateTestimonial(testimonial.id, "rating", parseInt(e.target.value))}
                            className="w-full bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neon-purple"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-sm font-medium text-text-secondary">Text</label>
                          <textarea 
                            value={testimonial.text}
                            onChange={(e) => updateTestimonial(testimonial.id, "text", e.target.value)}
                            className="w-full bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neon-purple h-24"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end mt-4">
                        <Button onClick={() => removeTestimonial(testimonial.id)} variant="ghost" className="text-rose-500 hover:text-rose-400 hover:bg-rose-500/10 h-8 px-2">
                          <Trash2 className="w-4 h-4 mr-2" /> Remove
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <Button onClick={handleSaveTestimonials} className="bg-neon-purple hover:bg-neon-purple/90 text-white w-full">
                  <Save className="w-4 h-4 mr-2" /> Save Testimonials
                </Button>
              </div>
            )}

            {activeTab === "faqs" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Manage FAQs</h2>
                  <Button onClick={addFaq} variant="outline" className="border-neon-purple text-neon-purple hover:bg-neon-purple hover:text-white">
                    <Plus className="w-4 h-4 mr-2" /> Add FAQ
                  </Button>
                </div>
                
                {faqs.map((faq) => (
                  <Card key={faq.id} className="bg-surface border-border/50">
                    <CardContent className="pt-6 space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-text-secondary">Category</label>
                        <input 
                          type="text" 
                          value={faq.category || ""}
                          onChange={(e) => updateFaq(faq.id, "category", e.target.value)}
                          className="w-full bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neon-purple"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-text-secondary">Question</label>
                        <input 
                          type="text" 
                          value={faq.question}
                          onChange={(e) => updateFaq(faq.id, "question", e.target.value)}
                          className="w-full bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neon-purple"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-text-secondary">Answer</label>
                        <textarea 
                          value={faq.answer}
                          onChange={(e) => updateFaq(faq.id, "answer", e.target.value)}
                          className="w-full bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neon-purple h-24"
                        />
                      </div>
                      <div className="flex justify-end mt-4">
                        <Button onClick={() => removeFaq(faq.id)} variant="ghost" className="text-rose-500 hover:text-rose-400 hover:bg-rose-500/10 h-8 px-2">
                          <Trash2 className="w-4 h-4 mr-2" /> Remove
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <Button onClick={handleSaveFaqs} className="bg-neon-purple hover:bg-neon-purple/90 text-white w-full">
                  <Save className="w-4 h-4 mr-2" /> Save FAQs
                </Button>
              </div>
            )}

            {activeTab === "statuses" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Manage Statuses</h2>
                  <Button onClick={addStatus} variant="outline" className="border-neon-purple text-neon-purple hover:bg-neon-purple hover:text-white">
                    <Plus className="w-4 h-4 mr-2" /> Add Status
                  </Button>
                </div>
                
                {statuses.map((status) => (
                  <Card key={status.id} className="bg-surface border-border/50">
                    <CardContent className="pt-6 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-text-secondary">Cheat Name</label>
                          <input 
                            type="text" 
                            value={status.tool}
                            onChange={(e) => updateStatus(status.id, "tool", e.target.value)}
                            className="w-full bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neon-purple"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-text-secondary">Game</label>
                          <input 
                            type="text" 
                            value={status.game}
                            onChange={(e) => updateStatus(status.id, "game", e.target.value)}
                            className="w-full bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neon-purple"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-text-secondary">Status</label>
                          <select 
                            value={status.status}
                            onChange={(e) => updateStatus(status.id, "status", e.target.value as any)}
                            className="w-full bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neon-purple"
                          >
                            <option value="online">Online</option>
                            <option value="updating">Updating</option>
                            <option value="maintenance">Maintenance</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-text-secondary">Version</label>
                          <input 
                            type="text" 
                            value={status.version}
                            onChange={(e) => updateStatus(status.id, "version", e.target.value)}
                            className="w-full bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neon-purple"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-text-secondary">Last Updated (Relative)</label>
                          <input 
                            type="text" 
                            value={status.lastUpdated}
                            onChange={(e) => updateStatus(status.id, "lastUpdated", e.target.value)}
                            className="w-full bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neon-purple"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-text-secondary">Exact Date/Time</label>
                          <input 
                            type="text" 
                            value={status.updatedAt || ""}
                            onChange={(e) => updateStatus(status.id, "updatedAt", e.target.value)}
                            className="w-full bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neon-purple"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end mt-4">
                        <Button onClick={() => removeStatus(status.id)} variant="ghost" className="text-rose-500 hover:text-rose-400 hover:bg-rose-500/10 h-8 px-2">
                          <Trash2 className="w-4 h-4 mr-2" /> Remove
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <Button onClick={handleSaveStatuses} className="bg-neon-purple hover:bg-neon-purple/90 text-white w-full">
                  <Save className="w-4 h-4 mr-2" /> Save Statuses
                </Button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
