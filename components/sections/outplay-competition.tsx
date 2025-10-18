"use client"

import { useState } from "react"

export default function OutplayCompetition() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const gamingLaptops = [
    {
      id: 1,
      name: "MSI Gaming Laptop",
      image: "/gaming-desktop-computer.jpg",
      screenContent: "nebula",
      keyboardColor: "rainbow",
      position: "left"
    },
    {
      id: 2,
      name: "ASUS TUF Gaming",
      image: "/gaming-desktop-tower.jpg",
      screenContent: "TUF",
      keyboardColor: "orange",
      position: "center-left"
    },
    {
      id: 3,
      name: "ASUS TUF Gaming Pro",
      image: "/gaming-desktop.jpg",
      screenContent: "TUF",
      keyboardColor: "orange",
      position: "center"
    },
    {
      id: 4,
      name: "Lenovo Legion",
      image: "/professional-laptop-computer.jpg",
      screenContent: "LEGION",
      keyboardColor: "purple",
      position: "center-right"
    },
    {
      id: 5,
      name: "MSI Gaming Pro",
      image: "/premium-gaming-laptop-computer.jpg",
      screenContent: "abstract",
      keyboardColor: "rainbow",
      position: "right"
    }
  ]

  return (
    <section className="py-20 px-4 bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="text-white">
            <h2 className="text-5xl font-bold mb-6 leading-tight">
              Outplay the Competition
            </h2>
            
            <p className="text-lg mb-6 leading-relaxed">
              Experience a 40% boost in computing from last generation. MSI Desktop equips the 10th Gen. Intel® Core™ i7 processor with the upmost computing power to bring you an unparalleled gaming experience.
            </p>
            
            <p className="text-sm text-gray-400 italic">
              *Performance compared to i7-9700. Specs varies by model.
            </p>
          </div>

          {/* Right Side - Gaming Laptops Display */}
          <div className="relative">
            <div className="relative h-96 flex items-center justify-center">
              {gamingLaptops.map((laptop, index) => {
                const getPositionClasses = () => {
                  switch (laptop.position) {
                    case "left":
                      return "absolute left-0 top-8 transform -rotate-12 scale-90 z-10"
                    case "center-left":
                      return "absolute left-8 top-4 transform -rotate-6 scale-95 z-20"
                    case "center":
                      return "absolute left-1/2 top-0 transform -translate-x-1/2 rotate-0 scale-100 z-30"
                    case "center-right":
                      return "absolute right-8 top-4 transform rotate-6 scale-95 z-20"
                    case "right":
                      return "absolute right-0 top-8 transform rotate-12 scale-90 z-10"
                    default:
                      return ""
                  }
                }

                return (
                  <div
                    key={laptop.id}
                    className={`${getPositionClasses()} transition-all duration-500 hover:scale-105 cursor-pointer`}
                  >
                    <div className="relative bg-black rounded-lg p-4 shadow-2xl">
                      {/* Laptop Screen */}
                      <div className="bg-gray-900 rounded-t-lg p-2 mb-2">
                        <div className="bg-black rounded h-32 w-48 flex items-center justify-center relative overflow-hidden">
                          {laptop.screenContent === "TUF" && (
                            <div className="text-4xl font-bold text-orange-400 transform -rotate-3">
                              TUF
                            </div>
                          )}
                          {laptop.screenContent === "LEGION" && (
                            <div className="text-3xl font-bold text-purple-400 transform -rotate-3">
                              LEGION
                            </div>
                          )}
                          {(laptop.screenContent === "nebula" || laptop.screenContent === "abstract") && (
                            <div className="w-full h-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 opacity-80"></div>
                          )}
                        </div>
                      </div>
                      
                      {/* Laptop Keyboard */}
                      <div className="bg-gray-800 rounded-b-lg p-2">
                        <div className="grid grid-cols-12 gap-1 h-8">
                          {Array.from({ length: 12 }).map((_, i) => (
                            <div
                              key={i}
                              className={`rounded ${
                                laptop.keyboardColor === "orange" 
                                  ? "bg-orange-400" 
                                  : laptop.keyboardColor === "purple"
                                  ? "bg-purple-400"
                                  : "bg-gradient-to-r from-red-400 via-yellow-400 to-blue-400"
                              }`}
                            ></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {[0, 1, 2].map((dot) => (
                <button
                  key={dot}
                  onClick={() => setCurrentSlide(dot)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentSlide === dot ? "bg-white" : "bg-gray-500"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
