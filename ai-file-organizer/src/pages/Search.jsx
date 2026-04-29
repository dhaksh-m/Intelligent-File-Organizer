import SearchBar from "../components/SearchBar";

export default function Search({ files }) {
  return (
    <>
      <h1>🔍 Search</h1>
      <SearchBar files={files} />
    </>
  );
}