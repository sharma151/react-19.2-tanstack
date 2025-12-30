import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchAdviceById, fetchAdviceByMood } from "@/api/adviceApi"; // Note the '@' alias
import { SearchInput } from "@/components/common/SearchInput"; // Use our new component

// Import Shadcn Card components for layout
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// 1. Types & Validation (Same as before)
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
  const { adviceId, mood } = Route.useSearch();
  const navigate = Route.useNavigate();

  // 2. Queries
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

  // 3. Update URL Helper
  const updateSearch = (newParams: ServiceSearch) => {
    navigate({
      search: (prev) => ({ ...prev, ...newParams }),
    });
  };

  return (
    <div className="container mx-auto p-8 space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Advice Services</h1>
        <p className="text-muted-foreground">
          Powered by TanStack Router & Shadcn UI
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* --- CARD 1: ID Search --- */}
        <Card>
          <CardHeader>
            <CardTitle>Get Specific Advice</CardTitle>
            <CardDescription>Enter an ID number (e.g., 42)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <SearchInput
              key={adviceId || "id-reset"} // Key resets component on URL change
              initialValue={adviceId || ""}
              placeholder="Advice ID..."
              onSearch={(val) => updateSearch({ adviceId: val })}
              className="bg-gray-400 cursor-pointer"
            />

            {/* Results Area */}
            {idQuery.isLoading && (
              <p className="text-sm text-muted-foreground animate-pulse">
                Fetching advice...
              </p>
            )}
            {idQuery.data && (
              <div className="rounded-md bg-primary/10 p-4 text-primary font-medium border border-primary/20">
                "{idQuery.data.slip.advice}"
              </div>
            )}
            {idQuery.isError && (
              <p className="text-sm text-destructive font-medium">
                Error: {idQuery.error.message}
              </p>
            )}
          </CardContent>
        </Card>

        {/* --- CARD 2: Mood Search --- */}
        <Card>
          <CardHeader>
            <CardTitle>Search by Mood</CardTitle>
            <CardDescription>
              Enter a topic (e.g., spiders, life)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <SearchInput
              key={mood || "mood-reset"}
              initialValue={mood || ""}
              placeholder="Mood..."
              buttonLabel="Find"
              onSearch={(val) => updateSearch({ mood: val })}
              className="bg-gray-600 cursor-pointer"
            />

            {/* Results Area */}
            {moodQuery.isLoading && (
              <p className="text-sm text-muted-foreground animate-pulse">
                Searching...
              </p>
            )}

            {moodQuery.data && (
              <div className="max-h-50 overflow-y-auto space-y-2 pr-2">
                <p className="text-xs text-muted-foreground">
                  Found {moodQuery.data.total_results} results
                </p>
                {moodQuery.data.slips.map((slip) => (
                  <div
                    key={slip.id}
                    className="rounded-md bg-muted p-3 text-sm"
                  >
                    "{slip.advice}"
                  </div>
                ))}
              </div>
            )}

            {moodQuery.isError && (
              <p className="text-sm text-destructive font-medium">
                {moodQuery.error.message}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
