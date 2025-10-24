# Copy Button Feedback - Implementation Guide

## Overview

This guide explains how the copy button visual feedback system works and how to maintain/modify it.

## Architecture

### Component Hierarchy

```
AIChat (Main Component)
├── State: copiedMessageId
├── Handler: handleCopy()
└── ChatMessage (Message Display)
    ├── Props: isCopied
    ├── Copy Button
    │   ├── Icon (Copy/Check)
    │   ├── Styling (Blue/Green)
    │   └── Tooltip
    └── Other Buttons (Like, Dislike, Regenerate, Delete)
```

## State Management

### State Variable
```typescript
const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
```

**Purpose**: Track which message's copy button is currently showing the checkmark

**Type**: `string | null`
- `null` - No message is in "copied" state
- `string` - ID of the message that was just copied

**Lifecycle**:
1. Initialize as `null`
2. Set to `messageId` when copy button clicked
3. Reset to `null` after 2 seconds

## Handler Function

### handleCopy Implementation

```typescript
const handleCopy = (messageId: string, content: string) => {
  // 1. Copy content to clipboard
  navigator.clipboard.writeText(content).then(() => {
    // 2. Update state to show checkmark
    setCopiedMessageId(messageId);
    console.log("Message copied to clipboard");
    
    // 3. Schedule state reset after 2 seconds
    setTimeout(() => {
      setCopiedMessageId(null);
    }, 2000);
  }).catch((err) => {
    // 4. Handle copy failure
    console.error("Failed to copy:", err);
  });
};
```

### Function Flow

```
handleCopy(messageId, content)
    ↓
navigator.clipboard.writeText(content)
    ↓
Is Copy Successful?
    ├─ YES:
    │   ├─ setCopiedMessageId(messageId)
    │   ├─ Log success
    │   └─ setTimeout(() => {
    │       setCopiedMessageId(null)
    │     }, 2000)
    │
    └─ NO:
        └─ Log error
```

## Component Integration

### ChatMessage Props

```typescript
interface ChatMessageProps {
  message: Message;
  onFeedback?: (messageId: string, feedback: "like" | "dislike") => void;
  onRetry?: (messageId: string) => void;
  onCopy?: (messageId: string, content: string) => void;
  onDelete?: (messageId: string) => void;
  isLoading?: boolean;
  isCopied?: boolean;  // NEW
}
```

### Copy Button Implementation

```typescript
<Button
  variant="ghost"
  size="sm"
  onClick={() => onCopy?.(message.id, message.content)}
  disabled={isLoading}
  className={`h-6 w-6 p-0 transition-all ${
    isCopied
      ? "text-green-400 bg-green-500/10"
      : "text-muted-foreground hover:text-blue-400 hover:bg-blue-500/10"
  }`}
  title={isCopied ? "Copied!" : "Copy to clipboard"}
>
  {isCopied ? (
    <Check className="h-3.5 w-3.5" />
  ) : (
    <Copy className="h-3.5 w-3.5" />
  )}
</Button>
```

### Conditional Rendering

The button shows different content based on `isCopied` prop:

**When `isCopied === false` (default)**:
- Icon: `<Copy />` (📋)
- Color: Muted foreground
- Hover: Blue
- Title: "Copy to clipboard"

**When `isCopied === true`**:
- Icon: `<Check />` (✅)
- Color: Green
- Hover: Green (no change needed)
- Title: "Copied!"

## Styling Details

### CSS Classes Breakdown

**Normal State**:
```typescript
"h-6 w-6 p-0 text-muted-foreground hover:text-blue-400 hover:bg-blue-500/10"
```

- `h-6 w-6` - Height and width (24px)
- `p-0` - No padding
- `text-muted-foreground` - Default text color (light gray)
- `hover:text-blue-400` - Blue text on hover
- `hover:bg-blue-500/10` - Blue background at 10% opacity on hover

**Copied State**:
```typescript
"text-green-400 bg-green-500/10"
```

- `text-green-400` - Green text
- `bg-green-500/10` - Green background at 10% opacity
- `transition-all` - Smooth color transition

### Color Reference

| State | Color Class | Hex Value | Usage |
|-------|------------|-----------|-------|
| Normal text | `text-muted-foreground` | `#a1a1a1` | Default text color |
| Hover text | `hover:text-blue-400` | `#60a5fa` | Blue on hover |
| Hover bg | `hover:bg-blue-500/10` | `#3b82f6 + 10%` | Blue background |
| Copied text | `text-green-400` | `#4ade80` | Green success text |
| Copied bg | `bg-green-500/10` | `#22c55e + 10%` | Green background |

## Timing Control

### Two-Second Duration

```typescript
setTimeout(() => {
  setCopiedMessageId(null);
}, 2000);
```

**Why 2 seconds?**
- Long enough for user to register the change
- Short enough to not feel sluggish
- Optimal for visual feedback UX
- Matches common platform patterns (GitHub, Twitter, etc.)

**Customizing Duration**:
To change feedback duration:
```typescript
const COPY_FEEDBACK_DURATION = 3000; // 3 seconds

setTimeout(() => {
  setCopiedMessageId(null);
}, COPY_FEEDBACK_DURATION);
```

## Error Handling

### Clipboard API Error Cases

```typescript
navigator.clipboard.writeText(content)
  .then(() => {
    // Success path
  })
  .catch((err) => {
    // Error paths:
    // - NotAllowedError: User denied clipboard permission
    // - NotSupported: Browser doesn't support Clipboard API
    // - NetworkError: User is in private browsing mode
    console.error("Failed to copy:", err);
  });
```

