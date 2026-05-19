import { motion } from "framer-motion";
import Badge from "../ui/Badge";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11 } },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const STATS = [
  { value: "12K+", label: "Happy customers" },
  { value: "320gsm", label: "Premium weight" },
  { value: "Free", label: "Returns always" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-primary flex items-center overflow-hidden">
      {/* Accent glow */}
      <div
        aria-hidden
        className="absolute right-0 top-1/4 w-[700px] h-[700px] rounded-full bg-accent/10 blur-3xl pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-6 items-center">
        {/* Left — content */}
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent mb-6"
          >
            <span className="w-8 h-px bg-accent" />
            New Season — SS26
          </motion.span>

          <motion.h1
            variants={item}
            className="font-display text-5xl sm:text-7xl lg:text-[5.5rem] font-extrabold leading-[0.9] tracking-tighter text-white text-balance"
          >
            WEAR THE
            <br />
            <span className="text-accent">STATE</span>MENT.
          </motion.h1>

          <motion.p variants={item} className="mt-6 text-zinc-400 text-lg leading-relaxed max-w-md">
            Premium heavyweight streetwear engineered for those who refuse to blend in. Designed
            in-house. Made to last.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
            <a
              href="#featured"
              className="inline-flex items-center justify-center gap-2 rounded-2xl font-medium px-8 py-4 text-base bg-accent text-white hover:bg-orange-600 active:bg-orange-700 transition-colors duration-150"
            >
              Shop Now
            </a>
            <a
              href="#categories"
              className="inline-flex items-center justify-center gap-2 rounded-2xl font-medium px-8 py-4 text-base border border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors duration-150"
            >
              Explore Looks
            </a>
          </motion.div>

          <motion.div variants={item} className="mt-14 flex items-center gap-10">
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <p className="text-2xl font-bold text-white font-display">{value}</p>
                <p className="text-xs text-zinc-500 mt-0.5">{label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — product image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden lg:block"
        >
          {/* Dot grid accent */}
          <div
            aria-hidden
            className="absolute -right-6 -top-6 w-28 h-28 opacity-20 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, #FF4D00 1px, transparent 1px)",
              backgroundSize: "12px 12px",
            }}
          />

          <div className="relative rounded-3xl overflow-hidden aspect-[3/4] max-w-sm ml-auto">
            <img
              src="https://picsum.photos/seed/threadly-hero/720/960"
              alt="Threadly hero product"
              className="w-full h-full object-cover"
            />

            {/* Floating product card */}
            <div className="absolute bottom-5 left-5 right-5 bg-primary/80 backdrop-blur-md rounded-2xl p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-zinc-400">New Drop</p>
                <p className="text-white font-semibold">The Drop Tee</p>
              </div>
              <div className="text-right">
                <p className="text-accent font-bold text-lg">$59</p>
                <Badge label="In Stock" variant="success" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-600"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
