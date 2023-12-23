- commands for prisma changes.
  [1] npx prisma migrate dev - This command creates and applies migrations. It's used to propagate the changes you made in your schema to your database. If you do not provide a --name, Prisma CLI will prompt you for a name. This command also creates a ./prisma/migrations folder with your initial migration and a table named \_prisma_migrations in the database with an entry for the first migration.
  [2] npx prisma generate - This command generates Prisma Client based on your updated schema. This is necessary to ensure that the Prisma Client API is up-to-date with the latest changes in your schema. (first of all sutdown server before applying this command).
- Testing Password: Password123$

fix the background screen on landing.tsx in dark mode.
animation for models.

-- Things that should be dealt with later on.

- [ ] In userRoute.ts, A function was created to send and delete all users and their data to client.

--Fix
- [ ] handle serverError useState();
- [ ] fix the dark mode of ContactManager.tsx.
- [ ] fix the profileImage in userController.test.ts

{
"email":"user1@gmail.com",
  "password": "ThePassword123$"
}