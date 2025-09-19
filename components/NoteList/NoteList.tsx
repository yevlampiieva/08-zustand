"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@/lib/api";
import Link from "next/link";
import { Note } from "@/types/note";
import toast, { Toaster } from "react-hot-toast";
import css from "./NoteList.module.css";

interface NoteListProps {
  items: Note[];
}

export default function NoteList({ items }: NoteListProps) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onSuccess() {
      toast.success("Your note has been deleted.");
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError() {
      toast.error("Sorry, something is wrong. Try again.");
    },
  });

  return (
    <>
      <ul className={css.list}>
        {items.map((item) => (
          <li key={item.id} className={css.listItem}>
            <h2 className={css.title}>{item.title}</h2>
            <p className={css.content}>{item.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{item.tag}</span>
              <Link href={`/notes/${item.id}`} className={css.button} scroll={false}>
                View details
              </Link>
              <button onClick={() => mutate(item.id)} className={css.button}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <Toaster position="top-right" />
    </>
  );
}
