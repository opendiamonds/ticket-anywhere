# Services and Orchestration - Ticket Anywhere

## 1. 核心服務 (Core Services)

### 1.1 AgentOrchestrator
- **責任**: 協調整個「輸入 -> 解析 -> 規劃 -> 確認 -> 執行」的 Agent 循環。
- **模式**: 事件驅動 (Event-driven)。當 Intent 被確認後，觸發 Planning 服務。

### 1.2 PersistenceService (Supabase Client)
- **責任**: 處理雲端資料同步與持久化。
- **模式**: 單例 (Singleton)。封裝 Supabase SDK 調用，處理 Task、Preference 與 File (截圖) 的儲存。

### 1.3 NotificationService
- **責任**: 執行「智慧提醒」邏輯。
- **模式**: 訂閱 (Subscription)。監控任務時限並觸發瀏覽器通知或 UI 警示。

### 1.4 MockAIService
- **責任**: 模擬 AI 能力（NLP/OCR）。
- **模式**: 適配器 (Adapter)。預留介面，目前使用 Mock 資料回應，便於未來接入 OpenAI/Gemini。

## 2. 狀態管理設計 (Zustand Store)

### 2.1 useTaskStore
- **狀態**: `tasks: Task[]`, `activeTaskId: string`, `filters: FilterConfig`.
- **動作**: `addTask()`, `deleteTask()`, `syncWithCloud()`.

### 2.2 useUserStore
- **狀態**: `preferences: PreferenceSet`, `userSession: Session`.
- **動作**: `updatePreference()`, `login()`.

### 2.3 useUIStore
- **狀態**: `isInputCenterOpen: boolean`, `currentView: 'board' | 'calendar'`.
- **動作**: `toggleInputCenter()`, `setView()`.
