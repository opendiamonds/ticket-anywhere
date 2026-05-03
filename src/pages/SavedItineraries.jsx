import React from "react";

const SavedItineraries = ({ favorites, onRemove, isMobile }) => {
    if (favorites.length === 0) {
        return (
            <div style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
                padding: "40px",
            }}>
                <div style={{ fontSize: "60px", marginBottom: "20px", opacity: 0.4 }}>★</div>
                <h2 style={{ color: "rgba(255,255,255,0.5)", fontWeight: "600", fontSize: "20px", margin: 0 }}>
                    還沒有儲存的行程
                </h2>
                <p style={{ color: "rgba(255,255,255,0.3)", marginTop: "8px", fontSize: "14px" }}>
                    在 AI 規劃頁面按下 ★ 把景點加入收藏吧！
                </p>
            </div>
        );
    }

    return (
        <div style={{ flex: 1, padding: isMobile ? "20px 16px" : "40px 60px", overflowY: "auto", paddingBottom: isMobile ? "80px" : "60px", boxSizing: "border-box", width: "100%" }}>
            <div style={{ width: "100%", maxWidth: isMobile ? "100%" : "1200px", margin: "0 auto", boxSizing: "border-box" }}>
                <div style={{ marginBottom: "32px" }}>
                    <h1 style={{
                        fontSize: "28px", fontWeight: "800", margin: 0,
                        background: "linear-gradient(135deg, #a78bfa 0%, #60a5fa 100%)",
                        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    }}>
                        已儲存的行程
                    </h1>
                    <p style={{ color: "rgba(255,255,255,0.4)", marginTop: "8px", fontSize: "14px" }}>
                        共 {favorites.length} 個景點
                    </p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {favorites.map((item, index) => (
                        <ItineraryCard key={index} item={item} onRemove={() => onRemove(item)} />
                    ))}
                </div>
            </div>
        </div>
    );
};

const ItineraryCard = ({ item, onRemove }) => {
    const isValidUrl = item.orderurl && item.orderurl.startsWith("http");

    return (
        <div style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "16px",
            padding: "22px",
            backdropFilter: "blur(12px)",
            transition: "border-color 0.2s, background 0.2s",
        }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(167,139,250,0.3)"; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
        >
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px", flexWrap: "wrap", gap: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <h3 style={{ margin: 0, color: "#e2e8f0", fontSize: "17px", fontWeight: "700" }}>{item.location}</h3>
                </div>
                <div style={{ display: "flex", gap: "6px", alignItems: "center", flexWrap: "wrap" }}>
                    {item.date && (
                        <span style={{ background: "rgba(167,139,250,0.15)", color: "#a78bfa", padding: "3px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "600" }}>
                            📅 {item.date}
                        </span>
                    )}
                    {item.time && (
                        <span style={{ background: "rgba(96,165,250,0.15)", color: "#60a5fa", padding: "3px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "600" }}>
                            🕐 {item.time}
                        </span>
                    )}
                    <button
                        onClick={onRemove}
                        title="移除收藏"
                        style={{
                            background: "rgba(251,113,133,0.15)",
                            border: "1px solid rgba(251,113,133,0.25)",
                            color: "#fb7185",
                            borderRadius: "8px",
                            padding: "4px 10px",
                            cursor: "pointer",
                            fontSize: "12px",
                            fontWeight: "600",
                        }}
                    >
                        ✕ 移除
                    </button>
                </div>
            </div>

            <p style={{ margin: "0 0 16px 0", color: "rgba(255,255,255,0.55)", fontSize: "14px", lineHeight: "1.7" }}>
                {item.content}
            </p>

            {(item.transportation || item.triptime || item.amount) && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginBottom: "16px", fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>
                    {item.transportation && <span>🚗 <strong style={{ color: "rgba(255,255,255,0.6)" }}>交通</strong>　{item.transportation}</span>}
                    {item.triptime && <span>⏱️ <strong style={{ color: "rgba(255,255,255,0.6)" }}>車程</strong>　{item.triptime}</span>}
                    {item.amount && <span>💰 <strong style={{ color: "rgba(255,255,255,0.6)" }}>花費</strong>　{item.amount}</span>}
                </div>
            )}

            <div style={{ display: "flex", gap: "10px", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "16px" }}>
                <a
                    href={isValidUrl ? item.orderurl : undefined}
                    target={isValidUrl ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    onClick={isValidUrl ? undefined : e => e.preventDefault()}
                    style={{
                        flex: 1, textAlign: "center", padding: "10px",
                        background: isValidUrl
                            ? "linear-gradient(135deg, #34d399 0%, #059669 100%)"
                            : "rgba(255,255,255,0.08)",
                        color: isValidUrl ? "#fff" : "rgba(255,255,255,0.25)",
                        textDecoration: "none", borderRadius: "10px",
                        fontWeight: "600", fontSize: "13px",
                        cursor: isValidUrl ? "pointer" : "not-allowed",
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
                            background: "rgba(167,139,250,0.12)",
                            border: "1px solid rgba(167,139,250,0.25)",
                            color: "#a78bfa",
                            textDecoration: "none", borderRadius: "10px",
                            fontWeight: "600", fontSize: "13px",
                        }}
                    >
                        參考網址
                    </a>
                )}
            </div>
        </div>
    );
};

export default SavedItineraries;
