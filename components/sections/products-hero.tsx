export default function ProductsHero() {
  return (
    <section className="relative h-96 bg-cover bg-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/hero-welcome.png')",
        }}
      ></div>
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative max-w-4xl mx-auto h-full flex items-center justify-center text-center px-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Products</h1>
          <p className="text-xl text-white/90 leading-relaxed">
            Discover our comprehensive range of premium technology products designed to meet your business needs.
          </p>
        </div>
      </div>
    </section>
  )
}
