export default function AboutMission() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-foreground">Our Mission</h2>
            <p className="text-lg text-foreground/80 mb-4 leading-relaxed">
              At ProKidTek, our mission is to empower businesses and individuals with cutting-edge technology solutions
              that drive growth and innovation. We believe in providing not just products, but comprehensive solutions
              that transform the way people work and communicate.
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed">
              With over a decade of experience in the technology sector, we have built a reputation for reliability,
              quality, and exceptional customer service.
            </p>
          </div>
          <div className="bg-primary/10 rounded-lg p-8 border border-primary/20">
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xl">✓</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Quality First</h3>
                  <p className="text-foreground/70">We never compromise on quality</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xl">✓</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Customer Focused</h3>
                  <p className="text-foreground/70">Your satisfaction is our priority</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xl">✓</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Innovation Driven</h3>
                  <p className="text-foreground/70">Always staying ahead of the curve</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
