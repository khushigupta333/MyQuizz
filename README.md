# MyQuizz / Samarth Competency Platform

MyQuizz is a responsive competency-learning and adaptive quiz platform. It helps a learner upload study material, practise questions, understand weak areas, follow a personalised learning path, and track improvement over time.

The application is presented as **Samarth**, a competency platform for structured learning and assessment.

## Project in simple terms

A user can:

1. Create an account or sign in.
2. Upload learning material such as PDF, DOCX, PPTX, or TXT files.
3. Build a large question pool from the uploaded content.
4. Take a baseline assessment or adaptive quiz.
5. Receive scores, explanations, feedback, and weak-area insights.
6. Get learning recommendations based on competency gaps.
7. Take another quiz that adapts to previous performance.
8. Review competency progress and quiz history independently from other users.
9. Sign out securely.

Each user has their own profile and data. User A cannot use or view User B’s materials, questions, quiz attempts, scores, competency gaps, or learning progress.

## Main features

### Multi-user authentication

- Email and password sign-up.
- Email and password sign-in.
- Secure session handling with Better Auth.
- Protected application access.
- Logout support.
- User-specific data access enforced on the server.

### Learning material uploads

The content studio accepts:

- PDF files.
- DOCX files.
- PPTX files.
- TXT files.

Uploaded files are stored privately. Metadata such as filename, file type, file size, upload status, and owner are stored in the database.

### Question pool generation

The platform is designed to create a broad question pool from uploaded learning content. Questions include:

- A question prompt.
- Multiple answer options.
- The correct answer index.
- An explanation.
- A competency or topic label.
- The source material relationship.

Questions are selected per user and can be shuffled for each quiz session.

### Non-repeating questions

Quiz attempts record the question IDs already answered by that user. The quiz API uses those IDs to avoid presenting the same question repeatedly. This fixes the repeated-question problem and allows the system to select fresh questions from the remaining question pool.

### Shuffled answer options

Answer options are randomized before being sent to the quiz interface. The correct answer is remapped to its new position, so the answer is not always displayed in the same option slot.

### Quiz feedback

After an attempt, the platform can store and display:

- The final score.
- Total questions.
- Weak competency areas.
- Written feedback.
- Answered question IDs.
- Recommended next steps.

The feedback flow is intended to guide the learner toward the next best learning activity instead of only showing a percentage.

### Adaptive learning path

Competency gaps and prior scores influence the next recommended quiz and learning modules. The dashboard includes:

- Overall competency.
- Learning progress.
- Quiz performance.
- Active focus areas.
- Competency growth charts.
- Recommended courses.
- AI learning coach suggestions.

### Responsive interface

The UI is designed for:

- Desktop screens.
- Tablet screens.
- Mobile screens.

The layout includes a responsive sidebar, mobile navigation controls, flexible dashboard grids, responsive charts, stacked quiz options, and mobile-friendly upload and content-studio sections.

## Technology stack

### Frontend

- **Next.js 16** with the App Router.
- **React 19**.
- **TypeScript**.
- **Tailwind CSS 4**.
- **shadcn/ui conventions** and reusable UI utilities.
- **Lucide React** for icons.
- **Recharts** for competency and progress charts.

### Backend

- **Next.js Route Handlers** for application APIs.
- **Neon Postgres** for persistent data storage.
- **Drizzle ORM** for typed database queries.
- **Better Auth** for email/password authentication and sessions.
- **Vercel Blob** for private uploaded-file storage.

### Document processing dependencies

- **pdf-parse** for PDF text extraction.
- **Mammoth** for DOCX text extraction.
- **PptxGenJS** for PPTX-related document handling.

### Development and deployment

- **pnpm** package manager.
- **PostCSS** and Tailwind CSS integration.
- **Vercel** deployment support.
- **Vercel Analytics** for analytics instrumentation.

## Application structure

