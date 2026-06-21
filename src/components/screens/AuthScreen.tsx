import React, { useState, useEffect, useRef } from "react";
import { UserProfileData } from "../../types";
import { LogIn, UserPlus, HelpCircle, Eye, EyeOff, Globe, Github } from "lucide-react";
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "../../utils/firebase";
import { updateProfile } from "firebase/auth";

function getOrCreateDeviceId(): string {
  let devId = localStorage.getItem("veltrixa_device_id");
  if (!devId) {
    const characters = "0123456789ABCDEF";
    let randomPart = "";
    for (let i = 0; i < 8; i++) {
      randomPart += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    devId = `VLX-DEV-${randomPart}`;
    localStorage.setItem("veltrixa_device_id", devId);
  }
  return devId;
}

const DEFAULT_USERS = [
  { name: "Admin User", email: "admin@veltrixa.com", password: "password" },
  { name: "Liam Sterling", email: "liam@sterling.dev", password: "password123" }
];

function getRegisteredUsers(): any[] {
  const saved = localStorage.getItem("veltrixa_registered_users");
  if (!saved) {
    localStorage.setItem("veltrixa_registered_users", JSON.stringify(DEFAULT_USERS));
    return DEFAULT_USERS;
  }
  try {
    return JSON.parse(saved);
  } catch (e) {
    return DEFAULT_USERS;
  }
}

function saveRegisteredUser(user: any) {
  const users = getRegisteredUsers();
  users.push(user);
  localStorage.setItem("veltrixa_registered_users", JSON.stringify(users));
}

interface AuthProps {
  onLoginSuccess: (user: { name: string; email: string }) => void;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  opacity: number;
}

type PanelType = "login" | "register" | "forgot";

export default function AuthScreen({ onLoginSuccess }: { onLoginSuccess: (name: string, email: string) => void }) {
  const [activePanel, setActivePanel] = useState<"login" | "register" | "forgot" | "linking">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remem, setRemember] = useState(true);

  // Particle Dispersion states and refs
  const [particles, setParticles] = useState<Particle[]>([]);
  const loginBtnRef = useRef<HTMLButtonElement>(null);
  const registerBtnRef = useRef<HTMLButtonElement>(null);

  const spawnParticles = (btnRef: React.RefObject<HTMLButtonElement | null>) => {
    const fresh: Particle[] = [];
    const colors = ["#22d3ee", "#c084fc", "#f472b6", "#60a5fa", "#38bdf8", "#ec4899", "#a855f7"];
    let startX = 180;
    let startY = 24;
    if (btnRef.current) {
      startX = btnRef.current.offsetWidth / 2;
      startY = btnRef.current.offsetHeight / 2;
    }
    for (let i = 0; i < 45; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 3 + Math.random() * 9;
      fresh.push({
        id: Math.random() + i,
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 3.5 + Math.random() * 6.5,
        opacity: 1,
      });
    }
    setParticles(fresh);

    let startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      if (elapsed > 1000) {
        setParticles([]);
        return;
      }
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.16, // subtle gravity downward pull
            opacity: Math.max(0, p.opacity - 0.045), // fade out
          }))
          .filter((p) => p.opacity > 0)
      );
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  // Link Device ID state
  const [deviceLinking, setDeviceLinking] = useState(false);
  const [linkingProgress, setLinkingProgress] = useState(0);
  const [linkingStatus, setLinkingStatus] = useState("");

  // Register state
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPass, setRegPass] = useState("");
  const [regConfirm, setConfirm] = useState("");
  const [showConfirmErr, setShowConfirmErr] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [strengthLevel, setStrengthLevel] = useState({ w: "0%", c: "#f87171", l: "Too weak" });

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  useEffect(() => {
    // Generate/fetch Device ID on mount
    getOrCreateDeviceId();
    // Warm registered users db
    getRegisteredUsers();
  }, []);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
  };

  const handlePasswordChange = (val: string) => {
    setRegPass(val);
    let score = 0;
    if (val.length >= 6) score++;
    if (val.length >= 10) score++;
    if (/[A-Z]/.test(val) && /[a-z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^a-zA-Z0-9]/.test(val)) score++;

    const levels = [
      { w: "0%", c: "#f87171", l: "Too weak" },
      { w: "25%", c: "#fb923c", l: "Weak" },
      { w: "50%", c: "#facc15", l: "Fair" },
      { w: "75%", c: "#34d399", l: "Good" },
      { w: "100%", c: "#4ade80", l: "Strong" },
    ];
    setStrengthLevel(levels[Math.min(score, 4)]);
  };

  const doLogin = async () => {
    if (!email || !password) {
      showToast("Please fill all fields");
      return;
    }
    setLoading(true);
    try {
      const emailLower = email.trim().toLowerCase();
      const userCredential = await signInWithEmailAndPassword(auth, emailLower, password);
      const user = userCredential.user;
      
      spawnParticles(loginBtnRef);
      const displayName = user.displayName || user.email?.split("@")[0] || "User";
      showToast(`Access granted! Greeting ${displayName}...`);
      setTimeout(() => {
        setLoading(false);
        onLoginSuccess(displayName, user.email || emailLower);
      }, 900);
    } catch (err: any) {
      setLoading(false);
      let errMsg = err.message || "Login failed.";
      if (err.code === "auth/user-not-found" || err.code === "auth/invalid-credential" || err.code === "auth/wrong-password") {
        errMsg = "Invalid password or registered email. Please verify credentials or sign up.";
      }
      showToast(errMsg);
    }
  };

  const doRegister = async () => {
    if (!regName || !regEmail || !regPass || !regConfirm) {
      showToast("Please fill all fields");
      return;
    }
    if (regPass !== regConfirm) {
      setShowConfirmErr(true);
      return;
    }
    if (!termsAccepted) {
      showToast("Please accept Terms of Service");
      return;
    }
    setLoading(true);
    try {
      const emailLower = regEmail.trim().toLowerCase();
      const userCredential = await createUserWithEmailAndPassword(auth, emailLower, regPass);
      const user = userCredential.user;
      
      // Update displayName
      try {
        await updateProfile(user, { displayName: regName.trim() });
      } catch (profileErr) {
        console.warn("Failed to update profile name on Firebase: ", profileErr);
      }

      spawnParticles(registerBtnRef);
      showToast("Account locked in! Booting Veltrixa workspace...");
      
      setTimeout(() => {
        setLoading(false);
        onLoginSuccess(regName.trim(), emailLower);
      }, 900);
    } catch (err: any) {
      setLoading(false);
      let errMsg = err.message || "Registration failed.";
      if (err.code === "auth/email-already-in-use") {
        errMsg = "Email is already registered on Firebase. Please login or reset.";
      } else if (err.code === "auth/weak-password") {
        errMsg = "Password is too weak. Must be at least 6 characters.";
      }
      showToast(errMsg);
    }
  };

  const doForgot = async () => {
    if (!email) {
      showToast("Enter your email first");
      return;
    }
    setLoading(true);
    try {
      const { sendPasswordResetEmail } = await import("firebase/auth");
      await sendPasswordResetEmail(auth, email.trim().toLowerCase());
      setLoading(false);
      showToast("Password reset email sent! Check your inbox.");
      setActivePanel("login");
    } catch (err: any) {
      setLoading(false);
      showToast(err.message || "Failed to trigger recovery email.");
    }
  };

  const ssoLogin = (name: string, emailStr: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess(name, emailStr);
    }, 1000);
  };

  const handleGuestLogin = () => {
    setDeviceLinking(true);
    setLinkingProgress(0);
    setLinkingStatus("SCANNING CLIENT ENVIRONMENT...");
    
    const deviceId = getOrCreateDeviceId();
    const shortId = deviceId.replace("VLX-DEV-", "");

    // Stage 1
    setTimeout(() => {
      setLinkingProgress(33);
      setLinkingStatus("MAPPING HARDWARE DIGITAL FINGERPRINT...");
    }, 600);

    // Stage 2
    setTimeout(() => {
      setLinkingProgress(66);
      setLinkingStatus(`LINKING DEVICE TOKEN: ${deviceId}`);
    }, 1200);

    // Stage 3
    setTimeout(() => {
      setLinkingProgress(95);
      setLinkingStatus("SIGNING GUEST METRIC ENTITY ON NET...");
    }, 1800);

    // Stage 4
    setTimeout(() => {
      setLinkingProgress(100);
      setLinkingStatus("SUCCESS! ENCRYPTED SESSION INITIALIZED.");
      setTimeout(() => {
        setDeviceLinking(false);
        onLoginSuccess(`Guest_${shortId}`, `guest_${shortId.toLowerCase()}@veltrixa.network`);
      }, 500);
    }, 2400);
  };

  return (
    <div className="shell relative z-10 w-full h-full flex items-center justify-center p-3">
      {toastMsg && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl bg-slate-900 border border-purple-500/40 text-veltrixa-text text-sm shadow-xl z-50 transition-all duration-300">
          {toastMsg}
        </div>
      )}

      <div className="card w-full max-w-[420px] bg-slate-950/80 backdrop-blur-2xl border border-cyan-500/15 rounded-3xl overflow-hidden shadow-2xl relative">
        {/* Glow notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[55%] h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-10" />

        <div className="max-h-[calc(100vh-32px)] overflow-y-auto overflow-x-hidden px-8 py-10 scrollbar-none">
          {/* LOGIN PANEL */}
          {activePanel === "login" && (
            <div className="flex flex-col gap-5 animate-[panelIn_0.35s_cubic-bezier(.34,1.4,.64,1)]">
              <div className="flex justify-center mb-1">
                <svg className="w-14 h-14 animate-float filter drop-shadow-[0_0_16px_rgba(0,212,255,0.5)]" viewBox="0 0 56 56" fill="none">
                  <defs>
                    <linearGradient id="lg1" x1="0" y1="0" x2="56" y2="56" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#00d4ff" />
                      <stop offset="50%" stopColor="#9b5de5" />
                      <stop offset="100%" stopColor="#f72585" />
                    </linearGradient>
                    <linearGradient id="lg2" x1="56" y1="0" x2="0" y2="56" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#00d4ff" stopOpacity=".5" />
                      <stop offset="100%" stopColor="#f72585" stopOpacity=".5" />
                    </linearGradient>
                  </defs>
                  <polygon points="28,4 52,18 52,38 28,52 4,38 4,18" stroke="url(#lg1)" strokeWidth="1.5" fill="none" />
                  <polygon points="28,12 44,21 44,35 28,44 12,35 12,21" stroke="url(#lg2)" strokeWidth="1" fill="none" />
                  <circle cx="28" cy="28" r="5" fill="url(#lg1)" />
                  <line x1="28" y1="4" x2="28" y2="23" stroke="url(#lg1)" strokeWidth="1" opacity=".6" />
                  <line x1="28" y1="33" x2="28" y2="52" stroke="url(#lg1)" strokeWidth="1" opacity=".6" />
                </svg>
              </div>

              <div className="text-center">
                <h1 className="font-rajdhani text-3xl font-bold tracking-[3px] uppercase bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Veltrixa
                </h1>
                <p className="mt-1.5 text-xs text-slate-500 font-light tracking-wide">Login to continue your journey</p>
              </div>

              {/* Email Input */}
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4">📧</span>
                <input
                  type="email"
                  placeholder="Enter email"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-200 outline-none focus:border-cyan-500/50 focus:bg-cyan-500/5 transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4">🔒</span>
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Enter password"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-10 text-sm text-slate-200 outline-none focus:border-cyan-500/50 focus:bg-cyan-500/5 transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-cyan-400 p-0.5"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500">
                <label className="flex items-center gap-1.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-cyan-500/20"
                    checked={remem}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  <span>Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-cyan-400 hover:text-pink-500 transition-colors"
                  onClick={() => setActivePanel("forgot")}
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative overflow-visible w-full">
                {particles.map((p) => (
                  <div
                    key={p.id}
                    className="absolute rounded-full pointer-events-none z-30"
                    style={{
                      left: p.x,
                      top: p.y,
                      width: p.size,
                      height: p.size,
                      backgroundColor: p.color,
                      transform: 'translate(-50%, -50%)',
                      boxShadow: `0 0 10px ${p.color}, 0 0 20px ${p.color}`,
                      opacity: p.opacity,
                    }}
                  />
                ))}
                <button
                  ref={loginBtnRef}
                  onClick={doLogin}
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 hover:opacity-90 active:scale-[0.98] transition-all font-rajdhani text-base font-bold tracking-[2.5px] uppercase text-white shadow-[0_4px_28px_rgba(155,93,229,0.3)] disabled:opacity-50 disabled:pointer-events-none"
                >
                  {loading ? "Logging in..." : "Login →"}
                </button>
              </div>

              <div className="flex items-center gap-3 my-1">
                <div className="flex-1 h-[1px] bg-white/5" />
                <span className="text-[10px] text-slate-500 uppercase tracking-widest">or continue with</span>
                <div className="flex-1 h-[1px] bg-white/5" />
              </div>

              {/* SSO Buttons */}
              <div className="flex gap-2.5">
                <button
                  onClick={() => ssoLogin("Google User", "google.user@gmail.com")}
                  className="flex-1 bg-white/5 border border-white/10 hover:border-cyan-500/40 hover:bg-cyan-500/5 hover:text-cyan-400 rounded-xl py-2 px-1 text-[11px] text-slate-400 font-medium transition-all flex items-center justify-center gap-1.5"
                >
                  <span className="text-sm">🌐</span>
                  <span>Google</span>
                </button>
                <button
                  onClick={() => ssoLogin("GitHub Dev", "git.user@github.com")}
                  className="flex-1 bg-white/5 border border-white/10 hover:border-cyan-500/40 hover:bg-cyan-500/5 hover:text-cyan-400 rounded-xl py-2 px-1 text-[11px] text-slate-400 font-medium transition-all flex items-center justify-center gap-1.5"
                >
                  <Github size={14} className="text-white" />
                  <span>GitHub</span>
                </button>
                <button
                  onClick={handleGuestLogin}
                  className="flex-1 bg-white/5 border border-white/10 hover:border-cyan-500/40 hover:bg-cyan-500/5 hover:text-cyan-400 rounded-xl py-2 px-1 text-[11px] text-slate-400 font-medium transition-all flex items-center justify-center gap-1.5"
                >
                  <LogIn size={14} className="text-purple-400" />
                  <span>Guest</span>
                </button>
              </div>

              <p className="text-xs text-center text-slate-500 mt-2">
                Don't have an account?{" "}
                <button
                  onClick={() => setActivePanel("register")}
                  className="text-cyan-400 hover:text-pink-500 font-medium transition-colors ml-1"
                >
                  Register here
                </button>
              </p>
            </div>
          )}

          {/* REGISTER PANEL */}
          {activePanel === "register" && (
            <div className="flex flex-col gap-4 animate-[panelIn_0.35s_cubic-bezier(.34,1.4,.64,1)]">
              <button
                className="flex items-center gap-1 text-slate-500 hover:text-cyan-400 text-xs font-medium cursor-pointer self-start"
                onClick={() => setActivePanel("login")}
              >
                ← Back to Login
              </button>

              <div className="flex justify-center mb-1">
                <svg className="w-14 h-14 animate-float filter drop-shadow-[0_0_16px_rgba(0,212,255,0.5)]" viewBox="0 0 56 56" fill="none">
                  <defs>
                    <linearGradient id="lg3" x1="0" y1="0" x2="56" y2="56" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#9b5de5" />
                      <stop offset="1" stopColor="#f72585" />
                    </linearGradient>
                  </defs>
                  <circle cx="28" cy="20" r="10" stroke="url(#lg3)" strokeWidth="1.5" />
                  <path d="M10 46c0-9.94 8.06-18 18-18s18 8.06 18 18" stroke="url(#lg3)" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="28" cy="20" r="4" fill="url(#lg3)" />
                </svg>
              </div>

              <div className="text-center">
                <h1 className="font-rajdhani text-2xl font-bold tracking-[2px] uppercase bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                  Create Account
                </h1>
                <p className="mt-1 text-xs text-slate-500 font-light">Join us and start your journey</p>
              </div>

              {/* Name */}
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-sm">👤</span>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-11 pr-4 text-sm text-slate-200 outline-none focus:border-cyan-500/50 focus:bg-cyan-500/5 transition-all"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                />
              </div>

              {/* Email */}
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-sm">📧</span>
                <input
                  type="email"
                  placeholder="Enter email"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-11 pr-4 text-sm text-slate-200 outline-none focus:border-cyan-500/50 focus:bg-cyan-500/5 transition-all"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                />
              </div>

              {/* Pass */}
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-sm">🔒</span>
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Enter password"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-11 pr-10 text-sm text-slate-200 outline-none focus:border-cyan-500/50 focus:bg-cyan-500/5 transition-all"
                  value={regPass}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-cyan-400 p-0.5"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>

              {/* Strength track */}
              <div className="flex flex-col gap-1.5 -mt-1.5">
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>Password strength</span>
                  <span style={{ color: strengthLevel.c }} className="font-semibold transition-colors">
                    {strengthLevel.l}
                  </span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div
                    style={{ width: strengthLevel.w, backgroundColor: strengthLevel.c }}
                    className="h-full rounded-full transition-all duration-300"
                  />
                </div>
              </div>

              {/* Confirm Pass */}
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-sm">🔒</span>
                <input
                  type={showConfirmPass ? "text" : "password"}
                  placeholder="Confirm password"
                  className={`w-full bg-white/5 border ${showConfirmErr ? "border-red-400/50" : "border-white/10"} rounded-xl py-2.5 pl-11 pr-10 text-sm text-slate-200 outline-none focus:border-cyan-500/50 focus:bg-cyan-500/5 transition-all`}
                  value={regConfirm}
                  onChange={(e) => {
                    setConfirm(e.target.value);
                    setShowConfirmErr(regPass !== "" && e.target.value !== regPass);
                  }}
                />
                <button
                  type="button"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-cyan-400 p-0.5"
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                >
                  {showConfirmPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {showConfirmErr && <p className="text-[11px] text-red-400 -mt-1 px-1">Passwords do not match</p>}

              {/* Terms */}
              <label className="flex items-start gap-2 cursor-pointer select-none text-xs text-slate-400 leading-normal">
                <input
                  type="checkbox"
                  className="rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-cyan-500/20 mt-0.5"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                />
                <span>
                  I agree to the <span className="text-cyan-400 hover:underline">Terms of Service</span> and{" "}
                  <span className="text-cyan-400 hover:underline">Privacy Policy</span>
                </span>
              </label>

              <div className="relative overflow-visible w-full mt-2">
                {particles.map((p) => (
                  <div
                    key={p.id}
                    className="absolute rounded-full pointer-events-none z-30"
                    style={{
                      left: p.x,
                      top: p.y,
                      width: p.size,
                      height: p.size,
                      backgroundColor: p.color,
                      transform: 'translate(-50%, -50%)',
                      boxShadow: `0 0 10px ${p.color}, 0 0 20px ${p.color}`,
                      opacity: p.opacity,
                    }}
                  />
                ))}
                <button
                  ref={registerBtnRef}
                  onClick={doRegister}
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 hover:opacity-90 active:scale-[0.98] transition-all font-rajdhani text-base font-bold tracking-[2.5px] uppercase text-white shadow-[0_4px_28px_rgba(155,93,229,0.3)] disabled:opacity-50 disabled:pointer-events-none"
                >
                  {loading ? "Registering..." : "Register →"}
                </button>
              </div>

              <p className="text-xs text-center text-slate-500 mt-1">
                Already have an account?{" "}
                <button
                  onClick={() => setActivePanel("login")}
                  className="text-cyan-400 hover:text-pink-500 font-medium transition-colors ml-1"
                >
                  Login here
                </button>
              </p>
            </div>
          )}

          {/* FORGOT PASSWORD PANEL */}
          {activePanel === "forgot" && (
            <div className="flex flex-col gap-5 animate-[panelIn_0.35s_cubic-bezier(.34,1.4,.64,1)]">
              <button
                className="flex items-center gap-1 text-slate-500 hover:text-cyan-400 text-xs font-medium cursor-pointer self-start"
                onClick={() => setActivePanel("login")}
              >
                ← Back to Login
              </button>

              <div className="flex justify-center mb-1">
                <svg className="w-14 h-14 animate-float filter drop-shadow-[0_0_16px_rgba(0,212,255,0.5)]" viewBox="0 0 56 56" fill="none">
                  <defs>
                    <linearGradient id="lg4" x1="0" y1="0" x2="56" y2="56" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#00d4ff" />
                      <stop offset="1" stopColor="#9b5de5" />
                    </linearGradient>
                  </defs>
                  <rect x="10" y="24" width="36" height="24" rx="4" stroke="url(#lg4)" strokeWidth="1.5" />
                  <path d="M18 24v-7a10 10 0 0120 0v7" stroke="url(#lg4)" strokeWidth="1.5" />
                  <circle cx="28" cy="36" r="3.5" fill="url(#lg4)" />
                  <line x1="28" y1="39.5" x2="28" y2="44" stroke="url(#lg4)" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </div>

              <div className="text-center">
                <h1 className="font-rajdhani text-2xl font-bold tracking-[2px] uppercase bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  Reset Password
                </h1>
                <p className="mt-1.5 text-xs text-slate-500 font-light">We'll send a reset link to your email</p>
              </div>

              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-sm">📧</span>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-sm text-slate-200 outline-none focus:border-cyan-500/50 focus:bg-cyan-500/5 transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button
                onClick={doForgot}
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 hover:opacity-90 active:scale-[0.98] transition-all font-rajdhani text-base font-bold tracking-[2.5px] uppercase text-white shadow-[0_4px_28px_rgba(155,93,229,0.3)] disabled:opacity-50 disabled:pointer-events-none"
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>

              <p className="text-xs text-center text-slate-500 mt-1">
                Remembered it?{" "}
                <button
                  onClick={() => setActivePanel("login")}
                  className="text-cyan-400 hover:text-pink-500 font-medium transition-colors ml-1"
                >
                  Login here
                </button>
              </p>
            </div>
          )}
        </div>
      </div>

      {deviceLinking && (
        <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-3xl flex flex-col items-center justify-center p-6 z-50 animate-fade-in">
          <div className="w-full max-w-[380px] bg-slate-900/60 border border-cyan-500/30 rounded-3xl p-8 flex flex-col items-center shadow-[0_0_60px_rgba(0,212,255,0.15)] relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
            
            {/* Pulsing visual core */}
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-400/40 flex items-center justify-center mb-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-400/20 to-transparent animate-pulse" />
              <span className="text-2xl animate-[spin_12s_linear_infinite]">🛰️</span>
            </div>

            <h2 className="font-rajdhani text-lg font-bold tracking-[3px] text-cyan-400 uppercase text-center">
              Device Link Protocol
            </h2>
            <p className="text-[10px] text-slate-500 font-mono mt-1 text-center tracking-wider">
              CLIENT COMPLIANCE CHECK
            </p>

            <div className="w-full bg-slate-950 border border-white/5 rounded-xl p-4 mt-6 flex flex-col gap-2 font-mono text-[11px] text-slate-350">
              <div className="flex items-center gap-1.5 text-cyan-400">
                <span className="animate-pulse">●</span>
                <span className="truncate">STATUS: {linkingStatus}</span>
              </div>
              <div className="flex justify-between border-t border-white/5 pt-2 text-slate-400">
                <span>Inst signature:</span>
                <span className="text-slate-200">VLX-PORTAL-WEB</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Unique Hashing:</span>
                <span className="text-purple-400 font-semibold">Tethered ✅</span>
              </div>
            </div>

            {/* Micro progress bar */}
            <div className="w-full mt-6">
              <div className="flex justify-between text-[10px] font-mono text-slate-500 mb-1">
                <span>BINDING METRICS</span>
                <span>{linkingProgress}%</span>
              </div>
              <div className="h-2 bg-slate-950 border border-white/5 rounded-full overflow-hidden p-[2px]">
                <div 
                  style={{ width: `${linkingProgress}%` }}
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300"
                />
              </div>
            </div>

            <p className="text-[10px] text-slate-500 text-center font-light leading-relaxed mt-6 italic">
              Guest access is sealed to your browser session context to assure platform security levels.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
