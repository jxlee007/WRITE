# Testing Guide - AI Generator History Feature

## 🎯 What Was Changed

The AIGenerator component was refactored to replace the token selection sidebar with a **generation history sidebar** that shows your recent AI image generations.

### Before (Old UX)
- Left sidebar showed token selection checkboxes
- Users had to manually select tokens before generating
- No way to see or reuse previous generations

### After (New UX)
- Left sidebar shows recent 10 generations with thumbnails
- Users can type token names directly in prompts
- Click any history item to instantly reuse its prompt
- Better workflow for iterating on prompts

---

## 🧪 Testing Steps

### 1. Access the Application
1. Open browser and go to: **http://localhost:8082/**
2. You should see the VS Code-style interface

### 2. Create/Select a Project
1. Click on **Projects** icon in the left activity bar (📚)
2. Either select an existing project or create a new one:
   - Click "Create New Project"
   - Enter title: "Test Project"
   - Enter genre: "Fantasy"
   - Click "Create Project"
3. The project should open automatically

### 3. Navigate to AI Generator
1. Click on **Generate** icon in the left activity bar (🎨)
2. You should see the AI Generator interface

### 4. Test Generation History Sidebar

#### Initial State (Empty History)
- ✅ **Expected:** Left sidebar shows "No generations yet" message
- ✅ **Expected:** Clock icon and "Generate images to see history" text
- ✅ **Expected:** Sidebar can be collapsed/expanded with the chevron icon

#### Generate First Image
1. In the **Base Prompt** field, type:
   ```
   A majestic dragon flying over mountains at sunset
   ```
2. (Optional) Add additional context:
   ```
   Epic fantasy style, detailed scales, dramatic lighting
   ```
3. Select settings:
   - Image Quality: **High**
   - Image Size: **1024x1024 (Square)**
4. Click **"Generate Image"** button
5. Wait 3 seconds for mock generation

**Expected Results:**
- ✅ Loading state shows "Generating..." with spinner
- ✅ After 3 seconds, image appears in "Generated Images (Current Session)" section
- ✅ **NEW:** History sidebar automatically updates with the generation
- ✅ History item shows:
  - Thumbnail of generated image
  - Prompt text (truncated if long)
  - Timestamp: "Just now"

#### Generate More Images
1. Change prompt to:
   ```
   A cozy wizard's library with floating books
   ```
2. Generate again
3. Change prompt to:
   ```
   An ancient temple hidden in a jungle
   ```
4. Generate again

**Expected Results:**
- ✅ History sidebar shows **most recent generation at the top**
- ✅ All 3 generations visible with thumbnails
- ✅ Timestamps update: "Just now", "Xh ago", etc.
- ✅ Current session section shows all generated images

#### Test Prompt Reuse (KEY FEATURE)
1. Scroll to the history sidebar
2. **Hover over any history item** - you should see "Click to reuse" hint
3. **Click on the first history item** (dragon prompt)

**Expected Results:**
- ✅ The Base Prompt field updates with the dragon prompt
- ✅ Toast notification: "Prompt loaded from history"
- ✅ You can now modify and regenerate

4. Click **"Generate Image"** again without changes
5. Image should generate using the reused prompt

#### Test History Persistence
1. Navigate away from the AI Generator:
   - Click on **Gallery** icon or **Projects** icon
2. Navigate back to **Generate** icon
3. Select the same project again

**Expected Results:**
- ✅ History sidebar **still shows all previous generations**
- ✅ Generations are loaded from the database
- ✅ Timestamps are preserved

#### Test Collapsible Sidebar
1. Click the **chevron icon** next to "Recent Generations"
2. Sidebar collapses, showing only the header
3. Click chevron again to expand

**Expected Results:**
- ✅ Smooth collapse/expand animation
- ✅ More space for the main generation area when collapsed

### 5. Test Direct Token Mention (No Sidebar Selection Needed)

#### Create Test Tokens First
1. Navigate to **Tokens** view (🎭)
2. Create a character token:
   - Name: "Sir Aldric"
   - Type: Character
   - Description: "A noble knight with silver armor and a red cape"
