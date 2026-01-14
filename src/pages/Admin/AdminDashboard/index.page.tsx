import { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  ChevronUp,
  Bell,
  Search,
  RefreshCcw,
  Calendar,
  MoreHorizontal,
  File,
} from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

import { Calendar as CalendarComponent } from "@/components/admin-ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/admin-ui/popover";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/admin-ui/tabs";

import { ADMIN_IMAGE_URL } from "@/config";
import { useQuery } from "@tanstack/react-query";
import { fetchUserUpdates } from "@/services/api/mockApi";

import {
  ChatPanel,
  NeedsApprovalCard,
  PartnerFunnelCard,
  PayoutsCard,
  ProgramGrowthCard,
  StatsCards,
  UserUpdateCard,
} from "@/components/Admin/AdminUIElements";

function AdminDashboard() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState("Partners");
  const [subActiveTab, setSubActiveTab] = useState("Overview");
  const [isBreadcrumbOpen, setIsBreadcrumbOpen] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2023, 9, 1),
    to: new Date(2023, 9, 31),
  });
  const [isChatCollapsed, setIsChatCollapsed] = useState(
    typeof window !== "undefined" ? window.innerWidth > 767 : true
  );
  const prevWidth = useRef(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  const { data: updatesData } = useQuery({
    queryKey: ["userUpdates"],
    queryFn: fetchUserUpdates,
  });

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      if (currentWidth !== prevWidth.current) {
        prevWidth.current = currentWidth;
        // Only force update if crossing the 768px breakpoint to avoid overriding manual toggle on minor resizes
        const isDesktop = currentWidth > 767;
        setIsChatCollapsed(isDesktop);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Trigger chart resize when panel toggles
  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 350); // Wait for transition (~300ms) to complete
    return () => clearTimeout(timer);
  }, [isChatCollapsed]);

  return (
    <>
      <div className="container-fluid">
        <div className="bg-[#FAF9F9] 3xl:mx-[25px] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-gray-100 rounded-2xl  xl:rounded-full transition-all duration-300">
          <div className="px-2 py-2">
            <div className="flex items-center justify-between">
              <div
                className={`flex items-center gap-3 flex-1 transition-all duration-300 ${
                  isExpanded ? "flex-wrap" : "flex-nowrap overflow-hidden"
                }`}
              >
                {/* Header Section */}
                <div className="flex items-center gap-3 pl-2 pr-4 border-r border-gray-200 flex-shrink-0 min-w-fit">
                  <div className="w-9 h-9 rounded-full bg-[#18181b] flex items-center justify-center">
                    <Bell className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left leading-tight">
                    <h3 className="text-[11px] font-bold text-gray-900 uppercase tracking-widest">
                      LATEST
                    </h3>
                    <p className="text-[10px] text-gray-500 font-medium">
                      Updates
                    </p>
                  </div>
                </div>

                {/* Updates List */}
                <div
                  className={`flex items-center py-0.5 gap-2 ${
                    isExpanded ? "flex-wrap" : ""
                  } flex-1 overflow-hidden`}
                >
                  {updatesData?.map((item, index) => {
                    // Show first 6 items always.
                    // Show subsequent items only if expanded.
                    if (index >= 6 && !isExpanded) return null;

                    return (
                      <UserUpdateCard
                        key={index}
                        item={item}
                        adminImageUrl={ADMIN_IMAGE_URL}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Toggle Button */}
              <div className="pl-2">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm cursor-pointer"
                >
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2 3xl:px-[25px] 3xl:pb-3 pb-2 px-2 bg-[#fbfbf7] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)]">
          {/* Main Tabs Navigation */}
          <div className="flex items-center justify-between border-b border-gray-200 overflow-x-auto">
            <div className="flex items-center gap-1 justify-between mt-2 w-full">
              {[
                { title: "Performance", subtitle: "$334.4k" },
                { title: "Social", subtitle: "24M Views" },
                { title: "Partners", subtitle: "400 rebates" },
                { title: "Campaigns", subtitle: "1500 review" },
                { title: "Content", subtitle: "30k assets" },
                { title: "Inbox", subtitle: "40 unreads" },
                { title: "Operations", subtitle: "12 Active" },
                { title: "Expenses", subtitle: "20 requests" },
              ].map((tab, index) => {
                const isActive = activeTab === tab.title;
                return (
                  <div
                    key={index}
                    onClick={() => setActiveTab(tab.title)}
                    className={`
                      flex flex-col flex-1 items-start justify-center xl:px-6 xl:py-3 px-4 py-2 h-full group rounded-t-2xl cursor-pointer transition-colors
                      ${
                        isActive
                          ? "bg-primary-300 pb-3 z-10"
                          : "hover:bg-primary-300"
                      }
                    `}
                  >
                    <span
                      className={`text-[15px] text-nowrap font-semibold transition-colors ${
                        isActive
                          ? "text-gray-900"
                          : "text-gray-500 group-hover:text-gray-900"
                      }`}
                    >
                      {tab.title}
                    </span>
                    <span
                      className={`text-[11px] transition-colors text-nowrap ${
                        isActive
                          ? "text-gray-700"
                          : "text-gray-400 group-hover:text-gray-700"
                      }`}
                    >
                      {tab.subtitle}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          {activeTab === "Partners" ? (
            <div className="bg-[#FBFBF9] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] rounded-[0px_0px_20px_20px]">
              <Tabs
                value={subActiveTab}
                onValueChange={(value: string) => setSubActiveTab(value)}
                className="w-full"
              >
                {/* Sub Navigation */}
                <div className="flex items-center border-b border-gray-200">
                  <TabsList className="bg-transparent h-auto p-0 flex items-center gap-6 px-4 overflow-x-auto w-full justify-start">
                    {[
                      "Overview",
                      "Database",
                      "Rebate Journey",
                      "Contracts",
                      "Retailers",
                    ].map((item) => (
                      <TabsTrigger
                        key={item}
                        value={item}
                        className={`
                          py-3 px-0 text-[13px] font-medium text-nowrap cursor-pointer border-b-2 transition-colors rounded-none
                          data-[state=active]:border-gray-900 data-[state=active]:text-gray-900 data-[state=active]:bg-transparent data-[state=active]:shadow-none
                          border-transparent text-gray-500 hover:text-gray-700
                        `}
                      >
                        {item}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>

                <TabsContent
                  value="Overview"
                  className="mt-0 focus-visible:outline-none focus-visible:ring-0"
                >
                  {/* Action Toolbar */}
                  <div className="flex flex-wrap items-center justify-between gap-4 xl:p-4 p-2">
                    {/* Left: Breadcrumb & Sync */}
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <button
                          onClick={() => setIsBreadcrumbOpen(!isBreadcrumbOpen)}
                          className="flex items-center cursor-pointer gap-2 border border-gray-100 rounded-full px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 shadow-sm transition-all"
                        >
                          <span>Partners</span>
                          <span className="text-gray-300">/</span>
                          <span>{subActiveTab}</span>
                          <ChevronDown
                            className={`w-3 h-3 text-gray-400 ml-1 transition-transform ${
                              isBreadcrumbOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {isBreadcrumbOpen && (
                          <>
                            <div
                              className="fixed inset-0 z-10"
                              onClick={() => setIsBreadcrumbOpen(false)}
                            ></div>
                            <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-100 rounded-xl shadow-lg z-20 overflow-hidden py-1">
                              {[
                                "Overview",
                                "Database",
                                "Rebate Journey",
                                "Contracts",
                                "Retailers",
                              ].map((item) => (
                                <button
                                  key={item}
                                  onClick={() => {
                                    setSubActiveTab(item);
                                    setIsBreadcrumbOpen(false);
                                  }}
                                  className={`w-full text-left cursor-pointer px-4 py-2 text-xs font-medium hover:bg-gray-50 transition-colors ${
                                    subActiveTab === item
                                      ? "text-gray-900 bg-gray-50"
                                      : "text-gray-600"
                                  }`}
                                >
                                  {item}
                                </button>
                              ))}
                            </div>
                          </>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span className="hidden sm:inline">
                          Last synced:{" "}
                          <span className="text-gray-600 font-medium">
                            Just now
                          </span>
                        </span>
                        <button className="p-1 hover:bg-gray-100 cursor-pointer rounded-full transition-colors">
                          <RefreshCcw className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Center: Search */}
                    <div className="flex-1 max-w-[750px] px-4">
                      <div className="relative group">
                        <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-gray-500 transition-colors" />
                        <input
                          type="text"
                          placeholder="Search Partners..."
                          className="w-full bg-transparent border-b border-gray-200 py-2 pl-6 pr-4 text-sm placeholder:text-gray-400 text-center focus:outline-none focus:ring-0 focus:border-gray-200 focus:shadow-none"
                        />
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex flex-wrap items-center gap-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <button className="flex items-center cursor-pointer gap-2 border border-gray-200 rounded-full px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 shadow-sm transition-all outline-none">
                            <Calendar className="w-3.5 h-3.5 text-gray-500" />
                            <span>
                              {date?.from ? (
                                date.to ? (
                                  <>
                                    {format(date.from, "LLL dd")} -{" "}
                                    {format(date.to, "LLL dd")}
                                  </>
                                ) : (
                                  format(date.from, "LLL dd")
                                )
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </span>
                            <ChevronDown className="w-3 h-3 text-gray-400 ml-1" />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="end">
                          <CalendarComponent
                            initialFocus
                            mode="range"
                            defaultMonth={date?.from}
                            selected={date}
                            onSelect={setDate}
                            numberOfMonths={2}
                          />
                        </PopoverContent>
                      </Popover>

                      <div className="h-4 w-[1px] bg-gray-300 mx-1"></div>

                      <button className="flex cursor-pointer items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 px-2 py-1.5 rounded-md hover:bg-gray-100 transition-colors">
                        <span>Filter</span>
                      </button>

                      <button className="flex cursor-pointer items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 px-2 py-1.5 rounded-md hover:bg-gray-100 transition-colors">
                        <span>Export</span>
                      </button>

                      <button className="flex cursor-pointer items-center justify-center w-7 h-7 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </TabsContent>

                {["Database", "Rebate Journey", "Contracts", "Retailers"].map(
                  (item) => (
                    <TabsContent
                      key={item}
                      value={item}
                      className="mt-0 focus-visible:outline-none focus-visible:ring-0"
                    >
                      <div className="flex flex-col items-center justify-center py-20 bg-[#FBFBF9] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] rounded-[0px_0px_20px_20px] text-gray-400">
                        <div className="bg-gray-100 p-4 rounded-full mb-3">
                          <File className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-sm font-semibold text-gray-900">
                          No Data Found
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          There is no information available for this section
                          yet.
                        </p>
                      </div>
                    </TabsContent>
                  )
                )}
              </Tabs>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 bg-[#FBFBF9] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] rounded-[0px_0px_20px_20px] text-gray-400">
              <div className="bg-gray-100 p-4 rounded-full mb-3">
                <File className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900">
                No Data Found
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                There is no information available for this section yet.
              </p>
            </div>
          )}
        </div>
        {activeTab === "Partners" && subActiveTab === "Overview" ? (
          <>
            <div
              className={`grid gap-4 mt-4 3xl:mx-[25px] lg:gap-6 transition-all duration-300 ${
                isChatCollapsed
                  ? "md:grid-cols-[1fr_80px] grid-cols-1"
                  : "3xl:grid-cols-[1fr_400px] lg:grid-cols-[1fr_300px] md:grid-cols-[1fr_260px] grid-cols-1"
              }`}
            >
              {/* Left Column */}
              <div className="grid grid-cols-12 gap-4 lg:gap-6">
                {/* Top Left - Needs Approval Section */}
                <div className="col-span-12">
                  <NeedsApprovalCard />
                </div>

                {/* Bottom Left - Payouts Last Quarter */}
                <div className="col-span-12 xl:col-span-6 2xl:col-span-5 3xl:col-span-4">
                  <PayoutsCard />
                </div>

                {/* Middle - Partner Funnel */}
                <div className="col-span-12 xl:col-span-6 2xl:col-span-7 3xl:col-span-8">
                  <PartnerFunnelCard />
                </div>

                {/* Bottom Stats Cards */}
                <div className="col-span-12 grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
                  <StatsCards />
                </div>

                {/* Program Growth Section */}
                <div className="col-span-12">
                  <ProgramGrowthCard />
                </div>
              </div>

              {/* Right Column - Chat/Notification Panel */}
              <ChatPanel
                isCollapsed={isChatCollapsed}
                onToggle={() => setIsChatCollapsed(!isChatCollapsed)}
              />
            </div>
          </>
        ) : (
          activeTab === "Partners" && (
            <div className="flex flex-col mt-4 3xl:mx-[25px] items-center justify-center py-10 text-gray-400">
              <div className="bg-gray-100 p-4 rounded-full mb-3">
                <File className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900">
                No Data Found
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                There is no information available for this section yet.
              </p>
            </div>
          )
        )}
      </div>
    </>
  );
}

export default AdminDashboard;
