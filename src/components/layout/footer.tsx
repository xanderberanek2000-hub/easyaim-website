import { Link } from "react-router-dom"
import { Crosshair } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface py-12 mt-24">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Crosshair className="h-6 w-6 text-neon-cyan" />
              <span className="font-display font-bold text-xl tracking-tight neon-text-cyan">EasyAim</span>
            </Link>
            <p className="text-sm text-text-secondary">
              Premium AI-powered aimbots and triggerbots.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-text-primary">Products</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><Link to="/shop" className="hover:text-neon-cyan">All Cheats</Link></li>
              <li><Link to="/status" className="hover:text-neon-cyan">Cheat Status</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-text-primary">Support</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><Link to="/support" className="hover:text-neon-cyan">FAQ</Link></li>
              <li><a href="#" className="hover:text-neon-cyan">Discord</a></li>
              <li><Link to="/support" className="hover:text-neon-cyan">Tickets</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-text-primary">Legal</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><a href="#" className="hover:text-neon-cyan">Terms of Service</a></li>
              <li><a href="#" className="hover:text-neon-cyan">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-text-secondary">
          <p>&copy; {new Date().getFullYear()} EasyAim. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
