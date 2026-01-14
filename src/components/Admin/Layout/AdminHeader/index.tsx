import { Link } from "react-router-dom";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/admin-ui/breadcrumb";
import { Input } from "@/components/admin-ui/input";
import { Badge } from "@/components/admin-ui/badge";
import { Search, Printer, Menu } from "lucide-react";

export function AdminHeader() {
  return (
    <header
      className={`fixed 3xl:px-[66px] 3xl:py-[15px] px-5 py-3 top-0 left-0 right-0 w-full z-20 bg-[#F9F7F5] transition-all duration-300 shadow-[0_0_0.4rem_rgba(0,0,0,0.05)]`}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-5">
          <div role="button" className="text-lg cursor-pointer">
            <Menu />
          </div>
          <span className="h-[24px] w-[1px] bg-[#E2E2EA] inline-block"></span>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="#">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-bold text-[#14151A]">
                  Overview
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex items-center gap-5 justify-between">
          <div className="hidden xl:block">
            <h1 className="3xl:text-2xl xl:text-xl text-base font-medium text-black">
              Welcome back, Combina
            </h1>
          </div>
          <div className="xl:w-[380px] w-full">
            <Input
              type="text"
              placeholder="Search across campaigns, partners, or assets..."
              icon={<Search />}
              iconPosition="left"
              className="border-0 border-b border-[#E2E2EA] h-[40px] rounded-none pl-10 focus:!shadow-none focus:border-b-[#E2E2EA] focus:border-[#E2E2EA] text-sm placeholder:text-[#92929D]"
            />
          </div>
          <div className="sm:flex hidden items-center 3xl:gap-3 gap-2">
            <button className="flex cursor-pointer items-center justify-center xl:w-8 xl:h-8 w-6 h-6 text-[#B5B5BE] bg-[#F1F1F5] rounded-full hover:bg-[#E2E2EA] transition-colors">
              <Printer className="xl:w-5 xl:h-5 w-3 h-3" />
            </button>
            <Badge
              variant="dim"
              className="px-3 py-1 xl:h-8 h-6 rounded-2xl bg-[#FCFCFD] border border-[#F1F1F5] text-[#44444F] font-normal gap-2"
            >
              <span className="text-[#92929D] font-bold uppercase text-[11px] tracking-wider">
                NAME:
              </span>
              <span className="font-bold text-[#44444F]">Velto</span>
            </Badge>
            <Badge
              variant="dim"
              className="px-3 py-1 xl:h-8 h-6 rounded-2xl bg-[#FCFCFD] border border-[#F1F1F5] text-[#44444F] font-normal gap-2"
            >
              <span className="text-[#92929D] font-bold uppercase text-[11px] tracking-wider">
                ID:
              </span>
              <span className="font-bold text-[#44444F]">5732</span>
            </Badge>
            <Badge
              variant="dimSuccess"
              className="px-3 py-1 xl:h-8 h-6 rounded-2xl border-none font-normal gap-2 bg-[#DFF9E8] text-[#DFF9E8]"
            >
              <span className="text-[#34C759] font-bold uppercase text-[11px] tracking-wider opacity-60">
                STATUS:
              </span>
              <span className="font-bold text-[#447461]">In progress</span>
            </Badge>
          </div>
        </div>
      </div>
    </header>
  );
}
