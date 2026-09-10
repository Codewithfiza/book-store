"use client";
import React from 'react'

import { MagnifyingGlassIcon } from "@phosphor-icons/react";


const GenreSearchBar = ({query, setQuery, genreName}) => {
  return (
     <div className="w-full flex justify-center mb-8 sm:mb-10 px-4">
      <div className="relative w-full sm:w-[420px]">
        <MagnifyingGlassIcon
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-dim"
        />
         <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search in ${genreName}...`}
          className="w-full pl-10 pr-4 py-2.5 rounded-md border border-wood bg-surface font-body text-sm text-primary placeholder:text-dim focus:outline-none focus:ring-2 focus:ring-accent transition-shadow duration-300"
        />
      </div>
    </div>
  )
}

export default GenreSearchBar