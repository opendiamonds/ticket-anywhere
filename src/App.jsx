import React, { useState, useEffect } from "react";
import { flushSync } from "react-dom";
import BookingForm from "./components/BookingForm";
import Sidebar from "./components/Sidebar";
import SavedItineraries from "./pages/SavedItineraries";

// ─── Design Tokens ───────────────────────────────────────────────────────────
const DARK_BG = "linear-gradient(160deg, #0a0e1a 0%, #111827 60%, #1a1220 100%)";
const GLASS_CARD = "rgba(255,255,255,0.04)";
const GLASS_BORDER = "rgba(255,255,255,0.09)";
const PURPLE = "#a78bfa";
const BLUE = "#60a5fa";
const GREEN = "#34d399";
const AMBER = "#fbbf24";
const TEXT_PRIMARY = "#e2e8f0";
const TEXT_SECONDARY = "rgba(255,255,255,0.5)";

// ─── Recommendation Card ──────────────────────────────────────────────────────
const RecommendCard = ({ item, index, isFavorite, onToggleFavorite }) => {
  const isValidUrl = item.orderurl && item.orderurl.startsWith("http");
  return (
    <div style={{
      background: GLASS_CARD,
      border: `1px solid ${GLASS_BORDER}`,
      borderRadius: "16px",
      padding: "22px 24px",
      transition: "border-color 0.2s, background 0.2s, transform 0.2s",
      animation: "slideIn 0.35s ease both",
      animationDelay: `${index * 0.05}s`,
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(167,139,250,0.3)"; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = GLASS_BORDER; e.currentTarget.style.background = GLASS_CARD; }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px", flexWrap: "wrap", gap: "8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ background: `linear-gradient(135deg, ${PURPLE} 0%, ${BLUE} 100%)`, color: "#fff", padding: "2px 9px", borderRadius: "10px", fontSize: "11px", fontWeight: "800", letterSpacing: "0.5px" }}>
            #{index + 1}
          </span>
          <h3 style={{ margin: 0, color: TEXT_PRIMARY, fontSize: "17px", fontWeight: "700", lineHeight: 1.3 }}>{item.location}</h3>
        </div>
        <div style={{ display: "flex", gap: "6px", alignItems: "center", flexWrap: "wrap" }}>
          {item.date && <span style={{ background: "rgba(167,139,250,0.12)", color: PURPLE, padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "600" }}>📅 {item.date}</span>}
          {item.time && <span style={{ background: "rgba(96,165,250,0.12)", color: BLUE, padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "600" }}>🕐 {item.time}</span>}
          {/* Star button */}
          <button
            onClick={() => onToggleFavorite(item)}
            title={isFavorite ? "移除收藏" : "加入收藏"}
            style={{
              background: isFavorite ? "rgba(251,191,36,0.18)" : "rgba(255,255,255,0.06)",
              border: isFavorite ? `1px solid rgba(251,191,36,0.35)` : "1px solid rgba(255,255,255,0.12)",
              color: isFavorite ? AMBER : "rgba(255,255,255,0.3)",
              borderRadius: "10px",
              padding: "4px 10px",
              cursor: "pointer",
              fontSize: "16px",
              lineHeight: 1,
              transition: "all 0.2s",
            }}
          >
            {isFavorite ? "★" : "☆"}
          </button>
        </div>
      </div>

      {/* Content */}
      <p style={{ margin: "0 0 16px 0", color: TEXT_SECONDARY, fontSize: "14px", lineHeight: "1.75" }}>
        {item.content}
      </p>

      {/* Info Grid */}
      {(item.transportation || item.triptime || item.amount) && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 24px", marginBottom: "18px", fontSize: "13px" }}>
          {item.transportation && (
            <span style={{ color: "rgba(255,255,255,0.38)" }}>
              🚗 <strong style={{ color: "rgba(255,255,255,0.6)" }}>交通</strong>　{item.transportation}
            </span>
          )}
          {item.triptime && (
            <span style={{ color: "rgba(255,255,255,0.38)" }}>
              ⏱️ <strong style={{ color: "rgba(255,255,255,0.6)" }}>車程</strong>　{item.triptime}
            </span>
          )}
          {item.amount && (
            <span style={{ color: "rgba(255,255,255,0.38)" }}>
              💰 <strong style={{ color: "rgba(255,255,255,0.6)" }}>花費</strong>　{item.amount}
            </span>
          )}
        </div>
      )}

      {/* Buttons */}
      <div style={{ display: "flex", gap: "10px", borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "16px" }}>
        <a
          href={isValidUrl ? item.orderurl : undefined}
          target={isValidUrl ? "_blank" : undefined}
          rel="noopener noreferrer"
          onClick={isValidUrl ? undefined : e => e.preventDefault()}
          style={{
            flex: 1, textAlign: "center", padding: "10px",
            background: isValidUrl ? `linear-gradient(135deg, ${GREEN} 0%, #059669 100%)` : "rgba(255,255,255,0.06)",
            color: isValidUrl ? "#fff" : "rgba(255,255,255,0.22)",
            textDecoration: "none", borderRadius: "10px",
            fontWeight: "600", fontSize: "13px",
            cursor: isValidUrl ? "pointer" : "not-allowed",
            boxShadow: isValidUrl ? "0 2px 12px rgba(52,211,153,0.25)" : "none",
          }}
        >
          前往訂位
        </a>
        {item.reference && (
          <a
            href={item.reference}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1, textAlign: "center", padding: "10px",
              background: "rgba(167,139,250,0.1)",
              border: `1px solid rgba(167,139,250,0.22)`,
              color: PURPLE, textDecoration: "none",
              borderRadius: "10px", fontWeight: "600", fontSize: "13px",
            }}
          >
            參考網址
          </a>
        )}
      </div>
    </div>
  );
};

