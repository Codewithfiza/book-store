import BookDetail from '../../../components/Bookdetailcomponent/BookDetail';

const BookDetailPage = async ({ params }) => {
  const { genre, id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/books?genre=${genre}`,
    { cache: 'no-store' }
  );
  const genreBooks = await res.json();

  const book = genreBooks.find((b) => b.slug === id);

  if (!book) {
    return (
      <p className="text-center font-body text-dim py-20">
        Book not found.
      </p>
    );
  }

  return <BookDetail book={book} />;
};

export default BookDetailPage;