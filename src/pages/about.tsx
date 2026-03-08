import { motion } from "framer-motion"
import { useSiteData } from "@/src/context/SiteContext"
import { Shield, Zap, Crosshair } from "lucide-react"

export function About() {
  const { data } = useSiteData()

  return (
    <div className="container mx-auto px-4 max-w-4xl py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 neon-text-cyan">{data.aboutUsTitle}</h1>
          <div className="w-24 h-1 bg-neon-cyan mx-auto rounded-full mb-8 shadow-[0_0_10px_rgba(0,240,255,0.5)]" />
          <p className="text-text-secondary text-lg leading-relaxed whitespace-pre-wrap text-left bg-surface/50 p-8 rounded-2xl border border-border/50">
            {data.aboutUsContent}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center p-6 bg-surface rounded-xl border border-border/50 hover:border-neon-cyan/30 transition-colors">
            <div className="w-12 h-12 rounded-full bg-neon-cyan/10 flex items-center justify-center mx-auto mb-4">
              <Crosshair className="w-6 h-6 text-neon-cyan" />
            </div>
            <h3 className="text-xl font-bold mb-2">Precision</h3>
            <p className="text-text-secondary text-sm">Engineered for pixel-perfect accuracy using advanced AI models.</p>
          </div>
          
          <div className="text-center p-6 bg-surface rounded-xl border border-border/50 hover:border-neon-purple/30 transition-colors">
            <div className="w-12 h-12 rounded-full bg-neon-purple/10 flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-neon-purple" />
            </div>
            <h3 className="text-xl font-bold mb-2">Security</h3>
            <p className="text-text-secondary text-sm">Built from the ground up to remain completely undetectable.</p>
          </div>
          
          <div className="text-center p-6 bg-surface rounded-xl border border-border/50 hover:border-neon-blue/30 transition-colors">
            <div className="w-12 h-12 rounded-full bg-neon-blue/10 flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-neon-blue" />
            </div>
            <h3 className="text-xl font-bold mb-2">Performance</h3>
            <p className="text-text-secondary text-sm">Optimized to run seamlessly without impacting your frame rate.</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
