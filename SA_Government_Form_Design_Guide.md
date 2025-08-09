our current **PermitWise Design Guide** is written around the **old Form 1A print-style layout** (black borders, light gray headers), but now we have a **modern dashboard-based dark theme** from the new UI/UX designs we just viewd.

Here’s an **updated, in-depth version** that merges our government form structure requirements with the **modern PermitWise dashboard theme** so we can build it exactly like the new screenshots.


# **PermitWise Design Guide**

## Modern Dark Theme UI/UX Specifications

---

## 📋 **Document Overview**

This guide outlines the **UI/UX specifications** for the **PermitWise** web application in its new **modern dark mode dashboard design**. It specifies layouts, colors, typography, and interactive patterns to ensure **consistency** across all pages and components, while aligning with **Form 1A government requirements**.

---

## 🎨 **Overall Design Philosophy**

### **Dark Theme Characteristics**

* Professional, modern, and clean admin dashboard look
* **Dark charcoal background** for the main interface
* **High-contrast text** for readability
* **Purple as the primary accent** for navigation highlights
* **Green, yellow, red status chips** for approvals, pending, rejections
* Clean separation of sidebar, header, and content areas
* Fully **responsive layout** for desktop and mobile

---

## 📐 **Layout & Structure**

### **Main App Layout**

```
┌──────────────────────────────────────────────┐
│ Sidebar (Purple) │  Topbar + Content Area     │
│                  │                            │
│                  │   ┌─────────────────────┐ │
│                  │   │ Page Title          │ │
│                  │   ├─────────────────────┤ │
│                  │   │ Page Content        │ │
│                  │   └─────────────────────┘ │
└──────────────────────────────────────────────┘
```

#### **Sidebar**

* Fixed left column (250px wide desktop, collapsible mobile)
* **Sections**:

  * Dashboard
  * Permits (List, New)
  * Licences
  * Workflows
  * Notifications
  * Payments
  * Analytics
  * Settings
  * Admin
  * Log Out

#### **Topbar**

* Page title & breadcrumb
* Search bar
* User profile dropdown
* Optional help/AI assistant button

---

## 🔤 **Typography**

```
Font Family: Inter, Arial, sans-serif
```

| Element          | Size | Weight | Color      |
| ---------------- | ---- | ------ | ---------- |
| Sidebar nav text | 14px | 500    | #ffffff    |
| Page titles      | 20px | 600    | #ffffff    |
| Section headers  | 16px | 600    | #ffffff    |
| Field labels     | 13px | 500    | #bbbbbb    |
| Input text       | 14px | 400    | #ffffff    |
| Helper text      | 12px | 400    | #888888    |
| Status badges    | 12px | 600    | white text |

---

## 🎯 **Form Layout (Multi-Step Wizard)**

Each form step corresponds to a **tab** at the top:

* Applicant Data
* Address Info
* Documentation
* Vehicle Data
* Audit
* Workflows
* Notifications
* Status

**General Form Container**

* Background: `#1e1e2d`
* Rounded corners: 8px
* Padding: 20px
* Section spacing: 24px
* Field spacing: 16px

**Form Fields**

* Input background: `#2a2a3d`
* Input border: `1px solid #3c3c50`
* Border radius: 6px
* Focus state: `border: 1px solid #6c5ce7` (purple glow)
* Label color: `#bbbbbb`
* Required indicator: Red asterisk `*`

---

## 📋 **Table Design (Permit List)**

**Header Row**

* Background: transparent
* Text color: `#bbbbbb`
* Font weight: 600
* Padding: 12px

**Rows**

* Background hover: `rgba(255,255,255,0.03)`
* Padding: 12px
* Text color: `#ffffff`

**Status Chips**

* Approved: green background `#27ae60`
* Pending: yellow background `#f1c40f`
* Rejected: red background `#e74c3c`
* Border radius: 12px
* Padding: `4px 8px`
* Text: white, bold

---

## 📦 **Component Guidelines**

### Sidebar Navigation

* Icon + text
* Active state: purple highlight bar, darker background
* Hover state: lighter purple background

### Buttons

| Type      | Background       | Text Color | Border Radius |
| --------- | ---------------- | ---------- | ------------- |
| Primary   | #6c5ce7 (purple) | white      | 6px           |
| Secondary | #2a2a3d          | white      | 6px           |
| Success   | #27ae60          | white      | 6px           |
| Danger    | #e74c3c          | white      | 6px           |

Hover: Slightly darker shade
Disabled: Reduced opacity, no hover effect

---

## 📱 **Responsive Design**

* **≥ 1024px**: Full sidebar visible, multi-column forms
* **768px – 1023px**: Collapsible sidebar, single-column forms
* **< 768px**: Sidebar hidden behind hamburger, tabs converted to dropdown

---

## 🎨 **Color Palette**

```
Background (main): #1e1e2d
Content panels: #2a2a3d
Borders: #3c3c50
Primary accent: #6c5ce7
Secondary accent: #00cec9
Text (primary): #ffffff
Text (secondary): #bbbbbb
Status Green: #27ae60
Status Yellow: #f1c40f
Status Red: #e74c3c
```

---

## 📝 **Page & Route List**

1. `/dashboard` – Overview metrics
2. `/permits`

   * `/permits/list` – Data table
   * `/permits/new` – Multi-step wizard form
3. `/licences`
4. `/workflows`
5. `/notifications`
6. `/payments`
7. `/analytics`
8. `/settings`
9. `/admin`

---

## ✅ **Developer Implementation Notes**

* Use **CSS variables** for theme colors
* Stick to **8px spacing grid**
* Use a **UI library** (e.g., MUI or Tailwind) but override for custom dark theme
* Follow **React component pattern** for forms (controlled inputs)
* Use **React Router** for sidebar navigation

