import React from 'react'
import Banner from '../components/offercomponents/Banner';
import OfferCard from '../components/offercomponents/OfferCard';



const dummyOffers = [
  { id: "1", image: "/images/offercard.png", title: "The Silent Patient", price: 799, oldPrice: 1199, discount: 33 },
  { id: "2", image:"/images/offercard.png", title: "Atomic Habits", price: 999, oldPrice: 1499, discount: 33 },
  { id: "3", image: "/images/offercard.png", title: "It Ends With Us", price: 650, oldPrice: 950, discount: 32 },
  { id: "4", image: "/images/offercard.png", title: "Rich Dad Poor Dad", price: 550, oldPrice: 800, discount: 31 },
  { id: "5", image: "/images/offercard.png", title: "The Alchemist", price: 500, oldPrice: 750, discount: 33 },
  { id: "6", image: "/images/offercard.png", title: "Verity", price: 720, oldPrice: 1050, discount: 31 },
];

const OfferPage = () => {
  return (
    <main className="bg-background min-h-screen">
        <Banner/>
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <h2 className="text-foreground font-display text-2xl md:text-3xl mb-8 text-center">
          Today's Best Deals
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {dummyOffers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      </section>
    </main>
  )
}

export default OfferPage;