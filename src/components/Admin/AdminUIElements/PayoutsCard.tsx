import Chart from "react-apexcharts";
import { Avatar, AvatarFallback } from "@/components/admin-ui/avatar";
import { Card, CardContent } from "@/components/admin-ui/card";
import { Zap, Loader2, AlertCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchPayouts, type PayoutsData } from "@/services/api/mockApi";

// Bar chart options for payouts
const getPayoutsChartOptions = (categories: string[]) => ({
  chart: {
    type: "bar" as const,
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      borderRadius: 12,
      columnWidth: "60%",
      distributed: true,
    },
  },
  fill: {
    opacity: 1,
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories,
    labels: {
      style: {
        colors: "#9ca3af",
        fontSize: "12px",
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    labels: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  grid: {
    show: false,
    borderColor: "#f1f1f1",
    strokeDashArray: 3,
    xaxis: {
      lines: {
        show: false,
      },
    },
    yaxis: {
      lines: {
        show: false,
      },
    },
  },
  colors: [
    "#E5E6EA",
    "#E5E6EA",
    "#E5E6EA",
    "#1B1917",
    "#1B1917",
    "#1B1917",
    "#1B1917",
    "#1B1917",
    "#dafe6b",
  ],
  tooltip: {
    enabled: false,
  },
  legend: {
    show: false,
  },
  states: {
    hover: {
      filter: {
        type: "none",
      },
    },
    active: {
      filter: {
        type: "none",
      },
    },
  },
});

export const PayoutsCard = () => {
  const {
    data: payoutsData,
    isLoading,
    isError,
    error,
  } = useQuery<PayoutsData>({
    queryKey: ["payouts"],
    queryFn: fetchPayouts,
  });

  if (isLoading) {
    return (
      <Card className="shadow-lg rounded-3xl p-5 h-full">
        <CardContent className="!p-0 flex flex-col h-full items-center justify-center min-h-[300px]">
          <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
          <p className="text-xs text-gray-500 mt-2">Loading payouts...</p>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="shadow-lg rounded-3xl p-5 h-full">
        <CardContent className="!p-0 flex flex-col h-full items-center justify-center min-h-[300px]">
          <AlertCircle className="w-6 h-6 text-red-500" />
          <p className="text-xs text-red-500 mt-2">
            {error instanceof Error ? error.message : "Failed to load payouts"}
          </p>
        </CardContent>
      </Card>
    );
  }

  const payoutsChartSeries = [
    {
      name: "Payouts",
      data: payoutsData?.chartData.values || [],
    },
  ];

  return (
    <Card className="shadow-lg rounded-3xl p-5 h-full">
      <CardContent className="!p-0 flex flex-col h-full">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="bg-white text-dark-500 px-2 py-1.5 rounded-full shadow-sm text-xs font-semibold flex items-center gap-1 border border-gray-100">
              <span>
                <Zap className="w-4 h-4" />
              </span>
              <span>Payouts last quarter</span>
            </span>
          </div>
          <Avatar size="xs" variant="lightWarning" {...({} as any)}>
            <AvatarFallback {...({} as any)}>W</AvatarFallback>
          </Avatar>
        </div>
        <div className="mb-2">
          <div className="flex items-baseline justify-between gap-3">
            <span className="3xl:text-5xl text-4xl font-semibold text-dark-500">
              {payoutsData?.percentage || "+350%"}
            </span>
            <span className="text-base font-bold text-dark-500">
              {payoutsData?.amount || "$2.5 m"}
            </span>
          </div>
        </div>
        <div className="flex-1 mt-auto">
          <Chart
            options={getPayoutsChartOptions(
              payoutsData?.chartData.categories || []
            )}
            series={payoutsChartSeries}
            type="bar"
          />
        </div>
      </CardContent>
    </Card>
  );
};
