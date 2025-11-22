import BlurFade from "@/components/magicui/blur-fade";
import { getBlogPosts } from "@/data/blog";
import Link from "next/link";

export const metadata = {
  title: "Blog",
  description: "My thoughts on software development, life, and more.",
};

const BLUR_FADE_DELAY = 0.04;

// Dummy technical posts to display on the redesigned blog page.
const DUMMY_POSTS = [
  {
    slug: "nextjs-architecture",
    title: "Next.js Architecture: App Router Deep Dive",
    publishedAt: "2025-11-20",
    summary:
      "Explore the Next.js App Router, layouts, streaming, and best practices for building scalable apps.",
    sections: [
      {
        title: "Overview",
        body:
          "Next.js App Router introduces file-based routing, server components, and layout nesting to simplify complex UI structure.",
      },
      {
        title: "Layouts & Nesting",
        body:
          "Layouts let you persist UI across routes while only updating the part that changes. This reduces re-renders and improves UX.",
        diagram: "layout",
      },
      {
        title: "Streaming & Suspense",
        body:
          "Streaming allows progressively rendering parts of the page as they become ready, improving Time to First Byte perceived.",
        diagram: "stream",
      },
    ],
  },
  {
    slug: "react-patterns",
    title: "React Patterns: Composition over Inheritance",
    publishedAt: "2025-10-15",
    summary:
      "A practical guide to composition patterns in React: render props, hooks, and component composition.",
    sections: [
      {
        title: "Composition Basics",
        body:
          "Compose small stateless components to build complex UI while keeping logic reusable and testable.",
      },
      {
        title: "Custom Hooks",
        body:
          "Extract behavior into hooks to share logic without coupling components to implementation details.",
        diagram: "hooks",
      },
    ],
  },
];

function SmallDiagram({ type }: { type: string }) {
  // Simple inline SVG diagrams to avoid adding image assets.
  if (type === "layout") {
    return (
      <svg
        className="w-32 h-20 rounded-md bg-white/5 p-1"
        viewBox="0 0 120 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="2" y="2" width="116" height="76" rx="6" stroke="rgba(255,255,255,0.08)" />
        <rect x="6" y="6" width="40" height="28" rx="3" fill="rgba(255,255,255,0.03)" />
        <rect x="50" y="6" width="64" height="28" rx="3" fill="rgba(255,255,255,0.02)" />
        <rect x="6" y="38" width="108" height="36" rx="3" fill="rgba(255,255,255,0.02)" />
      </svg>
    );
  }

  if (type === "stream") {
    return (
      <svg
        className="w-32 h-20 rounded-md bg-white/5 p-1"
        viewBox="0 0 120 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="2" y="2" width="116" height="76" rx="6" stroke="rgba(255,255,255,0.08)" />
        <circle cx="30" cy="40" r="6" fill="rgba(255,255,255,0.06)" />
        <circle cx="54" cy="40" r="6" fill="rgba(255,255,255,0.04)" />
        <circle cx="78" cy="40" r="6" fill="rgba(255,255,255,0.03)" />
        <path d="M20 55h80" stroke="rgba(255,255,255,0.03)" strokeWidth={2} />
      </svg>
    );
  }

  if (type === "hooks") {
    return (
      <svg
        className="w-32 h-20 rounded-md bg-white/5 p-1"
        viewBox="0 0 120 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="2" y="2" width="116" height="76" rx="6" stroke="rgba(255,255,255,0.08)" />
        <rect x="10" y="14" width="30" height="22" rx="4" fill="rgba(255,255,255,0.03)" />
        <rect x="45" y="14" width="30" height="22" rx="4" fill="rgba(255,255,255,0.02)" />
        <rect x="80" y="14" width="30" height="22" rx="4" fill="rgba(255,255,255,0.01)" />
        <path d="M25 40h70" stroke="rgba(255,255,255,0.03)" strokeWidth={2} />
      </svg>
    );
  }

  return null;
}

