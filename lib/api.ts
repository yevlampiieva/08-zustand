import axios from "axios";
import { Note } from "@/types/note";

interface fetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface newNote {
  title: string;
  content?: string;
  tag: "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";
}

export const fetchNotes = async (
  query: string,
  page: number,
  tag?: string
): Promise<fetchNotesResponse> => {
  const response = await axios.get<fetchNotesResponse>(
    `https://notehub-public.goit.study/api/notes`,
    {
      params: {
        search: query,
        page,
        perPage: 12,
        tag,
      },
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    }
  );
  return response.data;
};

export const createNote = async (newNote: newNote): Promise<Note> => {
  const response = await axios.post<Note>(`https://notehub-public.goit.study/api/notes`, newNote, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await axios.delete<Note>(`https://notehub-public.goit.study/api/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await axios.get<Note>(`https://notehub-public.goit.study/api/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });
  return response.data;
};
