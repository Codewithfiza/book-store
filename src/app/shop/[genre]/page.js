import GenreShowcase from '@/app/components/ProductPageComponent/GenreShowcase';
import React from 'react'


const dummyBooks = [
  { id: 1, title: "The Midnight Library", author: "Matt Haig", genre: "fiction", price: 14, image: "https://picsum.photos/seed/book1/400/600", slug: "midnight-library" },
  { id: 2, title: "Normal People", author: "Sally Rooney", genre: "fiction", price: 12, image: "https://picsum.photos/seed/book2/400/600", slug: "normal-people" },

  { id: 3, title: "Atomic Habits", author: "James Clear", genre: "self-help", price: 16, image: "https://picsum.photos/seed/book3/400/600", slug: "atomic-habits" },
  { id: 4, title: "The Power of Now", author: "Eckhart Tolle", genre: "self-help", price: 13, image: "https://picsum.photos/seed/book4/400/600", slug: "power-of-now" },

  { id: 5, title: "A Brief History of Time", author: "Stephen Hawking", genre: "academic", price: 18, image: "https://picsum.photos/seed/book5/400/600", slug: "brief-history-time" },
  { id: 6, title: "Sapiens", author: "Yuval Noah Harari", genre: "academic", price: 17, image: "https://picsum.photos/seed/book6/400/600", slug: "sapiens" },

  { id: 7, title: "Gone Girl", author: "Gillian Flynn", genre: "mystery", price: 15, image: "https://picsum.photos/seed/book7/400/600", slug: "gone-girl" },
  { id: 8, title: "The Silent Patient", author: "Alex Michaelides", genre: "mystery", price: 14, image: "https://picsum.photos/seed/book8/400/600", slug: "silent-patient" },

{ id: 9, title: "It Ends With Us", author: "Colleen Hoover", genre: "romantic", price: 13, image: "https://picsum.photos/seed/book9/400/600", slug: "it-ends-with-us" },
  { id: 10, title: "The Notebook", author: "Nicholas Sparks", genre: "romantic", price: 11, image: "https://picsum.photos/seed/book10/400/600", slug: "the-notebook" },

  { id: 11, title: "The Name of the Wind", author: "Patrick Rothfuss", genre: "dark-fantasy", price: 19, image: "https://picsum.photos/seed/book11/400/600", slug: "name-of-the-wind" },
  { id: 12, title: "The Priory of the Orange Tree", author: "Samantha Shannon", genre: "dark-fantasy", price: 20, image: "https://picsum.photos/seed/book12/400/600", slug: "priory-orange-tree" },

  { id: 13, title: "Good Omens", author: "Terry Pratchett & Neil Gaiman", genre: "comedy", price: 14, image: "https://picsum.photos/seed/book13/400/600", slug: "good-omens" },
  { id: 14, title: "The Hitchhiker's Guide to the Galaxy", author: "Douglas Adams", genre: "comedy", price: 12, image: "https://picsum.photos/seed/book14/400/600", slug: "hitchhikers-guide" },
];

const GenrePage = async ({params}) => {
const {genre} =await params;
const genreBooks = dummyBooks.filter((book)=> book.genre === genre);
  return (
 <>
 <GenreShowcase genre={genre}  books={genreBooks}/>
 </>
   
  
 
  );
}

export default GenrePage;