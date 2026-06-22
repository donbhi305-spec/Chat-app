import React, { useState, useRef, useEffect } from "react";
import { AppScreen, ChatMessage } from "../../types";
import { ArrowLeft, Send, Brain, Pin } from "lucide-react";
import { VDB } from "../../utils/db";

// ══════════ TYPING INDICATOR COMPONENT ══════════
export function TypingIndicator({ name }: { name: string }) {
  return (
    <div className="self-start flex flex-col items-start max-w-[80%] animate-fade-in mb-2 mt-1 shrink-0">
      <div className="text-[10px] text-slate-500 mb-1 px-1 font-semibold flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        {name}
      </div>
      <div className="p-3 bg-slate-900 border border-white/5 rounded-2xl rounded-tl-none flex items-center gap-1.5 shadow-md">
        <span className="flex gap-1 items-center shrink-0">
          <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </span>
        <span className="text-[10px] text-slate-450 italic ml-1 select-none">typing...</span>
      </div>
    </div>
  );
}

interface AiAssistantProps {
  setScreen: (scr: AppScreen) => void;
  showToast: (msg: string) => void;
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  activeDm?: { name: string; avatarColor: string; lastMsg: string; status: string } | null;
  setSelectedProfileUser?: (user: { name: string; avatarColor: string } | null) => void;
  onBack?: () => void;
}

// ══════════ 1. AI PORTAL ORB INTRO SCREEN ══════════
export function AiAssistantIntroScreen({ setScreen, showToast, setMessages }: AiAssistantProps) {
  const [inputVal, setInputVal] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const firstMsg: ChatMessage = {
      id: "ai_intro_" + Date.now(),
      sender: "user",
      text: inputVal.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Store in global AI Assistant thread
    const currentHist = VDB.getChatHistory("AI Assistant");
    VDB.saveChatHistory("AI Assistant", [...currentHist, firstMsg]);
    
    setInputVal("");
    setScreen(AppScreen.AI_CHAT);
  };

  return (
    <div className="screen w-full max-w-[420px] h-full max-h-[860px] bg-slate-950/85 backdrop-blur-2xl border border-purple-500/25 rounded-[36px] flex flex-col justify-between overflow-hidden relative shadow-[0_0_60px_rgba(155,93,229,0.12)] font-sans">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-10" />

      {/* Top Header */}
      <div className="flex items-center gap-3 px-6 pt-5 pb-3 bg-slate-950/20 backdrop-blur-sm z-20">
        <button onClick={() => setScreen(AppScreen.MAIN)} className="p-1.5 rounded-full hover:bg-white/5 text-slate-350 shrink-0">
          <ArrowLeft size={18} />
        </button>
        <span className="text-xs font-bold uppercase tracking-[2px] font-rajdhani text-slate-500">Veltrixa Core Link</span>
      </div>

      {/* Pulsing Orb center */}
      <div className="flex flex-col items-center justify-center flex-1 px-6 py-4 select-none relative">
        <div className="absolute top-[13%] w-full text-center">
          <h1 className="text-2xl font-bold font-rajdhani tracking-[4px] uppercase bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            AI Portals
          </h1>
          <p className="text-[10.5px] text-slate-500 uppercase tracking-widest mt-1.5">Direct link to Gemini AI</p>
        </div>

        {/* Pulsing visual components */}
        <div className="relative w-44 h-44 my-4 flex items-center justify-center animate-pulse-glow rounded-full">
          <div className="absolute inset-[-12px] bg-gradient-to-r from-cyan-400/20 via-purple-500/15 to-pink-500/20 blur-xl animate-orb-pulse" />
          <div className="absolute inset-[-4px] rounded-full border border-dashed border-cyan-400/30 animate-spin-ring" />
          
          <svg className="w-24 h-24 filter drop-shadow-[0_0_24px_rgba(0,212,255,0.7)]" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="orbGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#00d4ff" />
                <stop offset="50%" stopColor="#9b5de5" />
                <stop offset="100%" stopColor="#f72585" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="32" fill="url(#orbGrad)" className="animate-orb-pulse opacity-90" />
            <polygon points="50,22 74,36 74,64 50,78 26,64 26,36" stroke="#fff" strokeWidth="1" fill="none" className="opacity-40 animate-spin-ring" style={{ transformOrigin: "50% 50%" }} />
          </svg>
        </div>

        <p className="text-xs text-slate-450 leading-relaxed text-center max-w-[280px] mt-2 mb-10 font-sans tracking-wide">
          Unlock infinite possibilities. Ask about astrophysics, design modern layouts, or debug code scripts on the fly.
        </p>
      </div>

      {/* Input bar */}
      <form onSubmit={handleSubmit} className="p-5 bg-gradient-to-t from-slate-950 to-transparent flex items-center gap-2.5">
        <input
          type="text"
          placeholder="Ask me anything..."
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          className="flex-1 bg-white/5 border border-white/10 rounded-2xl py-3.5 px-4.5 text-xs text-slate-100 outline-none focus:border-cyan-500/40 focus:bg-cyan-500/5 transition-all text-slate-100 placeholder:text-slate-600 font-sans"
        />
        <button
          type="submit"
          className="w-12 h-12 rounded-2xl bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 flex items-center justify-center shrink-0 hover:scale-105 active:scale-95 shadow-[0_4px_16px_rgba(155,93,229,0.4)] transition-all cursor-pointer"
        >
          <Send size={15} className="text-white" />
        </button>
      </form>
    </div>
  );
}

