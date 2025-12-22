import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react"; // Removed useEffect!
import { fetchAdviceById, fetchAdviceByMood } from "../../../api/adviceApi";

// 1. Types
type ServiceSearch = {
  adviceId?: string;
  mood?: string;
};

export const Route = createFileRoute("/_main/services/")({
  validateSearch: (search: Record<string, unknown>): ServiceSearch => {
    return {
      adviceId: (search.adviceId as string) || undefined,
      mood: (search.mood as string) || undefined,
    };
  },
  component: ServicesPage,
});

function ServicesPage() {
  // 2. Get URL State
  const { adviceId, mood } = Route.useSearch();
  const navigate = Route.useNavigate();

  // 3. QUERIES (Driven by URL)
  const idQuery = useQuery({
    queryKey: ["advice", "id", adviceId],
    queryFn: () => fetchAdviceById(adviceId!),
    enabled: !!adviceId,
    retry: false,
  });

  const moodQuery = useQuery({
    queryKey: ["advice", "mood", mood],
    queryFn: () => fetchAdviceByMood(mood!),
    enabled: !!mood,
    retry: false,
  });

  // 4. Update function
  const updateSearch = (newParams: ServiceSearch) => {
    navigate({
      search: (prev) => ({ ...prev, ...newParams }),
    });
  };

  return (
    <div className="p-4 space-y-8">
      <h1 className="text-2xl font-bold">Advice Services</h1>

      {/* --- ID SECTION --- */}
      <div className="border p-4 rounded shadow-sm bg-white">
        <h2 className="font-bold mb-2">Search by ID</h2>
        {/* ✅ THE FIX: "SearchInput" Component 
           We isolate the input state so we can reset it with a 'key'
        */}
        <SearchInput
          key={adviceId || "empty-id"} // If URL changes, this component re-mounts!
          initialValue={adviceId || ""}
          placeholder="ID (e.g. 42)"
          onSearch={(val) => updateSearch({ adviceId: val })}
        />
        
        {idQuery.isLoading && <p className="mt-2 text-gray-500">Loading...</p>}
        {idQuery.data && (
          <div className="mt-2 p-2 bg-blue-50 border-l-4 border-blue-500">
            "{idQuery.data.slip.advice}"
          </div>
        )}
      </div>

      {/* --- MOOD SECTION --- */}
      <div className="border p-4 rounded shadow-sm bg-white">
        <h2 className="font-bold mb-2">Search by Mood</h2>
        <SearchInput
          key={mood || "empty-mood"} // If URL changes, this component re-mounts!
          initialValue={mood || ""}
          placeholder="Mood (e.g. love)"
          onSearch={(val) => updateSearch({ mood: val })}
          buttonColor="bg-green-600"
        />

        {/* Results */}
        {moodQuery.isLoading && <p className="mt-2 text-gray-500">Searching...</p>}
        {moodQuery.data && (
          <ul className="mt-2 space-y-2">
            {moodQuery.data.slips.map((slip) => (
              <li key={slip.id} className="p-2 bg-green-50 border-b">
                "{slip.advice}"
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// 5. HELPER COMPONENT (Keeps the main code clean)
// This handles the temporary "typing" state
function SearchInput({ 
  initialValue, 
  onSearch, 
  placeholder, 
  buttonColor = "bg-blue-600" 
}: { 
  initialValue: string; 
  onSearch: (val: string) => void; 
  placeholder: string;
  buttonColor?: string;
}) {
  const [value, setValue] = useState(initialValue);

  return (
    <div className="flex gap-2">
      <input
        className="border p-2 rounded"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        className={`${buttonColor} text-white px-4 py-2 rounded`}
        onClick={() => onSearch(value)}
      >
        Search
      </button>
    </div>
  );
}