### Error Messages

| Error | Cause | User Impact |
|-------|-------|-------------|
| NotAllowedError | Clipboard permission denied | User must grant permission |
| NotSupported | Old browser | Fallback needed |
| NetworkError | Private browsing | Clipboard blocked |

## Performance Considerations

### Re-render Optimization

The copy feedback only affects the specific message:

```typescript
// Only THIS message re-renders when copiedMessageId changes
<ChatMessage
  isCopied={copiedMessageId === message.id}
/>

// Other messages don't re-render because:
// copiedMessageId !== their message.id
```

### Memory Impact

- State size: ~50 bytes (messageId string)
- Timeout: Single timer per copy
- No array growth or memory leaks
- Timeout auto-cleanup

## Testing the Implementation

### Unit Test Example

```typescript
describe('Copy Button Feedback', () => {
  test('should show checkmark when copied', async () => {
    // 1. Render message with copy button
    // 2. Click copy button
    // 3. Assert isCopied prop changes to true
    // 4. Wait 2 seconds
    // 5. Assert isCopied prop changes back to false
  });

  test('should copy content to clipboard', async () => {
    // 1. Mock navigator.clipboard
    // 2. Click copy button
    // 3. Assert writeText called with correct content
  });
});
```

### Integration Test Example

```typescript
describe('AIChat Copy Feedback', () => {
  test('should update message state and reset after 2 seconds', () => {
    // 1. Send message to chat
    // 2. Hover and click copy button
    // 3. Observe checkmark appears
    // 4. Wait 2 seconds
    // 5. Observe copy icon returns
    // 6. Paste to verify content copied
  });
});
```

## Debugging

### Console Logging

The implementation includes console logging:

```typescript
console.log("Message copied to clipboard");    // On success
console.error("Failed to copy:", err);         // On error
```

### DevTools Watch

To monitor state changes in browser DevTools:

1. Open DevTools (F12)
2. Go to Console tab
3. Click copy button
4. Watch for "Message copied to clipboard" log
5. Verify message appears in console

### React DevTools

To inspect component state:

1. Install React DevTools
2. Go to Components tab
3. Find AIChat component
4. Watch `copiedMessageId` state change
5. See it reset to `null` after 2 seconds

## Modification Guide

### Change Feedback Icon

Replace `Check` with another icon:

```typescript
import { Check, CheckCircle, CheckSquare } from "lucide-react";

// In button render:
{isCopied ? (
  <CheckCircle className="h-3.5 w-3.5" />  // Circle variant
) : (
  <Copy className="h-3.5 w-3.5" />
)}
```

### Change Feedback Duration

Update the timeout value:

```typescript
setTimeout(() => {
  setCopiedMessageId(null);
}, 3000);  // Change to 3 seconds
```

### Change Feedback Color

Modify Tailwind classes:

```typescript
// Changed to purple feedback
"text-purple-400 bg-purple-500/10"
```

### Add Sound Notification

Add after successful copy:

```typescript
const handleCopy = (messageId: string, content: string) => {
  navigator.clipboard.writeText(content).then(() => {
    setCopiedMessageId(messageId);
    
    // Add sound
    const audio = new Audio('/sounds/copy-success.mp3');
    audio.play().catch((err) => console.error("Failed to play sound:", err));
    
    setTimeout(() => {
      setCopiedMessageId(null);
    }, 2000);
  }).catch((err) => {
    console.error("Failed to copy:", err);
  });
};
```

### Add Toast Notification

Integrate with toast library:

```typescript
import { useToast } from "@/hooks/use-toast";

export const AIChat = ({ isOpen, onOpenChange }: AIChatProps) => {
  const { toast } = useToast();
  
  const handleCopy = (messageId: string, content: string) => {
    navigator.clipboard.writeText(content).then(() => {
      setCopiedMessageId(messageId);
      
      // Add toast
      toast({
        title: "Copied!",
        description: "Message copied to clipboard",
        duration: 2000,
      });
      
      setTimeout(() => {
        setCopiedMessageId(null);
      }, 2000);
    }).catch((err) => {
      console.error("Failed to copy:", err);
      toast({
        title: "Copy Failed",
        description: err.message,
        variant: "destructive",
      });
    });
  };
};
```

## Maintenance Checklist

- [ ] Icon import available (`Check` from lucide-react)
- [ ] State declared (`copiedMessageId`)
- [ ] Handler function defined (`handleCopy`)
- [ ] Component props updated (`isCopied`)
- [ ] Button rendering conditional on `isCopied`
- [ ] Prop passed to ChatMessage component
- [ ] Styling applied correctly
- [ ] Timeout properly configured
- [ ] Error handling in place
- [ ] Build verified successful

## Common Issues

### Issue: Icon doesn't change
**Solution**: Check that `isCopied` prop is passed correctly and state is updating

### Issue: Icon doesn't reset
**Solution**: Verify timeout is working; check browser DevTools for errors

### Issue: Copy fails silently
**Solution**: Check browser console for Clipboard API errors; verify clipboard permissions

### Issue: Multiple messages show checkmark
**Solution**: Verify `copiedMessageId` is being compared correctly with `message.id`

## Best Practices

1. **Always handle clipboard errors** - Use .catch() for error cases
2. **Keep feedback duration consistent** - 2 seconds is ideal
3. **Use visual feedback instead of UI overlays** - Cleaner UX
4. **Log important events** - Help with debugging
5. **Test on multiple browsers** - Clipboard API support varies
6. **Consider accessibility** - Icon change should work with screen readers
