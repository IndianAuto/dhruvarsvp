import { getAdminClient } from "@/lib/supabase";

interface RSVP {
  id: string;
  full_name: string;
  email: string;
  attending: boolean;
  guest_count: number;
  dietary_preferences: string[];
  dietary_other: string | null;
  arriving_by_air: boolean;
  airport: string | null;
  arrival_datetime: string | null;
  need_accommodation: boolean;
  check_in_date: string | null;
  check_out_date: string | null;
  notes: string | null;
  created_at: string;
}

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const supabase = getAdminClient();
  const { data: rsvps, error } = await supabase
    .from("rsvps")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-red-600 mb-4">
            Error Loading RSVPs
          </h1>
          <p className="text-gray-600">
            {error.message}. Make sure the database migration has been applied.
          </p>
        </div>
      </div>
    );
  }

  const allRsvps = (rsvps || []) as RSVP[];
  const attending = allRsvps.filter((r) => r.attending);
  const notAttending = allRsvps.filter((r) => !r.attending);
  const totalGuests = attending.reduce((sum, r) => sum + r.guest_count, 0);
  const flyingIn = attending.filter((r) => r.arriving_by_air);
  const needAccommodation = attending.filter((r) => r.need_accommodation);

  // Dietary breakdown
  const dietaryMap: Record<string, number> = {};
  attending.forEach((r) => {
    r.dietary_preferences?.forEach((d) => {
      dietaryMap[d] = (dietaryMap[d] || 0) + 1;
    });
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8" style={{ fontFamily: "var(--font-body)" }}>
      <div className="max-w-7xl mx-auto">
        <h1
          className="text-4xl font-bold mb-8"
          style={{ fontFamily: "var(--font-heading)", color: "#E31837" }}
        >
          Dhruva&apos;s Birthday - RSVPs
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <StatCard label="Total RSVPs" value={allRsvps.length} color="#1A1A1A" />
          <StatCard label="Attending" value={attending.length} color="#E31837" />
          <StatCard label="Total Guests" value={totalGuests} color="#FFC72C" />
          <StatCard label="Flying In" value={flyingIn.length} color="#E31837" />
          <StatCard
            label="Need Accommodation"
            value={needAccommodation.length}
            color="#1A1A1A"
          />
        </div>

        {/* Dietary Breakdown */}
        {Object.keys(dietaryMap).length > 0 && (
          <div className="bg-white rounded-xl shadow p-6 mb-8">
            <h2 className="text-lg font-bold mb-3">Dietary Preferences</h2>
            <div className="flex flex-wrap gap-2">
              {Object.entries(dietaryMap).map(([diet, count]) => (
                <span
                  key={diet}
                  className="px-3 py-1 rounded-full bg-red-50 text-red-700 text-sm font-semibold"
                >
                  {diet}: {count}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Attending Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden mb-8">
          <div className="px-6 py-4 bg-green-50 border-b">
            <h2 className="text-lg font-bold text-green-800">
              Attending ({attending.length})
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Email</th>
                  <th className="px-4 py-3 font-semibold">Guests</th>
                  <th className="px-4 py-3 font-semibold">Dietary</th>
                  <th className="px-4 py-3 font-semibold">Travel</th>
                  <th className="px-4 py-3 font-semibold">Accommodation</th>
                  <th className="px-4 py-3 font-semibold">Notes</th>
                  <th className="px-4 py-3 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {attending.map((rsvp) => (
                  <tr key={rsvp.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold">
                      {rsvp.full_name}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{rsvp.email}</td>
                    <td className="px-4 py-3 text-center">{rsvp.guest_count}</td>
                    <td className="px-4 py-3">
                      {rsvp.dietary_preferences?.join(", ") || "None"}
                      {rsvp.dietary_other && ` (${rsvp.dietary_other})`}
                    </td>
                    <td className="px-4 py-3">
                      {rsvp.arriving_by_air ? (
                        <div>
                          <span className="text-blue-600 font-semibold">Flying</span>
                          {rsvp.airport && <div className="text-xs text-gray-500">{rsvp.airport}</div>}
                          {rsvp.arrival_datetime && (
                            <div className="text-xs text-gray-500">
                              {new Date(rsvp.arrival_datetime).toLocaleString()}
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400">Local</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {rsvp.need_accommodation ? (
                        <div>
                          <span className="text-orange-600 font-semibold">Yes</span>
                          {rsvp.check_in_date && rsvp.check_out_date && (
                            <div className="text-xs text-gray-500">
                              {rsvp.check_in_date} to {rsvp.check_out_date}
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400">No</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-600 max-w-[200px] truncate">
                      {rsvp.notes || "-"}
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-xs">
                      {new Date(rsvp.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
                {attending.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-gray-400">
                      No RSVPs yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Not Attending */}
        {notAttending.length > 0 && (
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <div className="px-6 py-4 bg-gray-100 border-b">
              <h2 className="text-lg font-bold text-gray-600">
                Not Attending ({notAttending.length})
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="px-4 py-3 font-semibold">Name</th>
                    <th className="px-4 py-3 font-semibold">Email</th>
                    <th className="px-4 py-3 font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {notAttending.map((rsvp) => (
                    <tr key={rsvp.id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-3">{rsvp.full_name}</td>
                      <td className="px-4 py-3 text-gray-600">{rsvp.email}</td>
                      <td className="px-4 py-3 text-gray-400 text-xs">
                        {new Date(rsvp.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow p-4 text-center">
      <div className="text-3xl font-bold" style={{ color }}>
        {value}
      </div>
      <div className="text-xs text-gray-500 font-semibold mt-1">{label}</div>
    </div>
  );
}
