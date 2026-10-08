import GenreShowcase from '@/app/components/ProductPageComponent/GenreShowcase';
import React from 'react'




const GenrePage = async ({params}) => {
const {genre} =await params;
 const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/books?genre=${genre}`, {
    cache: 'no-store',
  });
  const genreBooks = await res.json();
return(
 <>
 <GenreShowcase genre={genre}  books={genreBooks}/>
 </>
   
  
 
  );
}

export default GenrePage;