# References
- `https://supabase.com/`
- `https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/`
- `https://dev.to/prisma/set-up-a-free-postgresql-database-on-supabase-to-use-with-prisma-3pk6`
- `https://www.prisma.io/docs/orm/prisma-schema/data-model/models`
- `https://www.svgrepo.com/svg/507846/rupee-circle?edit=true`
- `https://react.dev/learn`

# Primsa Model
- Represents entities 
- Data models defination is made up of :
    = model : defines no. of fiels, relations between models
    = enums 
    = attributes & functions
- e.g. usage after model const user = `await.user.create({});`
- Ways to define model : 
    = Write the data model manually and use Prisma Migrate *
    = Generate the data model via introspection **useful if there is existing database are used
- `@map` : maps to different column name 
- `@@map` : maps to different table name
- `@id & @@id , @unique & @@unique` : @ single field @@ composite values
- Properties of model are called fields i.e. rows 
- Fields consists of :
    = field name
    = field type : `String, Int, Float, Boolean, DateTime, Json, Bytes`
    = optional type modifiers : `@default(value) (e.g., @default("default"/42/now()/uuid()/autoincrement()/cuid())), @unique (enforces uniqueness), @id (primary key), @updatedAt (automatically updates timestamp), @relation (defines relationships), @unique`
    = optional attributes : `@db.<Type>(<Length>) (e.g., @db.VarChar(255)), @map("db_column_name") (maps to a different column name), @ignore (ignores field in Prisma operations)`
- The `@db.<Type>(<Length>)` attribute is used to specify database-specific column types and constraints that Prisma's default types might not cover. It ensures that the database schema matches your requirements exactly, such as setting the length for String fields or defining specific numeric precision for Float fields.
- e.g. enum Role { a b }

# Resolves :
- Glitch in migrating schema to db :
    = `https://github.com/supabase/supabase/issues/26953`
    = `https://supabase.com/partners/integrations/prisma`
- Error: error: Environment variable not found: DATABASE_URL.
    = `https://stackoverflow.com/questions/67796217/prisma-getting-environment-variable-not-found-error-message-when-running-graph`
- Git issues :
    = `https://timmousk.com/blog/git-push-hangs/`
    = `https://github.com/orgs/community/discussions/15222`

# commands
- `npx prisma migrate dev --name init`
- `npm install module_name > npm install --save-dev @types/module_name`
- `npx ts-node app.main.ts`
- `npx create-react-app my-app`
- `npm start`
- `npx prisma generate`
