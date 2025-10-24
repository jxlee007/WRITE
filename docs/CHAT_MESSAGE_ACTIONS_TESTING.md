# Message Actions Testing Guide

## Overview

Comprehensive testing guide for the new Copy and Delete message actions in the AI Chat component.

## Test Environment Setup

### Prerequisites
- Node.js 18+
- Bun package manager
- Modern web browser (Chrome/Edge/Firefox/Safari)

### Setup Steps
```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Verify build
bun run build
```

### Access Chat
1. Open browser to `http://localhost:5173` (or configured dev URL)
2. Navigate to chat component
3. Send a test message or wait for AI response

## Copy Feature Testing

### Test 1: Copy Assistant Message
**Objective**: Verify copy button works on AI responses

**Steps**:
1. Send a prompt that generates a markdown response
2. Wait for response to render
3. Hover over the assistant's message
4. Click the copy icon (📋)
5. Open a text editor or notepad
6. Paste (Ctrl+V or Cmd+V)

**Expected Result**:
- ✅ Clipboard contains the exact message content
- ✅ Markdown formatting is preserved
- ✅ No extra characters or newlines added
- ✅ Console shows "Message copied to clipboard"

**Pass/Fail**: ___

### Test 2: Copy User Message
**Objective**: Verify copy button works on user messages

**Steps**:
1. Send a message to the chat
2. Hover over your message
3. Click the copy icon (📋)
4. Open a text editor
5. Paste the content

**Expected Result**:
- ✅ Clipboard contains exact user message
- ✅ Formatting matches original input
- ✅ No modification or sanitization

**Pass/Fail**: ___

### Test 3: Copy Long Message
**Objective**: Test copying extended content

**Steps**:
1. Generate or send a long message (>500 characters)
2. Copy the message
3. Paste into text editor
4. Verify all content is present

**Expected Result**:
- ✅ All text copied correctly
- ✅ No truncation
- ✅ Formatting intact

**Pass/Fail**: ___

### Test 4: Copy with Special Characters
**Objective**: Test copy with Unicode/special chars

**Steps**:
1. Copy a message containing:
   - Emoji: 🚀 ✨ 🎉
   - Symbols: @#$%^&*
   - Accents: é à ñ ü
   - Code: `const x = {}`
2. Paste and verify

**Expected Result**:
- ✅ All special characters preserved
- ✅ Code blocks intact
- ✅ Emoji rendered correctly

**Pass/Fail**: ___

### Test 5: Copy Multiple Messages
**Objective**: Test copying different messages in sequence

**Steps**:
1. Copy first message
2. Paste into document
3. Clear clipboard
4. Copy second message
5. Paste elsewhere
6. Verify both copies are correct

**Expected Result**:
- ✅ Each copy is independent
- ✅ No mix-up between messages
- ✅ Recent copy overwrites previous

**Pass/Fail**: ___

### Test 6: Copy Console Feedback
**Objective**: Verify console logging

**Steps**:
1. Open browser DevTools (F12)
2. Go to Console tab
3. Copy a message
4. Check console output

**Expected Result**:
- ✅ Console shows: "Message copied to clipboard"
- ✅ No errors logged
- ✅ Timestamp present

**Pass/Fail**: ___

## Delete Feature Testing

### Test 7: Delete Assistant Message
**Objective**: Verify delete button removes messages

**Steps**:
1. Generate an AI response
2. Hover over the assistant's message
3. Click the delete icon (🗑️)
4. Observe chat list

**Expected Result**:
- ✅ Message disappears immediately
- ✅ No loading state
- ✅ Chat layout adjusts properly
- ✅ Message ID no longer in DOM

**Pass/Fail**: ___

### Test 8: Delete User Message
**Objective**: Test deleting user messages

**Steps**:
1. Send a chat message
2. Hover over your message
3. Click the delete icon (🗑️)
4. Observe chat

**Expected Result**:
- ✅ User message removed
- ✅ No associated assistant response issues
- ✅ Chat context preserved

