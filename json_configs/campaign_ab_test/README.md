# A/B Test Campaign Configuration

This directory contains a complete A/B test campaign example demonstrating the **Lander Engine's cascading override system**. Two distinct variants (A and B) are implemented with different themes, messaging, and user flows while sharing base configuration.

## 📁 Directory Structure

```
campaign_ab_test/
├── flow.json                  # Shared flow definition (all variants)
├── theme.json                 # Base theme (default design tokens)
├── layout.json                # Shared header/footer components
├── steps/                     # Base step definitions
│   ├── main.json              # Landing page template
│   ├── form.json              # Registration form template
│   └── confirmation.json      # Success page template
│
├── variant_a/                 # VARIANT A: Premium Focus (Desktop)
│   ├── theme.json             # Blue color scheme override
│   ├── steps/
│   │   ├── main.json          # "Premium" messaging
│   │   ├── form.json          # Features premium benefits
│   │   └── confirmation.json  # Premium welcome
│   │
│   └── mobile/                # VARIANT A: Premium on Mobile
│       ├── theme.json         # Blue + mobile optimizations
│       └── steps/
│           ├── main.json      # Premium messaging on mobile
│           ├── form.json      # Premium form on mobile
│           └── confirmation.json
│
└── variant_b/                 # VARIANT B: Free Tier Focus (Desktop)
    ├── theme.json             # Green color scheme override
    ├── steps/
    │   ├── main.json          # "Simple & Free" messaging
    │   ├── form.json          # No credit card messaging
    │   └── confirmation.json  # Free account welcome
    │
    └── mobile/                # VARIANT B: Free on Mobile
        ├── theme.json         # Green + mobile optimizations
        └── steps/
            ├── main.json      # Free messaging on mobile
            ├── form.json      # Free form on mobile
            └── confirmation.json
```

## 🎯 Campaign Overview

### Variants Comparison

| Aspect | Variant A | Variant B |
|--------|-----------|-----------|
| **Theme** | Blue/Professional | Green/Friendly |
| **Value Prop** | Premium Features & Exclusive Access | Simple, Free, No Credit Card |
| **CTA** | "Start My Journey" | "Sign Up Free" |
| **Price Model** | 30-day premium trial | Free tier forever |
| **Features** | Advanced capabilities | Core features |
| **Primary Audience** | Power users & professionals | Budget-conscious users |

### Key Differences

