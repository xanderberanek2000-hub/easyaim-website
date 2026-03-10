import { useParams, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card"
import { CheckCircle2, Calendar, Package } from "lucide-react"
import { useSiteData } from "@/src/context/SiteContext"

export function DeveloperProfile() {
  const { id } = useParams<{ id: string }>()
  const { data } = useSiteData()
  
  const developer = data.developers.find(d => d.id === id)
  const developerProducts = data.products.filter(p => p.developerId === id)

  if (!developer) {
    return (
      <div className="container mx-auto px-4 max-w-7xl py-24 text-center">
        <h1 className="text-3xl font-bold mb-4">Developer Not Found</h1>
        <p className="text-text-secondary mb-8">The developer profile you are looking for does not exist.</p>
        <Link to="/shop">
          <Button variant="neon">Back to Shop</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 max-w-7xl py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-12"
      >
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-surface border border-border/50 p-8 rounded-2xl">
          <img 
            src={developer.avatar} 
            alt={developer.name} 
            className="w-32 h-32 rounded-full border-2 border-neon-purple bg-surface-hover"
          />
          <div className="text-center md:text-left flex-grow">
            <h1 className="text-4xl font-display font-bold mb-2 neon-text-purple">{developer.name}</h1>
            <p className="text-text-secondary text-lg mb-4 max-w-2xl">{developer.bio}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-text-secondary">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-neon-purple" />
                Joined {new Date(developer.joinedDate).toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <Package className="w-4 h-4 mr-2 text-neon-purple" />
                {developerProducts.length} Products
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <h2 className="text-2xl font-bold mb-6 border-b border-border/50 pb-2">Products by {developer.name}</h2>
      
      {developerProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {developerProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col hover:border-neon-cyan/50 transition-colors bg-surface">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-48 object-cover rounded-t-xl border-b border-border"
                  referrerPolicy="no-referrer"
                />
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl">{product.name}</CardTitle>
                    <div className="flex flex-col gap-1 items-end">
                      <span className="text-xs font-bold bg-surface-hover px-2 py-1 rounded text-text-secondary">
                        {product.game}
                      </span>
                      <span className="text-[10px] font-medium bg-neon-cyan/10 text-neon-cyan px-2 py-0.5 rounded border border-neon-cyan/20">
                        {product.cheatType}
                      </span>
                    </div>
                  </div>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-2 mb-4">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm text-text-secondary">
                        <CheckCircle2 className="w-4 h-4 mr-2 text-neon-cyan" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="flex items-center justify-between border-t border-border/50 pt-6 mt-auto">
                  <span className="font-bold text-lg">{product.price}</span>
                  <Link to={`/product/${product.id}`}>
                    <Button variant="neon" size="sm">View Details</Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-surface rounded-xl border border-border/50">
          <p className="text-text-secondary">This developer hasn't listed any products yet.</p>
        </div>
      )}
    </div>
  )
}
