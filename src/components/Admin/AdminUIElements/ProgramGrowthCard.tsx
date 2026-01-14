import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/admin-ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/admin-ui/tabs";
import { useQuery } from "@tanstack/react-query";
import {
  fetchProgramGrowth,
  type ProgramGrowthData,
} from "@/services/api/mockApi";
import { Loader2, AlertCircle } from "lucide-react";

export const ProgramGrowthCard = () => {
  const {
    data: programGrowthData,
    isLoading,
    isError,
    error,
  } = useQuery<ProgramGrowthData>({
    queryKey: ["programGrowth"],
    queryFn: fetchProgramGrowth,
  });

  if (isLoading) {
    return (
      <Card className="shadow-lg rounded-2xl border-none px-6 py-8">
        <CardContent className="flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            <p className="text-sm text-gray-500">Loading program growth...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="shadow-lg rounded-2xl border-none px-6 py-8">
        <CardContent className="flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-2">
            <AlertCircle className="w-6 h-6 text-red-500" />
            <p className="text-sm text-red-500">
              {error instanceof Error
                ? error.message
                : "Failed to load program growth"}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg rounded-2xl border-none px-6 py-8">
      <Tabs defaultValue="application" className="w-full">
        <CardHeader className="flex flex-row flex-wrap gap-2 items-start justify-between !p-0 space-y-0">
          <div>
            <CardTitle className="!mb-0 !text-lg font-bold text-black">
              Program Growth
            </CardTitle>
            <p className="text-xs text-black/40 font-semibold">
              New partner acquisition breakdown
            </p>
          </div>
          <TabsList className="bg-[#F2F0EE] p-1 rounded-full h-auto">
            {(["application", "product", "campaign"] as const).map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="px-4 py-1.5 rounded-full text-[10px] font-bold tracking-wide uppercase transition-colors !border-none data-[state=active]:bg-white data-[state=active]:shadow-none data-[state=active]:text-black text-black/40 hover:text-black h-auto"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </CardHeader>
        <CardContent className="!p-0">
          {(["application", "product", "campaign"] as const).map((tab) => (
            <TabsContent
              key={tab}
              value={tab}
              className="mt-0 focus-visible:outline-none focus-visible:ring-0"
            >
              <div className="flex items-center gap-3 mb-10 mt-6">
                <span className="3xl:text-[56px] text-5xl font-medium text-black -tracking-[2px] leading-none">
                  {programGrowthData?.[tab]?.total || "+0"}
                </span>
                <div className="flex items-center gap-1.5 bg-[#E2F7E6] px-2.5 py-1 rounded-full">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#22C55E"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                    <polyline points="17 6 23 6 23 12" />
                  </svg>
                  <span className="text-[11px] font-bold text-[#22C55E]">
                    This Month
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {programGrowthData?.[tab]?.items.map((item) => (
                  <div key={item.name}>
                    <div className="flex justify-between items-end mb-1">
                      <span className="text-sm font-bold text-black">
                        {item.name}
                      </span>
                      <span className="text-[10px] font-semibold text-black/40">
                        {item.count} Partners
                      </span>
                    </div>
                    <div className="h-2.5 w-full bg-[#F5F5F4] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${item.color}`}
                        style={{ width: item.width }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </CardContent>
      </Tabs>
    </Card>
  );
};
