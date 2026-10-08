import React from 'react'
import Banner from '../components/offercomponents/Banner';
import OfferCard from '../components/offercomponents/OfferCard';




const OfferPage = async () => {
   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/books?onOffer=true`, {
    cache: 'no-store',
  });
  const offers = await res.json();

  return (

    <main className="bg-background min-h-screen">
        <Banner/>
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <h2 className="text-foreground font-display text-2xl md:text-3xl mb-8 text-center">
          Today's Best Deals
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {offers.map((offer) => (
            <OfferCard key={offer._id} offer={offer} />
          ))}
        </div>
      </section>
    </main>
  )
}

export default OfferPage;