import axios from "axios";
import type { Note, NoteTag } from "../types/note";

const API_URL = "https://notehub-public.goit.study/api/notes";
const NOTEHUB_TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

export interface NotesResponse {
  notes: Note[];
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

export interface NewNoteData {
  title: string;
  content?: string;
  tag: NoteTag;
}

export async function fetchNotes(
  page: number,
  search: string
): Promise<NotesResponse> {
  const response = await axios.get<NotesResponse>(API_URL, {
    params: {
      page,
      perPage: 12,
      search,
    },
    headers: { Authorization: `Bearer ${NOTEHUB_TOKEN}` },
  });
  return response.data;
}

export async function createNote(noteContent: NewNoteData) {
  const response = await axios.post<Note>(API_URL, noteContent, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${NOTEHUB_TOKEN}`,
    },
  });

  return response.data;
}

export async function deleteNote(noteID: string) {
  await axios.delete<Note>(
    `https://notehub-public.goit.study/api/notes/${noteID}`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${NOTEHUB_TOKEN}`,
      },
    }
  );
}