// ══════════ 2. AI LIVE CONVERSATIONAL SCREEN (GEMINI BACKEND) ══════════
export function AiChatScreen({ setScreen, showToast, activeDm, setSelectedProfileUser, onBack }: AiAssistantProps) {
  const chatId = activeDm?.name || "AI Assistant";
  const [messages, setMessages] = useState<ChatMessage[]>(() => VDB.getChatHistory(chatId));
  const [inputVal, setInputVal] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Sync state if chatId changes
  useEffect(() => {
    setMessages(VDB.getChatHistory(chatId));
  }, [chatId]);

  // Auto scroll to bottom
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const fetchAiResponse = async (query: string, currentHistory: ChatMessage[]) => {
    setLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query, partnerName: chatId, history: currentHistory }),
      });

      if (!response.ok) {
        throw new Error("Failed to communicate with server");
      }

      const data = await response.json();
      const aiReply: ChatMessage = {
        id: "ai_" + Date.now(),
        sender: "bot",
        text: data.reply || "Veltrixa Core linked successfully.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      const updated = [...currentHistory, aiReply];
      setMessages(updated);
      VDB.saveChatHistory(chatId, updated);
    } catch (err) {
      console.error(err);
      showToast("Underlying model is currently sleeping.");
      const fallbackReply: ChatMessage = {
        id: "ai_fall_" + Date.now(),
        sender: "bot",
        text: `Greetings. I've received your query "${query}". Let's dive deeper into building sleek high-contrast interfaces!`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      const updated = [...currentHistory, fallbackReply];
      setMessages(updated);
      VDB.saveChatHistory(chatId, updated);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || loading) return;

    const userText = inputVal.trim();
    const timeNow = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const userMsgItem: ChatMessage = {
      id: "usr_" + Date.now(),
      sender: "user",
      text: userText,
      time: timeNow
    };

    const updated = [...messages, userMsgItem];
    setMessages(updated);
    VDB.saveChatHistory(chatId, updated);
    setInputVal("");
    fetchAiResponse(userText, updated);
  };

  const handleClear = () => {
    VDB.clearChatHistory(chatId);
    setMessages([]);
    showToast("Conversational index reset.");
  };

  return (
    <div className="screen w-full max-w-[420px] h-full max-h-[860px] bg-slate-950/85 backdrop-blur-2xl border border-purple-500/25 rounded-[36px] flex flex-col justify-between overflow-hidden relative shadow-[0_0_60px_rgba(155,93,229,0.12)] font-sans">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-10" />

      {/* Header */}
      <div className="flex items-center gap-3 px-6 pt-5 pb-3 bg-slate-950/70 backdrop-blur-md sticky top-0 z-20">
        <button onClick={() => onBack ? onBack() : setScreen(AppScreen.GROUPS)} className="p-1.5 rounded-full hover:bg-white/5 text-slate-350 shrink-0">
          <ArrowLeft size={18} />
        </button>
        <div
          onClick={() => {
            if (setSelectedProfileUser) {
              const nameValue = activeDm?.name || "AI Assistant";
              const colValue = activeDm?.avatarColor || "bg-purple-500/15 text-purple-400";
              setSelectedProfileUser({ name: nameValue, avatarColor: colValue });
            }
            setScreen(AppScreen.USER_PROFILE);
          }}
          className="flex-1 min-width-0 flex items-center gap-2 cursor-pointer hover:opacity-80 transition-all"
        >
          {activeDm ? (
            <div className={`w-8.5 h-8.5 rounded-xl flex items-center justify-center shrink-0 ${activeDm.avatarColor}`}>
              <span className="text-xs font-bold uppercase">{activeDm.name[0]}</span>
            </div>
          ) : (
            <div className="w-8.5 h-8.5 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0 text-purple-400">
              🧠
            </div>
          )}
          <div>
            <h2 className="text-xs font-bold text-slate-200 truncate">{chatId}</h2>
            <div className="flex items-center gap-1 mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] text-green-400 font-medium tracking-wide">{activeDm?.status || "Live Stream"}</span>
            </div>
          </div>
        </div>
        <button onClick={handleClear} className="p-1 text-[10px] bg-white/5 border border-white/5 rounded-lg px-2 text-slate-400 hover:text-slate-200 cursor-pointer">
          Clear
        </button>
      </div>

      {/* Active Conversation Feed */}
      <div className="flex-1 overflow-y-auto px-4.5 py-4 flex flex-col gap-3.5 scrollbar-none scroll-smooth">
        {messages.length === 0 && (
          <div className="m-auto text-center py-10 opacity-40 flex flex-col items-center gap-2 max-w-[200px]">
            <Brain size={26} className="text-purple-400" />
            <p className="text-xs leading-relaxed text-slate-300">Send a prompt to begin link stream sync with Gemini.</p>
          </div>
        )}

        {messages.map((m, index) => (
          <div key={m.id || index} className={`flex flex-col max-w-[82%] ${m.sender === "user" ? "self-end items-end" : "self-start items-start"} animate-slide-in`}>
            <div className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
              m.sender === "user"
                ? "bg-gradient-to-r from-cyan-400/15 via-purple-500/15 to-purple-500/8 border border-purple-500/20 text-slate-100 rounded-tr-none"
                : "bg-slate-900 border border-white/5 text-slate-250 rounded-tl-none whitespace-pre-line"
            }`}>
              {m.text}
            </div>
            <span className="text-[9px] text-slate-500 mt-1 px-1">{m.time}</span>
          </div>
        ))}

        {loading && (
          <TypingIndicator name={chatId} />
        )}

        <div ref={scrollRef} />
      </div>

      {/* Controls row */}
      <form onSubmit={handleSend} className="p-4 bg-slate-950/70 backdrop-blur-md flex items-center gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          disabled={loading}
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          className="flex-1 bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs text-slate-100 outline-none focus:border-cyan-500/40 placeholder:text-slate-650"
        />
        <button
          type="submit"
          disabled={loading || !inputVal.trim()}
          className="w-10.5 h-10.5 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center shrink-0 hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-40 shadow-lg cursor-pointer"
        >
          <Send size={14} className="text-white" />
        </button>
      </form>
    </div>
  );
}


// ══════════ 3. GROUP CHAT SCREEN (AI INNOVATORS) ══════════
export function GroupChatScreen1({ setScreen, showToast, onBack }: Omit<AiAssistantProps, "messages" | "setMessages">) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(() => VDB.getChatHistory("AI Innovators"));
  const [isTyping, setIsTyping] = useState(false);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<Record<string, NodeJS.Timeout>>({});

  // Auto scroll to bottom
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Timed trigger to remove visual selection highlight
  useEffect(() => {
    if (highlightedId) {
      const timer = setTimeout(() => {
        setHighlightedId(null);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [highlightedId]);

  const startPress = (id: string, text: string) => {
    if (timerRef.current[id]) {
      clearTimeout(timerRef.current[id]);
    }
    timerRef.current[id] = setTimeout(() => {
      handleTogglePin(id, text);
    }, 600);
  };

  const endPress = (id: string) => {
    if (timerRef.current[id]) {
      clearTimeout(timerRef.current[id]);
      delete timerRef.current[id];
    }
  };

  const handleTogglePin = (id: string, text: string) => {
    const updated = messages.map((m, index) => {
      const msgId = m.id || `msg-${index}`;
      if (msgId === id) {
        const nextState = !m.pinned;
        showToast(nextState ? `Pinned message: "${text.substring(0, 20)}..."` : "Unpinned message");
        return { ...m, pinned: nextState };
      }
      return m;
    });
    setMessages(updated);
    VDB.saveChatHistory("AI Innovators", updated);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: "usr_" + Date.now(),
      sender: "user",
      text: input.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updated = [...messages, userMsg];
    setMessages(updated);
    VDB.saveChatHistory("AI Innovators", updated);
    setInput("");
    setIsTyping(true);

    // Simulate instant reaction
    setTimeout(() => {
      const companionReply: ChatMessage = {
        id: "sophia_grp_" + Date.now(),
        sender: "Sophia" as any,
        text: "Exactly my thoughts! Glad details are synced up.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages((prev) => {
        const next = [...prev, companionReply];
        VDB.saveChatHistory("AI Innovators", next);
        return next;
      });
      setIsTyping(false);
    }, 1500);
  };

  const pinnedMessages = messages.filter(m => m.pinned);

  return (
    <div className="screen w-full max-w-[420px] h-full max-h-[860px] bg-slate-950/85 backdrop-blur-2xl border border-purple-500/25 rounded-[36px] flex flex-col justify-between overflow-hidden relative shadow-[0_0_60px_rgba(155,93,229,0.12)] font-sans">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-10" />

      {/* Header */}
      <div className="flex items-center gap-3 px-6 pt-5 pb-3 bg-slate-950/70 backdrop-blur-md sticky top-0 z-20 shrink-0">
        <button onClick={() => onBack ? onBack() : setScreen(AppScreen.GROUPS)} className="p-1.5 rounded-full hover:bg-white/5 text-slate-350 shrink-0">
          <ArrowLeft size={18} />
        </button>
        <div className="flex-1 min-width-0">
          <h2 className="text-xs font-bold text-slate-200">AI Innovators</h2>
          <span className="text-[10px] text-slate-500">12.4K online members</span>
        </div>
      </div>

      {/* Pinned Messages Bar */}
      {pinnedMessages.length > 0 && (
        <div className="mx-4.5 mt-2 p-2.5 bg-cyan-950/20 border border-cyan-500/20 rounded-xl flex items-center justify-between gap-2.5 animate-fade-in z-10 shrink-0">
          <div 
            onClick={() => {
              const latestPinned = pinnedMessages[pinnedMessages.length - 1];
              const safeId = latestPinned.id || `msg-${messages.indexOf(latestPinned)}`;
              setHighlightedId(safeId);
              const element = document.getElementById(`msg-bubble-${safeId}`);
              if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "center" });
              } else {
                showToast(`Pinned: "${latestPinned.text}"`);
              }
            }}
            className="flex items-center gap-2 min-w-0 flex-1 cursor-pointer hover:opacity-80 transition-all text-left"
          >
            <Pin size={13} className="text-cyan-400 fill-cyan-400 rotate-45 shrink-0" />
            <div className="flex-1 min-width-0">
              <div className="text-[9px] text-cyan-400 font-bold uppercase tracking-wider">Pinned Message</div>
              <div className="text-[11px] text-slate-350 truncate font-light leading-snug">
                {pinnedMessages[pinnedMessages.length - 1].text}
              </div>
            </div>
          </div>
          <button 
            onClick={() => {
              const latestPinned = pinnedMessages[pinnedMessages.length - 1];
              const safeId = latestPinned.id || `msg-${messages.indexOf(latestPinned)}`;
              handleTogglePin(safeId, latestPinned.text);
            }}
            className="p-1 px-2 text-[9px] text-purple-400 hover:text-purple-300 border border-purple-500/20 rounded hover:bg-purple-500/10 transition-all font-semibold uppercase tracking-wider shrink-0"
          >
            Unpin
          </button>
        </div>
      )}

      {/* Feed */}
      <div className="flex-1 overflow-y-auto px-4.5 py-4 flex flex-col gap-4.5 scrollbar-none">
        {messages.map((m, idx) => {
          const safeId = m.id || `msg-${idx}`;
          const isHighlighted = highlightedId === safeId;
          return (
            <div 
              key={safeId} 
              id={`msg-bubble-${safeId}`}
              onMouseDown={() => startPress(safeId, m.text)}
              onMouseUp={() => endPress(safeId)}
              onMouseLeave={() => endPress(safeId)}
              onTouchStart={() => startPress(safeId, m.text)}
              onTouchEnd={() => endPress(safeId)}
              onDoubleClick={() => handleTogglePin(safeId, m.text)}
              className={`flex flex-col max-w-[80%] ${m.sender === "user" ? "self-end items-end" : "self-start items-start"} select-none cursor-pointer group relative`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-[10px] text-slate-500 px-1 font-semibold">
                  {m.sender === "user" ? "You" : m.sender}
                </span>
                {m.pinned && (
                  <Pin size={10} className="text-cyan-400 fill-cyan-400 rotate-45 shrink-0" />
                )}
              </div>
              <div 
                className={`p-3.5 rounded-2xl text-xs leading-relaxed transition-all duration-300 ${
                  m.sender === "user"
                    ? "bg-gradient-to-r from-cyan-500/15 to-purple-500/12 border text-slate-200 rounded-tr-none"
                    : "bg-slate-900 border text-slate-250 rounded-tl-none"
                } ${
                  m.pinned 
                    ? "border-cyan-500/40 shadow-[0_0_12px_rgba(34,211,238,0.15)]" 
                    : "border-white/5"
                } ${
                  isHighlighted 
                    ? "ring-2 ring-cyan-400 ring-offset-2 ring-offset-slate-950 scale-[1.03] shadow-[0_0_20px_rgba(34,211,238,0.3)]" 
                    : ""
                }`}
              >
                {m.text}
              </div>
              <div className="flex items-center gap-1.5 mt-1 px-1">
                <span className="text-[9px] text-slate-500">{m.time}</span>
                <span className="text-[8px] text-slate-600 opacity-0 group-hover:opacity-100 transition-all font-light">
                  (Hold to pin)
                </span>
              </div>
            </div>
          );
        })}
        {isTyping && (
          <TypingIndicator name="Sophia" />
        )}
        <div ref={scrollRef} />
      </div>

      {/* Controls */}
      <form onSubmit={handleSend} className="p-4 bg-slate-950 flex items-center gap-2 mt-auto">
        <input
          type="text"
          placeholder="Broadcasting to AI Innovators..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs text-slate-200 outline-none focus:border-cyan-500/40 placeholder:text-slate-650"
        />
        <button type="submit" className="w-10.5 h-10.5 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center shrink-0 cursor-pointer">
          <Send size={14} className="text-white" />
        </button>
      </form>
    </div>
  );
}

// ══════════ 4. GROUP CHAT SCREEN (SPACE ENTHUSIASTS) ══════════
export function GroupChatScreen2({ setScreen, showToast, onBack }: Omit<AiAssistantProps, "messages" | "setMessages">) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(() => VDB.getChatHistory("Space Enthusiasts"));
  const [isTyping, setIsTyping] = useState(false);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<Record<string, NodeJS.Timeout>>({});

  // Auto scroll to bottom
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Timed trigger to remove visual selection highlight
  useEffect(() => {
    if (highlightedId) {
      const timer = setTimeout(() => {
        setHighlightedId(null);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [highlightedId]);

  const startPress = (id: string, text: string) => {
    if (timerRef.current[id]) {
      clearTimeout(timerRef.current[id]);
    }
    timerRef.current[id] = setTimeout(() => {
      handleTogglePin(id, text);
    }, 600);
  };

  const endPress = (id: string) => {
    if (timerRef.current[id]) {
      clearTimeout(timerRef.current[id]);
      delete timerRef.current[id];
    }
  };

  const handleTogglePin = (id: string, text: string) => {
    const updated = messages.map((m, index) => {
      const msgId = m.id || `msg-${index}`;
      if (msgId === id) {
        const nextState = !m.pinned;
        showToast(nextState ? `Pinned message: "${text.substring(0, 20)}..."` : "Unpinned message");
        return { ...m, pinned: nextState };
      }
      return m;
    });
    setMessages(updated);
    VDB.saveChatHistory("Space Enthusiasts", updated);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: "usr_" + Date.now(),
      sender: "user",
      text: input.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updated = [...messages, userMsg];
    setMessages(updated);
    VDB.saveChatHistory("Space Enthusiasts", updated);
    setInput("");
    setIsTyping(true);

    // Simulate instant reaction
    setTimeout(() => {
      const replyMsg: ChatMessage = {
        id: "space_reply_" + Date.now(),
        sender: "Maya" as any,
        text: "Affirmative. Let's model the trajectories overlay today.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages((prev) => {
        const next = [...prev, replyMsg];
        VDB.saveChatHistory("Space Enthusiasts", next);
        return next;
      });
      setIsTyping(false);
    }, 1500);
  };

  const pinnedMessages = messages.filter(m => m.pinned);

  return (
    <div className="screen w-full max-w-[420px] h-full max-h-[860px] bg-slate-950/85 backdrop-blur-2xl border border-purple-500/25 rounded-[36px] flex flex-col justify-between overflow-hidden relative shadow-[0_0_60px_rgba(155,93,229,0.12)] font-sans">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-10" />

      {/* Header */}
      <div className="flex items-center gap-3 px-6 pt-5 pb-3 bg-slate-950/70 backdrop-blur-md sticky top-0 z-20 shrink-0">
        <button onClick={() => onBack ? onBack() : setScreen(AppScreen.GROUPS)} className="p-1.5 rounded-full hover:bg-white/5 text-slate-350 shrink-0">
          <ArrowLeft size={18} />
        </button>
        <div className="flex-1 min-width-0">
          <h2 className="text-xs font-bold text-slate-200">Space Enthusiasts</h2>
          <span className="text-[10px] text-slate-500">9.8K online members</span>
        </div>
      </div>

      {/* Pinned Messages Bar */}
      {pinnedMessages.length > 0 && (
        <div className="mx-4.5 mt-2 p-2.5 bg-cyan-950/20 border border-cyan-500/20 rounded-xl flex items-center justify-between gap-2.5 animate-fade-in z-10 shrink-0">
          <div 
            onClick={() => {
              const latestPinned = pinnedMessages[pinnedMessages.length - 1];
              const safeId = latestPinned.id || `msg-${messages.indexOf(latestPinned)}`;
              setHighlightedId(safeId);
              const element = document.getElementById(`msg-bubble-${safeId}`);
              if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "center" });
              } else {
                showToast(`Pinned: "${latestPinned.text}"`);
              }
            }}
            className="flex items-center gap-2 min-w-0 flex-1 cursor-pointer hover:opacity-80 transition-all text-left"
          >
            <Pin size={13} className="text-cyan-400 fill-cyan-400 rotate-45 shrink-0" />
            <div className="flex-1 min-width-0">
              <div className="text-[9px] text-cyan-400 font-bold uppercase tracking-wider">Pinned Message</div>
              <div className="text-[11px] text-slate-350 truncate font-light leading-snug">
                {pinnedMessages[pinnedMessages.length - 1].text}
              </div>
            </div>
          </div>
          <button 
            onClick={() => {
              const latestPinned = pinnedMessages[pinnedMessages.length - 1];
              const safeId = latestPinned.id || `msg-${messages.indexOf(latestPinned)}`;
              handleTogglePin(safeId, latestPinned.text);
            }}
            className="p-1 px-2 text-[9px] text-purple-400 hover:text-purple-300 border border-purple-500/20 rounded hover:bg-purple-500/10 transition-all font-semibold uppercase tracking-wider shrink-0"
          >
            Unpin
          </button>
        </div>
      )}

      {/* Feed */}
      <div className="flex-1 overflow-y-auto px-4.5 py-4 flex flex-col gap-4.5 scrollbar-none">
        {messages.map((m, idx) => {
          const safeId = m.id || `msg-${idx}`;
          const isHighlighted = highlightedId === safeId;
          return (
            <div 
              key={safeId} 
              id={`msg-bubble-${safeId}`}
              onMouseDown={() => startPress(safeId, m.text)}
              onMouseUp={() => endPress(safeId)}
              onMouseLeave={() => endPress(safeId)}
              onTouchStart={() => startPress(safeId, m.text)}
              onTouchEnd={() => endPress(safeId)}
              onDoubleClick={() => handleTogglePin(safeId, m.text)}
              className={`flex flex-col max-w-[80%] ${m.sender === "user" ? "self-end items-end" : "self-start items-start"} select-none cursor-pointer group relative`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-[10px] text-slate-500 px-1 font-semibold">
                  {m.sender === "user" ? "You" : m.sender}
                </span>
                {m.pinned && (
                  <Pin size={10} className="text-cyan-400 fill-cyan-400 rotate-45 shrink-0" />
                )}
              </div>
              <div 
                className={`p-3.5 rounded-2xl text-xs leading-relaxed transition-all duration-300 ${
                  m.sender === "user"
                    ? "bg-gradient-to-r from-cyan-500/15 to-purple-500/12 border text-slate-200 rounded-tr-none"
                    : "bg-slate-900 border text-slate-250 rounded-tl-none"
                } ${
                  m.pinned 
                    ? "border-cyan-500/40 shadow-[0_0_12px_rgba(34,211,238,0.15)]" 
                    : "border-white/5"
                } ${
                  isHighlighted 
                    ? "ring-2 ring-cyan-400 ring-offset-2 ring-offset-slate-950 scale-[1.03] shadow-[0_0_20px_rgba(34,211,238,0.3)]" 
                    : ""
                }`}
              >
                {m.text}
              </div>
              <div className="flex items-center gap-1.5 mt-1 px-1">
                <span className="text-[9px] text-slate-500">{m.time}</span>
                <span className="text-[8px] text-slate-600 opacity-0 group-hover:opacity-100 transition-all font-light">
                  (Hold to pin)
                </span>
              </div>
            </div>
          );
        })}
        {isTyping && (
          <TypingIndicator name="Maya" />
        )}
        <div ref={scrollRef} />
      </div>

      {/* Controls */}
      <form onSubmit={handleSend} className="p-4 bg-slate-950 flex items-center gap-2 mt-auto">
        <input
          type="text"
          placeholder="Broadcasting coordinates..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs text-slate-200 outline-none focus:border-cyan-500/40 placeholder:text-slate-650"
        />
        <button type="submit" className="w-10.5 h-10.5 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center shrink-0 cursor-pointer">
          <Send size={14} className="text-white" />
        </button>
      </form>
    </div>
  );
}

