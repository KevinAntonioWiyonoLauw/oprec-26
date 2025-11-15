# Oprec MAKOMTI 2025 Repositories

## Design

https://www.figma.com/files/project/107570013

## Pull & Push Schema

1. Create and checkout to your developing branch "git checkout -b "branch name"
2. Pull origin main `git pull --rebase origin main`
3. Code
4. Pull origin main (using rebase) 
5. Add the changed file to git "git add ."
6. Commit (Please follow the commit messages rule)
7. Push to main "git push -u origin dev"
8. Create a new pull request to dev branch and mention @salmon
9. Done

## Branch Naming

`<type>/<short_description>.<nama>`

- `<type>` :
  - feature: saya menambahkan fitur baru
  - fixing: saya memperbaiki fitur

Contoh: feature/navbar.sultan

## Commit message

`<type>: <short_summary>`

- `<type>` :
  - feat: saya menambahkan fitur baru
  - fix: saya memperbaiki fitur

Contoh: feat[Homepage]: Creating about section

## Folder Structure

```
- public: file public (including assets)
- app : Contain all pages
- src
    - components : all components (layouts, button, navbar, etc)
    - helpers : pembantu (fetch backend, etc)
    - hooks : custom hooks
    - context: custom context
    - modules: all views
        - [Page name]
            - page.js
```


# BACKEND
## Cara run

### CRedentials
credentials ada di group ya untuk .env nya

### Cara pull and run
pull latest change dulu

install dependencies:
```
npm install
```

compile code:
```
npm run build
```

run code:
```
npm start
```

jadi deh
