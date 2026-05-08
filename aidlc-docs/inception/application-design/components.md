# Component Inventory - Ticket Anywhere

## 1. UI 元件層 (UI Components)

### 1.1 AppShell
- **責任**: 應用程式主外殼，管理導航、佈局切換與全域通知。
- **介面**: 側邊導航欄、主要顯示區域。

### 1.2 IntentInputCenter
- **責任**: 多模態輸入入口。處理文字輸入、語音錄製、檔案/截圖上傳。
- **介面**: 輸入框、語音按鈕、上傳區域、即時預覽區域。

### 1.3 TaskBoard
- **責任**: 視覺化展示所有任務狀態（看板或列表）。
- **介面**: 狀態卡片、過濾器、排序選項。

### 1.4 SmartCalendar
- **責任**: 展示所有時間相關任務與 Agent 排程。
- **介面**: 月/週/日視圖、任務標記。

### 1.5 ItineraryDetailView
- **責任**: 詳細展示旅遊行程或訂位細節，支援 Markdown 編輯與導出。
- **介面**: 內容編輯器、行程包生成按鈕。

### 1.6 UserPreferencePanel
- **責任**: 管理 Alex 的個人偏好（如預算、座位、飲食）。
- **介面**: 偏好清單、編輯按鈕。

## 2. 邏輯與引擎層 (Logic & Engines)

### 2.1 IntentParserEngine
- **責任**: 封裝 NLP 與解析邏輯。將輸入轉化為結構化 Intent。
- **介面**: `parseIntent(input: string | File): Promise<Intent>`

### 2.2 PlanningEngine
- **責任**: 針對複雜任務（如旅遊）進行步驟拆解與缺口檢查。
- **介面**: `createPlan(intent: Intent): Promise<TaskPlan>`

### 2.3 TaskStateEngine
- **責任**: 管理任務的生命週期狀態轉移。
- **介面**: `updateStatus(taskId: string, status: Status)`
