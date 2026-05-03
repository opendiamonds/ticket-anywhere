import React from "react";

const BookingForm = ({ data, setData, onSearch, isSearching, onRegenerate }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const inputStyle = {
        width: "100%",
        padding: "10px 14px",
        borderRadius: "10px",
        border: "1px solid rgba(255,255,255,0.1)",
        fontSize: "14px",
        outline: "none",
        transition: "border-color 0.2s, box-shadow 0.2s",
        boxSizing: "border-box",
        background: "rgba(255,255,255,0.05)",
        color: "#e2e8f0",
        fontFamily: "inherit",
    };

    const labelStyle = {
        display: "block",
        fontSize: "12px",
        fontWeight: "600",
        color: "rgba(255,255,255,0.45)",
        marginBottom: "6px",
        letterSpacing: "0.5px",
        textTransform: "uppercase",
    };

    return (
        <div style={{
            padding: "28px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.09)",
            borderRadius: "16px",
            backdropFilter: "blur(12px)",
        }}>
            <h2 style={{ margin: "0 0 20px 0", fontSize: "18px", color: "#e2e8f0", fontWeight: "700" }}>
                🔍 查詢條件
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {/* 類型與地點 */}
                <div style={{ display: "flex", gap: "12px" }}>
                    <div style={{ flex: 1 }}>
                        <label style={labelStyle}>類型</label>
                        <select name="type" value={data.type} onChange={handleChange} style={inputStyle}>
                            <option value="restaurant">🍽️ 訂餐廳</option>
                            <option value="ticket">🎫 訂票 / 景點</option>
                            <option value="travel">旅遊規劃</option>
                        </select>
                    </div>
                    <div style={{ flex: 2 }}>
                        <label style={labelStyle}>地點</label>
                        <input
                            name="location"
                            value={data.location}
                            onChange={handleChange}
                            placeholder="例：台北、東京、巴黎"
                            style={inputStyle}
                        />
                    </div>
                </div>

                {/* 日期與人數 */}
                <div style={{ display: "flex", gap: "12px" }}>
                    <div style={{ flex: 1 }}>
                        <label style={labelStyle}>{data.type === 'travel' ? '開始日期' : '日期'}</label>
                        <input
                            type="date"
                            name="date"
                            value={data.date}
                            onChange={handleChange}
                            style={inputStyle}
                        />
                    </div>
                    {data.type === 'travel' && (
                        <div style={{ flex: 1 }}>
                            <label style={labelStyle}>結束日期</label>
                            <input
                                type="date"
                                name="endDate"
                                value={data.endDate || ""}
                                onChange={handleChange}
                                style={inputStyle}
                            />
                        </div>
                    )}
                    <div style={{ flex: 1 }}>
                        <label style={labelStyle}>人數</label>
                        <input
                            type="number"
                            name="guests"
                            value={data.guests}
                            onChange={handleChange}
                            min="1"
                            style={inputStyle}
                        />
                    </div>
                </div>


                {/* 按鈕區域 */}
                <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                    <button
                        onClick={onSearch}
                        disabled={isSearching}
                        style={{
                            flex: 2,
                            padding: "14px",
                            background: isSearching
                                ? "rgba(255,255,255,0.1)"
                                : "linear-gradient(135deg, #a78bfa 0%, #60a5fa 100%)",
                            color: isSearching ? "rgba(255,255,255,0.3)" : "#fff",
                            border: "none",
                            borderRadius: "10px",
                            fontSize: "14px",
                            fontWeight: "700",
                            cursor: isSearching ? "not-allowed" : "pointer",
                            transition: "opacity 0.2s, transform 0.1s",
                            boxShadow: isSearching ? "none" : "0 4px 20px rgba(167,139,250,0.35)",
                            letterSpacing: "0.3px",
                        }}
                        onMouseEnter={(e) => { if (!isSearching) e.target.style.opacity = "0.9"; }}
                        onMouseLeave={(e) => { e.target.style.opacity = "1"; }}
                    >
                        {isSearching ? "⏳ 查詢中..." : "🔍 查詢"}
                    </button>

                    <button
                        onClick={onRegenerate}
                        disabled={isSearching}
                        style={{
                            flex: 1,
                            padding: "14px",
                            background: "rgba(255,255,255,0.04)",
                            color: isSearching ? "rgba(255,255,255,0.2)" : "rgba(167,139,250,0.9)",
                            border: `1px solid ${isSearching ? "rgba(255,255,255,0.05)" : "rgba(167,139,250,0.3)"}`,
                            borderRadius: "10px",
                            fontSize: "14px",
                            fontWeight: "600",
                            cursor: isSearching ? "not-allowed" : "pointer",
                            transition: "all 0.2s",
                        }}
                    >
                        🔄 重新建議
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookingForm;