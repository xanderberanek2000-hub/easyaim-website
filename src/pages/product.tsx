import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { CheckCircle2, Monitor, Download, ShieldCheck, Star, MessageSquare } from "lucide-react"
import { useSiteData, Review } from "@/src/context/SiteContext"

const pricingPlans = [
  { id: "3-day", name: "3-Day Access", price: "$4.99", duration: "3 Days" },
  { id: "14-day", name: "14-Day Access", price: "$9.99", duration: "14 Days" },
  { id: "monthly", name: "Monthly Access", price: "$14.99", duration: "1 Month" },
  { id: "3-month", name: "3-Month Access", price: "$34.99", duration: "3 Months" },
  { id: "lifetime", name: "Lifetime License", price: "$79.99", duration: "Lifetime" },
]

export function Product() {
  const { id } = useParams()
  const { data, updateData } = useSiteData()
  const [isLoading, setIsLoading] = useState(true)
  const [newReviewRating, setNewReviewRating] = useState(5)
  const [newReviewComment, setNewReviewComment] = useState("")
  const [isSubmittingReview, setIsSubmittingReview] = useState(false)
  
  const product = data.products.find(p => p.id === id) || data.products[0]
  const developer = data.developers.find(d => d.id === product.developerId)

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 600)
    return () => clearTimeout(timer)
  }, [id])

  const handleSubmitReview = () => {
    if (!newReviewComment.trim()) return
    
    setIsSubmittingReview(true)
    
    setTimeout(() => {
      const newReview: Review = {
        id: `rev-${Date.now()}`,
        userId: "current-user",
        userName: "You",
        rating: newReviewRating,
        comment: newReviewComment,
        date: new Date().toISOString().split('T')[0]
      }
      
      const updatedProducts = data.products.map(p => {
        if (p.id === product.id) {
          return { ...p, reviews: [newReview, ...(p.reviews || [])] }
        }
        return p
      })
      
      updateData({ products: updatedProducts })
      setNewReviewComment("")
      setNewReviewRating(5)
      setIsSubmittingReview(false)
    }, 500)
  }

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
            <div className="flex justify-between items-start mb-2">
              <h1 className="text-4xl font-display font-bold neon-text-cyan">{product.name}</h1>
            </div>
            {developer && (
              <Link to={`/developer/${developer.id}`} className="text-sm text-neon-cyan hover:underline mb-6 block">
                Developed by {developer.name}
              </Link>
            )}
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

              <section className="mt-12 pt-8 border-t border-border/50">
                <h3 className="text-2xl font-bold mb-6 flex items-center"><MessageSquare className="mr-2 text-neon-purple" /> User Reviews</h3>
                
                {/* Add Review Form */}
                <Card className="bg-surface border-border/50 mb-8">
                  <CardHeader>
                    <CardTitle className="text-lg">Write a Review</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-text-secondary block mb-2">Rating</label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setNewReviewRating(star)}
                            className={`p-1 ${star <= newReviewRating ? "text-yellow-400" : "text-text-secondary/30"}`}
                          >
                            <Star className="w-6 h-6 fill-current" />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-text-secondary block mb-2">Your Review</label>
                      <textarea
                        value={newReviewComment}
                        onChange={(e) => setNewReviewComment(e.target.value)}
                        placeholder="Share your experience with this product..."
                        className="w-full bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neon-cyan h-24"
                      />
                    </div>
                    <Button 
                      onClick={handleSubmitReview} 
                      disabled={!newReviewComment.trim() || isSubmittingReview}
                      className="bg-neon-cyan hover:bg-neon-cyan/90 text-black font-bold"
                    >
                      {isSubmittingReview ? "Submitting..." : "Submit Review"}
                    </Button>
                  </CardContent>
                </Card>

                {/* Reviews List */}
                <div className="space-y-4">
                  {product.reviews && product.reviews.length > 0 ? (
                    product.reviews.map((review) => (
                      <Card key={review.id} className="bg-surface border-border/50">
                        <CardContent className="pt-6">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-bold text-white">{review.userName}</p>
                              <div className="flex text-yellow-400 mt-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className={`w-3 h-3 ${i < review.rating ? "fill-current" : "text-text-secondary/30"}`} />
                                ))}
                              </div>
                            </div>
                            <span className="text-xs text-text-secondary">{review.date}</span>
                          </div>
                          <p className="text-text-secondary mt-3">{review.comment}</p>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <p className="text-text-secondary italic">No reviews yet. Be the first to review this product!</p>
                  )}
                </div>
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
