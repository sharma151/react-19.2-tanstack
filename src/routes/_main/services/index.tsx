import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchAdviceById, fetchAdviceByMood } from "../../../api/adviceApi";

export const Route = createFileRoute("/_main/services/")({
  component: ServicesPage,
});

function ServicesPage() {
  // Inputs
  const [idInput, setIdInput] = useState("");
  const [moodInput, setMoodInput] = useState("");

  // Triggers (These control when the query runs)
  const [selectedId, setSelectedId] = useState("");
  const [selectedMood, setSelectedMood] = useState("");

  // 1. Direct Query for ID
  const idQuery = useQuery({
    queryKey: ["advice", "id", selectedId],
    queryFn: () => fetchAdviceById(selectedId),
    enabled: !!selectedId, // Only run when ID is set
    retry: false,
  });

  // 2. Direct Query for Mood
  const moodQuery = useQuery({
    queryKey: ["advice", "mood", selectedMood],
    queryFn: () => fetchAdviceByMood(selectedMood),
    enabled: !!selectedMood,
    retry: false,
  });

  return (
    <div className="p-4 space-y-8">
      <h1 className="text-2xl font-bold">Advice Services</h1>

      <div className="border p-4 rounded shadow-sm bg-white">
        <h2 className="font-bold mb-2">Search by ID</h2>
        <div className="flex gap-2">
          <input
            className="border p-2 rounded"
            placeholder="ID (e.g. 42)"
            value={idInput}
            onChange={(e) => setIdInput(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => setSelectedId(idInput)}
          >
            Get Advice
          </button>
        </div>

        {/* Results */}
        {idQuery.isLoading && <p>Loading...</p>}
        {idQuery.isError && (
          <p className="text-red-500">{idQuery.error.message}</p>
        )}
        {idQuery.data && (
          <div className="mt-2 p-2 bg-blue-50 border-l-4 border-blue-500">
            "{idQuery.data.slip.advice}"
          </div>
        )}
      </div>

      {/* --- Search by Mood --- */}
      <div className="border p-4 rounded shadow-sm bg-white">
        <h2 className="font-bold mb-2">Search by Mood</h2>
        <div className="flex gap-2">
          <input
            className="border p-2 rounded"
            placeholder="Mood (e.g. love)"
            value={moodInput}
            onChange={(e) => setMoodInput(e.target.value)}
          />
          <button
            className="bg-green-600 text-white px-4 py-2 rounded"
            onClick={() => setSelectedMood(moodInput)}
          >
            Search
          </button>
        </div>

        {/* Results */}
        {moodQuery.isLoading && <p>Searching...</p>}
        {moodQuery.isError && (
          <p className="text-red-500">{moodQuery.error.message}</p>
        )}
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