**Variant A (Premium):**
- Blue color scheme (#3b82f6 primary)
- Emphasizes premium features and proven results
- Includes testimonials from CEOs and founders
- Offers 30-day free premium trial
- Messaging focuses on exclusivity and enterprise security

**Variant B (Free):**
- Green color scheme (#10b981 primary)
- Emphasizes simplicity and affordability
- Highlights quick setup (5 minutes)
- No credit card required messaging
- Focuses on accessibility and cloud-based solutions

## 🔄 Cascading Override System

This config demonstrates Lander Engine's priority merge system:

```
Base (lowest priority) < Device < Variant < Variant + Device (highest priority)
```

### How It Works

1. **Base Configuration** (`theme.json`, `steps/main.json`, etc.)
   - Shared across all variants and devices
   - Defines common structure and default styling

2. **Device Overrides** (`mobile/theme.json`, `mobile/steps/main.json`)
   - Applied when mobile device detected
   - Merges into base configuration
   - Smaller fonts, compact spacing, streamlined layouts

3. **Variant Overrides** (`variant_a/theme.json`, `variant_b/theme.json`)
   - Completely replaces base configuration at that level
   - Different colors, messaging, features
   - Desktop-optimized layouts

4. **Variant + Device** (`variant_a/mobile/theme.json`)
   - Highest priority: combines variant + mobile optimizations
   - Variant colors on mobile layout
   - Maximum specificity

### Configuration Merge Priority

```
(Lowest Priority)
    ↓
Base theme.json
    ↓
+ mobile/theme.json (if mobile device)
    ↓
+ variant_a/theme.json (if variant_a requested)
    ↓
+ variant_a/mobile/theme.json (if variant_a + mobile)
    ↓
(Highest Priority)
```

### Real-World Examples

**Desktop, Base Campaign:**
```
theme.json → base colors, desktop spacing
```

**Mobile, Base Campaign:**
```
theme.json + mobile/theme.json → base colors + mobile spacing
```

**Desktop, Variant A:**
```
theme.json + variant_a/theme.json → blue colors, desktop spacing
```

**Mobile, Variant A:**
```
theme.json + variant_a/theme.json + variant_a/mobile/theme.json 
→ blue colors + mobile spacing
```

**Mobile, Variant B:**
```
theme.json + variant_b/theme.json + variant_b/mobile/theme.json 
→ green colors + mobile spacing
```

## 🚀 Access URLs

After running `lander dev`, access campaigns at:

**Desktop (Base Campaign):**
- Default: `http://localhost:4321/campaign_ab_test/main`

**Mobile (Base Campaign - Auto-detected):**
- Use Chrome DevTools mobile emulation
- Serves: `/campaign_ab_test/main.mobile`

**Desktop Variant A (Premium):**
- `http://localhost:4321/campaign_ab_test/variant_a/main`

**Mobile Variant A (Premium on Mobile):**
- Enable mobile emulation in DevTools
- Serves: `/campaign_ab_test/variant_a/main.mobile`

**Desktop Variant B (Free):**
- `http://localhost:4321/campaign_ab_test/variant_b/main`

**Mobile Variant B (Free on Mobile):**
- Enable mobile emulation in DevTools
- Serves: `/campaign_ab_test/variant_b/main.mobile`

### Testing Mobile Variants Locally

1. In Chrome DevTools: Press `F12`
2. Click the device toggle (top-left corner)
3. Select a mobile device (iPhone 12, Pixel 5, etc.)
4. The page automatically loads the `.mobile` variant
5. Page should adjust spacing, fonts, and layout

## � Mobile Device Detection & Overrides

### How Mobile Detection Works

Lander Engine automatically detects mobile devices at runtime:

1. **Client-Side Detection** — injected script checks viewport and user-agent
2. **Redirect Logic** — if mobile config exists, redirects to `.mobile` URL variant
3. **Example**:
   - User visits: `/campaign_ab_test/variant_a/main`
   - Script detects mobile device
   - Redirects to: `/campaign_ab_test/variant_a/main.mobile`
   - Mobile config is merged and served

### Mobile-Specific Optimizations

This campaign includes mobile overrides for all variants:

**Base Mobile** (`mobile/theme.json`):
```json
{
  "spacing": {
    "lg": "1rem",        // Reduced from 1.5rem
    "xl": "1.25rem"      // Reduced from 2rem
  },
  "tokens": {
    "containerPadding": "1rem",     // Reduced from 1.5rem
    "fontSize": "16px"              // Slightly smaller for mobile
  }
}
```

**Mobile Step Changes** (`mobile/steps/main.json`):
- Simplified Hero (shorter subtitle)
- Condensed Features (3 features max)
- Removed testimonials section
- Optimized tap targets for mobile interaction

**Variant A Mobile** (`variant_a/mobile/theme.json`):
- Blue color scheme maintained
- Mobile spacing + margins from variant_a
- Optimized for premium experience on small screens

**Variant B Mobile** (`variant_b/mobile/theme.json`):
- Green color scheme maintained
- Mobile spacing + margins from variant_b
- Optimized for free tier messaging on mobile

### Device-Specific Component Layout

| Component | Desktop | Mobile |
|-----------|---------|--------|
| Hero Title | Large (5xl) | Medium (3xl) |
| Feature Cards | 3 in row | Stacked vertically |
| Testimonials | Visible | Hidden |
| Form Fields | Wide inputs | Full-width |
| Spacing | 2rem padding | 1rem padding |
| CTA Button | Large (py-4) | Medium (py-3) |

---

### Core Configuration Files

#### `flow.json`
Defines the step structure and routing logic. This file is **shared** across both variants.

```json
{
  "initialStep": "main",
  "steps": {
    "main": { "type": "normal" },        // Landing page
    "form": { "type": "normal" },        // Registration form
    "confirmation": { "type": "normal" } // Success page
  }
}
```

#### `theme.json` (Base)
Default design tokens used by both variants. Includes:
- **colors**: primary, secondary, background, text, etc.
- **fonts**: body and heading font stacks
- **spacing**: xs, sm, md, lg, xl, 2xl scale
- **tokens**: borderRadius, shadow definitions

#### `layout.json`
Defines header and footer components (shared).

```json
{
  "header": { "component": "StaticHeader" },
  "footer": { "component": "StaticCard" }
}
```

### Step Files

Each step is a full-page template. They consist of:
- **sections**: Array of components to render
- **seo**: Meta tags (title, description, noindex)
- **state**: Initial state values for the page

#### `steps/main.json` (Base Landing Page)
Generic landing page with Hero, Features, and Testimonials sections.

#### `steps/form.json` (Registration Form)
User form with privacy notice.

#### `steps/confirmation.json` (Success Page)
Thank you page with next steps.

### Variant-Specific Overrides

#### `variant_a/theme.json`
Merges into base theme:
```json
{
  "colors": {
    "primary": "#3b82f6",      // Changed: Blue
    "secondary": "#1e3a8a"     // Changed: Dark blue
  },
  "tokens": {
    "buttonRadius": "6px",     // Changed: Smaller radius
    "cardShadow": "0 4px 12px rgba(59, 130, 246, 0.1)"
  }
}
```

#### `variant_a/steps/main.json`
Replaces hero messaging and features:
- CTA text: "Start My Journey"
- Features emphasize premium benefits
- Includes high-value testimonials

#### `variant_b/theme.json`
Green color scheme (#10b981) — similar pattern to Variant A.

#### `variant_b/steps/main.json`
Replaces messaging with free/open positioning:
- CTA text: "Sign Up Free"
- Features emphasize affordability
- Highlights no credit card required

## 🎨 Design Tokens

### Color Palettes

**Variant A (Blue):**
```
Primary:   #3b82f6 (Blue)
Secondary: #1e3a8a (Dark Blue)
Light BG:  #eff6ff (Light Blue)
Borders:   #dbeafe (Very Light Blue)
```

**Variant B (Green):**
```
Primary:   #10b981 (Green)
Secondary: #065f46 (Dark Green)
Light BG:  #ecfdf5 (Light Green)
Borders:   #a7f3d0 (Very Light Green)
```

### CSS Variable Mapping

These tokens become CSS custom properties:

```css
:root {
  --color-primary: #3b82f6;      /* Variant A: blue */
  --color-secondary: #1e3a8a;
  --token-buttonRadius: 6px;
  --token-cardShadow: 0 4px 12px rgba(59, 130, 246, 0.1);
}
```

Use in components:
```jsx
<h1 className="text-[var(--color-primary)]">Heading</h1>
<button style={{ borderRadius: 'var(--token-buttonRadius)' }} />
```

## 🔧 State Management

Each variant sets unique state values to track the experience:

**Variant A:**
```json
{
  "variant": "variant_a",
  "theme": "blue",
  "variantTracker": "variant_a_cta_clicked"
}
```

**Variant B:**
```json
{
  "variant": "variant_b",
  "theme": "green",
  "variantTracker": "variant_b_cta_clicked"
}
```

This state can be accessed in custom actions to:
- Track variant analytics
- Conditionally render components
- Store user preferences

## 📊 Analytics Integration

To track A/B test performance, add custom actions:

```json
{
  "type": "rest",
  "payload": {
    "url": "/api/analytics",
    "method": "POST",
    "body": {
      "event": "variant_conversion",
      "variant": "variant_a",
      "page": "confirmation"
    },
    "onSuccess": [
      { "type": "navigation", "payload": { "to": "main", "type": "step" } }
    ]
  }
}
```

## 🚀 Testing the Configuration

### Development
```bash
npm run dev
# Visit http://localhost:4321/campaign_ab_test/main
# Visit http://localhost:4321/campaign_ab_test/variant_a/main
# Visit http://localhost:4321/campaign_ab_test/variant_b/main
```

### Building
```bash
npm run build
# Generates static files for all variants in .lander-engine/dist/
```

### Verify Merge System
Each variant's final configuration should be a merge of:
1. Base config
2. Variant-specific overrides

You can inspect in browser DevTools or logs.

## 🔌 Extending the Configuration

### Add More Variants

Create `variant_c/` (or any name) following the same pattern:

1. **Create variant directory:**
   ```
   variant_c/
   ├── theme.json
   └── steps/
       ├── main.json
       ├── form.json
       └── confirmation.json
   ```

2. **Define unique theme** (`variant_c/theme.json`):
   ```json
   {
     "colors": {
       "primary": "#f59e0b",    // New orange primary
       "secondary": "#d97706"
     }
   }
   ```

3. **Update messaging** (`variant_c/steps/main.json`):
   ```json
   {
     "sections": [
       {
         "component": "Hero",
         "props": {
           "title": "Your Custom Variant Message",
           "ctaText": "Custom CTA"
         }
       }
     ]
   }
   ```

4. **Access immediately:**
   - `http://localhost:4321/campaign_ab_test/variant_c/main`
   - Mobile auto-routes to `.mobile` if config exists

### Add Mobile-Specific Variant

After creating `variant_c/`, add mobile overrides:

```
variant_c/mobile/
├── theme.json
└── steps/
    ├── main.json
    ├── form.json
    └── confirmation.json
```

Visits from mobile devices to `/campaign_ab_test/variant_c/main` automatically serve `/campaign_ab_test/variant_c/main.mobile` with merged configurations.

### Create Device-Specific Variants (Advanced)

Beyond mobile, future Lander versions could support other devices:

```
variant_a/
├── theme.json
├── desktop/      # Desktop-specific optimizations
├── mobile/       # Mobile optimizations (current)
├── tablet/       # Future: tablet optimizations
└── steps/
```

### Testing Multiple Variants Programmatically

Use state to track variant performance:

```typescript
// Custom action handler
export default {
  trackVariantConversion: async (payload) => {
    const state = getState('variant');
    const device = getState('deviceType');
    
    await fetch('/api/analytics', {
      method: 'POST',
      body: JSON.stringify({
        variant: state,
        device: device,
        event: payload.event,
        timestamp: new Date().toISOString()
      })
    });
  }
};
```

### Generate All Variant Combinations

When you run `lander build`, static files are generated for all variants:

```
.lander-engine/dist/
├── campaign_ab_test/main/index.html
├── campaign_ab_test/main.mobile/index.html
├── campaign_ab_test/variant_a/main/index.html
├── campaign_ab_test/variant_a/main.mobile/index.html
├── campaign_ab_test/variant_a/form/index.html
├── campaign_ab_test/variant_a/form.mobile/index.html
├── campaign_ab_test/variant_b/main/index.html
├── campaign_ab_test/variant_b/main.mobile/index.html
└── ... (all combinations)
```

### Custom Actions
Define custom action handlers in `actions/` directory (project root):

```typescript
// actions/trackConversion.ts
export default {
  trackConversion: async (payload) => {
    await fetch('/api/track', {
      method: 'POST',
      body: JSON.stringify({
        variant: payload.variant,
        step: payload.step,
        timestamp: new Date().toISOString()
      })
    });
  }
};
```

Use in JSON:
```json
{
  "type": "trackConversion",
  "payload": { "variant": "variant_a", "step": "confirmation" }
}
```

## 📚 Resources

- **Lander Stack**: TypeScript, Astro, React, Tailwind CSS, Nanostores
- **Engine Docs**: [lander-engine README](https://github.com/Dimakoua/lander-engine)
- **Cascading System**: Supports multi-level overrides (device, variant, combined)
- **Static Output**: All campaigns generate pure HTML/CSS/JS — no server required

## 💡 Best Practices

1. **Keep Base Configs Simple** — Only define what's truly shared
2. **Use Descriptive Variant Names** — `variant_a` can be changed to `variant_premium` in production
3. **Test Mobile Variants** — Use DevTools mobile emulation
4. **Monitor Analytics** — Track conversion rates per variant to determine winner
5. **Document Decisions** — Add comments to theme.json about why colors changed
6. **Use CSS Variables** — Makes variant styling flexible without code changes

## 🎓 Learning Resources

This configuration demonstrates:
- ✅ Cascading configuration system
- ✅ Multi-step user flows
- ✅ Design token system
- ✅ Component binding
- ✅ State management patterns
- ✅ SEO configuration per page
- ✅ Action-based interactivity

Perfect for learning Lander Engine's core concepts!
