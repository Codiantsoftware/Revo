import { Card, CardContent } from "@/components/admin-ui/card";
import { useQuery } from "@tanstack/react-query";
import { fetchStatsCards, type StatsCardData } from "@/services/api/mockApi";
import { Loader2, AlertCircle } from "lucide-react";

export const StatsCards = () => {
  const {
    data: statsData,
    isLoading,
    isError,
    error,
  } = useQuery<StatsCardData[]>({
    queryKey: ["statsCards"],
    queryFn: fetchStatsCards,
  });

  if (isLoading) {
    return (
      <>
        {[1, 2, 3].map((index) => (
          <Card key={index} className="shadow-lg rounded-2xl border-none">
            <CardContent className="px-8 py-6 h-full flex flex-col justify-center items-center min-h-[180px]">
              <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
              <p className="text-xs text-gray-500 mt-2">Loading stats...</p>
            </CardContent>
          </Card>
        ))}
      </>
    );
  }

  if (isError) {
    return (
      <>
        {[1, 2, 3].map((index) => (
          <Card key={index} className="shadow-lg rounded-2xl border-none">
            <CardContent className="px-8 py-6 h-full flex flex-col justify-center items-center min-h-[180px]">
              <AlertCircle className="w-6 h-6 text-red-500" />
              <p className="text-xs text-red-500 mt-2">
                {error instanceof Error
                  ? error.message
                  : "Failed to load stats"}
              </p>
            </CardContent>
          </Card>
        ))}
      </>
    );
  }

  return (
    <>
      {statsData?.map((stat, index) => (
        <Card key={index} className="shadow-lg rounded-2xl border-none">
          <CardContent className="px-8 py-6 h-full flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold tracking-widest text-black/40 uppercase">
                {stat.title}
              </span>
              <div
                className={`w-8 h-8 rounded-full ${stat.iconBg} flex items-center justify-center ${stat.iconColor}`}
              >
                {stat.icon}
              </div>
            </div>
            <div className="mt-8">
              <p className="text-3xl font-medium text-black mb-2 tracking-tight">
                {stat.value}
              </p>
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold text-black/50">
                  {stat.subtitle}
                </p>
                {stat.badgeText && (
                  <span
                    className={`${stat.badgeBg} ${stat.badgeColor} px-2 py-0.5 rounded-full text-[10px] font-bold`}
                  >
                    {stat.badgeText}
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};
