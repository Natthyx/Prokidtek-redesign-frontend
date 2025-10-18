export default function OutplayCompetition() {
  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-secondary">Outplay the Competition</h2>
        <p className="text-center text-muted-foreground mb-12">Why choose ProKidTek for your tech needs</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img src="/premium-gaming-laptop-computer.jpg" alt="Premium Laptop" className="rounded-lg shadow-lg" />
          </div>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary text-primary-foreground font-bold">
                  ✓
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-secondary mb-2">Latest Technology</h3>
                <p className="text-muted-foreground">Stay ahead with cutting-edge products from top manufacturers.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary text-primary-foreground font-bold">
                  ✓
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-secondary mb-2">Competitive Pricing</h3>
                <p className="text-muted-foreground">Best prices in the market with flexible payment options.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary text-primary-foreground font-bold">
                  ✓
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-secondary mb-2">Expert Support</h3>
                <p className="text-muted-foreground">Knowledgeable team ready to help you find the perfect solution.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary text-primary-foreground font-bold">
                  ✓
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-secondary mb-2">Fast Delivery</h3>
                <p className="text-muted-foreground">Quick shipping with tracking and reliable logistics partners.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
