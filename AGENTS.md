<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

# Project rules

- All page copy lives in `src/i18n/{de,en,es}.ts` (one shared `Dict` type); never hardcode UI text in components, because every page must exist in all three languages.
- Localized URLs come from `src/app/routes-map.ts`; routes are `$lang`, `$lang.$page` (page switch by slug) and `$lang.$page.$sub` (project detail), so new pages only need a slug entry and a component.
- Legal/launch behaviour (e.V. naming, logos, donations, tax statements, contact form) is controlled only by flags in `src/app/organization-status.ts`, so the launch needs no rebuild.
- Statute texts live in `src/content/statutes.ts`; the statutes page has tabs ready for the Rules of Procedure and Financial Regulations.
