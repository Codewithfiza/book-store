import OfferDetailClient from '@/app/components/offercomponents/OfferDetailClient';

const OfferDetailPage = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/books/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-foreground text-lg">Offer not found.</p>
      </main>
    );
  }

  const offer = await res.json();

  return <OfferDetailClient offer={offer} />;
};

export default OfferDetailPage;