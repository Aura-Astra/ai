'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, Menu, ShoppingCart, X, ChevronLeft, Eye } from 'lucide-react'

const products = [
  { id: 1, title: "Classic Kurta", description: "Elegant and comfortable", height: 300 },
  { id: 2, title: "Embroidered Sherwani", description: "Perfect for special occasions", height: 350 },
  { id: 3, title: "Silk Dhoti", description: "Traditional and stylish", height: 280 },
  { id: 4, title: "Designer Nehru Jacket", description: "Modern twist on a classic", height: 320 },
  { id: 5, title: "Festive Kurta Set", description: "Celebrate in style", height: 330 },
  { id: 6, title: "Wedding Sherwani", description: "Make your special day unforgettable", height: 360 },
]

const carouselItems = [
  { id: 1, title: "Exquisite Kurtas", description: "Discover our latest collection" },
  { id: 2, title: "Festive Wear", description: "Celebrate in style" },
  { id: 3, title: "Wedding Collection", description: "Make your special day unforgettable" },
]

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [hoveredProduct, setHoveredProduct] = useState(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselItems.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselItems.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + carouselItems.length) % carouselItems.length)
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${isScrolled ? 'bg-black bg-opacity-90' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tighter text-white">Ethnic Elegance</h1>
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              {['Home', 'Products', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-white hover:text-gray-300 transition-colors duration-300 ease-in-out">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon" className="text-white border-white hover:bg-white hover:text-black">
              <ShoppingCart className="h-6 w-6" />
              <span className="sr-only">Cart</span>
            </Button>
            <Button variant="outline" size="icon" className="md:hidden text-white border-white hover:bg-white hover:text-black" onClick={() => setIsMenuOpen(true)}>
              <Menu className="h-6 w-6" />
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween' }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-black p-6 text-white"
          >
            <div className="flex justify-end">
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                <X className="h-6 w-6" />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>
            <nav className="mt-8">
              <ul className="space-y-4">
                {['Home', 'Products', 'About', 'Contact'].map((item) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * ['Home', 'Products', 'About', 'Contact'].indexOf(item) }}
                  >
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="text-2xl font-semibold hover:text-gray-300 transition-colors duration-300 ease-in-out"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
          <div className="relative z-20 text-center text-white">
            <motion.h2
              key={carouselItems[currentSlide].id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-6xl font-bold mb-4"
            >
              {carouselItems[currentSlide].title}
            </motion.h2>
            <motion.p
              key={`desc-${carouselItems[currentSlide].id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8"
            >
              {carouselItems[currentSlide].description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button size="lg" className="bg-white text-black hover:bg-gray-200">
                Explore Collection
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
          <div className="absolute inset-0 z-0">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url('/placeholder.svg?height=1080&width=1920&text=Slide+${currentSlide + 1}')` }}
            ></motion.div>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 text-white border-white hover:bg-white hover:text-black"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Previous slide</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 text-white border-white hover:bg-white hover:text-black"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
            <span className="sr-only">Next slide</span>
          </Button>
        </section>

        <section id="products" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Collection</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-[200px]">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  className={`relative overflow-hidden ${index % 3 === 0 ? 'row-span-2' : ''}`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=300')] bg-cover bg-center transition-transform duration-300 ease-in-out hover:scale-110"></div>
                  <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 ease-in-out hover:bg-opacity-60"></div>
                  <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                    <h3 className="text-2xl font-bold mb-2">{product.title}</h3>
                    <p className="text-sm">{product.description}</p>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: hoveredProduct === product.id ? 1 : 0, y: hoveredProduct === product.id ? 0 : 20 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4"
                    >
                      <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                        View Details
                        <Eye className="ml-2 h-4 w-4" />
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white text-black">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-2">Phone: +91 93722 25533</p>
                <p>Email: info@ethnicelegance.com</p>
              </CardContent>
            </Card>
            <Card className="bg-white text-black">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Location</CardTitle>
              </CardHeader>
              <CardContent>
                <p>beside Saadgi, opp. Ricshaw Stand, Paithan Gate, Khokadpura, Circle, Chhatrapati Sambhajinagar (Aurangabad), Maharashtra 431001</p>
              </CardContent>
            </Card>
            <Card className="bg-white text-black">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-2">Tuesday-Sunday: 11 am–9 pm</p>
                <p>Monday: Closed</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </footer>
    </div>
  )
}
