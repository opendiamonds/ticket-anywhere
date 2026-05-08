# Component Methods - Ticket Anywhere

## 1. IntentInputCenter
- `submitText(text: string): void` - 提交自然語言輸入。
- `uploadFile(file: File): void` - 處理截圖或文件上傳。
- `startVoiceRecording(): void` - 啟動語音捕捉。
- `updatePreview(markdown: string): void` - 即時更新 Markdown 預覽。

## 2. IntentParserEngine
- `identifyCategory(input: string): TaskCategory` - 識別任務類型（搶票/訂位等）。
- `extractMetadata(input: string): Metadata` - 提取日期、張數、預算。
- `performOCR(image: File): Promise<string>` - 執行圖片文字提取。

## 3. PlanningEngine
- `decompose(intent: Intent): SubTask[]` - 拆解大目標為子步驟。
- `checkGaps(itinerary: Itinerary): GapReport` - 檢查行程缺口。
- `generateItineraryPackage(taskId: string): PDFBlob` - 產出離線行程包。

## 4. TaskStateEngine
- `createTask(data: TaskData): string` - 建立新任務。
- `requestConfirmation(action: Action): void` - 觸發人類確認視窗。
- `archiveTask(taskId: string): void` - 歸檔已完成或取消的任務。

## 5. UserPreferencePanel
- `savePreference(key: string, value: any): void` - 儲存偏好。
- `getLearnedHabits(): HabitSet` - 獲取 AI 學習到的習慣。