```text
app/
├── api/
│   ├── auth/[...all]/route.ts   # Better Auth catch-all handler
│   ├── materials/route.ts       # Authenticated material upload endpoint
│   └── quiz/route.ts            # Quiz selection and attempt endpoint
├── globals.css                  # Global theme and responsive styling
├── layout.tsx                   # Root layout and page metadata
└── page.tsx                     # Main authenticated learning application

components/
├── auth-gate.tsx                # Authentication gate and auth UI
└── ui/
    └── button.tsx               # Reusable button component

lib/
├── auth.ts                      # Server-side Better Auth configuration
├── auth-client.ts               # Client-side auth helpers and session hook
├── utils.ts                     # Shared utility functions
└── db/
    ├── index.ts                 # Shared Postgres pool and Drizzle client
    └── schema.ts                # Auth and application database tables

public/                          # Static icons and image assets
```

## Main screens

### Dashboard

The dashboard gives the learner an overview of their current state. It shows competency, learning progress, quiz performance, focus areas, competency growth, recommended courses, and the next suggested action.

### Baseline assessment

The assessment presents a sequence of questions to establish an initial competency profile. The progress indicator shows the learner’s position in the assessment.

### Competency profile

The competency profile displays each competency with:

- Current score.
- Target score.
- Status such as strength, on track, developing, or focus area.
- Progress bar.
- Suggested development direction.

### Learning path

The learning path contains recommended courses and modules. Recommendations are based on the learner’s competency gaps and previous quiz results.

### Adaptive quiz

The adaptive quiz presents questions selected from the user’s available pool. It supports answer selection, quiz progress, submission, scoring, and a transition to detailed feedback.

### Results and feedback

The results view makes progress visible through score summaries, comparison charts, strengths, weak areas, and the next recommended focus area.

### Content studio

The content studio is the upload and content-generation area. It provides file upload controls, generation settings, upload status, and recent content-job information.

## Database model

The database uses Neon Postgres and Drizzle ORM.

### Better Auth tables

These tables support authentication and sessions:

- `user`
- `session`
- `account`
- `verification`

### Application tables

#### `materials`

Stores uploaded learning material metadata:

- `id`
- `userId`
- `filename`
- `pathname`
- `mimeType`
- `size`
- `status`
- `createdAt`

#### `quiz_questions`

Stores questions generated or added for a user:

- `id`
- `userId`
- `materialId`
- `prompt`
- `options`
- `answerIndex`
- `explanation`
- `competency`
- `createdAt`

#### `quiz_attempts`

Stores each completed quiz attempt:

- `id`
- `userId`
- `score`
- `total`
- `weakAreas`
- `feedback`
- `answeredQuestionIds`
- `createdAt`

#### `learning_progress`

Stores progress by competency:

- `id`
- `userId`
- `competency`
- `progress`
- `minutes`
- `updatedAt`

## Security and privacy

- Authentication is handled with Better Auth rather than a client-only login state.
- Passwords are not stored directly by the application UI.
- User-owned database queries are scoped by the authenticated user ID.
- Uploaded materials use private Blob storage.
- Private file URLs should not be exposed directly to the browser.
- Server routes validate the current session before accessing user data.
- Session cookies use secure development settings required for the v0 preview iframe.
- The application does not use localStorage as the source of truth for user data.

## Environment variables

The project uses the following environment variables:

```env
DATABASE_URL=...
BETTER_AUTH_SECRET=...
BLOB_READ_WRITE_TOKEN=...
```

Neon may also provide related connection variables, including pooled and non-pooled Postgres URLs. The application primarily uses `DATABASE_URL` for the shared Postgres pool.

`BETTER_AUTH_SECRET` must be a long, unpredictable random value. Never commit it to GitHub or expose it in browser code.

## Running the project locally

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment variables

Create a local environment file supported by Next.js, such as `.env.local`, and provide the required database, authentication, and Blob storage variables.

### 3. Start the development server

```bash
pnpm dev
```

Open:

```text
http://localhost:3000
```

### 4. Create a production build

```bash
pnpm build
```

### 5. Start the production server

```bash
pnpm start
```

## API overview

### `POST /api/auth/*`

Better Auth handles authentication endpoints through the catch-all route:

```text
app/api/auth/[...all]/route.ts
```

The client uses this route for sign-up, sign-in, session checks, and logout.

