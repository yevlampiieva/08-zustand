export interface Note {
  id: string;
  title: string;
  content: string;
  tag: "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";
  createdAt: string;
  updatedAt: string;
}

export type NewNoteData = {
  title: string;
  content?: string;
  tag: "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";
};
