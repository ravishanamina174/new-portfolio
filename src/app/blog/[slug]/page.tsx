import { getBlogPosts, getPost } from "@/data/blog";
import Link from "next/link";
import { DATA } from "@/data/resume";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

// Dummy technical posts used for the redesigned blog flow.
const DUMMY_POSTS = [
  {
    slug: "nextjs-architecture",
    title: "Next.js Architecture: App Router Deep Dive",
    publishedAt: "2025-11-20",
    summary:
      "Explore the Next.js App Router, layouts, streaming, and best practices for building scalable apps.",
    gradient: "bg-gradient-to-r from-indigo-600 via-sky-500 to-emerald-400",
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
          "Streaming allows progressively rendering parts of the page as they become ready, improving perceived performance.",
        diagram: "stream",
      },
      {
        title: "Practical Tips",
        body:
          "Use route groups, carefully design data fetching boundaries, and prefer server components for heavy IO work.",
      },
    ],
  },
  {
    slug: "react-patterns",
    title: "React Patterns: Composition over Inheritance",
    publishedAt: "2025-10-15",
    summary:
      "A practical guide to composition patterns in React: render props, hooks, and component composition.",
    gradient: "bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-700",
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
      {
        title: "Patterns in Practice",
        body:
          "Combine hooks with context and higher-order utilities to build robust abstractions that stay testable.",
      },
      {
        title: "Performance",
        body:
          "Use memoization, avoid unnecessary context updates, and split rendering with virtualization where needed.",
      },
    ],
  },
];

function SmallDiagram({ type }: { type: string }) {
  if (type === "layout") {
    return (
      <svg className="w-full h-44 rounded-md p-2" viewBox="0 0 240 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g className="dark:hidden">
          <rect x="2" y="2" width="236" height="136" rx="8" fill="#ffffff" stroke="#e6e6e6" />
          <rect x="12" y="12" width="80" height="40" rx="6" fill="#eef2ff" />
          <rect x="104" y="12" width="124" height="40" rx="6" fill="#f1f5f9" />
          <rect x="12" y="64" width="216" height="64" rx="6" fill="#f1f5f9" />
        </g>
        <g className="hidden dark:block">
          <rect x="2" y="2" width="236" height="136" rx="8" stroke="rgba(255,255,255,0.06)" />
          <rect x="12" y="12" width="80" height="40" rx="6" fill="rgba(255,255,255,0.03)" />
          <rect x="104" y="12" width="124" height="40" rx="6" fill="rgba(255,255,255,0.02)" />
          <rect x="12" y="64" width="216" height="64" rx="6" fill="rgba(255,255,255,0.02)" />
        </g>
      </svg>
    );
  }

  if (type === "stream") {
    return (
      <svg className="w-full h-44 rounded-md p-2" viewBox="0 0 240 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g className="dark:hidden">
          <rect x="2" y="2" width="236" height="136" rx="8" fill="#ffffff" stroke="#e6e6e6" />
          <circle cx="48" cy="70" r="10" fill="#e6eef8" />
          <circle cx="96" cy="70" r="10" fill="#eef2ff" />
          <circle cx="144" cy="70" r="10" fill="#f1f5f9" />
          <path d="M20 110h200" stroke="#e6e6e6" strokeWidth={2} />
        </g>
        <g className="hidden dark:block">
          <rect x="2" y="2" width="236" height="136" rx="8" stroke="rgba(255,255,255,0.06)" />
          <circle cx="48" cy="70" r="10" fill="rgba(255,255,255,0.06)" />
          <circle cx="96" cy="70" r="10" fill="rgba(255,255,255,0.04)" />
          <circle cx="144" cy="70" r="10" fill="rgba(255,255,255,0.03)" />
          <path d="M20 110h200" stroke="rgba(255,255,255,0.03)" strokeWidth={2} />
        </g>
      </svg>
    );
  }

  if (type === "hooks") {
    return (
      <svg className="w-full h-44 rounded-md p-2" viewBox="0 0 240 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g className="dark:hidden">
          <rect x="2" y="2" width="236" height="136" rx="8" fill="#ffffff" stroke="#e6e6e6" />
          <rect x="18" y="20" width="48" height="34" rx="4" fill="#eef2ff" />
          <rect x="86" y="20" width="48" height="34" rx="4" fill="#f1f5f9" />
          <rect x="154" y="20" width="48" height="34" rx="4" fill="#f8fafc" />
          <path d="M30 70h180" stroke="#e6e6e6" strokeWidth={2} />
        </g>
        <g className="hidden dark:block">
          <rect x="2" y="2" width="236" height="136" rx="8" stroke="rgba(255,255,255,0.06)" />
          <rect x="18" y="20" width="48" height="34" rx="4" fill="rgba(255,255,255,0.03)" />
          <rect x="86" y="20" width="48" height="34" rx="4" fill="rgba(255,255,255,0.02)" />
          <rect x="154" y="20" width="48" height="34" rx="4" fill="rgba(255,255,255,0.01)" />
          <path d="M30 70h180" stroke="rgba(255,255,255,0.03)" strokeWidth={2} />
        </g>
      </svg>
    );
  }

  return null;
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  // Include any dummy slugs so they are statically generated
  const real = posts.map((post) => ({ slug: post.slug }));
  const dummy = DUMMY_POSTS.map((p) => ({ slug: p.slug }));
  const all = [...real, ...dummy];
  const map = new Map<string, { slug: string }>();
  all.forEach((a) => map.set(a.slug, a));
  return Array.from(map.values());
}