**Pass/Fail**: ___

### Test 9: Delete First Message
**Objective**: Test deleting from beginning of chat

**Steps**:
1. Create multi-message chat (3+ messages)
2. Delete the first message
3. Verify chat state

**Expected Result**:
- ✅ First message removed
- ✅ Remaining messages in order
- ✅ Scroll position preserved

**Pass/Fail**: ___

### Test 10: Delete Last Message
**Objective**: Test deleting from end of chat

**Steps**:
1. Create multi-message chat
2. Delete the last message
3. Check scroll and layout

**Expected Result**:
- ✅ Last message removed
- ✅ Previous messages intact
- ✅ Chat scrolls correctly

**Pass/Fail**: ___

### Test 11: Delete Consecutive Messages
**Objective**: Test deleting multiple messages

**Steps**:
1. Have 5+ messages in chat
2. Delete message 2
3. Delete message 4 (new index 3)
4. Delete message 3
5. Verify final state

**Expected Result**:
- ✅ All three messages removed
- ✅ Remaining messages in correct order
- ✅ No gaps or placeholder text

**Pass/Fail**: ___

### Test 12: Delete Then Continue Chat
**Objective**: Test chat functionality after deletion

**Steps**:
1. Delete a message from chat
2. Send a new message
3. Get AI response
4. Verify new messages work

**Expected Result**:
- ✅ New message appears
- ✅ AI response generates
- ✅ Chat continues normally
- ✅ Message IDs are unique

**Pass/Fail**: ___

## UI/UX Testing

### Test 13: Button Visibility on Hover
**Objective**: Verify action buttons appear correctly

**Steps**:
1. View chat at normal state
2. Move mouse away from messages
3. Buttons should disappear
4. Hover over a message
5. Buttons should appear

**Expected Result**:
- ✅ Buttons fade in smoothly
- ✅ No flickering
- ✅ All 5 buttons visible for assistant messages
- ✅ All 2 buttons visible for user messages

**Pass/Fail**: ___

### Test 14: Button Colors and Icons
**Objective**: Verify button styling

**Steps**:
1. Hover over a message
2. Examine button appearance
3. Check:
   - Copy button: 📋 icon, blue on hover
   - Delete button: 🗑️ icon, red on hover
   - Like button: 👍 icon, green on hover
   - Dislike button: 👎 icon, red on hover
   - Regenerate button: 🔄 icon, accent color on hover

**Expected Result**:
- ✅ All icons display correctly
- ✅ Colors match theme
- ✅ Consistent sizing (3.5x3.5)
- ✅ Proper spacing between buttons

**Pass/Fail**: ___

### Test 15: Button Tooltips
**Objective**: Verify button titles on hover

**Steps**:
1. Hover button without clicking
2. Wait for browser tooltip
3. Check tooltip text

**Expected Result**:
- ✅ "Copy to clipboard" for copy button
- ✅ "Delete message" for delete button
- ✅ Appropriate titles for other buttons
- ✅ Tooltips appear after 1-2 seconds

**Pass/Fail**: ___

### Test 16: Mobile/Touch Testing
**Objective**: Test on touch devices

**Steps**:
1. Open DevTools responsive design mode
2. Set to mobile device size
3. Try to interact with buttons
4. Test long-press for menu

**Expected Result**:
- ✅ Buttons accessible on touch
- ✅ No layout breakage
- ✅ Touch states work
- ⚠️ Note: Hover effects may not apply on mobile

**Pass/Fail**: ___

## Edge Cases and Error Handling

### Test 17: Copy Fails Gracefully
**Objective**: Verify error handling for copy

**Steps**:
1. Open DevTools console
2. Disable clipboard permissions if browser allows
3. Try to copy
4. Check for error handling

**Expected Result**:
- ✅ Error caught and logged
- ✅ Console shows error message
- ✅ No UI crash or hanging

**Pass/Fail**: ___

### Test 18: Delete with Pending Request
**Objective**: Test delete during message generation

