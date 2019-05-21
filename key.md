### 因为Java不是弱类型语言，val统一使用字符串
- ws连接字符串 ws://localhost:8887/
- 发送任意字符串
```json
{
    "type": "text",
    "val": "any 字符串"
}
```
- 发送传统keycode (如下发送<-删除键)
```json
{
    "type": "key",
    "val": "67" 
}
```
- 发送键盘action 比如'完成'这种右下角的按钮
```json
{
    "type": "editor",
    "val": "6" 
}
```

- 源码里翻出来的
```java
public class EditorInfo {

    /**
     * Set of bits in {@link #imeOptions} that provide alternative actions
     * associated with the "enter" key.  This both helps the IME provide
     * better feedback about what the enter key will do, and also allows it
     * to provide alternative mechanisms for providing that command.
     */
    public static final int IME_MASK_ACTION = 0x000000ff;

    /**
     * Bits of {@link #IME_MASK_ACTION}: no specific action has been
     * associated with this editor, let the editor come up with its own if
     * it can.
     */
    public static final int IME_ACTION_UNSPECIFIED = 0x00000000;

    /**
     * Bits of {@link #IME_MASK_ACTION}: there is no available action.
     */
    public static final int IME_ACTION_NONE = 0x00000001;

    /**
     * Bits of {@link #IME_MASK_ACTION}: the action key performs a "go"
     * operation to take the user to the target of the text they typed.
     * Typically used, for example, when entering a URL.
     */
    public static final int IME_ACTION_GO = 0x00000002;

    /**
     * Bits of {@link #IME_MASK_ACTION}: the action key performs a "search"
     * operation, taking the user to the results of searching for the text
     * they have typed (in whatever context is appropriate).
     */
    public static final int IME_ACTION_SEARCH = 0x00000003;

    /**
     * Bits of {@link #IME_MASK_ACTION}: the action key performs a "send"
     * operation, delivering the text to its target.  This is typically used
     * when composing a message in IM or SMS where sending is immediate.
     */
    public static final int IME_ACTION_SEND = 0x00000004;

    /**
     * Bits of {@link #IME_MASK_ACTION}: the action key performs a "next"
     * operation, taking the user to the next field that will accept text.
     */
    public static final int IME_ACTION_NEXT = 0x00000005;

    /**
     * Bits of {@link #IME_MASK_ACTION}: the action key performs a "done"
     * operation, typically meaning there is nothing more to input and the
     * IME will be closed.
     */
    public static final int IME_ACTION_DONE = 0x00000006;

    /**
     * Bits of {@link #IME_MASK_ACTION}: like {@link #IME_ACTION_NEXT}, but
     * for moving to the previous field.  This will normally not be used to
     * specify an action (since it precludes {@link #IME_ACTION_NEXT}), but
     * can be returned to the app if it sets {@link #IME_FLAG_NAVIGATE_PREVIOUS}.
     */
    public static final int IME_ACTION_PREVIOUS = 0x00000007;
}

```
