# Chat Veltrixa: Codebase & Backend Audit Report

## 🎥 Core Application Screens
1. **Authentication Screen (`AuthScreen`):** Manages user logins, signs up, password recoveries, and guest simulation tunnels.
2. **Main Hub Home (`MainHomeScreen`):** Central launcher with modular dashboard navigation.
3. **Database Sync Hub (`DatabaseSyncScreen`):** Connection configuration form, connection status, row metric loaders, and quick SQL exports.
4. **Social & Explorer (`SocialAndExploreScreens`):** Includes dashboard layouts, AI tool roster search, community discovery grids, my groups channels list, and a search-oriented invite friend portal.
5. **My Profile & Preferences (`ProfileAndSettingsScreens`):** Includes edit screens, theme adjusters, system diagnostics, software update mock tools, billing subscriptions, and help desks.
6. **Communications Vault (`CallsAndHistoryScreens`):** Logs voice/video calls, triggers overlay call widgets, and manages history rows.
7. **Vaults & Logs (`LibraryAndActivityScreens`):** Shows other users profiles (Sophia Carter, bots), notification timelines, and file attachments directories.
8. **AI Assistant & Channels (`AiAssistantScreens`):** Links direct interfaces to Gemini, bot scripts, and two custom multi-user group chat feeds.

## 🗄️ Hardcoded Datasets & Mock Objects
1. `DEFAULT_USERS` in `src/components/screens/AuthScreen.tsx` - Dummy users for mock registration logic.
2. `DEFAULT_USER_PROFILE` in `src/utils/db.ts` - Preset profile descriptions when no Firebase login state has resolved.
3. `DEFAULT_CHATS` in `src/utils/db.ts` - Mapped chat arrays containing conversations representing bots or Sophia.
4. `DEFAULT_CALLS` in `src/utils/db.ts` - Static records representing simulated logs.
5. `DEFAULT_FILES` in `src/utils/db.ts` - Fake document, code, and chart sizes stored locally.
6. `DEFAULT_ACTIVITIES` in `src/utils/db.ts` - Preset system alerts and mock reaction mentions.
7. `otherUsersData` in `src/components/screens/LibraryAndActivityScreens.tsx` - Multi-field templates representing Sophia Carter and other personas.
8. `communities`, `publicCommunities`, `aiTools`, `learningCourses` in `src/components/screens/SocialAndExploreScreens.tsx`.
9. `myGroups`, `discoverGroups`, `personalChats` lists inside `src/components/screens/SocialAndExploreScreens.tsx`.
10. `candidates` under `AddFriendsScreen` in `src/components/screens/SocialAndExploreScreens.tsx`.

## 🔒 Session & LocalStorage keys
* `veltrixa_device_id` - Guest/Client persistent key.
* `veltrixa_registered_users` - Simulator-only local registration records array.
* `vlx_supabase_url` / `vlx_supabase_anon_key` - Storage values for dynamic user-linked Supabase nodes.
* `vlx_db_profile` / `vlx_db_calls` / `vlx_db_files` / `vlx_db_activities` / `vlx_db_chats` - Fallback seed caches for sandbox operation when no backend connection has resolved.

## 🚀 Recommended Transition
- Fully hook up screen loaders to Supabase tables.
- Keep automatic fallback layouts to provide flawless empty states when remote rows are absent.
- Ensure the app stays visually dynamic and completely functional without crashing.
