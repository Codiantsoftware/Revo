import { InfoIcon, CircleCheckIcon, Loader2, AlertCircle } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/admin-ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/admin-ui/card";
import { Button } from "@/components/admin-ui/button";
import { useQuery } from "@tanstack/react-query";
import {
  fetchApprovalRequests,
  type ApprovalRequest,
} from "@/services/api/mockApi";

// Helper function to get different avatar variant for each request
const getAvatarVariant = (index: number) => {
  const variants = [
    "lightPrimary",
    "lightSecondary",
    "lightSuccess",
    "lightWarning",
    "lightInfo",
    "lightDanger",
  ];
  return variants[index % variants.length];
};

export const NeedsApprovalCard = () => {
  const {
    data: approvalRequests,
    isLoading,
    isError,
    error,
  } = useQuery<ApprovalRequest[]>({
    queryKey: ["approvalRequests"],
    queryFn: fetchApprovalRequests,
  });

  return (
    <div className="border-s-5 border-warning-500 bg-[#FFFBEC] rounded-3xl p-4 shadow-sm">
      <CardHeader className="flex items-center justify-between !p-0">
        <div className="flex items-center gap-2">
          <div className="bg-warning-500/10 rounded-full size-10 flex items-center justify-center text-warning-500 border border-warning-500/30">
            <span className="text-xl">
              <InfoIcon />
            </span>
          </div>
          <div className="flex flex-col">
            <CardTitle className="!mb-0 md:!text-lg :!text-base font-bold">
              Needs Approval
            </CardTitle>
            <span className="text-xs md:text-sm text-dark-400 font-semibold">
              {isLoading
                ? "Loading..."
                : isError
                ? "Error loading requests"
                : `${
                    approvalRequests?.length || 0
                  } requests pending your review`}
            </span>
          </div>
        </div>
        <Button
          variant="default"
          size="sm"
          className="rounded-full bg-white text-[#CB7C2E] border border-warning-100"
        >
          APPROVE ALL
        </Button>
      </CardHeader>
      <CardContent className="!p-0 !pt-5">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 flex-wrap">
            {[1, 2, 3, 4].map((index) => (
              <Card
                key={index}
                className="shadow-sm border border-border flex-1 rounded-2xl"
              >
                <CardContent className="p-4 flex items-center justify-center min-h-[150px]">
                  <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center py-8">
            <AlertCircle className="w-8 h-8 text-red-500 mb-2" />
            <p className="text-sm text-red-500">
              {error instanceof Error
                ? error.message
                : "Failed to load approval requests"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 flex-wrap">
            {approvalRequests?.map((request, index) => (
              <Card
                key={request.id}
                className="shadow-sm border border-border flex-1 rounded-2xl"
              >
                <CardContent className="p-4">
                  <div className="flex flex-col items-start gap-3">
                    <div className="flex items-center gap-2 justify-between w-full">
                      <Avatar
                        size="xs"
                        variant={getAvatarVariant(index) as any}
                        {...({} as any)}
                      >
                        <AvatarFallback {...({} as any)}>
                          {request.initial}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-dark-400 font-semibold">
                        {request.time}
                      </span>
                    </div>
                    <div className="flex-1 w-full">
                      <p className="font-bold text-sm text-dark-500 mb-0.5 truncate">
                        {request.name}
                      </p>
                      <p className="text-xs text-dark-400 font-semibold mb-3 truncate">
                        {request.action}
                      </p>
                      <div className="flex items-center justify-between">
                        <Button
                          variant="light"
                          size="sm"
                          className="text-xs w-full rounded-xl bg-[#F5F5F4]"
                        >
                          <CircleCheckIcon className="w-4 h-4" /> Review
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </div>
  );
};
