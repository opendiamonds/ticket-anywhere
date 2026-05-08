# Data Models - Ticket Anywhere

## 1. 核心實體定義 (Core Entities)

### 1.1 Tasks (任務主表)
這是應用的核心，整合了搶票、訂位與旅遊需求。
- `id`: UUID (Primary Key)
- `user_id`: UUID (Foreign Key to Users)
- `title`: String (任務名稱)
- `category`: Enum (ticketing, booking, travel, general)
- `status`: Enum (pending, in_progress, wait_confirmation, completed, failed, cancelled)
- `metadata`: JSONB (存儲特定場景資料，如：演唱會座位偏好、餐廳人數、航班編號)
- `deadline`: Timestamp (關鍵時限，如：開賣時間、付款截止)
- `created_at / updated_at`: Timestamp

### 1.2 SubTasks (子任務/規劃步驟)
用於 Agentic 規劃機制，將大目標拆解為具體動作。
- `id`: UUID
- `task_id`: UUID (Foreign Key)
- `description`: String (步驟描述，如：「查詢官方售票連結」)
- `is_completed`: Boolean
- `order_index`: Integer (執行順序)

### 1.3 Preferences (使用者偏好/記憶)
用於存儲 Alex 的習慣。
- `id`: UUID
- `user_id`: UUID
- `category`: String (例如：seating, dietary, budget)
- `key`: String (例如：preferred_zone)
- `value`: JSONB (例如：["A區", "走道"])

### 1.4 Reminders (智慧提醒)
- `id`: UUID
- `task_id`: UUID
- `message`: String (提醒內容，具備上下文)
- `trigger_at`: Timestamp
- `is_sent`: Boolean

## 2. 儲存策略 (Storage Strategy)
- **資料庫**: Supabase (PostgreSQL)。
- **截圖儲存**: Supabase Storage (S3-compatible)，Task 表中的 metadata 將記錄檔案路徑。
- **快取**: Zustand 將同步部分活躍任務至 LocalStorage，以實現快速啟動與離線預覽。