// ─── Home Page ────────────────────────────────────────────────────────────────
const HomePage = ({ favorites, onToggleFavorite, isMobile }) => {
  const [isSearching, setIsSearching] = useState(false);
  const [parsedRecommendations, setParsedRecommendations] = useState([]);
  const [bookingData, setBookingData] = useState({
    name: "", date: "", endDate: "", time: "", guests: 1, type: "restaurant", location: "", email: "", phone: "", url: ""
  });

  const handleSearch = async () => {
    if (!bookingData.location) return alert("請輸入地點！");
    setIsSearching(true);
    setParsedRecommendations([]);

    try {
      const encoded = btoa("opendimand:opendimandopendimand");
      const response = await fetch("https://n8n.danniel.cc/n8n/webhook/recommand", {
        method: "POST",
        headers: { "Authorization": `Basic ${encoded}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          username: bookingData.name || "Tina",
          date: bookingData.date || "2026-05-05",
          startdate: bookingData.date || "2026-06-05",
          enddate: bookingData.endDate || "2026-06-06",
          type: bookingData.type === "restaurant" ? "美食" : bookingData.type === "ticket" ? "景點" : "旅遊",
          location: bookingData.location || "釜山",
          time: bookingData.time || "17:30",
          email: bookingData.email || "tinaluo2945@gmail.com",
          phone: bookingData.phone || "0931960318",
          people: bookingData.guests ? bookingData.guests.toString() : "2",
          ...(bookingData.url ? { url: bookingData.url } : {}),
        }),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let lineBuffer = "", contentBuffer = "", foundStart = false;

      const extractNextObject = (str) => {
        let depth = 0, inString = false, escape = false, objStart = -1;
        for (let i = 0; i < str.length; i++) {
          const ch = str[i];
          if (escape) { escape = false; continue; }
          if (ch === "\\") { escape = true; continue; }
          if (ch === '"') { inString = !inString; continue; }
          if (inString) continue;
          if (ch === "{") { if (depth === 0) objStart = i; depth++; }
          else if (ch === "}") { depth--; if (depth === 0 && objStart !== -1) return { obj: str.substring(objStart, i + 1), end: i + 1 }; }
        }
        return null;
      };

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        lineBuffer += decoder.decode(value, { stream: true });
        const lines = lineBuffer.split("\n");
        lineBuffer = lines.pop() || "";
        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const parsedLine = JSON.parse(line);
            if (parsedLine.type === "item" && parsedLine.content) {
              contentBuffer += parsedLine.content;
              if (!foundStart) {
                const mdMatch = contentBuffer.match(/```json\s*([\s\S]*)/);
                if (mdMatch) contentBuffer = mdMatch[1];
                const itineraryIdx = contentBuffer.indexOf('"itinerary":[');
                if (itineraryIdx !== -1) {
                  contentBuffer = contentBuffer.substring(itineraryIdx + '"itinerary":['.length);
                  foundStart = true;
                } else {
                  const bracketIdx = contentBuffer.indexOf("[");
                  if (bracketIdx !== -1) {
                    const nextContent = contentBuffer.substring(bracketIdx);
                    if (!nextContent.includes('"itinerary"')) {
                      contentBuffer = contentBuffer.substring(bracketIdx + 1);
                      foundStart = true;
                    }
                  }
                }
              }
              if (foundStart) {
                let result;
                while ((result = extractNextObject(contentBuffer)) !== null) {
                  try {
                    const obj = JSON.parse(result.obj);
                    flushSync(() => { setParsedRecommendations(prev => [...prev, obj]); });
                    contentBuffer = contentBuffer.substring(result.end);
                  } catch { break; }
                }
              }
            }
          } catch { /* ignore */ }
        }
      }
    } catch (e) {
      console.error("搜尋出錯:", e);
      alert("搜尋失敗：" + e.message);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div style={{ flex: 1, padding: isMobile ? "20px 16px" : "40px 60px", overflowY: "auto", paddingBottom: isMobile ? "80px" : "60px", boxSizing: "border-box", width: "100%" }}>
      <div style={{ width: "100%", maxWidth: isMobile ? "100%" : "1200px", margin: "0 auto", boxSizing: "border-box" }}>
        {/* Page Header */}
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{
            fontSize: "30px", fontWeight: "800", margin: 0,
            background: `linear-gradient(135deg, ${PURPLE} 0%, ${BLUE} 100%)`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            AI 旅遊規劃
          </h1>
          <p style={{ color: TEXT_SECONDARY, marginTop: "8px", fontSize: "14px" }}>
            輸入條件，AI 即時為你生成專屬旅遊行程
          </p>
        </div>

        <BookingForm
          data={bookingData}
          setData={setBookingData}
          onSearch={handleSearch}
          isSearching={isSearching}
          onRegenerate={handleSearch}
        />

        {/* Results */}
        {(isSearching || parsedRecommendations.length > 0) && (
          <div style={{ marginTop: "28px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
              <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "700", color: TEXT_PRIMARY }}>
                ✦ AI 建議結果
              </h2>
              {parsedRecommendations.length > 0 && (
                <span style={{ background: "rgba(167,139,250,0.12)", color: PURPLE, padding: "4px 14px", borderRadius: "20px", fontSize: "13px", fontWeight: "600" }}>
                  {parsedRecommendations.length} 個景點{isSearching ? "（載入中）" : ""}
                </span>
              )}
            </div>

            {isSearching && parsedRecommendations.length === 0 ? (
              <div style={{ textAlign: "center", color: PURPLE, fontSize: "18px", fontWeight: "600", padding: "60px 0" }}>
                正在推薦<span style={{ animation: "blink 1s infinite" }}>...</span>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {parsedRecommendations.map((item, index) => (
                  <RecommendCard
                    key={index}
                    item={item}
                    index={index}
                    isFavorite={favorites.some(f => f.location === item.location && f.date === item.date)}
                    onToggleFavorite={onToggleFavorite}
                  />
                ))}
                {isSearching && (
                  <div style={{ textAlign: "center", color: TEXT_SECONDARY, padding: "16px", fontSize: "14px" }}>
                    正在載入更多景點<span style={{ animation: "blink 1s infinite" }}>...</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes slideIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

// ─── App Root ─────────────────────────────────────────────────────────────────
function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem("travel_favorites") || "[]"); }
    catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem("travel_favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleToggleFavorite = (item) => {
    setFavorites(prev => {
      const exists = prev.some(f => f.location === item.location && f.date === item.date);
      if (exists) return prev.filter(f => !(f.location === item.location && f.date === item.date));
      return [...prev, item];
    });
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      height: "100vh",
      overflow: "hidden",
      background: DARK_BG,
      fontFamily: "'Inter', -apple-system, sans-serif",
      color: TEXT_PRIMARY,
    }}>
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        favoritesCount={favorites.length}
        isMobile={isMobile}
      />
      <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {currentPage === "home" ? (
          <HomePage favorites={favorites} onToggleFavorite={handleToggleFavorite} isMobile={isMobile} />
        ) : (
          <SavedItineraries
            favorites={favorites}
            onRemove={(item) => handleToggleFavorite(item)}
            isMobile={isMobile}
          />
        )}
      </div>
    </div>
  );
}

export default App;