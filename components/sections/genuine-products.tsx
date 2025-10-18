import { CheckCircle, Shield, Zap, Heart } from "lucide-react"

export default function GenuineProducts() {
  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-secondary">100% Genuine Products</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="bg-card rounded-lg p-8 text-center border border-border hover:shadow-2xl transition-shadow shadow-lg">
            <Shield className="w-16 h-16 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-secondary mb-3">Authentic Guarantee</h3>
            <p className="text-muted-foreground">
              Every product is verified and comes with manufacturer warranty. We guarantee 100% authenticity.
            </p>
          </div>

          <div className="bg-card rounded-lg p-8 text-center border border-border hover:shadow-2xl transition-shadow shadow-lg">
            <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-secondary mb-3">Quality Certified</h3>
            <p className="text-muted-foreground">
              All items pass rigorous quality checks before shipping. Your satisfaction is our priority.
            </p>
          </div>

          <div className="bg-card rounded-lg p-8 text-center border border-border hover:shadow-2xl transition-shadow shadow-lg">
            <Zap className="w-16 h-16 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-secondary mb-3">Fast Support</h3>
            <p className="text-muted-foreground">
              Dedicated support team ready to help. Quick response times and reliable service.
            </p>
          </div>

          <div className="bg-card rounded-lg p-8 text-center border border-border hover:shadow-2xl transition-shadow shadow-lg">
            <Heart className="w-16 h-16 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-secondary mb-3">Loyalty Rewards</h3>
            <p className="text-muted-foreground">
              Earn points on every purchase and enjoy exclusive benefits. Join our loyalty program today.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
