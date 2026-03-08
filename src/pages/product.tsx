import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { CheckCircle2, Monitor, Download, ShieldCheck } from "lucide-react"
import { useSiteData } from "@/src/context/SiteContext"

const pricingPlans = [
  { id: "3-day", name: "3-Day Access", price: "$4.99", duration: "3 Days" },
  { id: "14-day", name: "14-Day Access", price: "$9.99", duration: "14 Days" },
  { id: "monthly", name: "Monthly Access", price: "$14.99", duration: "1 Month" },
  { id: "3-month", name: "3-Month Access", price: "$34.99", duration: "3 Months" },
  { id: "lifetime", name: "Lifetime License", price: "$79.99", duration: "Lifetime" },
]

export function Product() {
  const { id } = useParams()
  const { data } = useSiteData()
  const [isLoading, setIsLoading] = useState(true)
  
  const product = data.products.find(p => p.id === id) || data.products[0]

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 600)
    return () => clearTimeout(timer)
  }, [id])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 max-w-7xl py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="h-10 bg-surface-hover rounded animate-pulse w-3/4 mb-4" />
            <div className="h-6 bg-surface-hover rounded animate-pulse w-full mb-2" />
            <div className="h-6 bg-surface-hover rounded animate-pulse w-5/6 mb-8" />
            <div className="w-full h-64 bg-surface-hover rounded-xl animate-pulse mb-8" />
            <div className="space-y-4">
              <div className="h-8 bg-surface-hover rounded animate-pulse w-1/3" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="h-5 bg-surface-hover rounded animate-pulse w-full" />
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className="h-10 bg-surface-hover rounded animate-pulse w-1/2 mb-6" />
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="h-32 bg-surface-hover rounded-xl animate-pulse w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 max-w-7xl py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Info */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-display font-bold mb-2 neon-text-cyan">{product.name}</h1>
            <p className="text-text-secondary text-lg mb-6">{product.description}</p>
            
            <div className="rounded-xl overflow-hidden border border-border mb-8">
              <img 
                src={product.image} 
                alt="Product Preview" 
                className="w-full h-auto"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="space-y-8">
              <section>
                <h3 className="text-2xl font-bold mb-4 flex items-center"><CheckCircle2 className="mr-2 text-neon-cyan" /> Features</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-text-secondary">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-neon-cyan mr-2" /> {feature}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="text-2xl font-bold mb-4 flex items-center"><Monitor className="mr-2 text-neon-purple" /> Compatibility</h3>
                <ul className="space-y-2 text-text-secondary">
                  <li><strong>OS:</strong> Windows 10 / Windows 11 (All versions)</li>
                  <li><strong>Processors:</strong> Intel & AMD Supported</li>
                  <li><strong>Client:</strong> Web Client & Microsoft Store Version</li>
                </ul>
              </section>

              <section>
                <h3 className="text-2xl font-bold mb-4 flex items-center"><Download className="mr-2 text-neon-blue" /> Download Instructions</h3>
                <ol className="list-decimal list-inside space-y-2 text-text-secondary">
                  <li>Purchase a license key from the plans below.</li>
                  <li>Go to your Dashboard and complete the verification step.</li>
                  <li>Download the loader and run as Administrator.</li>
                  <li>Enter your license key and inject into the game.</li>
                </ol>
              </section>
            </div>
          </motion.div>
        </div>

        {/* Pricing Plans */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="sticky top-24"
          >
            <h2 className="text-3xl font-display font-bold mb-6">Select a Plan</h2>
            <div className="space-y-4">
              {pricingPlans.map((plan) => (
                <Card key={plan.id} className="border-border/50 hover:border-neon-cyan/50 transition-colors bg-surface/50 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div>
                      <CardTitle className="text-xl">{plan.name}</CardTitle>
                      <CardDescription>{plan.duration} of premium access</CardDescription>
                    </div>
                    <div className="text-2xl font-bold neon-text-cyan">{plan.price}</div>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-text-secondary space-y-1 mb-4">
                      <li className="flex items-center"><ShieldCheck className="w-4 h-4 mr-2 text-emerald-400" /> Instant access</li>
                      <li className="flex items-center"><ShieldCheck className="w-4 h-4 mr-2 text-emerald-400" /> Updates included</li>
                      <li className="flex items-center"><ShieldCheck className="w-4 h-4 mr-2 text-emerald-400" /> Secure downloads</li>
                    </ul>
                    <Link to={`/checkout/${plan.id}`}>
                      <Button variant="outline" className="w-full hover:bg-neon-cyan hover:text-bg hover:border-neon-cyan">
                        Purchase {plan.name}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
