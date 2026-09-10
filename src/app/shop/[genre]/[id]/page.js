import React from 'react'
import BookDetail from '../../../components/Bookdetailcomponent/BookDetail';


export const dummyBooks = [
  // Fiction
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    genre: "fiction",
    price: 14,
    image: "https://picsum.photos/seed/book1/400/600",
    slug: "midnight-library",
    description:
      "Between life and death there is a library, and within that library, the shelves go on forever. Nora Seed must decide which life is truly worth living.",
  },
  {
    id: 2,
    title: "Normal People",
    author: "Sally Rooney",
    genre: "fiction",
    price: 12,
    image: "https://picsum.photos/seed/book2/400/600",
    slug: "normal-people",
    description:
      "A story of mutual fascination, friendship, and love between two Irish teenagers that continues, on and off, into their years at university.",
  },

  // Self-Help
  {
    id: 3,
    title: "Atomic Habits",
    author: "James Clear",
    genre: "self-help",
    price: 16,
    image: "https://picsum.photos/seed/book3/400/600",
    slug: "atomic-habits",
    description:
      "A practical, proven framework for improving every day through tiny changes that compound into remarkable results over time.",
  },
  {
    id: 4,
    title: "The Power of Now",
    author: "Eckhart Tolle",
    genre: "self-help",
    price: 13,
    image: "https://picsum.photos/seed/book4/400/600",
    slug: "power-of-now",
    description:
      "A guide to spiritual enlightenment that teaches how to quiet the mind and find lasting peace by living fully in the present moment.",
  },

  // Academic
  {
    id: 5,
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    genre: "academic",
    price: 18,
    image: "https://picsum.photos/seed/book5/400/600",
    slug: "brief-history-time",
    description:
      "A landmark exploration of the universe's biggest questions — from the Big Bang to black holes — explained in accessible terms.",
  },
  {
    id: 6,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    genre: "academic",
    price: 17,
    image: "https://picsum.photos/seed/book6/400/600",
    slug: "sapiens",
    description:
      "A sweeping narrative of humankind's history, from the emergence of Homo sapiens to the cognitive, agricultural, and scientific revolutions.",
  },

  // Mystery
  {
    id: 7,
    title: "Gone Girl",
    author: "Gillian Flynn",
    genre: "mystery",
    price: 15,
    image: "https://picsum.photos/seed/book7/400/600",
    slug: "gone-girl",
    description:
      "On the morning of his fifth wedding anniversary, Nick's wife disappears. Under mounting pressure, his story begins to unravel.",
  },
  {
    id: 8,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    genre: "mystery",
    price: 14,
    image: "https://picsum.photos/seed/book8/400/600",
    slug: "silent-patient",
    description:
      "A woman shoots her husband and then never speaks another word. A psychotherapist becomes obsessed with uncovering why.",
  },

  // Romantic
  {
    id: 9,
    title: "It Ends With Us",
    author: "Colleen Hoover",
    genre: "romantic",
    price: 13,
    image: "https://picsum.photos/seed/book9/400/600",
    slug: "it-ends-with-us",
    description:
      "A powerful, honest love story that explores the devastating effect of domestic violence on a family passed on from generation to generation.",
  },
  {
    id: 10,
    title: "The Notebook",
    author: "Nicholas Sparks",
    genre: "romantic",
    price: 11,
    image: "https://picsum.photos/seed/book10/400/600",
    slug: "the-notebook",
    description:
      "An epic tale of love that spans decades, following two people who are separated by war and circumstance, but never truly apart.",
  },

  // Dark Fantasy
  {
    id: 11,
    title: "The Name of the Wind",
    author: "Patrick Rothfuss",
    genre: "dark-fantasy",
    price: 19,
    image: "https://picsum.photos/seed/book11/400/600",
    slug: "name-of-the-wind",
    description:
      "The story of Kvothe, a legendary figure recounting his own myth — from a magically gifted child to a notorious wizard.",
  },
  {
    id: 12,
    title: "The Priory of the Orange Tree",
    author: "Samantha Shannon",
    genre: "dark-fantasy",
    price: 20,
    image: "https://picsum.photos/seed/book12/400/600",
    slug: "priory-orange-tree",
    description:
      "A world divided by an ancient, slumbering dragon threatens to wake, and only an unlikely alliance can stop the coming darkness.",
  },

  // Comedy
  {
    id: 13,
    title: "Good Omens",
    author: "Terry Pratchett & Neil Gaiman",
    genre: "comedy",
    price: 14,
    image: "https://picsum.photos/seed/book13/400/600",
    slug: "good-omens",
    description:
      "An angel and a demon, both fond of life on Earth, team up to prevent the apocalypse — despite being on opposing sides.",
  },
  {
    id: 14,
    title: "The Hitchhiker's Guide to the Galaxy",
    author: "Douglas Adams",
    genre: "comedy",
    price: 12,
    image: "https://picsum.photos/seed/book14/400/600",
    slug: "hitchhikers-guide",
    description:
      "Moments after Earth is demolished for a hyperspace bypass, Arthur Dent finds himself hitchhiking across the galaxy with his alien friend Ford Prefect.",
  },
];

const BookDetailPage = async ({params}) => {
  const {genre, id} = await params;
  const book = dummyBooks.find((book)=>book.slug === id && book.genre === genre);
 
 if (!book) {
    return (
      <p className="text-center font-body text-dim py-20">
        Book not found.
      </p>
    );
  }

  return <BookDetail book={book}/>

}

export default BookDetailPage