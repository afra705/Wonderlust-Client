import Navbar from "@/components/navbar";
import Banner from "@/components/banner";
import FeaturedDestinations from "@/components/featured-destinations";
import WhyChooseUs from "@/components/why-choose-us";
import Testimonials from "@/components/testimonials";
import Cta from "@/components/cta";
import Footer from "@/components/footer";

const HomePage = () => {
  return (
    <div>

      <Banner />
      <FeaturedDestinations />
      <WhyChooseUs />
      <Testimonials />
      <Cta />
      <Footer />
    </div>
  );
};

export default HomePage;
