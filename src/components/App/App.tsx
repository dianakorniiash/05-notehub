import css from "./App.module.css";
import NoteList from "../NoteList/NoteList";
import { fetchNotes } from "../../services/noteService";
import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Pagination from "../Pagination/Pagination";
import SearchBox from "../SearchBox/SearchBox";
import { useDebouncedCallback } from "use-debounce";
import Modal from "../Modal/Modal";
import Loader from "../Loader/Loader";

function App() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  const debounced = useDebouncedCallback((value: string) => {
    setDebouncedQuery(value);
    setPage(1);
  }, 1000);

  const handleSearch = (text: string) => {
    setQuery(text);
    debounced(text);
  };

  const { data, isFetching } = useQuery({
    queryKey: ["notes", debouncedQuery, page],
    queryFn: () => fetchNotes(page, query),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={query} onChange={handleSearch} />
        <Pagination totalPages={totalPages} page={page} setPage={setPage} />
        <button onClick={openModal} className={css.button}>
          Create note +
        </button>
      </header>
      {isModalOpen && <Modal onClose={closeModal} />}
      <div style={{ position: "relative" }}>
        {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
        {isFetching && <Loader />}
      </div>
    </div>
  );
}

export default App;