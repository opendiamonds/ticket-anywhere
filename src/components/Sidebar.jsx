import React from "react";

const Sidebar = ({ currentPage, setCurrentPage, favoritesCount, isMobile }) => {
    const navItems = [
        { id: "home", icon: "✦", label: "AI 規劃" },
        { id: "saved", icon: "★", label: "已儲存", badge: favoritesCount },
    ];

    // ── Mobile: Bottom Tab Bar ──────────────────────────────────────────────────
    if (isMobile) {
        return (
            <nav style={{
                position: "fixed",
                bottom: 0, left: 0, right: 0,
                height: "60px",
                background: "rgba(10,14,26,0.96)",
                backdropFilter: "blur(20px)",
                borderTop: "1px solid rgba(255,255,255,0.08)",
                display: "flex",
                alignItems: "stretch",
                zIndex: 200,
            }}>
                {navItems.map(item => {
                    const isActive = currentPage === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setCurrentPage(item.id)}
                            style={{
                                flex: 1, display: "flex", flexDirection: "column",
                                alignItems: "center", justifyContent: "center", gap: "3px",
                                border: "none", background: "transparent", cursor: "pointer",
                                borderTop: isActive ? "2px solid #a78bfa" : "2px solid transparent",
                                transition: "all 0.2s",
                            }}
                        >
                            <span style={{ fontSize: "18px", color: isActive ? "#a78bfa" : "rgba(255,255,255,0.35)", position: "relative" }}>
                                {item.icon}
                                {item.badge > 0 && (
                                    <span style={{
                                        position: "absolute", top: "-4px", right: "-8px",
                                        background: "linear-gradient(135deg, #a78bfa 0%, #60a5fa 100%)",
                                        color: "#fff", fontSize: "9px", fontWeight: "800",
                                        padding: "1px 4px", borderRadius: "10px", minWidth: "14px", textAlign: "center",
                                    }}>{item.badge}</span>
                                )}
                            </span>
                            <span style={{ fontSize: "10px", fontWeight: isActive ? "700" : "400", color: isActive ? "#a78bfa" : "rgba(255,255,255,0.35)", letterSpacing: "0.3px" }}>
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </nav>
        );
    }

    // ── Desktop: Left Sidebar ───────────────────────────────────────────────────
    return (
        <aside style={{
            width: "220px",
            height: "100vh",
            background: "rgba(10, 14, 26, 0.98)",
            borderRight: "1px solid rgba(255,255,255,0.07)",
            display: "flex",
            flexDirection: "column",
            padding: "32px 0 24px 0",
            flexShrink: 0,
        }}>
            {/* Logo */}
            <div style={{ padding: "0 24px 32px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{
                    fontSize: "22px", fontWeight: "800", letterSpacing: "-0.5px",
                    background: "linear-gradient(135deg, #a78bfa 0%, #60a5fa 100%)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1.2,
                }}>旅途</div>
                <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "10px", letterSpacing: "2.5px", marginTop: "4px", textTransform: "uppercase" }}>
                    Travel AI
                </div>
            </div>

            {/* Nav */}
            <nav style={{ padding: "20px 12px", flex: 1 }}>
                {navItems.map(item => {
                    const isActive = currentPage === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setCurrentPage(item.id)}
                            style={{
                                width: "100%", display: "flex", alignItems: "center", gap: "12px",
                                padding: "12px 16px", borderRadius: "12px", border: "none", cursor: "pointer",
                                marginBottom: "4px", transition: "all 0.2s",
                                background: isActive ? "rgba(167,139,250,0.12)" : "transparent",
                                borderLeft: isActive ? "3px solid #a78bfa" : "3px solid transparent",
                            }}
                            onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                            onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
                        >
                            <span style={{ fontSize: "15px", color: isActive ? "#a78bfa" : "rgba(255,255,255,0.4)", transition: "color 0.2s" }}>
                                {item.icon}
                            </span>
                            <span style={{ fontSize: "14px", fontWeight: isActive ? "600" : "400", color: isActive ? "#e2e8f0" : "rgba(255,255,255,0.45)", flex: 1, textAlign: "left" }}>
                                {item.label}
                            </span>
                            {item.badge > 0 && (
                                <span style={{
                                    background: "linear-gradient(135deg, #a78bfa 0%, #60a5fa 100%)",
                                    color: "#fff", fontSize: "11px", fontWeight: "700",
                                    padding: "2px 8px", borderRadius: "20px",
                                }}>{item.badge}</span>
                            )}
                        </button>
                    );
                })}
            </nav>

            {/* Footer */}
            <div style={{ padding: "16px 24px 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ color: "rgba(255,255,255,0.18)", fontSize: "11px", textAlign: "center", letterSpacing: "0.5px" }}>
                    Powered by AI ✦
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
