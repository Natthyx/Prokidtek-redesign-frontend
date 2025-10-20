import { CheckCircle, Shield, Zap, Heart } from "lucide-react"

export default function GenuineProducts() {
  return (
    <section className="py-16 px-4 bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">100% Genuine Products</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="bg-white/10 rounded-lg p-8 text-center border border-white/20 hover:shadow-2xl transition-shadow shadow-xl backdrop-blur-sm">
            <Shield className="w-16 h-16 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-3">Authentic Guarantee</h3>
            <p className="text-white/80">
              Every product is verified and comes with manufacturer warranty. We guarantee 100% authenticity.
            </p>
          </div>

          <div className="bg-white/10 rounded-lg p-8 text-center border border-white/20 hover:shadow-2xl transition-shadow shadow-xl backdrop-blur-sm">
            <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-3">Quality Certified</h3>
            <p className="text-white/80">
              All items pass rigorous quality checks before shipping. Your satisfaction is our priority.
            </p>
          </div>

          <div className="bg-white/10 rounded-lg p-8 text-center border border-white/20 hover:shadow-2xl transition-shadow shadow-xl backdrop-blur-sm">
            <Zap className="w-16 h-16 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-3">Fast Support</h3>
            <p className="text-white/80">
              Dedicated support team ready to help. Quick response times and reliable service.
            </p>
          </div>

          <div className="bg-white/10 rounded-lg p-8 text-center border border-white/20 hover:shadow-2xl transition-shadow shadow-xl backdrop-blur-sm">
            <Heart className="w-16 h-16 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-3">Loyalty Rewards</h3>
            <p className="text-white/80">
              Earn points on every purchase and enjoy exclusive benefits. Join our loyalty program today.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
