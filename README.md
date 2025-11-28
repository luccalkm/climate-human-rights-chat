# climate-human-rights-chat

Setup for using MUI, Firebase, and Gemini in Vite + React (TypeScript).

## Prerequisites
- Node.js 18+
- Firebase project with Web app credentials
- Google AI Studio API key (Gemini)

## Install dependencies
```
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled firebase @google/generative-ai
```

## Environment variables
Create a file `.env.local` at the project root with your keys. Vite exposes variables prefixed with `VITE_`.

```
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

VITE_GEMINI_API_KEY=your_gemini_api_key
```

## Project files
- `src/lib/firebase.ts`: Initializes Firebase app and exports services used.
- `src/lib/gemini.ts`: Minimal Gemini client helper.
- `src/App.tsx`: Wrapped with MUI ThemeProvider and CssBaseline.

## Quick start
```
npm run dev
```

Open the URL shown by Vite in your browser.

## Notes
- Keep `.env.local` out of version control.
- Gemini requests run client-side using the Google Generative AI SDK; consider server-side proxying for rate-limiting or secrets hardening if needed.

## Firestore data model and rules
- Collections: `conversations` and `messages`.
	- `conversations`: `{ title, userId, createdAt }`
	- `messages`: `{ conversationId, role: 'user'|'model', content, createdAt }`
- Helper module: `src/lib/chatStore.ts` for creating conversations, saving messages, listing and listening.

Example Firestore Security Rules (restrict to owner):
```
rules_version = '2';
service cloud.firestore {
	match /databases/{database}/documents {
		match /conversations/{conversationId} {
			allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
		}
		match /messages/{messageId} {
			allow read, write: if request.auth != null && isOwnerOfConversation(request.resource.data.conversationId);
		}

		function isOwnerOfConversation(conversationId) {
			return exists(/databases/$(database)/documents/conversations/$(conversationId))
				&& get(/databases/$(database)/documents/conversations/$(conversationId)).data.userId == request.auth.uid;
		}
	}
}
```
