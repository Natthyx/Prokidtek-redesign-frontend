export default function VideoSection() {
  return (
    <section className="py-16 px-4 bg-secondary/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="bg-black rounded-lg overflow-hidden shadow-lg aspect-video flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">▶️</div>
                <p className="text-white text-lg">Customer Service Video</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-secondary mb-6">We Understand Your Needs</h2>
            <p className="text-lg text-muted-foreground mb-6">
              At ProKidTek, we believe in putting our customers first. Our dedicated team understands the unique
              challenges you face in today's fast-paced tech world.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              We provide not just products, but comprehensive solutions. From expert consultation to after-sales support
              and repairs, we're with you every step of the way.
            </p>
            <div className="space-y-4">
              <div className="flex gap-3">
                <span className="text-primary font-bold text-2xl">•</span>
                <p className="text-foreground">Expert technical consultation</p>
              </div>
              <div className="flex gap-3">
                <span className="text-primary font-bold text-2xl">•</span>
                <p className="text-foreground">Professional repair and maintenance services</p>
              </div>
              <div className="flex gap-3">
                <span className="text-primary font-bold text-2xl">•</span>
                <p className="text-foreground">24/7 customer support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
