// components/SearchBar.js
export default function SearchBar({ value, onChange, placeholder , className}) {
    return (
      <div className="my-4 w-full">
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder || "Search topics or instructors"}
          className={`w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        />
      </div>
    );
  }
  