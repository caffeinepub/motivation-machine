import { Toaster } from "@/components/ui/sonner";
import { Copy, Quote, RefreshCw } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// ── Types ──────────────────────────────────────────────────────────────────────

type Category = "Discipline" | "Business" | "Fitness" | "Life" | "Stoic";
type FilterCategory = "All" | Category;

interface QuoteItem {
  text: string;
  author: string;
  category: Category;
}

// ── Data ───────────────────────────────────────────────────────────────────────

const QUOTES: QuoteItem[] = [
  // Discipline
  {
    text: "We must all suffer one of two things: the pain of discipline or the pain of regret.",
    author: "Jim Rohn",
    category: "Discipline",
  },
  {
    text: "Discipline is the bridge between goals and accomplishment.",
    author: "Jim Rohn",
    category: "Discipline",
  },
  {
    text: "It's not about having time. It's about making time.",
    author: "Unknown",
    category: "Discipline",
  },
  {
    text: "Success is nothing more than a few simple disciplines, practiced every day.",
    author: "Jim Rohn",
    category: "Discipline",
  },
  {
    text: "The secret of your future is hidden in your daily routine.",
    author: "Mike Murdock",
    category: "Discipline",
  },
  {
    text: "Great acts are made up of small deeds.",
    author: "Lao Tzu",
    category: "Discipline",
  },
  {
    text: "Motivation gets you going, but discipline keeps you growing.",
    author: "John C. Maxwell",
    category: "Discipline",
  },

  // Business
  {
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain",
    category: "Business",
  },
  {
    text: "Chase the vision, not the money. The money will end up following you.",
    author: "Tony Hsieh",
    category: "Business",
  },
  {
    text: "Your most unhappy customers are your greatest source of learning.",
    author: "Bill Gates",
    category: "Business",
  },
  {
    text: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
    category: "Business",
  },
  {
    text: "It's fine to celebrate success, but it is more important to heed the lessons of failure.",
    author: "Bill Gates",
    category: "Business",
  },
  {
    text: "If you are not embarrassed by the first version of your product, you've launched too late.",
    author: "Reid Hoffman",
    category: "Business",
  },
  {
    text: "The best way to predict the future is to create it.",
    author: "Peter Drucker",
    category: "Business",
  },

  // Fitness
  {
    text: "Take care of your body. It's the only place you have to live.",
    author: "Jim Rohn",
    category: "Fitness",
  },
  {
    text: "Physical fitness is not only one of the most important keys to a healthy body, it is the basis of dynamic and creative intellectual activity.",
    author: "John F. Kennedy",
    category: "Fitness",
  },
  {
    text: "The body achieves what the mind believes.",
    author: "Napoleon Hill",
    category: "Fitness",
  },
  {
    text: "To enjoy the glow of good health, you must exercise.",
    author: "Gene Tunney",
    category: "Fitness",
  },
  {
    text: "An early-morning walk is a blessing for the whole day.",
    author: "Henry David Thoreau",
    category: "Fitness",
  },
  {
    text: "A feeble body weakens the mind.",
    author: "Jean-Jacques Rousseau",
    category: "Fitness",
  },
  {
    text: "Strength does not come from physical capacity. It comes from an indomitable will.",
    author: "Mahatma Gandhi",
    category: "Fitness",
  },

  // Life
  {
    text: "In the middle of every difficulty lies opportunity.",
    author: "Albert Einstein",
    category: "Life",
  },
  {
    text: "The purpose of our lives is to be happy.",
    author: "Dalai Lama",
    category: "Life",
  },
  {
    text: "Life is what happens when you're busy making other plans.",
    author: "John Lennon",
    category: "Life",
  },
  {
    text: "Get busy living or get busy dying.",
    author: "Stephen King",
    category: "Life",
  },
  {
    text: "You only live once, but if you do it right, once is enough.",
    author: "Mae West",
    category: "Life",
  },
  {
    text: "In the end, it's not the years in your life that count. It's the life in your years.",
    author: "Abraham Lincoln",
    category: "Life",
  },
  {
    text: "The unexamined life is not worth living.",
    author: "Socrates",
    category: "Life",
  },

  // Stoic
  {
    text: "You have power over your mind, not outside events. Realize this, and you will find strength.",
    author: "Marcus Aurelius",
    category: "Stoic",
  },
  {
    text: "It is not the man who has too little, but the man who craves more, that is poor.",
    author: "Seneca",
    category: "Stoic",
  },
  {
    text: "We suffer more often in imagination than in reality.",
    author: "Seneca",
    category: "Stoic",
  },
  {
    text: "Waste no more time arguing about what a good man should be. Be one.",
    author: "Marcus Aurelius",
    category: "Stoic",
  },
  {
    text: "Make the best use of what is in your power, and take the rest as it happens.",
    author: "Epictetus",
    category: "Stoic",
  },
  {
    text: "The happiness of your life depends upon the quality of your thoughts.",
    author: "Marcus Aurelius",
    category: "Stoic",
  },
  {
    text: "He who fears death will never do anything worthy of a man who is alive.",
    author: "Seneca",
    category: "Stoic",
  },
];

