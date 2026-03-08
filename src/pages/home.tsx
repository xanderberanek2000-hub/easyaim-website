import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Crosshair, Shield, Zap, CheckCircle2, Clock } from "lucide-react"
import { useSiteData } from "@/src/context/SiteContext"

export function Home() {
  const { data } = useSiteData()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.1)_0,transparent_50%)]" />
        <div className="container mx-auto px-4 max-w-7xl relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-7xl font-display font-bold tracking-tighter mb-6 neon-text-cyan"
          >
            {data.heroTitle}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-text-secondary max-w-2xl mx-auto mb-10"
          >
            {data.heroSubtitle}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/shop">
              <Button variant="neon" size="lg" className="w-full sm:w-auto">
                Get Started
              </Button>
            </Link>
            <Link to="/shop">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                View Cheats
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-surface/50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-bg border-border/50">
              <CardHeader>
                <Crosshair className="h-10 w-10 text-neon-cyan mb-4" />
                <CardTitle>Precision Aiming</CardTitle>
                <CardDescription>Advanced AI algorithms for pixel-perfect accuracy.</CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-bg border-border/50">
              <CardHeader>
                <Shield className="h-10 w-10 text-neon-purple mb-4" />
                <CardTitle>Undetected</CardTitle>
                <CardDescription>Built with security in mind to keep your accounts safe.</CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-bg border-border/50">
              <CardHeader>
                <Zap className="h-10 w-10 text-neon-blue mb-4" />
                <CardTitle>Instant Delivery</CardTitle>
                <CardDescription>Get your license key immediately after purchase.</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Supported Games Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold mb-4">Supported Games</h2>
            <p className="text-text-secondary">We are constantly expanding our roster of supported titles.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.games.map((game) => (
              <Card key={game.id} className={`${game.status === 'Supported' ? 'neon-border-cyan cursor-pointer' : 'border-border/50 opacity-80'} relative overflow-hidden group`}>
                <div className="absolute inset-0 bg-gradient-to-t from-bg to-transparent z-10" />
                <img 
                  src={game.imageUrl} 
                  alt={game.name} 
                  className={`w-full h-48 object-cover transition-all duration-500 ${game.status === 'Supported' ? 'group-hover:scale-105' : 'grayscale group-hover:grayscale-0'}`}
                  referrerPolicy="no-referrer"
                />
                <CardContent className="relative z-20 pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold">{game.name}</h3>
                    <span className={`flex items-center text-xs font-bold px-2 py-1 rounded-full ${game.status === 'Supported' ? 'text-emerald-400 bg-emerald-400/10' : 'text-amber-400 bg-amber-400/10'}`}>
                      {game.status === 'Supported' ? <CheckCircle2 className="w-3 h-3 mr-1" /> : <Clock className="w-3 h-3 mr-1" />} 
                      {game.status}
                    </span>
                  </div>
                  <p className="text-text-secondary text-sm mb-4">{game.description}</p>
                  {game.status === 'Supported' && game.productLink ? (
                    <Link to={game.productLink}>
                      <Button variant="outline" className="w-full hover:bg-neon-cyan hover:text-bg hover:border-neon-cyan">View Cheats</Button>
                    </Link>
                  ) : (
                    <Button variant="ghost" className="w-full" disabled>Notify Me</Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-surface/30 border-t border-border">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold mb-4">What Our Users Say</h2>
            <p className="text-text-secondary">Join thousands of satisfied players using {data.siteName}.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.testimonials.map((t) => (
              <Card key={t.id} className="bg-bg border-border/50">
                <CardContent className="pt-6">
                  <div className="flex text-amber-400 mb-4">
                    {[...Array(t.rating)].map((_, i) => <span key={i}>★</span>)}
                  </div>
                  <p className="italic text-text-secondary mb-6">"{t.text}"</p>
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full bg-${t.colorClass}/20 flex items-center justify-center text-${t.colorClass} font-bold mr-3`}>
                      {t.initial}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">{t.author}</h4>
                      <p className="text-xs text-text-secondary">Verified Buyer</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

