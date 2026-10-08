import Genre from "./components/homecomponents/Genre";
import { FeaturedBook } from "./components/homecomponents/FeaturedBook";
import Hero from "./components/homecomponents/Hero";
import Reviews from "./components/homecomponents/Reviews";
import {ReviewCarousel} from "./components/homecomponents/ReviewCarousel";
import FAQ from "./components/homecomponents/FAQ";
import OfferBanner from "./components/homecomponents/OfferBaner";

export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/banner`, {
    cache: 'no-store',
  });
  const banner = await res.json();

  return (
  <div>
   <Hero/>

   <Genre/>
    {banner?.isCurrentlyVisible && <OfferBanner offer={banner} />}
   <FeaturedBook/>
   <Reviews/>
   <FAQ/>

  </div>
  );
}