export default async function BlogPage() {
  // Keep fetching any real posts in case other parts of the app need them.
  const posts = await getBlogPosts();

  return (
    <section>
      {/* Hero area with background visual and overlay description */}
      <div className="w-full rounded-lg overflow-hidden mb-8">
        <div className="relative bg-gradient-to-r from-indigo-600 via-sky-500 to-emerald-400 p-6 sm:p-12 rounded-lg text-white">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h1 className="font-semibold text-3xl sm:text-4xl tracking-tight mb-2">Thoughtful technical articles</h1>
              <p className="text-sm sm:text-base text-white/90 max-w-2xl">
                Deep dives, architecture notes and practical patterns for React and Next.js engineers. Read focused write-ups with diagrams and clear sub-sections.
              </p>
              <div className="mt-4 flex gap-3">
                <Link href="/blog" className="inline-block bg-white/10 hover:bg-white/20 px-4 py-2 rounded-md text-sm">Browse posts</Link>
                <a className="inline-block border border-white/20 px-4 py-2 rounded-md text-sm" href="#dummy">Try a sample</a>
              </div>
            </div>

            <div className="flex-1 hidden md:flex justify-center">
              <div className="w-full max-w-sm">
                <svg viewBox="0 0 400 300" className="w-full h-auto rounded-lg shadow-lg" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <defs>
                    <linearGradient id="g" x1="0" x2="1">
                      <stop offset="0" stopColor="#ffffff" stopOpacity="0.06" />
                      <stop offset="1" stopColor="#ffffff" stopOpacity="0.02" />
                    </linearGradient>
                  </defs>
                  <rect width="400" height="300" rx="12" fill="url(#g)" />
                  <g fill="none" stroke="#fff" strokeOpacity="0.08">
                    <rect x="20" y="20" width="140" height="60" rx="6" />
                    <rect x="180" y="20" width="200" height="60" rx="6" />
                    <rect x="20" y="100" width="360" height="160" rx="6" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dummy posts area */}
      <section id="dummy" className="space-y-10">
        {DUMMY_POSTS.map((p, idx) => (
          <article key={p.slug} className="bg-card/60 ring-1 ring-border rounded-lg p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="md:w-2/3">
                <h2 className="text-xl font-medium mb-2">{p.title}</h2>
                <p className="text-xs text-muted-foreground mb-4">{p.publishedAt} • {p.summary}</p>

                <div className="prose dark:prose-invert max-w-none">
                  {p.sections.map((s, i) => (
                    <section key={i} className="mb-6">
                      <h3 className="text-base font-semibold">{s.title}</h3>
                      <p className="text-sm text-muted-foreground">{s.body}</p>
                    </section>
                  ))}
                </div>
              </div>

              <div className="md:w-1/3 flex flex-col items-start gap-4">
                {p.sections.map((s, i) => (
                  <div key={i} className="flex items-center gap-4">
                    {s.diagram ? <SmallDiagram type={s.diagram} /> : <SmallDiagram type={i % 2 === 0 ? "layout" : "hooks"} />}
                    <div className="hidden sm:block">
                      <p className="text-sm font-medium">{s.title}</p>
                      <p className="text-xs text-muted-foreground">Short note</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              <Link href={`/blog/${p.slug}`} className="text-sm inline-block underline">Read full</Link>
              <span className="text-sm text-muted-foreground">• Preview content included</span>
            </div>
          </article>
        ))}
      </section>

      {/* Keep a minimal list of real posts for accessibility and SEO */}
      {/* <div className="mt-10">
        <BlurFade delay={BLUR_FADE_DELAY}>
          <h3 className="font-medium text-lg mb-4 tracking-tighter">All posts</h3>
        </BlurFade>
        {posts
          .sort((a, b) => {
            if (
              new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
            ) {
              return -1;
            }
            return 1;
          })
          .map((post, id) => (
            <BlurFade delay={BLUR_FADE_DELAY * 2 + id * 0.02} key={post.slug}>
              <Link
                className="flex flex-col space-y-1 mb-3"
                href={`/blog/${post.slug}`}
              >
                <div className="w-full flex flex-col">
                  <p className="tracking-tight">{post.metadata.title}</p>
                  <p className="h-5 text-xs text-muted-foreground">
                    {post.metadata.publishedAt}
                  </p>
                </div>
              </Link>
            </BlurFade>
          ))}
      </div> */}
    </section>
  );
}