// ── Category config ────────────────────────────────────────────────────────────

interface CategoryConfig {
  label: FilterCategory;
  accentColor: string;
  bgActive: string;
  borderActive: string;
  textActive: string;
}

const CATEGORIES: CategoryConfig[] = [
  {
    label: "All",
    accentColor: "oklch(0.97 0.01 260)",
    bgActive: "oklch(0.97 0.01 260)",
    borderActive: "oklch(0.97 0.01 260)",
    textActive: "oklch(0.13 0.01 260)",
  },
  {
    label: "Discipline",
    accentColor: "oklch(0.75 0.18 65)",
    bgActive: "oklch(0.75 0.18 65)",
    borderActive: "oklch(0.75 0.18 65)",
    textActive: "oklch(0.13 0.01 260)",
  },
  {
    label: "Business",
    accentColor: "oklch(0.72 0.15 225)",
    bgActive: "oklch(0.72 0.15 225)",
    borderActive: "oklch(0.72 0.15 225)",
    textActive: "oklch(0.13 0.01 260)",
  },
  {
    label: "Fitness",
    accentColor: "oklch(0.72 0.18 150)",
    bgActive: "oklch(0.72 0.18 150)",
    borderActive: "oklch(0.72 0.18 150)",
    textActive: "oklch(0.13 0.01 260)",
  },
  {
    label: "Life",
    accentColor: "oklch(0.72 0.18 310)",
    bgActive: "oklch(0.72 0.18 310)",
    borderActive: "oklch(0.72 0.18 310)",
    textActive: "oklch(0.13 0.01 260)",
  },
  {
    label: "Stoic",
    accentColor: "oklch(0.65 0.04 80)",
    bgActive: "oklch(0.65 0.04 80)",
    borderActive: "oklch(0.65 0.04 80)",
    textActive: "oklch(0.13 0.01 260)",
  },
];

// ── Helpers ────────────────────────────────────────────────────────────────────

function getFilteredQuotes(filter: FilterCategory): QuoteItem[] {
  if (filter === "All") return QUOTES;
  return QUOTES.filter((q) => q.category === filter);
}

function getRandomQuote(
  quotes: QuoteItem[],
  current: QuoteItem | null,
): QuoteItem {
  if (quotes.length === 1) return quotes[0];
  const options = current ? quotes.filter((q) => q !== current) : quotes;
  const pool = options.length > 0 ? options : quotes;
  return pool[Math.floor(Math.random() * pool.length)];
}

// ── App ────────────────────────────────────────────────────────────────────────

