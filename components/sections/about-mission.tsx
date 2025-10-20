export default function AboutMission() {
  return (
    <section className="py-16 px-4 relative">
      {/* Parallax background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 bg-fixed bg-center bg-cover bg-no-repeat" 
           style={{
             backgroundImage: "url('/professional-desktop-workstation.jpg')",
             backgroundAttachment: "fixed",
             backgroundPosition: "center",
             backgroundRepeat: "no-repeat",
             backgroundSize: "cover"
           }}>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-white">Our Mission</h2>
            <p className="text-lg text-white/90 mb-4 leading-relaxed">
              At ProKidTek, our mission is to empower businesses and individuals with cutting-edge technology solutions
              that drive growth and innovation. We believe in providing not just products, but comprehensive solutions
              that transform the way people work and communicate.
            </p>
            <p className="text-lg text-white/90 leading-relaxed">
              With over a decade of experience in the technology sector, we have built a reputation for reliability,
              quality, and exceptional customer service.
            </p>
          </div>
          <div className="bg-white/10 rounded-lg p-8 border border-white/20 backdrop-blur-sm">
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xl">✓</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1 text-white">Quality First</h3>
                  <p className="text-white/80">We never compromise on quality</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xl">✓</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1 text-white">Customer Focused</h3>
                  <p className="text-white/80">Your satisfaction is our priority</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xl">✓</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1 text-white">Innovation Driven</h3>
                  <p className="text-white/80">Always staying ahead of the curve</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
