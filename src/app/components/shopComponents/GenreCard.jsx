import Link from "next/link";

export default function GenreCard({ genre }) {
  const { name, description, image, bookCount, slug } = genre;

  return (
    <div className="genre-card group relative rounded-xl overflow-hidden min-h-[300px] border border-wood shadow-soft">
      <img
        src={image}
        alt={name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* dark gradient so text stays readable over any genre photo */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(100deg, rgba(30,20,15,0.94) 0%, rgba(30,20,15,0.65) 50%, rgba(30,20,15,0.25) 100%)",
        }}
      />

      <div className="relative z-10 flex flex-col justify-end h-full p-5 sm:p-6 max-w-[90%] sm:max-w-[70%]">
        <h3 className="font-display text-lg sm:text-2xl text-glow mb-2 break-words">
          {name}
        </h3>
        <p className="font-body text-[13px] sm:text-sm text-muted mb-4 leading-relaxed break-words">
          {description}
        </p>
        {bookCount != null && (
          <p className="font-body text-xs text-dim mb-4">{bookCount} books</p>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={`/shop/${slug}`}
            className="inline-flex items-center gap-2 w-fit px-4 sm:px-5 py-2 sm:py-2.5 rounded-md font-accent text-[13px] sm:text-sm bg-accent text-bg shadow-glow transition-shadow duration-300 group-hover:shadow-glow-lg whitespace-nowrap"
          >
            Shop {name}
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 w-fit px-4 sm:px-5 py-2 sm:py-2.5 rounded-md font-accent text-[13px] sm:text-sm border border-primary text-primary bg-transparent transition-colors duration-300 hover:bg-primary/10 whitespace-nowrap"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}