3. Create a location token:
   - Name: "Crystal Cavern"
   - Type: Location
   - Description: "An underground cave with glowing blue crystals"

#### Generate Using Token Names
1. Go back to **Generate** view
2. In the Base Prompt, type:
   ```
   Sir Aldric exploring the Crystal Cavern
   ```
3. In Additional Context, type:
   ```
   dramatic lighting, fantasy art style, detailed
   ```
4. Generate the image

**Expected Results:**
- ✅ Image generates successfully
- ✅ The prompt includes token names directly (no checkbox selection needed)
- ✅ History sidebar updates with this generation

### 6. Test Multiple Projects

1. Create a second project: "Sci-Fi Novel"
2. Navigate to AI Generator
3. Generate an image:
   ```
   A futuristic spaceship docking at a space station
   ```
4. Go back to Projects and switch to first project ("Test Project")
5. Navigate to AI Generator

**Expected Results:**
- ✅ History sidebar shows **only generations from the current project**
- ✅ Each project has its own generation history
- ✅ Switching projects updates the history sidebar automatically

---

## 🐛 What to Look For (Potential Issues)

### UI Issues
- [ ] History images not loading (broken image icons)
- [ ] Prompt text not truncating properly (overflow)
- [ ] Timestamps showing incorrect values
- [ ] Sidebar not collapsing/expanding smoothly
- [ ] "Click to reuse" hint not appearing on hover

### Functional Issues
- [ ] Clicking history item doesn't load prompt
- [ ] Generations not saving to database
- [ ] History not persisting after page refresh
- [ ] Wrong generations showing for different projects
- [ ] Toast notifications not appearing

### Performance Issues
- [ ] Slow loading when many generations exist
- [ ] Images causing layout shift
- [ ] Scroll performance in history sidebar

---

## 📸 Visual Reference

### Expected Layout
```
┌─────────────────────────────────────────────────────────────┐
│  Activity Bar  │  History Sidebar  │  Main Generator Area   │
│     📚 🎭     │                   │                        │
│     🎨 🖼️     │  [Recent Gen.]   │  Base Prompt           │
│     📋 ⚙️     │   🕐 Collapsed   │  [Text Area]           │
│               │                   │                        │
│               │  ┌──────────┐    │  Additional Context    │
│               │  │  Image 1 │    │  [Text Area]           │
│               │  │  "prompt"│    │                        │
│               │  │ Just now │    │  Settings              │
│               │  └──────────┘    │  [Quality][Size]       │
│               │                   │                        │
│               │  ┌──────────┐    │  [Generate Button]     │
│               │  │  Image 2 │    │                        │
│               │  │  "prompt"│    │  Generated Images      │
│               │  │ 2h ago   │    │  [Image Gallery]       │
│               │  └──────────┘    │                        │
└─────────────────────────────────────────────────────────────┘
```

---

## ✅ Success Criteria

All tests should pass with:
- ✅ No console errors in browser DevTools
- ✅ Smooth animations and transitions
- ✅ Correct data persistence
- ✅ Intuitive user experience
- ✅ Fast performance (< 100ms UI updates)

---

## 🔧 Troubleshooting

### History Not Showing
- Check browser console for errors
- Verify Convex backend is running
- Check that projectId is correctly passed to AIGenerator

### Images Not Loading
- Check network tab for failed requests
- Verify mock image URLs are accessible
- Check CORS settings if using external APIs

### Prompt Not Loading on Click
- Check `handleReusePrompt` function in console
- Verify toast notifications are working
- Check React state updates in DevTools

---

## 📝 Feedback

After testing, note:
1. **What works well:** _________________________________
2. **What feels intuitive:** _________________________________
3. **What's confusing:** _________________________________
4. **Bugs found:** _________________________________
5. **Improvement ideas:** _________________________________

---

**Testing Date:** _____________  
**Tester:** _____________  
**Browser:** _____________  
**Result:** ✅ PASS / ❌ FAIL  
