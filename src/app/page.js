
import Genre from "./components/homecomponents/Genre";
import { FeaturedBook } from "./components/homecomponents/FeaturedBook";
import Hero from "./components/homecomponents/Hero";
import Reviews from "./components/homecomponents/Reviews";
import {ReviewCarousel} from "./components/homecomponents/ReviewCarousel";
import FAQ from "./components/homecomponents/FAQ";
import OfferBanner from "./components/homecomponents/OfferBaner";



export default function Home() {
  return (
  <div>
   <Hero/>
  
   <Genre/>
    <OfferBanner/>
   <FeaturedBook/>
   <Reviews/>
   <FAQ/>
  
   
  </div>
  );
}
