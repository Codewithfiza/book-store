import OfferDetailClient from '@/app/components/offercomponents/OfferDetailClient';
import React from 'react'

const dummyOffers = [
  { id: "1", image: "/images/offercard.png", title: "The Silent Patient", price: 799, oldPrice: 1199, discount: 33 },
  { id: "2", image:"/images/offercard.png", title: "Atomic Habits", price: 999, oldPrice: 1499, discount: 33 },
  { id: "3", image: "/images/offercard.png", title: "It Ends With Us", price: 650, oldPrice: 950, discount: 32 },
  { id: "4", image: "/images/offercard.png", title: "Rich Dad Poor Dad", price: 550, oldPrice: 800, discount: 31 },
  { id: "5", image: "/images/offercard.png", title: "The Alchemist", price: 500, oldPrice: 750, discount: 33 },
  { id: "6", image: "/images/offercard.png", title: "Verity", price: 720, oldPrice: 1050, discount: 31 },
];

const OfferDetailPage = async({params}) => {
    const {id} = await params;
    const offer= dummyOffers.find((o)=>o.id === id);
 

     if (!offer) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-foreground text-lg">Offer not found.</p>
      </main>
    );
  }

  return <OfferDetailClient offer={offer}/>
}

export default OfferDetailPage;