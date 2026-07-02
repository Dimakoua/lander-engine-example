# Configuration Reference

## `theme.json` Reference
Defines design tokens that are injected into the page as CSS custom properties on `<html>`.

```json
{
  "colors": {
    "primary":    "#3b82f6",
    "secondary":  "#1e293b",
    "background": "#ffffff",
    "text":       "#0b0c10"
  },
  "fonts": {
    "body": "Inter, sans-serif"
  },
  "fontSources": [
    "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
  ],
  "tokens": {
    "buttonRadius": "12px",
    "cardShadow":   "0 4px 24px rgba(0,0,0,0.08)"
  },
  "favicon": "/assets/campaign-a-icon.svg"
}
```

### Typography and Custom Fonts

The engine supports dynamic loading of custom web fonts and applies them as CSS custom properties.

#### `fontSources`
An array of URLs for external stylesheets containing `@font-face` rules (e.g. Google Fonts, Typekit).
These are dynamically injected into the page `<head>` as `<link rel="stylesheet">` elements during the build process to load the custom fonts.

#### `fonts`
A key-value mapping of logical font names to CSS font stacks. These are translated to `--font-[key]` variables.
Always define a fallback font (like `sans-serif` or `serif`) in the font stack configuration to protect layout rendering in case of network loading delays.

**CSS variable mapping:**

| JSON path | CSS variable |
|---|---|
| `colors.primary` | `--color-primary` |
| `colors.secondary` | `--color-secondary` |
| `colors.background` | `--color-background` |
| `tokens.buttonRadius` | `--token-buttonRadius` |
| `fonts.body` | `--font-body` |
| `fonts.heading` | `--font-heading` |

Use these in your components and Tailwind classes:

```tsx
// In a component
<h1 className="font-[family-name:var(--font-heading)] text-[color:var(--color-primary)]">Hello</h1>
<button style={{ borderRadius: 'var(--token-buttonRadius)' }}>Click</button>
```

| Field | Type | Required | Description |
|---|---|---|---|
| `colors` | `Record<string, string>` | Yes | Color palette |
| `fonts` | `Record<string, string>` | No | Font stack definitions mapped to CSS variables |
| `fontSources` | `string[]` | No | URLs to external stylesheets containing font definitions |
| `spacing` | `Record<string, string>` | No | Spacing scale |
| `borderRadius` | `Record<string, string>` | No | Border-radius scale |
| `tokens` | `Record<string, any>` | No | Arbitrary named design tokens |
| `favicon` | `string` | No | Favicon URL |
