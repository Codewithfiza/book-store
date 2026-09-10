// GenreType.jsx
"use client"

import { motion } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

const spring = {
  type: "spring",
  damping: 20,
  stiffness: 300,
}

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5)
}

export default function GenreType({ genres }) {
  const [order, setOrder] = useState(genres)

  useEffect(() => {
    const timeout = setTimeout(() => setOrder(shuffle(order)), 3000)
    return () => clearTimeout(timeout)
  }, [order])

  return (
    <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full max-w-5xl mx-auto list-none p-0 m-0">
      {order.map((genre, index) => (
        <motion.li
          key={genre.name}
          layout
          transition={spring}
          className="relative aspect-square rounded-2xl overflow-hidden group border border-[var(--color-wood)]"
        >
          <Link href={genre.href} className=" relative block w-full h-full">
            <Image
              src={genre.image}
              alt={genre.name}
              fill
              priority = {index === 0}
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/90 via-[var(--color-bg)]/20 to-transparent" />
            <span className="absolute bottom-3 left-3 right-3 md:bottom-4 md:left-4 md:right-4 font-[var(--font-display)] text-[var(--color-text)] text-base sm:text-lg md:text-xl lg:text-2xl font-semibold tracking-wide">
              {genre.name}
            </span>
          </Link>
        </motion.li>
      ))}
    </ul>
  )
}