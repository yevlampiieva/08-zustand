"use client";

import css from "./SearchBox.module.css";

interface SearchBoxProps {
  value: string;
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBox({ value, onSearch }: SearchBoxProps) {
  return (
    <input
      defaultValue={value}
      onChange={onSearch}
      className={css.input}
      type="text"
      placeholder="Search notes"
    />
  );
}
