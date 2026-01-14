import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/admin-ui/card";
import { Button } from "@/components/admin-ui/button";
import { Zap, Loader2, AlertCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchPartnerFunnel,
  type PartnerFunnelData,
} from "@/services/api/mockApi";

export const PartnerFunnelCard = () => {
  const {
    data: funnelData,
    isLoading,
    isError,
    error,
  } = useQuery<PartnerFunnelData>({
    queryKey: ["partnerFunnel"],
    queryFn: fetchPartnerFunnel,
  });

  if (isLoading) {
    return (
      <Card className="shadow-xl rounded-[32px] border-0 bg-primary-300 px-6 py-8 h-full">
        <CardContent className="flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-8 h-8 animate-spin text-black" />
            <p className="text-sm text-black/60">Loading funnel data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="shadow-xl rounded-[32px] border-0 bg-primary-300 px-6 py-8 h-full">
        <CardContent className="flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-2">
            <AlertCircle className="w-8 h-8 text-red-500" />
            <p className="text-sm text-red-500">
              {error instanceof Error
                ? error.message
                : "Failed to load funnel data"}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const funnelCategories = funnelData?.categories || [];
  const funnelValues = funnelData?.values || [];
  const colors = ["#AACA53", "#C2DF6D", "#E0F499", "#1B1917"];

  return (
    <Card className="shadow-xl rounded-[32px] border-0 bg-primary-300 px-6 py-8 h-full">
      <CardHeader className="flex flex-row items-center flex-wrap gap-2 justify-between space-y-0 !p-0">
        <div className="flex items-center gap-2">
          <span className="text-xl text-black">
            <Zap />
          </span>
          <CardTitle className="!mb-0 !text-lg font-bold text-black">
            Partner Funnel
          </CardTitle>
        </div>
        <div className="flex items-center flex-wrap gap-2">
          <Button
            variant="default"
            size="sm"
            className="bg-black text-white hover:bg-black rounded-full px-5 h-7 text-xs font-semibold border-0"
          >
            Last quarter
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="bg-[#C3DD5F] text-black hover:text-white hover:bg-black rounded-full px-5 h-7 text-xs font-semibold"
          >
            What has influenced
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="bg-[#C3DD5F] text-black hover:text-white hover:bg-black rounded-full px-5 h-7 text-xs font-semibold"
          >
            Forecast
          </Button>
        </div>
      </CardHeader>
      <CardContent className="!p-0 h-full flex flex-col justify-between">
        <div className="mb-12 mt-6">
          <div className="flex items-end gap-4 mb-2">
            <span className="3xl:text-[56px] text-5xl leading-none text-black -tracking-[2px]">
              {funnelData?.growthPercentage || "+37%"}
            </span>
            <p className="text-black text-xs font-semibold max-w-[120px] leading-snug">
              {funnelData?.growthDescription || "6,653 growth in closed sales"}
            </p>
          </div>
        </div>

        <div className="w-full mt-auto h-[200px] flex items-end justify-between gap-6 px-2 overflow-x-auto">
          {funnelValues.map((val, index) => {
            const maxVal = Math.max(...funnelValues);
            // Use a minimum height (e.g. 15%) so labels always fit nicely
            const heightPercentage = Math.max((val / maxVal) * 100, 20);
            const category = funnelCategories[index];

            return (
              <div
                key={index}
                className="flex flex-col items-start justify-end w-full h-full"
              >
                <div className="flex flex-col items-start mb-2 z-10">
                  <span className="text-2xl 3xl:text-3xl font-semibold tracking-tighter leading-none mb-1 text-[#1B1917]">
                    {val.toLocaleString()}
                  </span>
                  <span className="text-[10px] 3xl:text-xs font-bold uppercase tracking-widest text-[#1B1917]/60">
                    {category}
                  </span>
                </div>
                <div
                  className="w-full rounded-[24px] relative group transition-all duration-500 hover:brightness-105 cursor-pointer"
                  style={{
                    height: `${heightPercentage}%`,
                    backgroundColor: colors[index] || colors[0],
                  }}
                ></div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
