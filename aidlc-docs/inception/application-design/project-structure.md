# Project Structure - Ticket Anywhere

## 1. 目錄架構規劃

本專案採用功能導向與模組化並行的結構，特別強調 **Service Layer** 的獨立性，以便於 Agent 邏輯的單獨測試。

### 1.1 `src/` 核心目錄
- **`components/`**: 
  - `ui/`: 存放由 Shadcn UI 生成的原子組件。
  - `features/`: 依功能模組劃分的高階組件（如：`ticketing/`, `booking/`）。
- **`services/`**:
  - 存放純邏輯類別。
  - `IntentParser.ts`: 負責解析自然語言。
  - `PlanningService.ts`: 負責任務拆解。
- **`store/`**:
  - 使用 Zustand 管理狀態。
  - 狀態應按領域切分（Tasks, User, UI）。
- **`lib/`**:
  - `supabase.ts`: Supabase 初始化與共用實例。
  - `utils.ts`: 通用工具函數。

### 1.2 `aidlc-docs/` (AI-DLC 專用)
- 存放所有 Inception、Construction 階段的文件與審計紀錄。

## 2. 命名規範
- **元件**: PascalCase (如：`TaskDashboard.tsx`)。
- **服務/工具**: camelCase (如：`planningService.ts`)。
- **類型**: PascalCase 並以 `.ts` 結尾。

## 3. 模組化原則
- **低耦合**: UI 組件不應直接操作 Supabase，必須透過 `store` 或 `services`。
- **單一職責**: 複雜的計算邏輯（如行程缺口分析）應封裝在 `services/` 中，而非 React 組件內部。
