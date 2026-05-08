# Application Design - Ticket Anywhere (Consolidated)

## 1. 概述
本文件定義了 Ticket Anywhere 的架構藍圖。本應用程式將採用以 **Zustand** 為核心的狀態管理，並透過 **Supabase** 實現雲端資料同步。UI 則基於 **Shadcn UI + Tailwind** 以追求極致的視覺效果與開發效率。

## 2. 核心元件
- **UI 層**: 包含多模態輸入中心 (`IntentInputCenter`)、任務看板 (`TaskBoard`) 與智慧行事曆 (`SmartCalendar`)。
- **引擎層**: 負責意圖解析 (`Parser`)、步驟規劃 (`Planner`) 與狀態管理 (`StateEngine`)。

## 3. 服務層與協作
- **AgentOrchestrator**: 負責串聯整個 Agentic 流程。
- **PersistenceService**: 封裝雲端儲存邏輯。
- **NotificationService**: 執行智慧提醒邏輯。

## 4. 關鍵設計決策
- **狀態管理**: 使用 Zustand 進行輕量級全域狀態管理。
- **持久化**: 使用 Supabase 進行外部同步。
- **AI 串接**: 暫時使用 MockAIService，並預留 OpenAI/Gemini 適配器介面。

---
> **📋 <u>文件索引</u>**:
> - 詳細元件定義: [components.md](./components.md)
> - 方法簽章: [component-methods.md](./component-methods.md)
> - 服務與狀態: [services.md](./services.md)
> - 依賴關係: [component-dependency.md](./component-dependency.md)
> - 資料模型 (ERD): [data-models.md](./data-models.md)
> - 專案資料夾結構: [project-structure.md](./project-structure.md)
