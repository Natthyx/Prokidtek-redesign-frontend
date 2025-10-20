export default function AboutHero() {
  return (
    <section className="relative h-96 overflow-hidden">
      {/* Extended parallax background from mission section */}
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

      <div className="relative max-w-4xl mx-auto h-full flex items-center justify-center text-center px-4 z-10">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">About ProKidTek</h1>
          <p className="text-xl text-white/90 leading-relaxed">
            We are a leading provider of premium technology solutions, dedicated to delivering excellence and innovation
            to businesses and individuals worldwide.
          </p>
        </div>
      </div>
    </section>
  )
}
