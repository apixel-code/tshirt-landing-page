import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "../ui/Button";
import Input from "../ui/Input";
import FadeUp from "../ui/FadeUp";
import { useNewsletter } from "../../hooks/useNewsletter";

export default function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const { mutate, isPending, isSuccess, isError, error } = useNewsletter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    mutate(email);
  };

  return (
    <section className="bg-primary py-24 relative overflow-hidden">
      {/* Accent glow */}
      <div
        aria-hidden
        className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-accent/10 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-accent/5 blur-3xl pointer-events-none"
      />

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <FadeUp>
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">
            Stay Ahead
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white mt-2">
            Drop access,
            <br />
            first always.
          </h2>
          <p className="mt-4 text-zinc-400 text-lg leading-relaxed">
            Join 12,000+ members who get early access to new drops, exclusive discounts, and
            behind-the-scenes content.
          </p>
        </FadeUp>

        <FadeUp delay={0.15} className="mt-10">
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center gap-3 py-6"
              >
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FF4D00"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p className="text-white font-semibold text-lg">You're in the drop list.</p>
                <p className="text-zinc-400 text-sm">
                  Check your inbox for a welcome from Threadly.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-zinc-900 border-zinc-700 text-white placeholder-zinc-500 focus:border-accent"
                  required
                  aria-label="Email address"
                  error={
                    isError
                      ? ((error instanceof Error ? error.message : null) ?? "Something went wrong")
                      : undefined
                  }
                />
                <Button
                  type="submit"
                  size="md"
                  disabled={isPending}
                  className="whitespace-nowrap sm:self-start"
                >
                  {isPending ? "Joining…" : "Get Access"}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>

          <p className="mt-4 text-xs text-zinc-600">No spam. Unsubscribe at any time.</p>
        </FadeUp>
      </div>
    </section>
  );
}
