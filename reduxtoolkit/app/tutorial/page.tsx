import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Redux Toolkit – Step by Step Tutorial",
  description:
    "Learn Redux Toolkit with Next.js from scratch: installation, store, slices, hooks, async thunks, and SEO patterns.",
};

export default function TutorialPage() {
  return (
    <main className="tut-page">
      {/* ── NAV ─────────────────────────────── */}
      <nav className="tut-nav">
        <span className="tut-nav-logo">📦 Redux Toolkit Tutorial</span>
        <a href="/" className="tut-nav-link">← Back to Demo</a>
      </nav>

      {/* ── HERO ────────────────────────────── */}
      <header className="tut-hero">
        <div className="tut-badge">🚀 Complete Guide</div>
        <h1 className="tut-hero-title">
          Redux Toolkit
          <span className="tut-gradient"> Step by Step</span>
        </h1>
        <p className="tut-hero-sub">
          From zero to a fully working Next.js + Redux app — with every command,
          every file, every line of code explained.
        </p>

        {/* PROGRESS DOTS */}
        <div className="tut-progress-row">
          {[
            "Why Redux?","Setup","Install","Store","Slice","Provider","Hooks","Component","Async","SEO",
          ].map((label, i) => (
            <div key={i} className="tut-dot-group">
              <div className="tut-dot">{i + 1}</div>
              <span className="tut-dot-label">{label}</span>
            </div>
          ))}
        </div>
      </header>

      <div className="tut-content">

        {/* ══════════════════════════════════════════════════════ */}
        {/* STEP 0 — WHY                                          */}
        {/* ══════════════════════════════════════════════════════ */}
        <section className="tut-step">
          <div className="tut-step-num">WHY</div>
          <div className="tut-step-body">
            <h2 className="tut-step-title">Why Use Redux Toolkit?</h2>
            <p className="tut-step-desc">
              Before we start coding, understand the <strong>problem Redux solves</strong>.
            </p>

            {/* Problem vs Solution */}
            <div className="tut-compare">
              <div className="tut-compare-col tut-bad">
                <div className="tut-compare-head">😫 Without Redux (Prop Drilling)</div>
                <div className="tut-compare-code">
                  <TutCode code={`// App.tsx passes username to EVERY child
<App username={username}>
  <Header username={username}>
    <NavBar username={username}>
      <Avatar username={username} />
    </NavBar>
  </Header>
  <Page username={username}>
    <Profile username={username} />
  </Page>
</App>

// Change username? Update it in EVERY component!
// This is called "Prop Drilling" 😩`} />
                </div>
              </div>
              <div className="tut-compare-col tut-good">
                <div className="tut-compare-head">✅ With Redux (Global Store)</div>
                <div className="tut-compare-code">
                  <TutCode code={`// ONE store holds username
// ANY component reads it directly

// Avatar.tsx
const username = useAppSelector(
  state => state.user.username
)

// Profile.tsx
const username = useAppSelector(
  state => state.user.username
)

// No props passed! 🎉`} />
                </div>
              </div>
            </div>

            <div className="tut-features-grid">
              {[
                { icon: "🏪", title: "One Source of Truth", desc: "All app state lives in ONE store. No confusion about where data comes from." },
                { icon: "🔄", title: "Predictable Updates", desc: "State only changes through actions → reducers. Easy to trace every change." },
                { icon: "🛠️", title: "Redux DevTools", desc: "See every action, inspect state at any point, time-travel debug!" },
                { icon: "⚡", title: "Immer Built-In", desc: "Write 'mutating' code that's actually safe. No more {...state, value: x} spread syntax." },
                { icon: "🔗", title: "Share State Anywhere", desc: "Any component in your tree can read/write state without passing props." },
                { icon: "📦", title: "Less Boilerplate", desc: "Redux Toolkit cuts old Redux code by ~75%. createSlice replaces 5 separate files." },
              ].map((f) => (
                <div key={f.title} className="tut-feature-card">
                  <div className="tut-feature-icon">{f.icon}</div>
                  <h3 className="tut-feature-title">{f.title}</h3>
                  <p className="tut-feature-desc">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════ */}
        {/* STEP 1 — CREATE NEXT.JS PROJECT                       */}
        {/* ══════════════════════════════════════════════════════ */}
        <section className="tut-step">
          <div className="tut-step-num">01</div>
          <div className="tut-step-body">
            <h2 className="tut-step-title">Create a Next.js Project</h2>
            <p className="tut-step-desc">
              Open your terminal and run this command. It creates a brand-new
              Next.js project with TypeScript, Tailwind, and the App Router.
            </p>

            <TutTerminal
              label="Terminal"
              cmd="npx create-next-app@latest my-redux-app"
            />

            <div className="tut-note tut-note-blue">
              💡 <strong>npx</strong> = runs a package without installing it globally.
              <strong> create-next-app</strong> is Next.js&apos;s official project generator.
            </div>

            <p className="tut-step-desc" style={{ marginTop: 16 }}>
              The CLI will ask you some questions. Answer like this:
            </p>

            <TutCode code={`✔ What is your project named? › my-redux-app
✔ Would you like to use TypeScript? › Yes          ← pick Yes
✔ Would you like to use ESLint? › Yes
✔ Would you like to use Tailwind CSS? › No         ← pick No (optional)
✔ Would you like your code inside a src/ directory? › No
✔ Would you like to use App Router? › Yes          ← MUST pick Yes
✔ Would you like to use Turbopack? › Yes`} />

            <TutTerminal label="Then enter your folder" cmd="cd my-redux-app" />

            <div className="tut-folder-tree">
              <div className="tut-folder-title">📁 Project Structure Created</div>
              <TutCode code={`my-redux-app/
├── app/
│   ├── layout.tsx    ← Root layout (Server Component)
│   ├── page.tsx      ← Home page
│   └── globals.css
├── public/
├── package.json
└── next.config.ts`} />
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════ */}
        {/* STEP 2 — INSTALL REDUX                                */}
        {/* ══════════════════════════════════════════════════════ */}
        <section className="tut-step">
          <div className="tut-step-num">02</div>
          <div className="tut-step-body">
            <h2 className="tut-step-title">Install Redux Toolkit & React-Redux</h2>
            <p className="tut-step-desc">
              You need <strong>two packages</strong>:
            </p>
            <div className="tut-pkg-cards">
              <div className="tut-pkg-card">
                <code>@reduxjs/toolkit</code>
                <p>The main Redux Toolkit library. Gives you <code>configureStore</code>, <code>createSlice</code>, <code>createAsyncThunk</code>, etc.</p>
              </div>
              <div className="tut-pkg-card">
                <code>react-redux</code>
                <p>Connects Redux to React. Gives you <code>Provider</code>, <code>useSelector</code>, <code>useDispatch</code>.</p>
              </div>
            </div>

            <TutTerminal label="Terminal — inside your project folder" cmd="npm install @reduxjs/toolkit react-redux" />

            <div className="tut-note tut-note-green">
              ✅ After installing, you&apos;ll see them in <code>package.json</code> under <code>dependencies</code>.
            </div>

            <TutCode code={`// package.json
"dependencies": {
  "next": "15.x.x",
  "react": "19.x.x",
  "@reduxjs/toolkit": "^2.x.x",   ← newly added
  "react-redux": "^9.x.x"          ← newly added
}`} />
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════ */}
        {/* STEP 3 — CREATE THE STORE                             */}
        {/* ══════════════════════════════════════════════════════ */}
        <section className="tut-step">
          <div className="tut-step-num">03</div>
          <div className="tut-step-body">
            <h2 className="tut-step-title">Create the Redux Store</h2>
            <p className="tut-step-desc">
              The <strong>store</strong> is the single container that holds ALL your app&apos;s state.
              Create this file:
            </p>

            <div className="tut-file-path">📄 lib/store.ts &nbsp;<span className="tut-new-badge">NEW FILE</span></div>
            <TutCode code={`import { configureStore } from '@reduxjs/toolkit'

// configureStore() creates the Redux store
// It automatically sets up:
//   ✅ Redux DevTools Extension
//   ✅ redux-thunk middleware (for async)
//   ✅ Immer (safe state mutation)
export const makeStore = () => {
  return configureStore({
    reducer: {
      // We'll add slices here in the next step
      // counter: counterReducer,
    },
  })
}

// ─── TypeScript Types ──────────────────────────────
// Always export these! They give you full type safety.

// The store type
export type AppStore = ReturnType<typeof makeStore>

// The shape of the entire state tree
// e.g. { counter: { value: 0, step: 1 } }
export type RootState = ReturnType<AppStore['getState']>

// The dispatch type (knows about thunks)
export type AppDispatch = AppStore['dispatch']`} />

            <div className="tut-explain-grid">
              <div className="tut-explain-card">
                <span className="tut-explain-term">configureStore()</span>
                <span className="tut-explain-def">The main function from Redux Toolkit. Replaces old Redux&apos;s <code>createStore()</code>.</span>
              </div>
              <div className="tut-explain-card">
                <span className="tut-explain-term">reducer: {"{}"}</span>
                <span className="tut-explain-def">This is where you register each slice. Keys become parts of your state tree.</span>
              </div>
              <div className="tut-explain-card">
                <span className="tut-explain-term">makeStore()</span>
                <span className="tut-explain-def">A factory function — creates a fresh store each time. Needed for Next.js SSR.</span>
              </div>
              <div className="tut-explain-card">
                <span className="tut-explain-term">RootState</span>
                <span className="tut-explain-def">TypeScript type for the full state. Used in hooks so TypeScript knows what data exists.</span>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════ */}
        {/* STEP 4 — CREATE A SLICE                               */}
        {/* ══════════════════════════════════════════════════════ */}
        <section className="tut-step">
          <div className="tut-step-num">04</div>
          <div className="tut-step-body">
            <h2 className="tut-step-title">Create a Slice (Your First State)</h2>
            <p className="tut-step-desc">
              A <strong>slice</strong> is one "piece" of your state — like counter, user, cart, etc.
              <code>createSlice()</code> creates the state, actions, and reducers all in one place.
            </p>

            <div className="tut-file-path">📄 lib/features/counter/counterSlice.ts &nbsp;<span className="tut-new-badge">NEW FILE</span></div>
            <TutCode code={`import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// ── Step A: Define what your state looks like ──
interface CounterState {
  value: number
  step: number
}

// ── Step B: Set the starting values ──
const initialState: CounterState = {
  value: 0,
  step: 1,
}

// ── Step C: Create the slice ──
const counterSlice = createSlice({
  name: 'counter',          // ← prefix: "counter/increment"
  initialState,
  reducers: {

    // Simple action — no data needed
    increment: (state) => {
      state.value += state.step  // ✅ Immer makes this safe!
    },

    decrement: (state) => {
      state.value -= state.step
    },

    reset: (state) => {
      state.value = 0
    },

    // Action WITH data — use PayloadAction<T>
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload   // action.payload = the number passed in
    },

    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload
    },
  },
})

// ── Step D: Export the auto-generated action creators ──
// These are the functions you'll call: dispatch(increment())
export const {
  increment,
  decrement,
  reset,
  incrementByAmount,
  setStep
} = counterSlice.actions

// ── Step E: Export selector functions (optional but clean) ──
export const selectCount = (state: { counter: CounterState }) =>
  state.counter.value

// ── Step F: Export the reducer to register in store ──
export default counterSlice.reducer`} />

            <div className="tut-note tut-note-purple">
              🍕 <strong>What is Immer?</strong> Redux Toolkit includes Immer which lets you write
              <code>state.value++</code> directly. Normally in JavaScript you can&apos;t mutate state,
              but Immer wraps it and creates a new immutable copy behind the scenes. Magic! ✨
            </div>

            {/* Visual: what createSlice auto-generates */}
            <div className="tut-auto-gen">
              <div className="tut-auto-gen-title">🤖 What <code>createSlice</code> auto-generates for you:</div>
              <div className="tut-auto-gen-grid">
                <div className="tut-auto-gen-item">
                  <div className="tut-auto-label">Action Creators</div>
                  <TutCode code={`increment()
decrement()
reset()
incrementByAmount(5)
setStep(10)`} />
                </div>
                <div className="tut-auto-gen-item">
                  <div className="tut-auto-label">Action Type Strings</div>
                  <TutCode code={`"counter/increment"
"counter/decrement"
"counter/reset"
"counter/incrementByAmount"
"counter/setStep"`} />
                </div>
              </div>
            </div>

            {/* Now register in store */}
            <p className="tut-step-desc" style={{ marginTop: 20 }}>
              Now <strong>register this slice</strong> in your store:
            </p>
            <div className="tut-file-path">📄 lib/store.ts &nbsp;<span className="tut-edit-badge">EDIT</span></div>
            <TutCode code={`import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counter/counterSlice'   // ← ADD THIS

export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: counterReducer,   // ← ADD THIS (state.counter = counterSlice's state)
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']`} />
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════ */}
        {/* STEP 5 — STOREPROVIDER + LAYOUT                       */}
        {/* ══════════════════════════════════════════════════════ */}
        <section className="tut-step">
          <div className="tut-step-num">05</div>
          <div className="tut-step-body">
            <h2 className="tut-step-title">Provide the Store to Your App</h2>
            <p className="tut-step-desc">
              React-Redux uses React Context under the hood. You need a{" "}
              <code>&lt;Provider&gt;</code> around your app so every component can
              access the store. But in Next.js App Router, <code>layout.tsx</code> is
              a <strong>Server Component</strong> — it cannot use React Context directly.
            </p>

            <div className="tut-warning">
              ⚠️ <strong>Common Mistake:</strong> If you put <code>{"use client"}</code> on{" "}
              <code>layout.tsx</code>, you lose server-side rendering and SEO benefits!
              <strong> Never do this.</strong> Use the pattern below instead.
            </div>

            <p className="tut-step-desc" style={{ marginTop: 16 }}>
              <strong>Solution:</strong> Create a small <strong>Client Component</strong>{" "}
              called <code>StoreProvider</code> and wrap children with it in layout.
            </p>

            <div className="tut-file-path">📄 lib/StoreProvider.tsx &nbsp;<span className="tut-new-badge">NEW FILE</span></div>
            <TutCode code={`'use client'   // ← This file runs in the browser

import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from './store'

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  // useRef ensures we create the store only ONCE
  // (not re-created on every render)
  const storeRef = useRef<AppStore | null>(null)

  if (!storeRef.current) {
    storeRef.current = makeStore()
  }

  return (
    <Provider store={storeRef.current}>
      {children}
    </Provider>
  )
}`} />

            <p className="tut-step-desc" style={{ marginTop: 20 }}>
              Now use it in <code>layout.tsx</code>:
            </p>
            <div className="tut-file-path">📄 app/layout.tsx &nbsp;<span className="tut-edit-badge">EDIT</span></div>
            <TutCode code={`// NO "use client" here — this stays a Server Component!
import type { Metadata } from 'next'
import StoreProvider from '@/lib/StoreProvider'    // ← ADD THIS
import './globals.css'

// SEO metadata — works because this is a Server Component
export const metadata: Metadata = {
  title: 'My Redux App',
  description: 'Built with Redux Toolkit',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // ❌ You CANNOT do this here (Server Component):
  // const count = useSelector(...)  → ERROR!

  // ✅ Wrap children in StoreProvider instead
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  )
}`} />

            <div className="tut-flow-visual">
              <div className="tut-flow-box tut-flow-server">
                <div>🖥️ Server</div>
                <code>layout.tsx</code>
                <div style={{ fontSize: "0.75rem", opacity: 0.7 }}>Server Component</div>
              </div>
              <div className="tut-flow-arrow">→</div>
              <div className="tut-flow-box tut-flow-provider">
                <div>⚡ Client</div>
                <code>StoreProvider</code>
                <div style={{ fontSize: "0.75rem", opacity: 0.7 }}>Client Component</div>
              </div>
              <div className="tut-flow-arrow">→</div>
              <div className="tut-flow-box tut-flow-children">
                <div>🧩 All</div>
                <code>children</code>
                <div style={{ fontSize: "0.75rem", opacity: 0.7 }}>Have Redux access!</div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════ */}
        {/* STEP 6 — TYPED HOOKS                                  */}
        {/* ══════════════════════════════════════════════════════ */}
        <section className="tut-step">
          <div className="tut-step-num">06</div>
          <div className="tut-step-body">
            <h2 className="tut-step-title">Create Typed Hooks</h2>
            <p className="tut-step-desc">
              React-Redux comes with <code>useSelector</code> and <code>useDispatch</code>, but
              they don&apos;t know about your store&apos;s TypeScript types. We create{" "}
              <strong>typed versions</strong> so you get full autocomplete and type checking.
            </p>

            <div className="tut-file-path">📄 lib/hooks.ts &nbsp;<span className="tut-new-badge">NEW FILE</span></div>
            <TutCode code={`import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

// ✅ USE THESE everywhere instead of the plain versions!

// Typed useDispatch — knows about thunks and your action types
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

// Typed useSelector — knows the full shape of your state
export const useAppSelector = useSelector.withTypes<RootState>()`} />

            <div className="tut-compare tut-compare-small">
              <div className="tut-compare-col tut-bad">
                <div className="tut-compare-head">❌ Without typed hooks</div>
                <TutCode code={`// No autocomplete, no type safety
import { useSelector } from 'react-redux'

// TypeScript doesn't know the state shape
// You get 'any' type — bugs hide!
const count = useSelector(
  (state: any) => state.counter.value
)`} />
              </div>
              <div className="tut-compare-col tut-good">
                <div className="tut-compare-head">✅ With typed hooks</div>
                <TutCode code={`// Full autocomplete + type safety!
import { useAppSelector } from '@/lib/hooks'

// TypeScript knows state.counter exists
// and counter.value is a number!
const count = useAppSelector(
  state => state.counter.value
)`} />
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════ */}
        {/* STEP 7 — USE IN COMPONENT                             */}
        {/* ══════════════════════════════════════════════════════ */}
        <section className="tut-step">
          <div className="tut-step-num">07</div>
          <div className="tut-step-body">
            <h2 className="tut-step-title">Use Redux in a Component</h2>
            <p className="tut-step-desc">
              Now the fun part! Create a Client Component that reads from and
              writes to the Redux store.
            </p>

            <div className="tut-file-path">📄 components/Counter.tsx &nbsp;<span className="tut-new-badge">NEW FILE</span></div>
            <TutCode code={`'use client'   // ← Must add this! Hooks only work in Client Components

import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import {
  increment,
  decrement,
  reset,
  incrementByAmount,
  selectCount,
} from '@/lib/features/counter/counterSlice'

export default function Counter() {
  // ── READ from Redux store ─────────────────────────
  const count = useAppSelector(selectCount)
  //  ↑ This re-renders the component whenever count changes!

  // ── WRITE to Redux store ──────────────────────────
  const dispatch = useAppDispatch()

  return (
    <div>
      <h1>Count: {count}</h1>

      {/* dispatch(actionCreator()) to update state */}
      <button onClick={() => dispatch(decrement())}>−</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
      <button onClick={() => dispatch(increment())}>+</button>

      {/* Pass data via payload */}
      <button onClick={() => dispatch(incrementByAmount(10))}>
        Add 10
      </button>
    </div>
  )
}`} />

            <div className="tut-file-path" style={{ marginTop: 20 }}>📄 app/page.tsx &nbsp;<span className="tut-edit-badge">EDIT</span></div>
            <TutCode code={`import Counter from '@/components/Counter'

export default function Home() {
  // This is a Server Component — just render the client component
  return (
    <main>
      <h1>My Redux App</h1>
      <Counter />
    </main>
  )
}`} />

            <TutTerminal label="Run your app" cmd="npm run dev" />

            <div className="tut-note tut-note-green">
              🎉 <strong>Visit http://localhost:3000</strong> — you should see a working counter!
              Click the buttons and watch the count change. Open Redux DevTools to see every action.
            </div>

            {/* Data flow diagram */}
            <div className="tut-dataflow">
              <div className="tut-dataflow-title">🔄 How Data Flows</div>
              <div className="tut-dataflow-steps">
                <div className="tut-df-step">
                  <div className="tut-df-icon">👆</div>
                  <div className="tut-df-label">User clicks button</div>
                </div>
                <div className="tut-df-arrow">→</div>
                <div className="tut-df-step">
                  <div className="tut-df-icon">📣</div>
                  <div className="tut-df-label"><code>dispatch(increment())</code></div>
                </div>
                <div className="tut-df-arrow">→</div>
                <div className="tut-df-step">
                  <div className="tut-df-icon">🏪</div>
                  <div className="tut-df-label">Store receives action</div>
                </div>
                <div className="tut-df-arrow">→</div>
                <div className="tut-df-step">
                  <div className="tut-df-icon">⚙️</div>
                  <div className="tut-df-label">Reducer updates state</div>
                </div>
                <div className="tut-df-arrow">→</div>
                <div className="tut-df-step">
                  <div className="tut-df-icon">🔄</div>
                  <div className="tut-df-label">Component re-renders</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════ */}
        {/* STEP 8 — MULTIPLE SLICES                              */}
        {/* ══════════════════════════════════════════════════════ */}
        <section className="tut-step">
          <div className="tut-step-num">08</div>
          <div className="tut-step-body">
            <h2 className="tut-step-title">Add Multiple Slices (Real App)</h2>
            <p className="tut-step-desc">
              Real apps have many pieces of state. Add a user slice alongside the counter:
            </p>

            <div className="tut-file-path">📄 lib/features/user/userSlice.ts &nbsp;<span className="tut-new-badge">NEW FILE</span></div>
            <TutCode code={`import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  name: string
  isLoggedIn: boolean
}

const initialState: UserState = {
  name: '',
  isLoggedIn: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isLoggedIn = true
      state.name = action.payload
    },
    logout: (state) => {
      state.isLoggedIn = false
      state.name = ''
    },
  },
})

export const { login, logout } = userSlice.actions
export default userSlice.reducer`} />

            <div className="tut-file-path" style={{ marginTop: 16 }}>📄 lib/store.ts &nbsp;<span className="tut-edit-badge">EDIT — add user slice</span></div>
            <TutCode code={`import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counter/counterSlice'
import userReducer from './features/user/userSlice'     // ← ADD

export const makeStore = () =>
  configureStore({
    reducer: {
      counter: counterReducer,   // → state.counter
      user: userReducer,         // → state.user  ← ADD
    },
  })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']`} />

            <div className="tut-note tut-note-blue">
              📦 <strong>State shape is now:</strong>
              <TutCode code={`{
  counter: { value: 0, step: 1 },
  user:    { name: '', isLoggedIn: false }
}`} />
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════ */}
        {/* STEP 9 — ASYNC THUNK                                  */}
        {/* ══════════════════════════════════════════════════════ */}
        <section className="tut-step">
          <div className="tut-step-num">09</div>
          <div className="tut-step-body">
            <h2 className="tut-step-title">Fetch API Data with createAsyncThunk</h2>
            <p className="tut-step-desc">
              Real apps fetch data from APIs. <code>createAsyncThunk</code> handles the
              loading → success → error lifecycle automatically.
            </p>

            <div className="tut-lifecycle">
              <div className="tut-lc-step tut-lc-pending">
                <div className="tut-lc-icon">⏳</div>
                <code>pending</code>
                <div className="tut-lc-desc">Request started. Show spinner.</div>
              </div>
              <div className="tut-df-arrow">→</div>
              <div className="tut-lc-step tut-lc-fulfilled">
                <div className="tut-lc-icon">✅</div>
                <code>fulfilled</code>
                <div className="tut-lc-desc">Success! Data is ready.</div>
              </div>
              <div className="tut-df-arrow">→</div>
              <div className="tut-lc-step tut-lc-rejected">
                <div className="tut-lc-icon">❌</div>
                <code>rejected</code>
                <div className="tut-lc-desc">Failed. Show error message.</div>
              </div>
            </div>

            <div className="tut-file-path">📄 lib/features/posts/postsSlice.ts &nbsp;<span className="tut-new-badge">NEW FILE</span></div>
            <TutCode code={`import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface Post { id: number; title: string; body: string }
interface PostsState {
  items: Post[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: PostsState = {
  items: [],
  status: 'idle',
  error: null,
}

// createAsyncThunk("action name", async function)
// Auto-creates 3 actions:
//   posts/fetchPosts/pending
//   posts/fetchPosts/fulfilled
//   posts/fetchPosts/rejected
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    if (!res.ok) throw new Error('Failed to fetch')
    return res.json()
  }
)

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {}, // no regular reducers needed here
  extraReducers: (builder) => {
    builder
      // ⏳ Loading started
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading'
      })
      // ✅ Success — data is in action.payload
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      // ❌ Error
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Something went wrong'
      })
  },
})

export const selectAllPosts = (state: { posts: PostsState }) => state.posts.items
export const selectPostsStatus = (state: { posts: PostsState }) => state.posts.status
export default postsSlice.reducer`} />

            <div className="tut-file-path" style={{ marginTop: 16 }}>📄 components/PostsList.tsx &nbsp;<span className="tut-new-badge">NEW FILE</span></div>
            <TutCode code={`'use client'

import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import { fetchPosts, selectAllPosts, selectPostsStatus }
  from '@/lib/features/posts/postsSlice'

export default function PostsList() {
  const dispatch = useAppDispatch()
  const posts = useAppSelector(selectAllPosts)
  const status = useAppSelector(selectPostsStatus)

  // Fetch when component mounts
  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  if (status === 'loading') return <p>Loading...</p>
  if (status === 'failed')  return <p>Error loading posts!</p>

  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}`} />
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════ */}
        {/* STEP 10 — SEO PATTERN                                  */}
        {/* ══════════════════════════════════════════════════════ */}
        <section className="tut-step">
          <div className="tut-step-num">10</div>
          <div className="tut-step-body">
            <h2 className="tut-step-title">Server-Side Fetching + Redux (SEO Pattern)</h2>
            <p className="tut-step-desc">
              Your teacher&apos;s key point: fetching in <code>useEffect</code> (client-side)
              is <strong>bad for SEO</strong> — Google sees an empty page.
              The better way: fetch on the <strong>server</strong>, pass to Redux via props.
            </p>

            <div className="tut-compare">
              <div className="tut-compare-col tut-bad">
                <div className="tut-compare-head">❌ Bad for SEO (Client Fetch)</div>
                <TutCode code={`// PostsList.tsx
'use client'
useEffect(() => {
  fetch('/api/posts')
    .then(r => r.json())
    .then(data => setData(data))
}, [])

// What Google's bot sees:
// <ul></ul>  ← EMPTY! No data yet.
// → Not indexed = bad SEO 😢`} />
              </div>
              <div className="tut-compare-col tut-good">
                <div className="tut-compare-head">✅ Good for SEO (Server Fetch)</div>
                <TutCode code={`// page.tsx (Server Component)
export default async function Page() {
  // Runs on server → data in HTML!
  const posts = await fetch('/api/posts')
    .then(r => r.json())

  return <PostsList serverPosts={posts} />
}

// What Google's bot sees:
// <ul><li>Post 1</li><li>Post 2</li></ul>
// → Fully indexed = great SEO 🎉`} />
              </div>
            </div>

            <p className="tut-step-desc" style={{ marginTop: 16 }}>
              Then in the Client Component, hydrate Redux with the server data:
            </p>
            <TutCode code={`// components/PostsList.tsx
'use client'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { hydrateFromServer, selectAllPosts } from '@/lib/features/posts/postsSlice'

// Define hydrateFromServer in your postsSlice.ts reducers:
// hydrateFromServer: (state, action: PayloadAction<Post[]>) => {
//   state.items = action.payload
//   state.status = 'succeeded'
// }

interface Props {
  serverPosts: Post[]  // ← data from server
}

export default function PostsList({ serverPosts }: Props) {
  const dispatch = useAppDispatch()
  const posts = useAppSelector(selectAllPosts)

  useEffect(() => {
    // Load server data into Redux
    dispatch(hydrateFromServer(serverPosts))
  }, [dispatch, serverPosts])

  // posts is immediately available — no loading state needed!
  return <ul>{posts.map(p => <li key={p.id}>{p.title}</li>)}</ul>
}`} />

            <div className="tut-seo-summary">
              <div className="tut-seo-row">
                <span className="tut-seo-icon">🖥️</span>
                <div>
                  <strong>Server fetches data</strong> → baked into HTML → Google reads it ✅
                </div>
              </div>
              <div className="tut-seo-row">
                <span className="tut-seo-icon">⚡</span>
                <div>
                  <strong>Client receives HTML</strong> → React hydrates → dispatches to Redux
                </div>
              </div>
              <div className="tut-seo-row">
                <span className="tut-seo-icon">🏪</span>
                <div>
                  <strong>Redux store populated</strong> → all components read instantly, no loading
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════ */}
        {/* FINAL FILE MAP                                         */}
        {/* ══════════════════════════════════════════════════════ */}
        <section className="tut-step tut-step-final">
          <div className="tut-step-num">✅</div>
          <div className="tut-step-body">
            <h2 className="tut-step-title">Complete File Structure</h2>
            <p className="tut-step-desc">
              Here&apos;s every file you created and what it does:
            </p>

            <div className="tut-final-tree">
              <TutCode code={`my-redux-app/
├── lib/
│   ├── store.ts                    ← configureStore() — the Redux store
│   ├── hooks.ts                    ← useAppSelector & useAppDispatch (typed)
│   ├── StoreProvider.tsx           ← Client component wrapping <Provider>
│   └── features/
│       ├── counter/
│       │   └── counterSlice.ts     ← createSlice: value, step, increment, etc.
│       ├── user/
│       │   └── userSlice.ts        ← createSlice: name, isLoggedIn, login, logout
│       └── posts/
│           └── postsSlice.ts       ← createAsyncThunk: fetchPosts + loading state
│
├── components/
│   ├── Counter.tsx                 ← Client: useAppSelector + useAppDispatch
│   ├── PostsList.tsx               ← Client: async thunk / SSR hydration
│   └── UserCard.tsx                ← Client: reads user state
│
└── app/
    ├── layout.tsx                  ← Server: wraps <StoreProvider>, SEO metadata
    └── page.tsx                    ← Server: async fetch for SEO, passes to client`} />
            </div>

            {/* Quick Reference Table */}
            <h3 className="tut-ref-title">📋 Quick API Reference</h3>
            <div className="tut-ref-table-wrap">
              <table className="tut-ref-table">
                <thead>
                  <tr><th>API</th><th>From</th><th>What it does</th></tr>
                </thead>
                <tbody>
                  {[
                    ["configureStore()", "@reduxjs/toolkit", "Creates the Redux store"],
                    ["createSlice()", "@reduxjs/toolkit", "Creates state + actions + reducers in one"],
                    ["createAsyncThunk()", "@reduxjs/toolkit", "Handles async API calls with pending/fulfilled/rejected"],
                    ["PayloadAction<T>", "@reduxjs/toolkit", "TypeScript type for actions that carry data"],
                    ["useAppSelector()", "lib/hooks.ts", "Read data from Redux state"],
                    ["useAppDispatch()", "lib/hooks.ts", "Get the dispatch function to send actions"],
                    ["dispatch(action())", "React", "Send an action to update state"],
                    ["<Provider>", "react-redux", "Makes store available via React context"],
                  ].map(([api, from, what]) => (
                    <tr key={api}>
                      <td><code>{api}</code></td>
                      <td><span className="tut-from">{from}</span></td>
                      <td>{what}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="tut-done-card">
              <div className="tut-done-icon">🎉</div>
              <h3>You now know Redux Toolkit!</h3>
              <p>
                Check out the <a href="/" className="tut-link">interactive demos</a> on the
                home page to see all of this working live. Install the{" "}
                <strong>Redux DevTools</strong> browser extension to inspect your
                store in real time.
              </p>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}

/* ─── Reusable components ──────────────────────────────────── */

function TutCode({ code }: { code: string }) {
  return (
    <div className="tut-code-block">
      <pre><code>{code}</code></pre>
    </div>
  );
}

function TutTerminal({ label, cmd }: { label: string; cmd: string }) {
  return (
    <div className="tut-terminal">
      <div className="tut-terminal-bar">
        <span className="tut-dot-red" />
        <span className="tut-dot-yellow" />
        <span className="tut-dot-green" />
        <span className="tut-terminal-label">{label}</span>
      </div>
      <div className="tut-terminal-body">
        <span className="tut-prompt">$</span>
        <span className="tut-cmd"> {cmd}</span>
      </div>
    </div>
  );
}
