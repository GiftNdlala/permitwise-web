
---

### 🔧 **PROJECT SUMMARY**

**Goal:** Digitize the paper-based "Form 1A" from the Department of Transport into a mobile-friendly **web application** for permit applications, using **Firebase** for backend services.

---

## ✅ Step-by-Step Plan to Get Started

### 🔹 STEP 1: Understand the Form

You’ve uploaded the full form — good move. It has multiple sections (A to M), including:

* Applicant info
* Vehicle details
* Type of transport service
* Route descriptions
* Timetables
* Declaration
* Attachments (like Tax Certs, ID docs, permits, etc.)

This means your form **needs file uploads, conditional sections, and dynamic form fields**.

---

### 🔹 STEP 2: Choose the Tech Stack (recommended)

Because they only specified Firebase + “web app,” here’s a beginner-friendly but powerful stack:

| Feature          | Tech                                   |
| ---------------- | -------------------------------------- |
| Frontend         | **React** (with Tailwind or basic CSS) |
| Backend/Database | **Firebase Firestore**                 |
| Auth             | **Firebase Authentication**            |
| File uploads     | **Firebase Storage**                   |
| Hosting          | **Firebase Hosting**                   |
| Form state mgmt  | `react-hook-form` or `formik`          |

> ✅ You can expand to mobile later via React Native or PWA (Progressive Web App).

---

### 🔹 STEP 3: Setup Firebase Environment

If you’ve been added to the project:

1. Visit: [Firebase Console - PermitsWise](https://console.firebase.google.com/u/1/project/permitswise/appcheck)
2. Look for **Project Overview → Settings → Web App**
3. If no app exists, click **“Add App” → Web** and copy the Firebase config:

   ```js
   const firebaseConfig = {
     apiKey: "XXXX",
     authDomain: "permitswise.firebaseapp.com",
     projectId: "permitswise",
     storageBucket: "permitswise.appspot.com",
     messagingSenderId: "...",
     appId: "...",
   };
   ```

---

### 🔹 STEP 4: Scaffold Your Project

In your terminal:

```bash
npx create-react-app permitswise-web
cd permitswise-web
npm install firebase react-router-dom react-hook-form
```

Initialize Firebase in your project:

```js
// src/firebase.js
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  // paste your config here
};

const app = initializeApp(firebaseConfig);
export default app;
```

---

### 🔹 STEP 5: Build the Core Form Page

Start with **Section A → D**:

```bash
src/
 └── pages/
      └── ApplicationForm.js
```

Inside `ApplicationForm.js`, start simple:

```jsx
function ApplicationForm() {
  return (
    <form>
      <h2>Section A: Application Type</h2>
      <label>
        <input type="checkbox" name="applicationType" value="new" />
        New Operating Licence
      </label>
      {/* Add rest of the sections progressively */}
    </form>
  );
}
```

Use [`react-hook-form`](https://react-hook-form.com/) or `formik` to manage dynamic form state later.

---

### 🔹 STEP 6: Firebase Features to Use

| Feature      | How to Use                                                                     |
| ------------ | ------------------------------------------------------------------------------ |
| 🔐 Auth      | Allow users to sign up/login before submitting forms. Use Email/Password auth. |
| 📁 Storage   | For uploading supporting docs: ID, Tax Cert, Permits, etc.                     |
| 📝 Firestore | Store submitted form data per user                                             |
| 🌐 Hosting   | Use `firebase deploy` to publish your app when ready                           |

---

### 🔹 STEP 7: Suggested MVP Sections

You don't need the full form to go live. Start with:

* [x] Section A: Application type
* [x] Section B: Applicant Info
* [x] Section C: Contact Person
* [x] Section K: Declaration
* [x] Upload: ID/Tax Clearance Cert

Then add:

* Route details
* Vehicle info
* Scheduling
* Authenticated user dashboard

---

### 🛠️ Firebase Dev Tips for Beginners

* Firebase has a **free tier** – use it during dev.
* Try Firebase Emulator Suite (`firebase emulators:start`) for testing offline.
* Use **Firestore rules** to ensure security, like:

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /applications/{appId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

### 🔚 Final Notes

1. Confirm with my team if **permit reviewers** need an admin dashboard for later.
2. Create and Keep a **clean GitHub repo**.

