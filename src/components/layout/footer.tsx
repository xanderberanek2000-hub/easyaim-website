import { Link } from "react-router-dom"
import { Crosshair, Twitter, Facebook, MessageSquare } from "lucide-react"
import { useSiteData } from "@/src/context/SiteContext"

export function Footer() {
  const { data } = useSiteData()
  
  return (
    <footer className="border-t border-border bg-surface py-12 mt-24">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Crosshair className="h-6 w-6 text-neon-cyan" />
              <span className="font-display font-bold text-xl tracking-tight neon-text-cyan">{data.siteName}</span>
            </Link>
            <p className="text-sm text-text-secondary">
              Premium aimbots and triggerbots.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href={data.twitterLink} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-neon-cyan transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href={data.facebookLink} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-neon-cyan transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href={data.discordLink} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-neon-cyan transition-colors">
                <MessageSquare className="w-5 h-5" />
              </a>
            </div>
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
              <li><a href={data.discordLink} target="_blank" rel="noopener noreferrer" className="hover:text-neon-cyan">Discord</a></li>
              <li><a href={data.supportTicketLink} target="_blank" rel="noopener noreferrer" className="hover:text-neon-cyan">Tickets</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-text-primary">Company</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><Link to="/about" className="hover:text-neon-cyan">About Us</Link></li>
              <li><a href="#" className="hover:text-neon-cyan">Terms of Service</a></li>
              <li><a href="#" className="hover:text-neon-cyan">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-text-secondary">
          <p>&copy; {new Date().getFullYear()} {data.siteName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
