const products = [
  {
    id: 1,
    name: "ProBook Elite",
    image: "/professional-laptop.jpg",
    rating: 4.8,
  },
  {
    id: 2,
    name: "WorkStation Pro",
    image: "/desktop-workstation.jpg",
    rating: 4.9,
  },
  {
    id: 3,
    name: "Network Hub",
    image: "/network-device.jpg",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Audio System",
    image: "/audio-speakers.jpg",
    rating: 4.8,
  },
]

export default function BestSelling() {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-4 text-secondary animate-fade-in-down">
          Best Selling Products
        </h2>
        <p className="text-center text-muted-foreground mb-16 animate-fade-in">Our most popular items</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, idx) => (
            <div
              key={product.id}
              className={`bg-card rounded-3xl overflow-hidden shadow-2xl hover:shadow-primary/30 transition-all duration-500 transform hover:scale-105 animate-fade-in-up stagger-item-${idx + 1}`}
            >
              <div className="h-56 bg-muted overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <h3 className="font-bold text-2xl text-secondary mb-4">{product.name}</h3>
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-primary text-lg">
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">({product.rating})</span>
                </div>
                <button className="w-full bg-primary text-primary-foreground py-3 rounded-full hover:bg-accent transition-all duration-300 font-bold text-lg transform hover:scale-105">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
