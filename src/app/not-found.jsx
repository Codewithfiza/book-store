import Link from "next/link";
import { BookOpenIcon, MagnifyingGlassIcon, HouseIcon } from "@phosphor-icons/react/dist/ssr";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg px-4 text-center">
      <div className="relative mb-6">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-wood bg-surface flex items-center justify-center shadow-glow">
          <BookOpenIcon size={40} className="text-primary" />
        </div>
        <div className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-bg border border-wood flex items-center justify-center">
          <MagnifyingGlassIcon size={18} className="text-dim" />
        </div>
      </div>

      <p className="font-display text-5xl sm:text-6xl text-glow mb-2">404</p>
      <h1 className="font-display text-xl sm:text-2xl text-foreground mb-3">
        This page seems to be missing from the shelf
      </h1>
      <p className="font-body text-sm sm:text-base text-dim max-w-md mb-8">
        We looked through every aisle of Scriptorium, but couldn't find the page you're after. It may have been moved, or never existed at all.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-md font-accent text-sm bg-accent text-bg shadow-glow transition-shadow duration-300 hover:shadow-glow-lg"
        >
          <HouseIcon size={18} />
          Back to Home
        </Link>
        <Link
          href="/shop"
          className="inline-flex items-center justify-center px-8 py-3 rounded-md font-accent text-sm border border-wood text-foreground hover:border-primary transition-colors duration-300"
        >
          Browse Books
        </Link>
      </div>
    </div>
  );
};

export default NotFound;