### `POST /api/materials`

Accepts authenticated file uploads. The route should:

1. Confirm the user session.
2. Validate the file exists.
3. Validate the extension and MIME type.
4. Enforce the file-size limit.
5. Upload the file to private Blob storage.
6. Store file metadata under the authenticated user ID.
7. Return a safe upload result without exposing a private Blob URL.

### `GET` and `POST /api/quiz`

The quiz route is responsible for:

1. Confirming the authenticated user.
2. Loading that user’s questions.
3. Excluding question IDs already answered by the user when appropriate.
4. Selecting a random set of questions.
5. Shuffling answer options.
6. Returning quiz questions without exposing answers prematurely.
7. Recording the completed attempt.
8. Calculating score, feedback, and weak areas.
9. Updating the user’s learning direction.

## Typical user journey

```text
Sign up or sign in
        ↓
Open dashboard
        ↓
Upload learning files
        ↓
Extract concepts and create questions
        ↓
Take baseline assessment
        ↓
View competency profile
        ↓
Follow recommended learning path
        ↓
Take adaptive quiz
        ↓
Receive score and AI-style feedback
        ↓
Identify weak competencies
        ↓
Take a new quiz focused on those gaps
        ↓
Track progress over time
```

## Important implementation notes

The application combines a polished dashboard experience with real authentication, database storage, private file storage, upload handling, and quiz APIs. The visual dashboard contains representative learning content so the product is easy to demonstrate, while the authenticated backend provides the foundation for replacing demonstration values with fully generated content from uploaded documents.

For production use, the content-generation workflow should be connected to a document-processing and AI generation service that extracts text from each uploaded file, splits it into meaningful sections, creates questions with validated answer keys, and stores the generated question pool under the correct user.

Generated questions should be validated before insertion. A production pipeline should also apply:

- File size and page limits.
- MIME and extension validation.
- Duplicate question detection.
- Question quality checks.
- Correct-answer validation.
- Per-user rate limits.
- Processing-job status updates.
- Retry handling for failed extraction.
- Audit records for generated content.

## Extending the project

Good next improvements include:

- Add a background processing queue for large uploads.
- Add real document text extraction for every supported format.
- Add AI-generated question creation with structured output validation.
- Add a full quiz-history page with filters and date ranges.
- Add a profile/settings page.
- Add instructor or administrator roles.
- Add question review and publishing workflows.
- Add deletion and reprocessing for uploaded material.
- Add database indexes for `userId`, `competency`, and `createdAt`.
- Add automated tests for authentication, question uniqueness, option shuffling, scoring, and authorization.
- Add error monitoring and production logging.

## Design direction

The interface uses a cool, modern learning-product visual style:

- Deep navy surfaces for structure and contrast.
- Electric blue and cyan for actions and progress.
- Violet accents for AI and adaptive-learning moments.
- Green for completed or strong states.
- Amber and rose for focus areas and attention states.
- Responsive cards, charts, progress tracks, and accessible controls.

The design intentionally keeps the main information easy to scan while using colour and motion cues to make progress and recommended actions feel clear.

## Deployment

The project is suitable for deployment on Vercel. Before deployment:

1. Connect the Neon integration.
2. Configure `BETTER_AUTH_SECRET` for Development, Preview, and Production.
3. Configure private Vercel Blob storage.
4. Confirm the database schema exists.
5. Run a production build.
6. Test sign-up, sign-in, reload persistence, logout, uploads, quiz submission, and cross-user isolation.

## License

This project is private unless a separate license is added by the project owner.

## Project development

This repository is connected to a v0 project. The interface can continue to be developed through v0, while GitHub and Vercel can be used for source control and deployment workflows.

- v0 project: https://v0.app/chat/projects/prj_sCireiOPcEKCV2y25UC2EIvjOpIC
- Next.js documentation: https://nextjs.org/docs
- Neon documentation: https://neon.tech/docs
- Better Auth documentation: https://www.better-auth.com/docs
- Vercel Blob documentation: https://vercel.com/docs/storage/vercel-blob
- Tailwind CSS documentation: https://tailwindcss.com/docs
