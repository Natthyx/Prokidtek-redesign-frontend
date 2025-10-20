export default function AboutTeam() {
  const teamMembers = [
    {
      name: "John Smith",
      role: "Founder & CEO",
      bio: "20+ years of experience in technology leadership",
      image: "/professional-man-ceo.jpg",
    },
    {
      name: "Sarah Johnson",
      role: "Chief Technology Officer",
      bio: "Expert in innovative tech solutions and strategy",
      image: "/professional-woman-tech.jpg",
    },
    {
      name: "Michael Chen",
      role: "Head of Sales",
      bio: "Dedicated to building strong customer relationships",
      image: "/professional-man-sales.jpg",
    },
    {
      name: "Emily Rodriguez",
      role: "Customer Success Manager",
      bio: "Passionate about delivering exceptional service",
      image: "/professional-woman-service.jpg",
    },
    {
      name: "David Wilson",
      role: "Lead Developer",
      bio: "Full-stack developer with expertise in modern technologies",
      image: "/professional-man-ceo.jpg",
    },
    {
      name: "Lisa Park",
      role: "Marketing Director",
      bio: "Creative strategist focused on brand growth and engagement",
      image: "/professional-woman-tech.jpg",
    },
    {
      name: "Robert Taylor",
      role: "Operations Manager",
      bio: "Ensures smooth operations and efficient processes",
      image: "/professional-man-sales.jpg",
    },
    {
      name: "Maria Garcia",
      role: "HR Director",
      bio: "Building and nurturing our talented team culture",
      image: "/professional-woman-service.jpg",
    },
  ]

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-foreground">Our Leadership Team</h2>
          <p className="text-lg text-foreground/70">Meet the experts behind ProKidTek</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-all duration-300 shadow-md hover:shadow-orange-500/25 hover:border-orange-500/50 hover:scale-105"
            >
              <div className="h-48 bg-gradient-to-br from-primary to-accent overflow-hidden">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg text-foreground mb-1">{member.name}</h3>
                <p className="text-primary font-semibold mb-3">{member.role}</p>
                <p className="text-foreground/70 text-sm">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
