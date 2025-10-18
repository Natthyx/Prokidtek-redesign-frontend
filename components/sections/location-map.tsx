"use client"

export default function LocationMap() {
  return (
    <div className="py-16 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Visit Our Stores</h2>
          <p className="text-foreground/70 text-lg">Find us at any of our convenient locations</p>
        </div>

        <div className="bg-card rounded-2xl border border-border shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-3 gap-0">
            {/* Map - smaller and on left */}
            <div className="md:col-span-2 aspect-video w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1841374555634!2d-73.98823492346618!3d40.75889097138558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1710000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="ProKidTek Store Locations"
              ></iframe>
            </div>

            {/* Locations - on right side */}
            <div className="p-8 space-y-6 bg-gradient-to-b from-primary/5 to-accent/5 flex flex-col justify-center">
              <div className="bg-white rounded-xl p-4 hover:shadow-lg transition-all duration-300 shadow-md">
                <h3 className="font-bold text-lg text-foreground mb-2">Main Store</h3>
                <p className="text-foreground/70 text-sm mb-1">123 Tech Street</p>
                <p className="text-foreground/70 text-sm mb-2">City, State 12345</p>
                <p className="text-primary font-semibold text-xs">Mon-Sat 9AM-8PM</p>
              </div>

              <div className="bg-white rounded-xl p-4 hover:shadow-lg transition-all duration-300 shadow-md">
                <h3 className="font-bold text-lg text-foreground mb-2">Downtown Branch</h3>
                <p className="text-foreground/70 text-sm mb-1">456 Commerce Ave</p>
                <p className="text-foreground/70 text-sm mb-2">City, State 12346</p>
                <p className="text-primary font-semibold text-xs">Mon-Sat 10AM-7PM</p>
              </div>

              <div className="bg-white rounded-xl p-4 hover:shadow-lg transition-all duration-300 shadow-md">
                <h3 className="font-bold text-lg text-foreground mb-2">Tech Plaza</h3>
                <p className="text-foreground/70 text-sm mb-1">789 Innovation Blvd</p>
                <p className="text-foreground/70 text-sm mb-2">City, State 12347</p>
                <p className="text-primary font-semibold text-xs">Mon-Fri 9AM-6PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