export async function generateMetadata({
  params,
}: {
  params: {
    slug: string;
  };
}): Promise<Metadata | undefined> {
  // Prefer real post metadata if available, otherwise fall back to dummy post
  const post = await getPost(params.slug).catch(() => null);
  if (post) {
    let {
      title,
      publishedAt: publishedTime,
      summary: description,
      image,
    } = post.metadata;
    let ogImage = image ? `${DATA.url}${image}` : `${DATA.url}/og?title=${title}`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "article",
        publishedTime,
        url: `${DATA.url}/blog/${post.slug}`,
        images: [
          {
            url: ogImage,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [ogImage],
      },
    };
  }

  const dummy = DUMMY_POSTS.find((d) => d.slug === params.slug);
  if (dummy) {
    const title = dummy.title;
    const description = dummy.summary;
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "article",
        publishedTime: dummy.publishedAt,
        url: `${DATA.url}/blog/${dummy.slug}`,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
    };
  }

  return undefined;
}

export default async function Blog({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  let post = await getPost(params.slug).catch(() => null);

  // If we have a real post, render it unchanged
  if (post) {
    return (
      <section id="blog">
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: post.metadata.title,
              datePublished: post.metadata.publishedAt,
              dateModified: post.metadata.publishedAt,
              description: post.metadata.summary,
              image: post.metadata.image
                ? `${DATA.url}${post.metadata.image}`
                : `${DATA.url}/og?title=${post.metadata.title}`,
              url: `${DATA.url}/blog/${post.slug}`,
              author: {
                "@type": "Person",
                name: DATA.name,
              },
            }),
          }}
        />
        <h1 className="title font-medium text-2xl tracking-tighter max-w-[650px]">
          {post.metadata.title}
        </h1>
        <div className="flex justify-between items-center mt-2 mb-8 text-sm max-w-[650px]">
          <Suspense fallback={<p className="h-5" />}>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {formatDate(post.metadata.publishedAt)}
            </p>
          </Suspense>
        </div>
        <article
          className="prose dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: post.source }}
        ></article>
      </section>
    );
  }

  // Otherwise render our richer dummy post layout
  const dummy = DUMMY_POSTS.find((d) => d.slug === params.slug);
  if (!dummy) {
    notFound();
  }

  return (
    <section id="blog" className="space-y-8">
      <div className={`w-full rounded-lg overflow-hidden ${dummy.gradient}`}>
        <div className="relative p-6 sm:p-12 rounded-lg text-white">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-6">
              <div className="absolute left-4 top-4">
                <Link href="/blog" className="inline-flex items-center gap-2 rounded-md bg-white/10 hover:bg-white/20 px-3 py-1 text-sm text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>Back</span>
                </Link>
              </div>
            <div className="flex-1">
              <h1 className="font-semibold text-3xl sm:text-4xl tracking-tight mb-2">{dummy.title}</h1>
              <p className="text-sm sm:text-base text-white/90 max-w-2xl">{dummy.summary}</p>
              <div className="mt-4 text-xs text-white/80">{formatDate(dummy.publishedAt)}</div>
            </div>

            <div className="flex-1 hidden md:flex justify-center">
              <div className="w-full max-w-2xl">
                <SmallDiagram type={dummy.sections[1]?.diagram ?? "layout"} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {dummy.sections.map((s, i) => (
          <section key={i} className="bg-card/60 ring-1 ring-border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">{s.title}</h2>
            <p className="text-sm text-muted-foreground mb-4">{s.body}</p>
            {s.diagram ? (
              <div className="rounded-md overflow-hidden">
                <SmallDiagram type={s.diagram} />
              </div>
            ) : null}
            <div className="mt-4 prose dark:prose-invert">
              <p>
                This section expands on the topic with example code, trade-offs and recommended
                patterns. Use this template to add additional paragraphs, lists and inline code.
              </p>
              <p>
                Example: Prefer composition and hooks to keep components small. When introducing
                server components, clearly separate data fetching boundaries from UI rendering.
              </p>
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
