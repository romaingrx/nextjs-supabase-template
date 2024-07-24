<div align="center" style="display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 1rem; margin-bottom: 2rem;">
  <div style="display: flex; flex-direction: row; gap: 1rem;">
    <img src="res/supabase.svg" alt="Supabase" style="height: 3rem;">
    <div style="width: 0.2rem; height: 3rem; background: currentColor; opacity: 0.05; border-radius: 0.1rem;" ></div>
    <img src="res/nextjs.svg" alt="NextJS" style="height: 3rem;">
  </div>
  <h1 style="display: none;">NextJS Supabase template</h1>
</div>

<img alt="GitHub License" src="https://img.shields.io/github/license/romaingrx/nextjs-supabase-template">

> [!WARNING]  
> This is a work in progress and not yet ready for production use.

> This repository serves as a starter kit for developing a NextJS 14 application, using Supabase for database management and authentication. It also includes a CI/CD pipeline setup with Github Actions for seamless integration and deployment.

## Desired features

- [x] Add all authentication pages (log in, sign up, forgot password, reset password)
- [x] Add a CI/CD pipeline with Github Actions for testing, linting and deployment
- [ ] Add a test suite for testing the application with Supabase and mock data

## Getting started

1. **Create a Supabase project**
   Head over to the [Supabase Dashboard](https://supabase.com/dashboard/project/create) page and create a new project.

2. **(Optional) Develop locally with Docker**
   Head over to the [Supabase CLI docs](https://supabase.com/docs/guides/cli/local-development#local-logging) page and follow the instructions to start a local Supabase server.

3. **Sign up your first user**
   Head over to the [Login](/login) page and sign up your first user. It’s okay if this is just you for now. Your awesome idea will have plenty of users later!

4. **(Optional) Apply the migration file to have a profile table**
   You can use the [create_profiles_table.sql](https://github.com/romaingrx/nextjs-supabase-template/blob/master/supabase/migrations/20240722125351_create_profiles_table.sql) file to have a profile table that syncs with the Supabase user.

5. **Create some tables and insert some data**
   Head over to the [Table Editor](https://supabase.com/dashboard/project/_/editor) for your Supabase project to create a table and insert some example data. If you’re stuck for creativity, you can copy and paste the following into the [SQL Editor](https://supabase.com/dashboard/project/_/sql/new) and click RUN!

   ```sql
   create table notes (
     id serial primary key,
     title text
   );

   insert into notes(title)
   values
     ('Today I created a Supabase project.'),
     ('I added some data and queried it from Next.js.'),
     ('It was awesome!');
   ```


## Disclaimer

This repository reused parts from [this repository](https://github.com/michaeltroya/supa-next-starter).