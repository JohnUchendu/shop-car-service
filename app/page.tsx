import TopBar from "@/components/layout/TopBar"
import Header from "@/components/layout/Header"
import Navigation from "@/components/layout/Navigation"
// import Footer from "@/components/layout/Footer"
// import HeroCarousel from "@/components/home/HeroCarousel"
import CarSelector from "@/components/home/CarSelector"
// import CategoryCarousel from "@/components/home/CategoryCarousel"
// import FeaturedProducts from "@/components/home/FeaturedProducts"
// import PromoBanners from "@/components/home/PromoBanners"
// import ServicesSection from "@/components/home/ServicesSection"
// import BrandsSection from "@/components/home/BrandsSection"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      <Navigation />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            <div className="lg:col-span-1 order-2 lg:order-1">
              <CarSelector />
            </div>
            <div className="lg:col-span-3 order-1 lg:order-2">
              {/* <HeroCarousel /> */}
            </div>
          </div>

          {/* <CategoryCarousel /> */}
          {/* <FeaturedProducts /> */}
          {/* <PromoBanners /> */}
          {/* <ServicesSection /> */}
          {/* <BrandsSection /> */}
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  )
}