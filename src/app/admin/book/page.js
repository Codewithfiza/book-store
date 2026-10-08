"use client";
import { useState, useEffect } from 'react';
import { TrashIcon, PencilSimpleIcon, StarIcon } from "@phosphor-icons/react";
import toast from 'react-hot-toast';

// one place for the empty form, reused for initial state, after submit, and on cancel
const emptyForm = {
  title: '',
  author: '',
  price: '',
  stock: '',
  image: '',
  description: '',
  slug: '',
  genre: '',
   onOffer: false,
  offerPrice: '',
};

const AdminBooksPage = () => {
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [featuredMap, setFeaturedMap] = useState({}); // { bookId: featuredDocId }

  const fetchBooks = async () => {
    setLoading(true);
    const res = await fetch('/api/books');
    const data = await res.json();
    setBooks(data);
    setLoading(false);
  };

  const fetchGenres = async () => {
    const res = await fetch('/api/genres');
    const data = await res.json();
    setGenres(data);
  };

  const fetchFeatured = async () => {
    const res = await fetch('/api/featured-books');
    const data = await res.json();
    const map = {};
    data.forEach((f) => {
      map[f.book._id] = f._id;
    });
    setFeaturedMap(map);
  };

  useEffect(() => {
    fetchBooks();
    fetchGenres();
    fetchFeatured();
  }, []);

  const handleChange = (e) => {
  const { name, value, type, checked } = e.target;
  setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editingId ? `/api/books/${editingId}` : '/api/books';
    const method = editingId ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      // form inputs give strings, so send price and stock as real numbers
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
         offerPrice: form.onOffer ? Number(form.offerPrice) : undefined,
      }),
    });

    if (res.ok) {
      toast.success(editingId ? 'Book updated' : 'Book created');
      setForm(emptyForm);
      setEditingId(null);
      fetchBooks();
    } else {
      const data = await res.json();
      toast.error(data.error || 'Something went wrong');
    }
  };

  const handleEdit = (book) => {
    setForm({
      title: book.title,
      author: book.author,
      price: book.price,
      stock: book.stock ?? 0, // older books may not have stock yet
      image: book.image || '',
      description: book.description || '',
      slug: book.slug,
      genre: book.genre?._id || '', // pull out just the id, since book.genre is a full populated object
        onOffer: book.onOffer ?? false,
    offerPrice: book.offerPrice ?? '',
    });
    setEditingId(book._id);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleDelete = async (book) => {
    const confirmed = window.confirm(`Delete "${book.title}"? This cannot be undone.`);
    if (!confirmed) return;

    const res = await fetch(`/api/books/${book._id}`, { method: 'DELETE' });

    if (res.ok) {
      toast.success(`Deleted "${book.title}"`);
      fetchBooks();
    } else {
      const data = await res.json();
      toast.error(data.error || 'Failed to delete');
    }
  };

  const toggleFeatured = async (book) => {
    const featuredDocId = featuredMap[book._id];

    if (featuredDocId) {
      const res = await fetch(`/api/featured-books/${featuredDocId}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success(`Removed "${book.title}" from featured`);
        setFeaturedMap((prev) => {
          const next = { ...prev };
          delete next[book._id];
          return next;
        });
      } else {
        toast.error('Failed to remove from featured');
      }
      return;
    }

    if (Object.keys(featuredMap).length >= 5) {
      toast.error('You can only feature up to 5 books — remove one first');
      return;
    }

    const res = await fetch('/api/featured-books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ book: book._id }),
    });
    const data = await res.json();

    if (res.ok) {
      toast.success(`Featured "${book.title}"`);
      setFeaturedMap((prev) => ({ ...prev, [book._id]: data._id }));
    } else {
      toast.error(data.error || 'Failed to feature book');
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 pt-28 sm:pt-32 pb-10 sm:pb-16">
      <h1 className="font-display text-xl sm:text-2xl md:text-3xl text-glow mb-4 sm:mb-8">
        Manage Books
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full border border-wood rounded-xl bg-surface p-3 sm:p-6 mb-6 sm:mb-10 flex flex-col gap-3 sm:gap-4"
      >
        <h2 className="font-display text-base sm:text-lg">
          {editingId ? 'Edit Book' : 'Add New Book'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            required
            className="w-full bg-bg border border-wood rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
          />
          <input
            name="author"
            value={form.author}
            onChange={handleChange}
            placeholder="Author"
            required
            className="w-full bg-bg border border-wood rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
          />
          <input
            name="price"
            type="number"
            min="0"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            required
            className="w-full bg-bg border border-wood rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
          />
          <input
            name="stock"
            type="number"
            min="0"
            step="1"
            value={form.stock}
            onChange={handleChange}
            placeholder="Stock quantity"
            required
            className="w-full bg-bg border border-wood rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
          />
          <input
            name="slug"
            value={form.slug}
            onChange={handleChange}
            placeholder="Slug (e.g. midnight-library)"
            required
            className="w-full bg-bg border border-wood rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
          />
        </div>

        {/* the genre dropdown — this is the connection point */}
        <select
          name="genre"
          value={form.genre}
          onChange={handleChange}
          required
          className="w-full bg-bg border border-wood rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
        >
          <option value="">Select a genre</option>
          {genres.map((g) => (
            <option key={g._id} value={g._id}>{g.name}</option>
          ))}
        </select>

        <label className="flex items-center gap-2 text-sm">
  <input
    type="checkbox"
    name="onOffer"
    checked={form.onOffer}
    onChange={handleChange}
  />
  On Offer
</label>

{form.onOffer && (
  <input
    name="offerPrice"
    type="number"
    min="0"
    value={form.offerPrice}
    onChange={handleChange}
    placeholder="Offer Price"
    required={form.onOffer}
    className="w-full bg-bg border border-wood rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
  />
)}




        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full bg-bg border border-wood rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          rows={3}
          className="w-full bg-bg border border-wood rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-primary resize-none"
        />

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 rounded-md font-accent text-sm bg-accent text-bg shadow-glow hover:shadow-glow-lg transition-shadow"
          >
            {editingId ? 'Update Book' : 'Add Book'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="w-full sm:w-auto px-6 py-2.5 rounded-md font-accent text-sm border border-wood text-foreground hover:border-primary transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <p className="text-dim text-sm">Loading books...</p>
      ) : books.length === 0 ? (
        <p className="text-dim text-sm">No books yet — add one above.</p>
      ) : (
        <div className="flex flex-col gap-2 sm:gap-3">
          {books.map((book) => {
            const stock = book.stock ?? 0;
            return (
              <div
                key={book._id}
                className="flex items-center gap-3 border border-wood rounded-lg bg-surface p-2.5 sm:p-4"
              >
                {book.image && (
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-12 h-14 sm:w-14 sm:h-16 rounded-md object-cover flex-shrink-0"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <p className="font-body text-sm sm:text-base text-foreground truncate">
                    {book.title}
                  </p>
                  <p className="text-xs text-dim truncate">
                    {book.author} · {book.genre?.name || 'No genre'} · Rs {book.price} ·{' '}
                    <span className={stock === 0 ? 'text-red-500' : ''}>
                      {stock === 0 ? 'Out of stock' : `Stock: ${stock}`}
                    </span>
                     {book.onOffer && (
    <span className="text-xs text-accent"> · On Offer: Rs {book.offerPrice}</span>
  )}
                  </p>
                </div>

                <div className="flex gap-2 sm:gap-3 flex-shrink-0">
                  <button
                    onClick={() => toggleFeatured(book)}
                    className={
                      featuredMap[book._id]
                        ? "text-accent transition-colors p-1"
                        : "text-dim hover:text-accent transition-colors p-1"
                    }
                    aria-label={featuredMap[book._id] ? "Remove from featured" : "Add to featured"}
                  >
                    <StarIcon size={18} weight={featuredMap[book._id] ? "fill" : "regular"} />
                  </button>
                  <button
                    onClick={() => handleEdit(book)}
                    className="text-dim hover:text-primary transition-colors p-1"
                    aria-label="Edit book"
                  >
                    <PencilSimpleIcon size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(book)}
                    className="text-dim hover:text-red-500 transition-colors p-1"
                    aria-label="Delete book"
                  >
                    <TrashIcon size={18} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminBooksPage;