import { useState, useEffect } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { motion } from "framer-motion"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card"
import { CheckCircle2, Search, FilterX } from "lucide-react"
import { useSiteData } from "@/src/context/SiteContext"

export function Shop() {
  const { data } = useSiteData()
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get("q") || ""
  
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState(query)
  const [selectedGame, setSelectedGame] = useState("All")
  const [selectedType, setSelectedType] = useState("All")

  useEffect(() => {
    setSearchQuery(query)
  }, [query])

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 600)
    return () => clearTimeout(timer)
  }, [searchQuery, selectedGame, selectedType])

  const uniqueGames = ["All", ...Array.from(new Set(data.products.map(p => p.game)))]
  const uniqueTypes = ["All", ...Array.from(new Set(data.products.map(p => p.cheatType)))]

  const filteredProducts = data.products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesGame = selectedGame === "All" || product.game === selectedGame
    const matchesType = selectedType === "All" || product.cheatType === selectedType
    
    return matchesSearch && matchesGame && matchesType
  })

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedGame("All")
    setSelectedType("All")
    setSearchParams({})
  }

  return (
    <div className="container mx-auto px-4 max-w-7xl py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-display font-bold mb-4 neon-text-cyan">Store</h1>
        <p className="text-text-secondary text-lg">Browse our selection of premium gaming cheats.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-10">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3 top-3 h-5 w-5 text-text-secondary" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface border border-border rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all"
          />
        </div>
        
        <div className="flex flex-wrap gap-4">
          <select 
            value={selectedGame}
            onChange={(e) => setSelectedGame(e.target.value)}
            className="bg-surface border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all"
          >
            {uniqueGames.map((game, index) => (
              <option key={game || index} value={game}>{game === "All" ? "All Games" : game}</option>
            ))}
          </select>

          <select 
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-surface border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all"
          >
            {uniqueTypes.map((type, index) => (
              <option key={type || index} value={type}>{type === "All" ? "All Types" : type}</option>
            ))}
          </select>

          {(searchQuery || selectedGame !== "All" || selectedType !== "All") && (
            <Button variant="ghost" onClick={clearFilters} className="text-text-secondary hover:text-white">
              <FilterX className="w-4 h-4 mr-2" /> Clear Filters
            </Button>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="h-full flex flex-col bg-surface border-border/50 overflow-hidden">
              <div className="w-full h-48 bg-surface-hover animate-pulse" />
              <CardHeader className="space-y-3">
                <div className="h-6 bg-surface-hover rounded animate-pulse w-3/4" />
                <div className="h-4 bg-surface-hover rounded animate-pulse w-full" />
                <div className="h-4 bg-surface-hover rounded animate-pulse w-5/6" />
              </CardHeader>
              <CardContent className="flex-grow space-y-2">
                {[1, 2, 3, 4].map(j => (
                  <div key={j} className="h-4 bg-surface-hover rounded animate-pulse w-full" />
                ))}
              </CardContent>
              <CardFooter className="border-t border-border/50 pt-6 mt-auto flex justify-between">
                <div className="h-6 bg-surface-hover rounded animate-pulse w-16" />
                <div className="h-9 bg-surface-hover rounded animate-pulse w-28" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
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
                    <div className="flex flex-col gap-1 items-end">
                      <span className="text-xs font-bold bg-surface-hover px-2 py-1 rounded text-text-secondary">
                        {product.game}
                      </span>
                      <span className="text-[10px] font-medium bg-neon-cyan/10 text-neon-cyan px-2 py-0.5 rounded border border-neon-cyan/20">
                        {product.cheatType}
                      </span>
                    </div>
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
      ) : (
        <div className="text-center py-20">
          <h3 className="text-2xl font-bold text-text-secondary mb-2">No products found</h3>
          <p className="text-text-secondary/70">Try adjusting your search or filters.</p>
          <Button variant="outline" onClick={clearFilters} className="mt-6">
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  )
}
