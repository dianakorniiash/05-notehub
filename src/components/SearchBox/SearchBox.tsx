import css from "./SearchBox.module.css";

interface SearchBoxProps {
  value: string;
  onChange: (text: string) => void;
}

function SearchBox({ value, onChange }: SearchBoxProps) {
  return (
    <input
      type="text"
      className={css.input}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search notes"
    />
  );
}

export default SearchBox;