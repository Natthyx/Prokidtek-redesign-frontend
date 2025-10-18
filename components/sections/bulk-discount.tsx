export default function BulkDiscount() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            <span className="text-primary">🏷️ Bulk Orders</span> = <span className="text-primary">Big Savings</span> 🏷️
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Order in bulk and unlock exclusive discounts. Perfect for businesses and organizations looking to equip
            their teams with premium technology.
          </p>
        </div>

        {/* Discount Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            { units: "10-50 Units", discount: "10% Discount", emoji: "💰" },
            { units: "51-100 Units", discount: "20% Discount", emoji: "💵" },
            { units: "100+ Units", discount: "Custom Quote", emoji: "🎁" },
          ].map((tier, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-8 border-2 border-primary/20 hover:border-primary hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in-up"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="text-6xl mb-6">{tier.emoji}</div>
              <p className="text-3xl font-bold text-foreground mb-3">{tier.units}</p>
              <p className="text-primary text-xl font-semibold">{tier.discount}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="flex justify-center gap-4 mb-8">
            <span className="text-4xl animate-bounce">🎺</span>
            <span className="text-4xl animate-bounce" style={{ animationDelay: "0.2s" }}>
              🎉
            </span>
            <span className="text-4xl animate-bounce" style={{ animationDelay: "0.4s" }}>
              🎺
            </span>
          </div>
          <button className="bg-primary text-primary-foreground px-12 py-4 rounded-full font-bold hover:bg-accent transition-all duration-300 text-lg transform hover:scale-105 shadow-lg">
            Get Bulk Quote
          </button>
        </div>
      </div>
    </section>
  )
}
