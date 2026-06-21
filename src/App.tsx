import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import ThreeBg from "./components/ThreeBg";
import { AppScreen, UserProfileData, ChatMessage } from "./types";
import { VDB } from "./utils/db";

// Screens imports
import AuthScreen from "./components/screens/AuthScreen";
import MainHomeScreen from "./components/screens/MainHomeScreen";
import { DashboardScreen, ExploreScreen, GroupsScreen, AddFriendsScreen } from "./components/screens/SocialAndExploreScreens";
import { ProfileScreen, EditProfileScreen, SettingScreen, AccountSecurityScreen, ChatPreferencesScreen, SubscriptionScreen, PrivacyScreen, NotificationsScreen, AchievementsScreen, SavedItemsScreen, LanguageScreen, DataStorageScreen, HelpCenterScreen, FeedbackScreen, AboutAppScreen } from "./components/screens/ProfileAndSettingsScreens";
import { CallsScreen, VoiceCallScreen, VideoCallScreen } from "./components/screens/CallsAndHistoryScreens";
import { UserProfileScreen, ActivityScreen, FilesScreen } from "./components/screens/LibraryAndActivityScreens";
import { AiAssistantIntroScreen, AiChatScreen, GroupChatScreen1, GroupChatScreen2 } from "./components/screens/AiAssistantScreens";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(AppScreen.AUTH);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  
  // User profile state - local database backed
  const [user, setUserState] = useState<UserProfileData>(() => VDB.getUserProfile());

  const setUser = (updater: UserProfileData | ((prev: UserProfileData) => UserProfileData)) => {
    setUserState((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      VDB.setUserProfile(next);
      return next;
    });
  };

  // Persistent in-memory AI chats so messages do not wipe when navigating away
  const [aiMessages, setAiMessages] = useState<ChatMessage[]>([]);

  // Active DM partner
  const [activeDm, setActiveDm] = useState<{ name: string; avatarColor: string; lastMsg: string; status: string } | null>(null);

  // Preserve selected tab in GroupsScreen ("groups" or "personal")
  const [groupsTab, setGroupsTab] = useState<"groups" | "personal">("groups");

  // Selected profile user for other user views
  const [selectedProfileUser, setSelectedProfileUser] = useState<{ name: string; avatarColor: string } | null>(null);

  // History stack for navigation
  const [screenHistory, setScreenHistory] = useState<AppScreen[]>([]);

  const navigateWithHistory = (targetScreen: AppScreen) => {
    setScreenHistory((prev) => {
      if (targetScreen === AppScreen.AUTH) return [];
      if (prev.length > 0 && prev[prev.length - 1] === currentScreen) return prev;
      if (currentScreen === AppScreen.NEW_CHAT || currentScreen === AppScreen.AUTH) return prev;
      return [...prev, currentScreen];
    });
    setCurrentScreen(targetScreen);
  };

  const goBack = () => {
    if (screenHistory.length > 0) {
      const prev = screenHistory[screenHistory.length - 1];
      setScreenHistory((history) => history.slice(0, -1));
      setCurrentScreen(prev);
    } else {
      setCurrentScreen(AppScreen.MAIN);
    }
  };

  // Listen for NEW_CHAT screen navigation to reset message log and route to AI_CHAT
  useEffect(() => {
    if (currentScreen === AppScreen.NEW_CHAT) {
      setAiMessages([]);
      setCurrentScreen(AppScreen.AI_CHAT);
      showToast("Fresh AI stream session active.");
    }
  }, [currentScreen]);

  // Toast notifications
  const [toast, setToast] = useState<{ message: string; type: string } | null>(null);

  const showToast = (message: string, type = "info") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleLoginSuccess = (name: string, email: string) => {
    setUser((prev) => ({
      ...prev,
      displayName: name,
      username: `@${name.toLowerCase().replace(/\s+/g, "")}`,
    }));
    setIsLoggedIn(true);
    setCurrentScreen(AppScreen.MAIN);
    showToast(`Welcome to Veltrixa, ${name}!`, "ok");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentScreen(AppScreen.AUTH);
    setShowLogoutConfirm(false);
    showToast("Logged out of session.");
  };

  // active overlay call states
  const [activeCall, setActiveCall] = useState<{ type: "voice" | "video"; name: string } | null>(null);

  // Trigger default call overlays if needed
  const triggerVoiceCall = (name: string) => {
    setActiveCall({ type: "voice", name });
    setCurrentScreen(AppScreen.VOICE_CALL);
  };

  // Safe navigation transition parameters
  const pageVariants = {
    initial: { opacity: 0, scale: 0.98, filter: "blur(4px)" },
    enter: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] } },
    exit: { opacity: 0, scale: 1.02, filter: "blur(4px)", transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] } },
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case AppScreen.AUTH:
        return <AuthScreen onLoginSuccess={handleLoginSuccess} />;
      case AppScreen.MAIN:
        return (
          <MainHomeScreen
            user={user}
            setScreen={navigateWithHistory}
            triggerLogout={() => setShowLogoutConfirm(true)}
            showToast={showToast}
          />
        );
      case AppScreen.DASHBOARD:
        return <DashboardScreen setScreen={navigateWithHistory} showToast={showToast} />;
      case AppScreen.EXPLORE:
        return <ExploreScreen setScreen={navigateWithHistory} showToast={showToast} />;
      case AppScreen.GROUPS:
        return (
          <GroupsScreen
            setScreen={navigateWithHistory}
            showToast={showToast}
            setActiveDm={setActiveDm}
            activeTab={groupsTab}
            setActiveTab={setGroupsTab}
            setSelectedProfileUser={setSelectedProfileUser}
          />
        );
      case AppScreen.ADD_FRIENDS:
        return <AddFriendsScreen setScreen={navigateWithHistory} showToast={showToast} />;
      
      // Profile & Settings
      case AppScreen.PROFILE:
        return (
          <ProfileScreen
            user={user}
            setScreen={navigateWithHistory}
            showToast={showToast}
          />
        );
      case AppScreen.EDIT_PROFILE:
        return (
          <EditProfileScreen
            user={user}
            setUser={setUser}
            setScreen={navigateWithHistory}
            showToast={showToast}
            triggerLogout={() => setShowLogoutConfirm(true)}
          />
        );
      case AppScreen.SETTING:
        return (
          <SettingScreen
            user={user}
            setScreen={navigateWithHistory}
            showToast={showToast}
            triggerLogout={() => setShowLogoutConfirm(true)}
          />
        );
      case AppScreen.ACCOUNT_SECURITY:
        return <AccountSecurityScreen setScreen={navigateWithHistory} showToast={showToast} />;
      case AppScreen.PRIVACY:
        return <PrivacyScreen setScreen={navigateWithHistory} showToast={showToast} />;
      case AppScreen.NOTIFICATIONS:
        return <NotificationsScreen setScreen={navigateWithHistory} showToast={showToast} />;
      case AppScreen.CHAT_PREFERENCES:
        return <ChatPreferencesScreen setScreen={navigateWithHistory} showToast={showToast} />;
      case AppScreen.SUBSCRIPTION:
        return <SubscriptionScreen setScreen={navigateWithHistory} showToast={showToast} />;
      case AppScreen.ACHIEVEMENTS:
        return <AchievementsScreen setScreen={navigateWithHistory} showToast={showToast} />;
      case AppScreen.SAVED_ITEMS:
        return <SavedItemsScreen setScreen={navigateWithHistory} showToast={showToast} />;
      case AppScreen.LANGUAGE:
        return <LanguageScreen setScreen={navigateWithHistory} showToast={showToast} />;
      case AppScreen.DATA_STORAGE:
        return <DataStorageScreen setScreen={navigateWithHistory} showToast={showToast} />;
      case AppScreen.HELP_CENTER:
        return <HelpCenterScreen setScreen={navigateWithHistory} showToast={showToast} />;
      case AppScreen.FEEDBACK:
        return <FeedbackScreen setScreen={navigateWithHistory} showToast={showToast} />;
      case AppScreen.ABOUT_APP:
        return <AboutAppScreen setScreen={navigateWithHistory} showToast={showToast} />;

      // Calls activity
      case AppScreen.CALLS:
        return (
          <CallsScreen
            setScreen={navigateWithHistory}
            showToast={showToast}
            setActiveCall={setActiveCall}
          />
        );
      case AppScreen.VOICE_CALL:
        return (
          <VoiceCallScreen
            setScreen={navigateWithHistory}
            showToast={showToast}
            activeCall={activeCall}
            setActiveCall={setActiveCall}
          />
        );
      case AppScreen.VIDEO_CALL:
        return (
          <VideoCallScreen
            setScreen={navigateWithHistory}
            showToast={showToast}
            activeCall={activeCall}
            setActiveCall={setActiveCall}
          />
        );

      // AI assistants
      case AppScreen.AI_ASSISTANT_INTRO:
        return (
          <AiAssistantIntroScreen
            setScreen={navigateWithHistory}
            showToast={showToast}
            messages={aiMessages}
            setMessages={setAiMessages}
          />
        );
      case AppScreen.AI_CHAT:
      case AppScreen.NEW_CHAT:
        return (
          <AiChatScreen
            setScreen={navigateWithHistory}
            showToast={showToast}
            messages={aiMessages}
            setMessages={setAiMessages}
            activeDm={activeDm}
            setSelectedProfileUser={setSelectedProfileUser}
            onBack={goBack}
          />
        );
      case AppScreen.GROUP_CHAT:
        return (
          <GroupChatScreen2
            setScreen={navigateWithHistory}
            showToast={showToast}
            onBack={goBack}
          />
        );
      case AppScreen.GROUP_CHAT_2:
        return (
          <GroupChatScreen1
            setScreen={navigateWithHistory}
            showToast={showToast}
            onBack={goBack}
          />
        );

      // Library / Files / Activities
      case AppScreen.USER_PROFILE:
        return (
          <UserProfileScreen
            setScreen={navigateWithHistory}
            showToast={showToast}
            profileUser={selectedProfileUser}
            onBack={goBack}
          />
        );
      case AppScreen.ACTIVITY:
        return <ActivityScreen setScreen={navigateWithHistory} showToast={showToast} />;
      case AppScreen.FILES:
        return <FilesScreen setScreen={navigateWithHistory} showToast={showToast} />;

      default:
        return <AuthScreen onLoginSuccess={handleLoginSuccess} />;
    }
  };

  return (
    <div className="relative w-full h-screen bg-[#02020e] text-slate-100 flex flex-col items-center justify-center p-0 md:p-4 overflow-hidden font-sans select-none">
      {/* Dynamic ThreeJS Canvas nodes back */}
      <ThreeBg />

      {/* Global Toast HUD notifications */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-8 z-50 px-6 py-3 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-cyan-500/25 shadow-2xl flex items-center gap-2.5 text-xs font-semibold select-none"
          >
            <span className="text-cyan-400">💡</span>
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logout Confirmation Prompt Modal Dialog */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900/95 border border-red-500/35 rounded-3xl p-6 max-w-sm w-full shadow-[0_10px_50px_rgba(239,68,68,0.2)] flex flex-col items-center text-center relative z-50"
            >
              <div className="w-14 h-14 bg-red-500/10 border border-red-500/20 text-red-500 rounded-full flex items-center justify-center text-xl mb-4">
                ⚠️
              </div>
              <h3 className="text-base font-bold text-slate-100 font-rajdhani uppercase tracking-wide">
                Confirm Log Out
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Are you sure you want to log out of your session? You will need to sign in again to access your dashboard and chats.
              </p>
              
              <div className="flex gap-3 w-full mt-6">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 py-2.5 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-xs font-semibold text-white transition-colors shadow-lg shadow-red-500/20 cursor-pointer"
                >
                  Log Out
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Device frame wrapper container - designed for beautiful responsive alignment */}
      <div className="relative w-full max-w-[420px] h-full max-h-[860px] md:h-[860px] flex items-center justify-center rounded-[40px] z-10 transition-all duration-300">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            variants={pageVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            className="w-full h-full"
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