**Steps**:
1. Send a message that takes time to respond
2. While waiting, delete that message
3. Observe behavior

**Expected Result**:
- ✅ Message deleted immediately
- ✅ No network errors
- ✅ Chat remains stable

**Pass/Fail**: ___

### Test 19: Copy Empty Message
**Objective**: Test edge case

**Steps**:
1. If possible, create/find empty message
2. Try to copy
3. Verify behavior

**Expected Result**:
- ✅ Copies empty string without error
- ✅ No console errors
- ✅ Graceful handling

**Pass/Fail**: ___

### Test 20: Rapid Button Clicks
**Objective**: Test rapid interactions

**Steps**:
1. Rapidly click copy button multiple times
2. Rapidly click delete button multiple times
3. Mix rapid clicks on different buttons
4. Check for race conditions

**Expected Result**:
- ✅ All operations complete
- ✅ No UI glitches
- ✅ No console errors
- ✅ State remains consistent

**Pass/Fail**: ___

## Performance Testing

### Test 21: Large Chat Performance
**Objective**: Test with many messages

**Steps**:
1. Generate 50+ messages in chat
2. Scroll through messages
3. Copy and delete operations
4. Monitor performance

**Expected Result**:
- ✅ No lag or stuttering
- ✅ Smooth scrolling
- ✅ Instant copy/delete
- ✅ No memory leaks (check DevTools)

**Pass/Fail**: ___

### Test 22: Long Message Copy
**Objective**: Performance with large content

**Steps**:
1. Copy a very long message (5000+ chars)
2. Measure time to copy
3. Check clipboard success

**Expected Result**:
- ✅ Copy completes instantly
- ✅ No visible delay
- ✅ Full content copied

**Pass/Fail**: ___

## Browser Compatibility Testing

### Test 23: Chrome/Chromium
**Steps**:
1. Open in Chrome/Edge
2. Run copy test
3. Run delete test
4. Verify all features work

**Pass/Fail**: ___

### Test 24: Firefox
**Steps**:
1. Open in Firefox
2. Run copy test
3. Run delete test
4. Check console

**Pass/Fail**: ___

### Test 25: Safari
**Steps**:
1. Open in Safari
2. Run copy test
3. Run delete test
4. Verify native feel

**Pass/Fail**: ___

## Regression Testing

### Test 26: Existing Features Still Work
**Objective**: Verify no breaking changes

**Steps**:
1. Like a message
2. Dislike a message
3. Regenerate response
4. Verify all work

**Expected Result**:
- ✅ Like/Dislike highlighting works
- ✅ Regenerate creates new response
- ✅ No interference with new features

**Pass/Fail**: ___

### Test 27: Markdown Rendering Preserved
**Objective**: Verify markdown still renders

**Steps**:
1. Send message with markdown
2. Copy a markdown message
3. Verify formatting in editor
4. Delete markdown message

**Expected Result**:
- ✅ Markdown renders correctly
- ✅ Copy preserves markdown syntax
- ✅ Delete works on markdown

**Pass/Fail**: ___

## Test Summary

### Copy Feature Score
- Total Tests: 6
- Passed: ___/6
- Status: ✅ / ❌

### Delete Feature Score
- Total Tests: 6
- Passed: ___/6
- Status: ✅ / ❌

### UI/UX Score
- Total Tests: 4
- Passed: ___/4
- Status: ✅ / ❌

### Edge Cases Score
- Total Tests: 4
- Passed: ___/4
- Status: ✅ / ❌

### Overall Score
- Total Tests: 27
- Passed: ___/27
- Percentage: ___%
- Status: ✅ / ⚠️ / ❌

## Sign-Off

- **Tested By**: ________________
- **Date**: ________________
- **Browser**: ________________
- **OS**: ________________
- **Notes**: ________________________________________

## Known Issues

- [ ] Issue 1: _______________
- [ ] Issue 2: _______________
- [ ] Issue 3: _______________

## Recommendations

1. _______________
2. _______________
3. _______________
