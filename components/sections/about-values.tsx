export default function AboutValues() {
  const values = [
    {
      title: "Integrity",
      description: "We conduct our business with honesty and transparency in all dealings.",
      icon: "🤝",
    },
    {
      title: "Excellence",
      description: "We strive for excellence in every product and service we deliver.",
      icon: "⭐",
    },
    {
      title: "Innovation",
      description: "We embrace new technologies and ideas to stay ahead of the market.",
      icon: "💡",
    },
    {
      title: "Reliability",
      description: "Our customers can depend on us for consistent, quality support.",
      icon: "🛡️",
    },
  ]

  return (
    <section className="py-20 px-4 bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Core Values</h2>
          <p className="text-xl text-white/80">These principles guide everything we do</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value) => (
            <div
              key={value.title}
              className="bg-white rounded-lg p-6 border border-border hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{value.icon}</div>
              <h3 className="font-bold text-lg mb-2 text-foreground">{value.title}</h3>
              <p className="text-foreground/70">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
