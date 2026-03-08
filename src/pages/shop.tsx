import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card"
import { CheckCircle2 } from "lucide-react"

const products = [
  {
    id: "roblox-aim",
    name: "EasyAim for Roblox",
    game: "Roblox",
    description: "Advanced AI aimbot and triggerbot for Roblox.",
    features: ["AI Aimbot", "Color Triggerbot", "Humanized Smoothing", "Stream Proof"],
    price: "From $4.99",
    image: "https://picsum.photos/seed/roblox-aimbot/600/400"
  },
  {
    id: "roblox-lite",
    name: "EasyAim Lite",
    game: "Roblox",
    description: "Lightweight triggerbot for instant reactions.",
    features: ["Color Triggerbot", "Flick Bot", "Humanized Smoothing", "Low Resource Usage"],
    price: "From $2.99",
    image: "https://picsum.photos/seed/roblox-triggerbot/600/400"
  }
]

export function Shop() {
  return (
    <div className="container mx-auto px-4 max-w-7xl py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-display font-bold mb-4 neon-text-cyan">Store</h1>
        <p className="text-text-secondary text-lg">Browse our selection of premium gaming cheats.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="h-full flex flex-col hover:border-neon-cyan/50 transition-colors bg-surface">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-48 object-cover rounded-t-xl border-b border-border"
                referrerPolicy="no-referrer"
              />
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl">{product.name}</CardTitle>
                  <span className="text-xs font-bold bg-surface-hover px-2 py-1 rounded text-text-secondary">
                    {product.game}
                  </span>
                </div>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2 mb-4">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm text-text-secondary">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-neon-cyan" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex items-center justify-between border-t border-border/50 pt-6 mt-auto">
                <span className="font-bold text-lg">{product.price}</span>
                <Link to={`/product/${product.id}`}>
                  <Button variant="neon" size="sm">View Details</Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
