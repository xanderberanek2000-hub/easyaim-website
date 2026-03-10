import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/src/components/ui/button"
import { Crosshair, Search } from "lucide-react"
import { useSiteData } from "@/src/context/SiteContext"

export function Navbar() {
  const { data } = useSiteData()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
    }
  }
  
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-7xl">
        <Link to="/" className="flex items-center gap-2">
          <Crosshair className="h-6 w-6 text-neon-cyan" />
          <span className="font-display font-bold text-xl tracking-tight neon-text-cyan hidden sm:inline-block">{data.siteName}</span>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-text-secondary flex-1 justify-center px-8">
          <Link to="/shop" className="hover:text-neon-cyan transition-colors">Marketplace</Link>
          <Link to="/status" className="hover:text-neon-cyan transition-colors">Status</Link>
          <Link to="/support" className="hover:text-neon-cyan transition-colors">Support</Link>
          <Link to="/about" className="hover:text-neon-cyan transition-colors">About Us</Link>
          
          <form onSubmit={handleSearch} className="relative flex-1 max-w-xs ml-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-text-secondary" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface border border-border rounded-full pl-9 pr-4 py-1.5 text-sm focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all"
            />
          </form>
        </div>
        <div className="flex items-center gap-3">
          <div className="md:hidden">
            <form onSubmit={handleSearch} className="relative w-32 sm:w-48">
              <Search className="absolute left-2.5 top-2 h-4 w-4 text-text-secondary" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-surface border border-border rounded-full pl-8 pr-3 py-1 text-xs focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all"
              />
            </form>
          </div>
          
          <Link to="/dashboard" className="hidden sm:inline-block">
            <Button variant="outline" size="sm" className="border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-bg">My Software</Button>
          </Link>
          <Link to="/shop">
            <Button variant="neon" size="sm">Get Started</Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
