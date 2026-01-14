import {
  ChevronRight,
  ChevronLeft,
  Send,
  ArrowRight,
  Sparkles,
  MessageSquare,
  Loader2,
  AlertCircle,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/admin-ui/avatar";
import { Button } from "@/components/admin-ui/button";
import { Textarea } from "@/components/admin-ui/textarea";
import { useQuery } from "@tanstack/react-query";
import { fetchChatMessages, type ChatMessage } from "@/services/api/mockApi";

// Helper function for avatar fallback
const getFallbackInitials = (name: string) => {
  return name.split(" ").length > 1
    ? `${name.split(" ")[0].charAt(0)}${name
        .split(" ")
        [name.split(" ").length - 1].charAt(0)}`
    : name.charAt(0);
};

interface ChatPanelProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const ChatPanel = ({ isCollapsed, onToggle }: ChatPanelProps) => {
  const {
    data: chatMessages,
    isLoading,
    isError,
    error,
  } = useQuery<ChatMessage[]>({
    queryKey: ["chatMessages"],
    queryFn: fetchChatMessages,
  });

  return (
    <div className="h-full">
      <div className="shadow-none bg-[#F0ECE9] !border-2 border-white/80 rounded-3xl overflow-hidden">
        <div className="py-5 flex flex-col h-full relative">
          {/* Collapse Toggle */}
          <div className="text-center md:block hidden">
            <Button
              variant="ghost"
              size="sm"
              className="h-10 w-10 rounded-full bg-white shadow-sm p-0 hover:bg-gray-50 border border-gray-100"
              onClick={onToggle}
            >
              {isCollapsed ? (
                <ChevronLeft className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronRight className="h-5 w-5 text-gray-400" />
              )}
            </Button>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] px-4">
              <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center h-full px-4">
              <AlertCircle className="w-6 h-6 text-red-500" />
              <p className="text-xs text-red-500 mt-2">
                {typeof error === "object" &&
                error !== null &&
                "message" in error
                  ? String((error as { message?: unknown }).message)
                  : "Failed to load messages"}
              </p>
            </div>
          ) : isCollapsed ? (
            /* Collapsed View */
            <div className="flex flex-col items-center gap-4 md:mt-6 w-full px-1">
              {chatMessages &&
                Array.isArray(chatMessages) &&
                (chatMessages as ChatMessage[]).map((message: ChatMessage) => (
                  <div
                    key={message.id}
                    className="relative group cursor-pointer"
                  >
                    <Avatar className="h-10 w-10 border-2 border-white rounded-xl">
                      <AvatarImage src={message.image} alt={message.name} />
                      <AvatarFallback>
                        {getFallbackInitials(message.name)}
                      </AvatarFallback>
                    </Avatar>
                    {message.badge && (
                      <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#C3DD5F] text-[10px] font-bold text-black border-2 border-[#f6f2f0]">
                        {message.badge}
                      </span>
                    )}
                    {/* Tooltip on hover for name - Optional polish */}
                  </div>
                ))}
              <div className="mt-auto mb-4">
                <Button
                  variant="ghost"
                  className="h-10 w-10 rounded-full bg-black text-white p-0 hover:bg-black/90"
                >
                  <Sparkles className="h-5 w-5" />
                </Button>
              </div>
            </div>
          ) : (
            /* Expanded View */
            <div className="h-full flex flex-col px-4">
              <div className="overflow-y-auto md:mt-8 pr-1 space-y-3 custom-scrollbar">
                {chatMessages &&
                  Array.isArray(chatMessages) &&
                  (chatMessages as ChatMessage[]).map(
                    (message: ChatMessage) => (
                      <div
                        key={message.id}
                        className="bg-[#F7F5F2] border-1 border-white p-4 rounded-2xl transition-shadow cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <Avatar
                              size="sm"
                              className="h-10 w-10 rounded-xl border-2 border-white"
                            >
                              <AvatarImage
                                src={message.image}
                                alt={message.name}
                              />
                              <AvatarFallback>
                                {getFallbackInitials(message.name)}
                              </AvatarFallback>
                            </Avatar>
                            {message.badge && (
                              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#C3DD5F] text-[10px] font-bold text-black border-2 border-white">
                                {message.badge}
                              </span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <p className="font-bold text-sm text-black">
                                {message.name}
                              </p>
                              <span className="text-[10px] font-medium text-gray-400">
                                {message.time}
                              </span>
                            </div>
                            <p className="text-xs text-black/70 leading-relaxed line-clamp-2 font-medium">
                              {message.message}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  )}
              </div>

              <div className="mt-6 space-y-3">
                <div className="relative bg-[#FBF9F7] rounded-xl ">
                  <Textarea
                    placeholder="Quick reply..."
                    className="bg-transparent !outline-none !shadow-none !border-0 h-12 rounded-none pl-4 pr-10 text-sm resize-none text-dark-500 placeholder:text-dark-400/50 font-semibold"
                  />
                  <div className="flex justify-end pe-2 pb-2">
                    <button className="p-1.5 bg-black rounded-full text-white hover:bg-black/80 transition-colors">
                      <Send className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full h-11 bg-white border-0 shadow-sm rounded-xl text-xs font-bold hover:bg-gray-50 hover:text-black flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  View Full Inbox
                  <ArrowRight className="w-3 h-3 -rotate-45" />
                </Button>

                <Button
                  variant="default"
                  className="w-full h-11 bg-[#1B1917] hover:bg-[#1B1917]/90 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg"
                >
                  <Sparkles className="w-4 h-4" />
                  AI Chat Assistant
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
