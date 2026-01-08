import React, { useEffect, useState } from "react";

interface Person {
  id: string;
  name: string;
  phone: string;
  avatar_image: string;
  avatar_origin: string;
  email: string;
  quote: string;
  chuck: string;
  birthday: number;
  address: Address;
}

interface Address {
  city: string;
  street: string;
  country: string;
}

const Search: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch people JSON from GitHub
  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const res = await fetch(
          "https://raw.githubusercontent.com/AmarShaked/angular-interview-2/refs/heads/main/src/data/people.json"
        );
        const data = await res.json();
        setPeople(data.slice(0, 100));
        console.log(people);
      } catch (error) {
        console.error("Failed to fetch people", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPeople();
  }, []);

  // Filter people
  const filtered = people.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  const highlightMatch = (text: string, search: string) => {
    if (!search) return text;

    const regex = new RegExp(`(${search})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, i) =>
      part.toLowerCase() === search.toLowerCase() ? (
        <mark key={i} className="bg-yellow-300">
          {part}
        </mark>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  return (
    <div className="p-4 max-w-lg mx-auto space-y-4">
      <h2 className="text-xl font-semibold">People Search</h2>

      <input
        type="text"
        placeholder="Search by name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border px-3 py-2 rounded w-full"
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-3">
          {filtered.length > 0 ? (
            filtered.map((person) => (
              <li
                key={person.id}
                className="border p-3 rounded shadow-sm bg-white"
              >
                <img
                  src={person.avatar_origin}
                  alt={person.name}
                  className="w-12 h-12 rounded-full object-cover border"
                />
                <strong>{highlightMatch(person.name, query)}</strong>
                <div>Email: {person.email}</div>
                <div>Phone: {person.phone}</div>
              </li>
            ))
          ) : (
            <p>No people found.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default Search;