export default function App() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("All");
  const [currentQuote, setCurrentQuote] = useState<QuoteItem>(() =>
    getRandomQuote(QUOTES, null),
  );
  const [visible, setVisible] = useState(true);
  const isTransitioning = useRef(false);

  const activeCategoryConfig =
    CATEGORIES.find((c) => c.label === activeFilter) ?? CATEGORIES[0];

  const transitionToQuote = useCallback((newQuote: QuoteItem) => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    setVisible(false);
    setTimeout(() => {
      setCurrentQuote(newQuote);
      setVisible(true);
      isTransitioning.current = false;
    }, 300);
  }, []);

  const handleNewQuote = useCallback(() => {
    const pool = getFilteredQuotes(activeFilter);
    const next = getRandomQuote(pool, currentQuote);
    transitionToQuote(next);
  }, [activeFilter, currentQuote, transitionToQuote]);

  const handleFilterChange = useCallback(
    (filter: FilterCategory) => {
      if (filter === activeFilter) return;
      setActiveFilter(filter);
      const pool = getFilteredQuotes(filter);
      const next = getRandomQuote(pool, null);
      transitionToQuote(next);
    },
    [activeFilter, transitionToQuote],
  );

  const handleCopy = useCallback(async () => {
    const text = `"${currentQuote.text}" — ${currentQuote.author}`;
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard");
    } catch {
      toast.error("Failed to copy");
    }
  }, [currentQuote]);

  // Keyboard shortcut: Space = new quote
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === "Space" && e.target === document.body) {
        e.preventDefault();
        handleNewQuote();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleNewQuote]);

  const accentColor = activeCategoryConfig.accentColor;

  return (
    <div
      className="min-h-dvh flex flex-col items-center justify-between"
      style={{ backgroundColor: "oklch(0.13 0.01 260)" }}
    >
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "oklch(0.22 0.01 260)",
            color: "oklch(0.97 0.01 260)",
            border: "1px solid oklch(0.3 0.01 260)",
            fontFamily: "inherit",
          },
        }}
      />

      {/* Header */}
      <header className="w-full flex justify-center pt-10 pb-4 px-4">
        <div className="flex flex-col items-center gap-1">
          <div
            className="w-8 h-8 flex items-center justify-center"
            style={{ color: accentColor }}
          >
            <Quote size={28} strokeWidth={2.5} />
          </div>
          <h1
            className="text-sm font-bold tracking-[0.25em] uppercase"
            style={{ color: "oklch(0.55 0.02 260)" }}
          >
            Motivation Machine
          </h1>
        </div>
      </header>

      {/* Main content */}
      <main className="w-full flex-1 flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-[480px] flex flex-col items-center gap-10">
          {/* Category tabs */}
          <div className="w-full flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((cat, index) => {
              const isActive = cat.label === activeFilter;
              return (
                <button
                  key={cat.label}
                  type="button"
                  data-ocid={`category.tab.${index + 1}`}
                  onClick={() => handleFilterChange(cat.label)}
                  className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase transition-all duration-200 border"
                  style={
                    isActive
                      ? {
                          backgroundColor: cat.bgActive,
                          borderColor: cat.borderActive,
                          color: cat.textActive,
                        }
                      : {
                          backgroundColor: "transparent",
                          borderColor: "oklch(0.28 0.01 260)",
                          color: "oklch(0.55 0.02 260)",
                        }
                  }
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Quote card */}
          <div
            data-ocid="quote.card"
            className="w-full flex flex-col items-center gap-6 px-2"
            style={{
              opacity: visible ? 1 : 0,
              transition: "opacity 300ms ease",
            }}
          >
            {/* Category badge */}
            <span
              className="text-[10px] font-bold tracking-[0.3em] uppercase px-3 py-1 rounded-full border"
              style={{
                color: accentColor,
                borderColor: accentColor,
              }}
            >
              {currentQuote.category}
            </span>

            {/* Quote text */}
            <blockquote
              className="text-2xl sm:text-3xl font-bold text-center leading-snug"
              style={{ color: "oklch(0.97 0.01 260)" }}
            >
              &ldquo;{currentQuote.text}&rdquo;
            </blockquote>

            {/* Author */}
            <p
              className="text-sm font-medium tracking-widest uppercase"
              style={{ color: "oklch(0.55 0.02 260)" }}
            >
              — {currentQuote.author}
            </p>
          </div>

          {/* Actions */}
          <div className="w-full flex flex-col gap-3">
            {/* New Quote button */}
            <button
              type="button"
              data-ocid="quote.primary_button"
              onClick={handleNewQuote}
              className="w-full py-4 rounded-lg text-sm font-bold tracking-[0.15em] uppercase flex items-center justify-center gap-2 transition-opacity duration-150 active:opacity-80"
              style={{
                backgroundColor: accentColor,
                color: "oklch(0.13 0.01 260)",
              }}
            >
              <RefreshCw size={16} strokeWidth={2.5} />
              New Quote
            </button>

            {/* Copy button */}
            <button
              type="button"
              data-ocid="quote.secondary_button"
              onClick={handleCopy}
              className="w-full py-3 rounded-lg text-xs font-semibold tracking-[0.15em] uppercase flex items-center justify-center gap-2 border transition-all duration-150 hover:opacity-80 active:opacity-60"
              style={{
                backgroundColor: "transparent",
                borderColor: "oklch(0.28 0.01 260)",
                color: "oklch(0.55 0.02 260)",
              }}
            >
              <Copy size={14} strokeWidth={2} />
              Copy to Clipboard
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full flex justify-center py-8 px-4">
        <p
          className="text-[11px] tracking-wide"
          style={{ color: "oklch(0.35 0.01 260)" }}
        >
          © {new Date().getFullYear()}.{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:underline"
            style={{ color: "oklch(0.45 0.01 260)" }}
          >
            Built with ♥ using caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
