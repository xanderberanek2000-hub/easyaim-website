import { motion } from "framer-motion"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { MessageSquare, HelpCircle, Ticket } from "lucide-react"

const faqs = [
  {
    question: "How do I install the software?",
    answer: "After purchasing, go to your dashboard, complete the verification step, and download the loader. Run the loader as administrator, enter your license key, and launch the game."
  },
  {
    question: "Is it safe to use on my main account?",
    answer: "While our cheats are designed to be undetected and stream-proof, we always recommend using an alternate account to ensure the absolute safety of your main account."
  },
  {
    question: "How do I reset my HWID?",
    answer: "You can reset your Hardware ID directly from your dashboard once every 7 days. If you need an immediate reset, please open a support ticket."
  },
  {
    question: "Do you offer refunds?",
    answer: "Due to the digital nature of our products, we do not offer refunds once a license key has been activated. Please read our terms of service for more details."
  }
]

export function Support() {
  return (
    <div className="container mx-auto px-4 max-w-5xl py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display font-bold mb-4 neon-text-cyan">Support Center</h1>
          <p className="text-text-secondary text-lg">Need help? We're here for you 24/7.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card className="border-neon-purple/30 hover:border-neon-purple/60 transition-colors cursor-pointer group">
            <CardHeader className="text-center">
              <div className="w-16 h-16 rounded-full bg-neon-purple/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-neon-purple/20 transition-colors">
                <MessageSquare className="w-8 h-8 text-neon-purple" />
              </div>
              <CardTitle className="text-2xl">Discord Community</CardTitle>
              <CardDescription>Join our Discord server for real-time support, updates, and community chat.</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button variant="outline" className="border-neon-purple text-neon-purple hover:bg-neon-purple hover:text-white w-full">
                Join Discord
              </Button>
            </CardContent>
          </Card>

          <Card className="border-neon-cyan/30 hover:border-neon-cyan/60 transition-colors cursor-pointer group">
            <CardHeader className="text-center">
              <div className="w-16 h-16 rounded-full bg-neon-cyan/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-neon-cyan/20 transition-colors">
                <Ticket className="w-8 h-8 text-neon-cyan" />
              </div>
              <CardTitle className="text-2xl">Support Tickets</CardTitle>
              <CardDescription>Open a ticket for billing issues, HWID resets, or technical problems.</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button variant="neon" className="w-full">
                Open a Ticket
              </Button>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center"><HelpCircle className="mr-2 text-text-secondary" /> Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="bg-surface/50">
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-text-secondary">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
