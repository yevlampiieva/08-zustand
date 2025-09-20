import { Metadata } from "next";
import { fetchNotes } from "@/lib/api";
import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import css from "./page.module.css";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = slug[0] === "All" ? "All" : `${slug[0]}`;

  return {
    title: `${category} notes list`,
    description: `Easy viewing of ${category} notes list, adding or deleting note`,
    openGraph: {
      title: `${category} notes list`,
      description: `Easy viewing of ${category} notes list, adding or deleting note`,
      url: `https://08-zustand-flame-five.vercel.app/notes/filter/${category}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "Notehub App",
        },
      ],
    },
  };
}

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function NotesFilterPage({ params }: Props) {
  const { slug } = await params;
  const category = slug[0] === "All" ? undefined : slug[0];

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", { query: "", page: 1, tag: category }],
    queryFn: () => fetchNotes("", 1, category),
  });

  return (
    <div className={css.app}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesClient tag={category} />
      </HydrationBoundary>
    </div>
  );
}
