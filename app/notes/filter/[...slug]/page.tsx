import { fetchNotes } from "@/lib/api";
import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import css from "./page.module.css";

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
