import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { MessageSquare, HelpCircle, Ticket } from "lucide-react"
import { useSiteData } from "@/src/context/SiteContext"

export function Support() {
  const { data } = useSiteData()
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", ...Array.from(new Set(data.faqs.map(faq => faq.category || "General")))]

  const filteredFaqs = data.faqs.filter(faq => {
    if (selectedCategory === "All") return true
    const cat = faq.category || "General"
    return cat === selectedCategory
  })

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
              <a href={data.discordLink} target="_blank" rel="noopener noreferrer" className="block w-full">
                <Button variant="outline" className="border-neon-purple text-neon-purple hover:bg-neon-purple hover:text-white w-full">
                  Join Discord
                </Button>
              </a>
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
              <a href={data.supportTicketLink} target="_blank" rel="noopener noreferrer" className="block w-full">
                <Button variant="neon" className="w-full">
                  Open a Ticket
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center"><HelpCircle className="mr-2 text-text-secondary" /> Frequently Asked Questions</h2>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map(category => (
              <Button 
                key={category} 
                variant={selectedCategory === category ? "neon" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "" : "border-border text-text-secondary"}
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredFaqs.map((faq) => (
              <Card key={faq.id} className="bg-surface/50">
                <CardHeader>
                  <div className="flex justify-between items-start gap-4">
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                    {faq.category && (
                      <span className="text-xs font-medium bg-surface-hover px-2 py-1 rounded text-text-secondary whitespace-nowrap">
                        {faq.category}
                      </span>
                    )}
                  </div>
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
