"use client"

import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"
import Image from "next/image"

export default function ClientLogos() {
  const [isVisible, setIsVisible] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const clients = [
    { name: "TechCorp", image: "/tech-company-logo.jpg" },
    { name: "InnovateLabs", image: "/innovation-lab-logo.jpg" },
    { name: "GlobalSystems", image: "/global-systems-logo.jpg" },
    { name: "FutureWorks", image: "/future-works-logo.jpg" },
    { name: "DataDrive", image: "/data-drive-logo.jpg" },
    { name: "CloudNine", image: "/cloud-nine-logo.jpg" },
    { name: "SmartSolutions", image: "/smart-solutions-logo.jpg" },
    { name: "NextGen", image: "/nextgen-logo.jpg" },
  ]

  const categories = [
    {
      name: "NGO & IO",
      companies: [
        "TechCorp",
        "InnovateLabs",
        "GlobalSystems",
        "FutureWorks",
        "DataDrive",
        "CloudNine",
        "SmartSolutions",
        "NextGen",
        "TechVision",
        "InnovatePro",
        "GlobalTech",
        "FutureScale",
      ],
    },
    {
      name: "University & Schools",
      companies: [
        "EduTech",
        "SchoolConnect",
        "AcademicHub",
        "LearnHub",
        "EduSmart",
        "SchoolPro",
        "AcademicPro",
        "LearnSmart",
        "EduConnect",
        "SchoolHub",
        "AcademicConnect",
        "LearnPro",
      ],
    },
    {
      name: "Government Office",
      companies: [
        "GovTech",
        "StateConnect",
        "CivicHub",
        "PublicPro",
        "GovSmart",
        "StateHub",
        "CivicPro",
        "PublicHub",
        "GovConnect",
        "StatePro",
        "CivicConnect",
        "PublicSmart",
      ],
    },
    {
      name: "Banks",
      companies: [
        "FinanceHub",
        "BankPro",
        "FinTech",
        "SecureBank",
        "FinancePro",
        "BankHub",
        "FinTechPro",
        "SecureHub",
        "FinanceConnect",
        "BankConnect",
        "FinTechHub",
        "SecurePro",
      ],
    },
    {
      name: "Embassies",
      companies: [
        "DiplomatHub",
        "EmbassyPro",
        "InternationalHub",
        "GlobalDiplomacy",
        "DiplomatPro",
        "EmbassyHub",
        "InternationalPro",
        "GlobalHub",
        "DiplomatConnect",
        "EmbassyConnect",
        "InternationalConnect",
        "GlobalPro",
      ],
    },
    {
      name: "Hotels",
      companies: [
        "HospitalityHub",
        "HotelPro",
        "TravelHub",
        "ResortPro",
        "HospitalityPro",
        "HotelHub",
        "TravelPro",
        "ResortHub",
        "HospitalityConnect",
        "HotelConnect",
        "TravelConnect",
        "ResortConnect",
      ],
    },
    {
      name: "Health Sector",
      companies: [
        "HealthHub",
        "MedicalPro",
        "ClinicalHub",
        "HealthcarePro",
        "HealthConnect",
        "MedicalHub",
        "ClinicalPro",
        "HealthcareHub",
        "HealthcarConnect",
        "MedicalConnect",
        "ClinicalConnect",
        "HealthPro",
      ],
    },
    {
      name: "Construction",
      companies: [
        "BuildHub",
        "ConstructPro",
        "EngineerHub",
        "ProjectPro",
        "BuildPro",
        "ConstructHub",
        "EngineerPro",
        "ProjectHub",
        "BuildConnect",
        "ConstructConnect",
        "EngineerConnect",
        "ProjectConnect",
      ],
    },
  ]

  const floatingClients = clients.slice(0, 5)

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {floatingClients.map((client, idx) => (
          <div
            key={`float-${idx}`}
            className="absolute w-20 h-20 rounded-full bg-primary/10 opacity-10 blur-xl animate-pulse"
            style={{
              left: `${10 + idx * 18}%`,
              top: `${20 + (idx % 2) * 30}%`,
              animation: `float ${4 + idx}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Featured Clients</h2>
          <p className="text-xl text-foreground/70">Trusted by leading companies worldwide</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {clients.map((client, idx) => (
            <div
              key={client.name}
              className={`bg-card rounded-2xl p-8 border-2 border-border hover:shadow-2xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 cursor-pointer group shadow-lg ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: `${idx * 50}ms`,
              }}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:shadow-lg group-hover:shadow-primary/50 transition-all duration-300 overflow-hidden">
                  <Image
                    src={client.image || "/placeholder.svg"}
                    alt={client.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">
                  {client.name}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mb-8">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-bold hover:bg-accent transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            List All Clients
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl p-12 border border-border/50">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">227+</div>
            <p className="text-foreground/70">Active Clients</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">98%</div>
            <p className="text-foreground/70">Satisfaction Rate</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">15+</div>
            <p className="text-foreground/70">Years Experience</p>
          </div>
        </div>
      </div>

      {/* Modal for all clients */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-primary/10 p-6 flex justify-between items-center rounded-t-3xl">
              <h2 className="text-2xl font-bold text-primary">All Clients by Category</h2>
              <button
                onClick={() => {
                  setIsModalOpen(false)
                  setSelectedCategory(null)
                }}
                className="text-2xl font-bold text-foreground hover:text-primary transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-8">
              {!selectedCategory ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      onClick={() => setSelectedCategory(category.name)}
                      className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl border-2 border-primary/20 hover:border-primary hover:shadow-lg transition-all duration-300 text-left group"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                          {category.name}
                        </h3>
                        <ChevronDown className="w-5 h-5 text-primary transform group-hover:translate-y-1 transition-transform" />
                      </div>
                      <p className="text-sm text-foreground/60 mt-2">{category.companies.length} companies</p>
                    </button>
                  ))}
                </div>
              ) : (
                <div>
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="mb-6 px-4 py-2 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-accent transition-all duration-300"
                  >
                    ← Back
                  </button>
                  <h3 className="text-2xl font-bold text-primary mb-6">{selectedCategory}</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {categories
                      .find((c) => c.name === selectedCategory)
                      ?.companies.map((company, idx) => (
                        <div
                          key={idx}
                          className="p-4 bg-card border-2 border-border rounded-xl hover:border-primary hover:shadow-lg transition-all duration-300"
                        >
                          <p className="font-semibold text-foreground">{company}</p>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }
      `}</style>
    </section>
  )
}
