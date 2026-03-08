import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Lock, CreditCard, ShieldCheck, ArrowRight } from "lucide-react"
import { useSiteData } from "@/src/context/SiteContext"

export function Checkout() {
  const { planId } = useParams()
  const { data } = useSiteData()
  const [showInstructions, setShowInstructions] = useState(false)

  if (showInstructions) {
    return (
      <div className="container mx-auto px-4 max-w-2xl py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="border-neon-cyan/50 bg-surface shadow-[0_0_30px_rgba(0,240,255,0.1)]">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-3xl font-display font-bold neon-text-cyan mb-2">Payment Instructions</CardTitle>
              <CardDescription className="text-lg">Please follow the steps below to complete your purchase.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-8">
              <div className="bg-bg border border-border rounded-lg p-6 text-center whitespace-pre-wrap text-lg leading-relaxed">
                {data.paymentInstructions}
              </div>
              
              <div className="flex justify-center">
                <Link to="/dashboard">
                  <Button variant="neon" size="lg" className="w-full sm:w-auto">
                    Go to Dashboard <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 max-w-4xl py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl font-display font-bold mb-2">Secure Checkout</h1>
          <p className="text-text-secondary flex items-center justify-center">
            <Lock className="w-4 h-4 mr-2" /> 256-bit SSL Encryption
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>We'll send your receipt and license key here.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full bg-bg border border-border rounded-md px-4 py-2 text-text-primary focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-colors"
                    placeholder="you@example.com"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>All transactions are secure and encrypted.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 p-4 border border-neon-cyan bg-neon-cyan/5 rounded-md cursor-pointer">
                  <CreditCard className="w-6 h-6 text-neon-cyan" />
                  <span className="font-medium">Credit / Debit Card</span>
                </div>
                <div className="flex items-center gap-4 p-4 border border-border hover:border-border/80 bg-bg rounded-md cursor-pointer transition-colors">
                  <div className="w-6 h-6 bg-blue-500 rounded-sm flex items-center justify-center text-white font-bold text-xs">Crypto</div>
                  <span className="font-medium text-text-secondary">Cryptocurrency</span>
                </div>

                <div className="pt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Card Number</label>
                    <input 
                      type="text" 
                      className="w-full bg-bg border border-border rounded-md px-4 py-2 text-text-primary focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-colors"
                      placeholder="0000 0000 0000 0000"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1">Expiry Date</label>
                      <input 
                        type="text" 
                        className="w-full bg-bg border border-border rounded-md px-4 py-2 text-text-primary focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-colors"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1">CVC</label>
                      <input 
                        type="text" 
                        className="w-full bg-bg border border-border rounded-md px-4 py-2 text-text-primary focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-colors"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">EasyAim for Roblox</span>
                  <span className="font-medium">{planId === 'lifetime' ? '$79.99' : '$14.99'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Plan</span>
                  <span className="font-medium capitalize">{planId?.replace('-', ' ')}</span>
                </div>
                <div className="border-t border-border pt-4 flex justify-between">
                  <span className="font-bold">Total</span>
                  <span className="font-bold neon-text-cyan">{planId === 'lifetime' ? '$79.99' : '$14.99'}</span>
                </div>
                
                <Button variant="neon" className="w-full mt-6" onClick={() => setShowInstructions(true)}>Pay Now</Button>
                
                <p className="text-xs text-text-secondary text-center mt-4 flex items-center justify-center">
                  <ShieldCheck className="w-3 h-3 mr-1" /> Guaranteed Safe Checkout
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
