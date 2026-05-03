# Contributing to Save Slip

## Local Setup

```sh
pnpm install   # also installs and configures git hooks via the prepare script
```

Husky hooks are installed automatically. No additional steps are needed.

## Conventional Commits

All commit messages must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification. The `commit-msg` hook enforces this automatically.

**Format:** `<type>(<optional scope>): <description>`

| Type       | When to use                                             |
| ---------- | ------------------------------------------------------- |
| `feat`     | A new feature                                           |
| `fix`      | A bug fix                                               |
| `chore`    | Maintenance, dependency updates, tooling                |
| `docs`     | Documentation only                                      |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `test`     | Adding or updating tests                                |
| `perf`     | Performance improvements                                |
| `ci`       | CI/CD pipeline changes                                  |

**Examples:**

```
feat: add receipt OCR parsing
fix: correct tax calculation for multi-item receipts
chore: upgrade next to 16.3.0
docs: update contributing guide
```

Non-conforming commit messages will be rejected by the git hook.

## Pull Request Workflow

1. Branch off `main`: `git checkout -b feat/my-feature`
2. Make commits following Conventional Commits
3. Open a PR targeting `main`
4. Merge using **Squash and Merge** to keep a linear history on `main`

Direct pushes to `main` are prohibited by branch protection rules.

## Pre-commit Checks

The `pre-commit` hook runs `lint-staged` on every commit, which:

- Runs ESLint (with auto-fix) on TypeScript/JavaScript files
- Runs Prettier (with auto-write) on TypeScript/JavaScript, JSON, CSS, and Markdown files
- Runs `tsc --noEmit` for a full project type check on any TypeScript change

Fix any reported errors before committing.

## Releases & Changelog

Releases are automated via [release-please](https://github.com/googleapis/release-please). After merging to `main`, release-please inspects commit history and opens a release PR with an updated `CHANGELOG.md` and bumped version when warranted. Merge that PR to publish a release.
