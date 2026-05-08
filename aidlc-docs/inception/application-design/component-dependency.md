# Component Dependencies - Ticket Anywhere

## 1. 依賴矩陣 (Dependency Matrix)

| 組件 | 依賴於 (Depends On) | 被依賴於 (Used By) |
|---|---|---|
| **IntentInputCenter** | IntentParserEngine, UIStore | AppShell |
| **TaskBoard** | TaskStore, PersistenceService | AppShell |
| **SmartCalendar** | TaskStore | AppShell |
| **AgentOrchestrator** | PlanningEngine, TaskStateEngine | 全域控制器 |
| **PersistenceService** | Supabase SDK | TaskStore, UserStore |

## 2. 關鍵資料流 (Data Flow)

### 2.1 任務建立流程 (Task Creation Flow)
1. `IntentInputCenter` 捕捉使用者輸入。
2. `IntentParserEngine` 解析意圖並回傳 Markdown 預覽。
3. 使用者確認預覽後，`AgentOrchestrator` 調用 `PlanningEngine`。
4. `TaskStateEngine` 建立初始任務並透過 `PersistenceService` 儲存至 Supabase。
5. `TaskStore` 更新狀態，`TaskBoard` 重新渲染。

### 2.2 確認機制流程 (Confirmation Flow)
1. `AgentOrchestrator` 檢測到高風險操作。
2. 呼叫 `TaskStateEngine.requestConfirmation()`。
3. UI 彈出確認視窗（由 `AppShell` 或特定元件管理）。
4. Alex 核准後，繼續後續執行。
