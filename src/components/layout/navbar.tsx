import { Link } from "react-router-dom"
import { Button } from "@/src/components/ui/button"
import { Crosshair } from "lucide-react"

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-7xl">
        <Link to="/" className="flex items-center gap-2">
          <Crosshair className="h-6 w-6 text-neon-cyan" />
          <span className="font-display font-bold text-xl tracking-tight neon-text-cyan">EasyAim</span>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-text-secondary">
          <Link to="/shop" className="hover:text-neon-cyan transition-colors">Shop</Link>
          <Link to="/status" className="hover:text-neon-cyan transition-colors">Status</Link>
          <Link to="/support" className="hover:text-neon-cyan transition-colors">Support</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/dashboard">
            <Button variant="outline" size="sm">Dashboard</Button>
          </Link>
          <Link to="/shop">
            <Button variant="neon" size="sm">Get Started</Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
