"use client"

export default function LocationMap() {
  return (
    <div className="py-16 px-4 bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Visit Our Stores</h2>
          <p className="text-white/80 text-lg">Find us at our convenient locations</p>
        </div>

        <div className="bg-white rounded-2xl border border-border shadow-2xl overflow-hidden min-h-[520px]">
          <div className="grid md:grid-cols-3 gap-0">
            {/* Map - smaller and on left */}
            <div className="md:col-span-2 w-full h-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1128.985001568863!2d38.76704084541873!3d9.005986383107448!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85b0052ec8cf%3A0x1bf2572894d59929!2zQWJlcnVzIENvbXBsZXggfCBCb2xlIERlbWJlbCB8IOGKoOGJoOGIqeGItSDhiIXhipXhjLsgfCDhiabhiIwg4Yuw4Yid4Ymg4YiN!5e0!3m2!1sen!2set!4v1761551198126!5m2!1sen!2set"
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
            <div className="p-8 space-y-6 bg-gray-800 flex flex-col justify-center">
              

              <div className="bg-white rounded-xl p-4 border border-border shadow-md hover:shadow-orange-500/25 hover:border-orange-500/50 transition-all duration-300 transform hover:scale-105 relative z-10">
                <h3 className="font-bold text-lg text-foreground mb-2">Downtown Branch</h3>
                <p className="text-foreground/70 text-sm mb-1">456 Commerce Ave</p>
                <p className="text-foreground/70 text-sm mb-2">City, State 12346</p>
                <p className="text-primary font-semibold text-xs">Mon-Sat 10AM-7PM</p>
              </div>

              <div className="bg-white rounded-xl p-4 border border-border shadow-md hover:shadow-orange-500/25 hover:border-orange-500/50 transition-all duration-300 transform hover:scale-105 relative z-10">
                <h3 className="font-bold text-lg text-foreground mb-2">Tech Plaza</h3>
                <p className="text-foreground/70 text-sm mb-1">789 Innovation Blvd</p>
                <p className="text-foreground/70 text-sm mb-2">City, State 12347</p>
                <p className="text-primary font-semibold text-xs">Mon-Fri 9AM-6PM</p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-border shadow-md hover:shadow-orange-500/25 hover:border-orange-500/50 transition-all duration-300 transform hover:scale-105 relative z-10">
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
