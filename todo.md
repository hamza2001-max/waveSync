- commands for prisma changes.
  [1] npx prisma migrate dev - This command creates and applies migrations. It's used to propagate the changes you made in your schema to your database. If you do not provide a --name, Prisma CLI will prompt you for a name. This command also creates a ./prisma/migrations folder with your initial migration and a table named \_prisma_migrations in the database with an entry for the first migration.
  [2] npx prisma generate - This command generates Prisma Client based on your updated schema. This is necessary to ensure that the Prisma Client API is up-to-date with the latest changes in your schema. (first of all sutdown server before applying this command).
- Testing Password: Password123$

first make login function.
create separate file for strategies.
apply validator in register.
once the user has been registered then log them in and use session for them {
passport.js
sessions
}
fix the background screen on landing.tsx in dark mode.
animation for models.

-- Things that should be dealt with later on.

- [ ] In userRoute.ts, A function was created to send and delete all users and their data to client.

--Fix

- [ ] handle serverError useState();
- [ ] fix the dark mode of ContactManager.tsx.
- [ ] fix the profileImage in userController.test.ts

--Tasks

- [ ] archive contact.
- [ ] leave and rejoin grp calls.
- [ ] One time view photo sending.
- [ ] voice message.
- [ ] pin messages.
- [ ] video message.
- [ ] music sharing.
- [ ] Read Receipts.
- [ ] message scheduling and user availability mode.
- [ ] Customizable Themes.
- [ ] Notification Customization.
- [ ] Search Functionality [messages and contacts]
- [ ] end to end encryption.
- [ ] voice call.
- [ ] video call.
- [ ] location sharing.
- [ ] reaction to messages [emoji, giphs].
- [ ] language translation.
- [ ] file [image, text, video etc] sharing.
- [ ] user profile.
- [ ] Blocking and Reporting.
- [ ] user status.
- [ ] user stories.
- [ ] user streaks.
- [ ] user camera filters.
- [ ] user live streaming.
- [ ] AI chatbot.
- [ ] AI chat assistance.
- [ ] personal chats.
- [ ] professional chats.
- [ ] broadcast.

-- Tech

- [x] react
- [x] prisma
- [x] react-query
- [x] zustand
- [x] testing library
- [x] apply cn.
- [x] typescript
- [x] tailwind
- [x] express
- [x] multer
- [x] passport
- [ ] jest
- [ ] superTest
- [ ] D3.js
- [ ] data visulalization?
- [ ] animations (hooks or libraries)
- [ ] typeface.js?
- [ ] Animate On Scroll (AOS)
- [ ] parallax websites
- [ ] env-cmd
- [ ] socket.io
- [ ] zod
- [ ] Tauri
- [ ] Socket.io

-- Try

- [ ] web worker.
- [ ] Third party API
- [ ] Proxy Server Project
- [ ] web crawler.
- [ ] implement gpt in a website.
- [ ] cookies and session.
- [ ] Social Media Analytics Dashboard
- [ ] caching
- [ ] File Sharing and Cloud Storage
- [ ] HTTP (Hypertext Transfer Protocol)
- [ ] Session Management and Cookies
- [ ] Middleware
- [ ] Testing
- [ ] WebSockets(live chat, notifications, and real-time updates)
- [ ] API Authentication Methods
- [ ] Microservices
