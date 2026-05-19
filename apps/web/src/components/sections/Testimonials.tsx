import FadeUp from "../ui/FadeUp";

const TESTIMONIALS = [
  {
    id: "1",
    author: "Jordan Kim",
    location: "Seoul, KR",
    rating: 5,
    body: "The Drop Tee is genuinely the best heavyweight tee I've ever owned. The fit is perfect and the fabric gets better with every wash.",
    avatar: "https://i.pravatar.cc/64?img=11",
  },
  {
    id: "2",
    author: "Aisha Nkrumah",
    location: "London, UK",
    rating: 5,
    body: "Finally a brand that gets it. The oversized fit is chef's kiss and arrived in two days. Already ordered three more.",
    avatar: "https://i.pravatar.cc/64?img=47",
  },
  {
    id: "3",
    author: "Marco Ferretti",
    location: "Milan, IT",
    rating: 5,
    body: "Ordered the Abstract Series and couldn't be happier. People stop me on the street to ask where I got it.",
    avatar: "https://i.pravatar.cc/64?img=33",
  },
  {
    id: "4",
    author: "Yuki Tanaka",
    location: "Tokyo, JP",
    rating: 5,
    body: "The Tokyo Oversized fits exactly how streetwear should fit. Slept on brand — not for long.",
    avatar: "https://i.pravatar.cc/64?img=60",
  },
  {
    id: "5",
    author: "Sofia Reyes",
    location: "Mexico City, MX",
    rating: 5,
    body: "The Creator Pack Tee is a work of art. The orange colorway is fire. Worth every penny.",
    avatar: "https://i.pravatar.cc/64?img=5",
  },
  {
    id: "6",
    author: "Liam O'Brien",
    location: "Dublin, IE",
    rating: 4,
    body: "Solid quality and fast international shipping. The Core Black Tee is now a daily staple.",
    avatar: "https://i.pravatar.cc/64?img=68",
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i <= rating ? "#FF4D00" : "#e4e4e7"}
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({
  author,
  location,
  rating,
  body,
  avatar,
}: (typeof TESTIMONIALS)[number]) {
  return (
    <div className="flex-shrink-0 w-80 bg-white rounded-2xl p-6 shadow-sm border border-zinc-100">
      <Stars rating={rating} />
      <p className="mt-3 text-zinc-700 text-sm leading-relaxed">"{body}"</p>
      <div className="mt-5 flex items-center gap-3">
        <img
          src={avatar}
          alt={author}
          className="w-9 h-9 rounded-full object-cover"
          loading="lazy"
        />
        <div>
          <p className="text-sm font-semibold text-zinc-900">{author}</p>
          <p className="text-xs text-zinc-400">{location}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <FadeUp className="text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">
            Reviews
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 mt-1">
            What they say
          </h2>
        </FadeUp>
      </div>

      {/* Full-width marquee */}
      <div className="flex animate-marquee gap-6 w-max px-6">
        {doubled.map((t, i) => (
          <TestimonialCard key={`${t.id}-${i}`} {...t} />
        ))}
      </div>
    </section>
  );
}
