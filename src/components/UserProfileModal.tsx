import React, { useState, useEffect } from "react";
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Eye, 
  EyeOff, 
  MapPin, 
  ShieldCheck, 
  Camera, 
  Save, 
  Check, 
  AlertCircle,
  HelpCircle,
  KeyRound,
  Bold,
  Italic,
  Trash2
} from "lucide-react";

interface UserProfileData {
  fullName: string;
  bio: string;
  email: string;
  mobileNumber: string;
  passwordHex: string;
  city: string;
  country: string;
  avatarUrl: string;
}

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  currentUser: any;
  onProfileUpdate: (updatedUser: any) => void;
}

const PRESET_AVATARS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
];

export default function UserProfileModal({ isOpen, onClose, isDarkMode, currentUser, onProfileUpdate }: UserProfileModalProps) {
  const [profile, setProfile] = useState<UserProfileData>(() => {
    return {
      fullName: currentUser?.fullName || currentUser?.name || "",
      bio: currentUser?.bio || "",
      email: currentUser?.email || "",
      mobileNumber: currentUser?.mobileNumber || "",
      passwordHex: currentUser?.passwordHex || "•••••••••••••",
      city: currentUser?.city || "",
      country: currentUser?.country || "",
      avatarUrl: currentUser?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    };
  });

  useEffect(() => {
    if (currentUser && isOpen) {
      setProfile({
        fullName: currentUser.fullName || currentUser.name || "",
        bio: currentUser.bio || "",
        email: currentUser.email || "",
        mobileNumber: currentUser.mobileNumber || "",
        passwordHex: currentUser.passwordHex || "•••••••••••••",
        city: currentUser.city || "",
        country: currentUser.country || "",
        avatarUrl: currentUser.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
      });
    }
  }, [currentUser, isOpen]);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [customAvatarBase64, setCustomAvatarBase64] = useState<string | null>(null);

  // Email and mobile contact verification states
  const [originalEmail, setOriginalEmail] = useState<string>("");
  const [originalMobile, setOriginalMobile] = useState<string>("");
  const [verifiedEmail, setVerifiedEmail] = useState<string>("");
  const [verifiedMobile, setVerifiedMobile] = useState<string>("");

  const [isSendingEmailCode, setIsSendingEmailCode] = useState<boolean>(false);
  const [isVerifyingEmailCode, setIsVerifyingEmailCode] = useState<boolean>(false);
  const [emailVerifyCode, setEmailVerifyCode] = useState<string>("");
  const [emailCodeSent, setEmailCodeSent] = useState<boolean>(false);
  const [emailErrorLocal, setEmailErrorLocal] = useState<string>("");
  const [emailSuccessLocal, setEmailSuccessLocal] = useState<string>("");

  const [isSendingMobileCode, setIsSendingMobileCode] = useState<boolean>(false);
  const [isVerifyingMobileCode, setIsVerifyingMobileCode] = useState<boolean>(false);
  const [mobileVerifyCode, setMobileVerifyCode] = useState<string>("");
  const [mobileCodeSent, setMobileCodeSent] = useState<boolean>(false);
  const [mobileErrorLocal, setMobileErrorLocal] = useState<string>("");
  const [mobileSuccessLocal, setMobileSuccessLocal] = useState<string>("");

  // License and Premium tier states
  const [localLicenseKey, setLocalLicenseKey] = useState<string>("");
  const [localIsPurchased, setLocalIsPurchased] = useState<boolean>(false);
  const [verifyError, setVerifyError] = useState<string>("");
  const [verifySuccess, setVerifySuccess] = useState<string>("");
  const [isVerifyingKey, setIsVerifyingKey] = useState<boolean>(false);

  const [localHasClaimedReceipt, setLocalHasClaimedReceipt] = useState<boolean>(() => {
    return localStorage.getItem("receipts_has_claimed_receipt") === "true" || localStorage.getItem("receipts_gumroad_verified") === "true";
  });
  const [localIsAutoVerifyEnabled, setLocalIsAutoVerifyEnabled] = useState<boolean>(() => {
    return localStorage.getItem("receipts_auto_verify") === "true";
  });

  useEffect(() => {
    if (currentUser && isOpen) {
      setLocalLicenseKey(currentUser.licenseKey || "");
      setLocalIsPurchased(currentUser.isPurchased || false);
      setOriginalEmail(currentUser.email || "");
      setOriginalMobile(currentUser.mobileNumber || "");
      setVerifiedEmail(currentUser.email || "");
      setVerifiedMobile(currentUser.mobileNumber || "");
      
      // Reset code statuses
      setEmailCodeSent(false);
      setEmailVerifyCode("");
      setEmailErrorLocal("");
      setEmailSuccessLocal("");
      
      setMobileCodeSent(false);
      setMobileVerifyCode("");
      setMobileErrorLocal("");
      setMobileSuccessLocal("");
    }
  }, [currentUser, isOpen]);

  const handleVerifyLocalLicense = async () => {
    if (!localLicenseKey.trim()) {
      setVerifyError("Please enter a license key.");
      return;
    }
    setIsVerifyingKey(true);
    setVerifyError("");
    setVerifySuccess("");

    try {
      const response = await fetch("/api/verify-license", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          licenseKey: localLicenseKey.trim(),
          productPermalink: "receipts-copywriter",
          email: profile.email
        })
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setLocalIsPurchased(true);
        setVerifySuccess("License successfully synced! Pro Lifetime Active.");
        
        setLocalHasClaimedReceipt(true);
        setLocalIsAutoVerifyEnabled(true);
        localStorage.setItem("receipts_has_claimed_receipt", "true");
        localStorage.setItem("receipts_auto_verify", "true");

        // Persist immediately on verification success so Pro upgrades apply instantly without any extra saves
        const updatedUser = {
          ...currentUser,
          ...profile,
          isPurchased: true,
          licenseKey: localLicenseKey.trim()
        };

        localStorage.setItem("receipts_current_user", JSON.stringify(updatedUser));
        localStorage.setItem("receipts_gumroad_verified", "true");
        localStorage.setItem("receipts_license_key", localLicenseKey.trim());

        const usersStr = localStorage.getItem("receipts_registered_users");
        let usersList = [];
        if (usersStr) {
          try {
            usersList = JSON.parse(usersStr);
          } catch (es) {}
        }
        const index = usersList.findIndex((u: any) => (u?.email || "").toLowerCase() === (currentUser?.email || "").toLowerCase());
        if (index !== -1) {
          usersList[index] = updatedUser;
        } else {
          usersList.push(updatedUser);
        }
        localStorage.setItem("receipts_registered_users", JSON.stringify(usersList));

        onProfileUpdate(updatedUser);
      } else {
        setVerifyError(data.error || "Verification failed. Invalid license key.");
      }
    } catch (err: any) {
      setVerifyError("Connection error. Please try again.");
    } finally {
      setIsVerifyingKey(false);
    }
  };

  const handleSendEmailVerification = async () => {
    if (!profile.email.trim()) {
      setEmailErrorLocal("Please enter a valid email address.");
      return;
    }
    setIsSendingEmailCode(true);
    setEmailErrorLocal("");
    setEmailSuccessLocal("");
    try {
      const res = await fetch("/api/send-profile-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentEmail: originalEmail,
          type: "email",
          value: profile.email
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setEmailCodeSent(true);
        setEmailSuccessLocal(`Code generated: ${data.code}. Sent email verification successfully!`);
      } else {
        setEmailErrorLocal(data.error || "Failed to send verification code.");
      }
    } catch (err) {
      setEmailErrorLocal("Error sending verification code.");
    } finally {
      setIsSendingEmailCode(false);
    }
  };

  const handleVerifyEmailCode = async () => {
    if (!emailVerifyCode.trim()) {
      setEmailErrorLocal("Please enter the 6-digit code.");
      return;
    }
    setIsVerifyingEmailCode(true);
    setEmailErrorLocal("");
    setEmailSuccessLocal("");
    try {
      const res = await fetch("/api/verify-profile-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentEmail: originalEmail,
          type: "email",
          code: emailVerifyCode
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setVerifiedEmail(profile.email);
        setEmailCodeSent(false);
        setEmailVerifyCode("");
        setEmailSuccessLocal("Email verified successfully! You can now update your profile.");
      } else {
        setEmailErrorLocal(data.error || "Invalid verification code.");
      }
    } catch (err) {
      setEmailErrorLocal("Error verifying code.");
    } finally {
      setIsVerifyingEmailCode(false);
    }
  };

  const handleSendMobileVerification = async () => {
    if (!profile.mobileNumber.trim()) {
      setMobileErrorLocal("Please enter a valid phone number.");
      return;
    }
    setIsSendingMobileCode(true);
    setMobileErrorLocal("");
    setMobileSuccessLocal("");
    try {
      const res = await fetch("/api/send-profile-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentEmail: originalEmail,
          type: "mobileNumber",
          value: profile.mobileNumber
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setMobileCodeSent(true);
        setMobileSuccessLocal(`Code generated: ${data.code}. Sent code to your registered email: ${originalEmail}`);
      } else {
        setMobileErrorLocal(data.error || "Failed to send verification code.");
      }
    } catch (err) {
      setMobileErrorLocal("Error sending verification code.");
    } finally {
      setIsSendingMobileCode(false);
    }
  };

  const handleVerifyMobileCode = async () => {
    if (!mobileVerifyCode.trim()) {
      setMobileErrorLocal("Please enter the 6-digit code.");
      return;
    }
    setIsVerifyingMobileCode(true);
    setMobileErrorLocal("");
    setMobileSuccessLocal("");
    try {
      const res = await fetch("/api/verify-profile-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentEmail: originalEmail,
          type: "mobileNumber",
          code: mobileVerifyCode
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setVerifiedMobile(profile.mobileNumber);
        setMobileCodeSent(false);
        setMobileVerifyCode("");
        setMobileSuccessLocal("Phone number verified successfully! You can now update your profile.");
      } else {
        setMobileErrorLocal(data.error || "Invalid verification code.");
      }
    } catch (err) {
      setMobileErrorLocal("Error verifying code.");
    } finally {
      setIsVerifyingMobileCode(false);
    }
  };

  useEffect(() => {
    if (profile.avatarUrl.startsWith("data:image")) {
      setCustomAvatarBase64(profile.avatarUrl);
    } else {
      setCustomAvatarBase64(null);
    }
  }, [profile.avatarUrl]);

  // Rich Text Bio and Delete Account States
  const bioRef = React.useRef<HTMLTextAreaElement>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const [deleteConfirmValue, setDeleteConfirmValue] = useState<string>("");

  const applyBioFormatting = (type: "bold" | "italic") => {
    const textarea = bioRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = profile.bio;
    const selected = text.substring(start, end);
    
    let tag = type === "bold" ? "**" : "*";
    let formatted = "";
    
    if (selected) {
      const isWrapped = selected.startsWith(tag) && selected.endsWith(tag);
      if (isWrapped) {
        formatted = text.slice(0, start) + selected.slice(tag.length, selected.length - tag.length) + text.slice(end);
      } else {
        formatted = text.slice(0, start) + tag + selected + tag + text.slice(end);
      }
    } else {
      formatted = text.slice(0, start) + tag + (type === "bold" ? "bold" : "italic") + tag + text.slice(end);
    }
    
    if (formatted.length <= 2000) {
      handleChange("bio", formatted);
    } else {
      handleChange("bio", formatted.substring(0, 2000));
    }
    
    setTimeout(() => {
      textarea.focus();
      if (selected) {
        const adjustment = selected.startsWith(tag) && selected.endsWith(tag) ? -tag.length * 2 : tag.length * 2;
        textarea.setSelectionRange(start, end + adjustment);
      } else {
        const offset = tag.length;
        textarea.setSelectionRange(start + offset, start + offset + (type === "bold" ? 4 : 6));
      }
    }, 50);
  };

  const renderBioPreview = (bioText: string) => {
    if (!bioText) return <span className="text-slate-400 dark:text-slate-500 italic">No bio text specified</span>;
    const html = bioText
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/\*([^*]+)\*/g, "<em>$1</em>")
      .replace(/_([^_]+)_/g, "<em>$1</em>")
      .replace(/\n/g, "<br />");
    
    return <div dangerouslySetInnerHTML={{ __html: html }} className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed font-sans break-words max-w-full" />;
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmValue !== "DELETE") return;
    
    const usersStr = localStorage.getItem("receipts_registered_users");
    let usersList = [];
    if (usersStr) {
      try {
        usersList = JSON.parse(usersStr);
      } catch (es) {}
    }
    
    const userEmail = currentUser?.email || "";
    const updatedUsersList = usersList.filter((u: any) => (u?.email || "").toLowerCase() !== (userEmail || "").toLowerCase());
    localStorage.setItem("receipts_registered_users", JSON.stringify(updatedUsersList));
    
    localStorage.removeItem("receipts_current_user");
    localStorage.removeItem("receipts_gumroad_verified");
    localStorage.removeItem("receipts_license_key");

    setShowDeleteConfirm(false);
    setDeleteConfirmValue("");
    
    onProfileUpdate(null);
    onClose();
  };

  if (!isOpen) return null;

  const handleChange = (field: keyof UserProfileData, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
    setSaveSuccess(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1 * 1024 * 1024) {
        setVerifyError("Please upload an image smaller than 1MB to ensure offline persistence.");
        return;
      }
      setVerifyError("");
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setCustomAvatarBase64(base64String);
        handleChange("avatarUrl", base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const selectPresetAvatar = (url: string) => {
    setCustomAvatarBase64(null);
    handleChange("avatarUrl", url);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (profile.email !== originalEmail && profile.email !== verifiedEmail) {
      setVerifyError("Please verify your new email address via code before saving profile changes.");
      return;
    }
    if (profile.mobileNumber !== originalMobile && profile.mobileNumber !== verifiedMobile) {
      setVerifyError("Please verify your new phone number via code before saving profile changes.");
      return;
    }
    
    setVerifyError("");
    setVerifySuccess("");
    setIsSaving(true);
    
    setTimeout(() => {
      // Save updated details into registered list and active state
      const usersStr = localStorage.getItem("receipts_registered_users");
      let usersList = [];
      if (usersStr) {
        try {
          usersList = JSON.parse(usersStr);
        } catch (es) {}
      }

      const updatedUser = {
        ...currentUser,
        ...profile,
        isPurchased: localIsPurchased,
        licenseKey: localLicenseKey
      };

      const originalEmail = currentUser?.email || "";
      const index = usersList.findIndex((u: any) => (u?.email || "").toLowerCase() === (originalEmail || "").toLowerCase());
      if (index !== -1) {
        usersList[index] = updatedUser;
      } else {
        usersList.push(updatedUser);
      }

      localStorage.setItem("receipts_registered_users", JSON.stringify(usersList));
      localStorage.setItem("receipts_current_user", JSON.stringify(updatedUser));
      
      onProfileUpdate(updatedUser);
      setIsSaving(false);
      setSaveSuccess(true);
      
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }, 850);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div 
        className={`w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden transform transition-all border ${
          isDarkMode 
            ? "bg-slate-900 border-slate-800 text-slate-100" 
            : "bg-white border-slate-200 text-slate-900"
        }`}
      >
        {/* Header decoration */}
        <div className={`p-6 border-b flex justify-between items-center ${
          isDarkMode 
            ? "bg-slate-950/40 border-slate-800" 
            : "bg-slate-50 border-slate-200"
        }`}>
          <div className="flex items-center gap-3 select-none">
            <span className="p-2 rounded-xl bg-indigo-600 text-white shadow-xs">
              <ShieldCheck className="w-5 h-5 animate-pulse" />
            </span>
            <div>
              <h3 className="font-extrabold text-sm tracking-tight">User Profile</h3>
              <p className={`text-[10px] uppercase font-mono tracking-wider font-bold ${
                localIsPurchased 
                  ? "text-emerald-500 animate-pulse" 
                  : isDarkMode ? "text-indigo-400" : "text-indigo-600"
              }`}>
                {localIsPurchased ? "👑 Pro Lifetime Active" : "🎁 Free Single Output Trial"}
              </p>
            </div>
          </div>
          
          <button 
            type="button" 
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              isDarkMode ? "hover:bg-slate-800 text-slate-400 hover:text-white" : "hover:bg-slate-100 text-slate-500 hover:text-slate-950"
            }`}
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 md:p-8 flex flex-col gap-6">
          <div className="max-h-[400px] overflow-y-auto pr-2 flex flex-col gap-6 text-left">
            {/* Top Profile Avatar Creator area */}
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-dashed border-slate-200 dark:border-slate-800">
            {/* Main Avatar Frame */}
            <div className="relative group shrink-0">
              <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-indigo-500 shadow-md bg-slate-100 dark:bg-slate-800 relative">
                <img 
                  src={profile.avatarUrl} 
                  alt="Profile Avatar" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <label 
                className="absolute -bottom-2 -right-2 p-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm hover:shadow cursor-pointer transition-colors"
                title="Upload Profile Picture"
              >
                <Camera className="w-3.5 h-3.5" />
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageUpload}
                />
              </label>
            </div>

            {/* Selection of pre-made presets or upload detail */}
            <div className="flex-1 text-center sm:text-left">
              <span className={`block text-xs uppercase tracking-wider font-extrabold mb-1.5 ${
                isDarkMode ? "text-slate-400" : "text-slate-500"
              }`}>
                Choose Professional Avatar Accent or Upload Photo
              </span>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2.5 mb-2.5">
                {PRESET_AVATARS.map((url, idx) => (
                  <button
                    type="button"
                    key={`modal-avatar-${idx}`}
                    onClick={() => selectPresetAvatar(url)}
                    className={`w-9 h-9 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                      profile.avatarUrl === url ? "border-indigo-600 scale-105 shadow-xs" : "border-transparent opacity-85 hover:opacity-100"
                    }`}
                  >
                    <img 
                      src={url} 
                      alt={`Preset ${idx + 1}`} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
                
                {customAvatarBase64 && (
                  <div className="w-9 h-9 rounded-lg overflow-hidden border-2 border-indigo-600 relative">
                    <img 
                      src={customAvatarBase64} 
                      alt="Uploaded Avatar" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute inset-0 bg-indigo-900/40 flex items-center justify-center text-[8px] text-white font-extrabold font-mono pointer-events-none">
                      FILE
                    </span>
                  </div>
                )}
              </div>
              <p className={`text-[11px] leading-relaxed ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>
                Upload square PNG/JPG assets. Highly recommended size: 150x150 pixels up to 1MB.
              </p>
            </div>
          </div>

          {/* Form grid details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Left Col: Core Profile Identity */}
            <div className="flex flex-col gap-4">
              <span className="block text-xs uppercase tracking-wider font-extrabold text-indigo-600">
                My Profile Identity
              </span>

              {/* Full Name Field */}
              <div>
                <label className={`block text-[10px] uppercase font-extrabold tracking-wider mb-1.5 ${
                  isDarkMode ? "text-slate-400" : "text-slate-500"
                }`}>
                  Full Account Name:
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={profile.fullName}
                    onChange={(e) => handleChange("fullName", e.target.value)}
                    className={`w-full rounded-lg pl-10 pr-4 py-2.5 text-xs outline-hidden transition-all ${
                      isDarkMode 
                        ? "bg-slate-850 border border-slate-700 focus:bg-slate-900 focus:border-indigo-500 text-slate-100" 
                        : "bg-slate-50 border border-slate-300 focus:bg-white focus:border-indigo-500 text-slate-800"
                    }`}
                  />
                </div>
              </div>

              {/* Bio / Description Field with formatting bar and character count preview */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className={`block text-[10px] uppercase font-extrabold tracking-wider ${
                    isDarkMode ? "text-slate-400" : "text-slate-500"
                  }`}>
                    Professional Persona/Bio:
                  </label>
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                    profile.bio.length >= 1900 
                      ? "bg-rose-500/10 text-rose-500 animate-pulse" 
                      : isDarkMode ? "bg-slate-800 text-slate-400" : "bg-slate-100 text-slate-600"
                  }`}>
                    {profile.bio.length} / 2000 Limit
                  </span>
                </div>

                {/* Rich Text Toolbar */}
                <div className={`flex items-center gap-1.5 p-1.5 px-2 rounded-t-lg border-x border-t text-xs select-none ${
                  isDarkMode 
                    ? "bg-slate-950 border-slate-805 text-slate-400" 
                    : "bg-slate-100 border-slate-300 text-slate-600"
                }`}>
                  <button
                    type="button"
                    onClick={() => applyBioFormatting("bold")}
                    className={`p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-indigo-500 transition-all flex items-center justify-center cursor-pointer`}
                    title="Insert Bold Text"
                  >
                    <Bold className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => applyBioFormatting("italic")}
                    className={`p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-indigo-500 transition-all flex items-center justify-center cursor-pointer`}
                    title="Insert Italic Text"
                  >
                    <Italic className="w-3.5 h-3.5" />
                  </button>
                  <div className={`w-px h-4 mx-1 ${isDarkMode ? "bg-slate-800" : "bg-slate-300"}`} />
                  <span className="text-[9px] text-slate-400 font-medium">
                    Use toolbar or Markdown formatting: **bold** / *italic*
                  </span>
                </div>

                <textarea
                  ref={bioRef}
                  rows={3}
                  maxLength={2000}
                  value={profile.bio}
                  onChange={(e) => {
                    if (e.target.value.length <= 2000) {
                      handleChange("bio", e.target.value);
                    }
                  }}
                  className={`w-full rounded-b-lg px-4 py-2.5 text-xs outline-hidden transition-all resize-none border-x border-b ${
                    isDarkMode 
                      ? "bg-slate-850 border-slate-705 focus:bg-slate-900 focus:border-indigo-500 text-slate-100" 
                      : "bg-slate-50 border-slate-300 focus:bg-white focus:border-indigo-500 text-slate-800"
                  }`}
                  placeholder="Describe your background or professional summary here..."
                />

                {/* Live Preview of Biography */}
                <div className={`mt-2 p-3 rounded-xl border text-xs leading-relaxed ${
                  isDarkMode 
                    ? "bg-slate-950/20 border-slate-850" 
                    : "bg-slate-50/50 border-slate-200"
                }`}>
                  <span className="block text-[8px] uppercase tracking-wider font-extrabold text-slate-400 mb-1">
                    Live Rendered Biography:
                  </span>
                  <div className="min-h-[2.5rem]">
                    {renderBioPreview(profile.bio)}
                  </div>
                </div>
              </div>

              {/* Region Selector: City & Country merged */}
              <div>
                <label className={`block text-[10px] uppercase font-extrabold tracking-wider mb-1.5 ${
                  isDarkMode ? "text-slate-400" : "text-slate-500"
                }`}>
                  Region Location (City, Country):
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="City"
                      value={profile.city}
                      onChange={(e) => handleChange("city", e.target.value)}
                      className={`w-full rounded-lg pl-8.5 pr-3 py-2 text-xs outline-hidden transition-all ${
                        isDarkMode 
                          ? "bg-slate-850 border border-slate-700 focus:bg-slate-900 focus:border-indigo-500 text-slate-100" 
                          : "bg-slate-50 border border-slate-300 focus:bg-white focus:border-indigo-500 text-slate-800"
                      }`}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Country"
                    value={profile.country}
                    onChange={(e) => handleChange("country", e.target.value)}
                    className={`w-full rounded-lg px-3 py-2 text-xs outline-hidden transition-all ${
                      isDarkMode 
                        ? "bg-slate-850 border border-slate-700 focus:bg-slate-900 focus:border-indigo-500 text-slate-100" 
                        : "bg-slate-50 border border-slate-300 focus:bg-white focus:border-indigo-500 text-slate-800"
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Right Col: Secure Contact & Credentials */}
            <div className="flex flex-col gap-4">
              <span className="block text-xs uppercase tracking-wider font-extrabold text-indigo-600">
                Secure Account Credentials
              </span>

              {/* Email Address */}
              <div>
                <label className={`block text-[10px] uppercase font-extrabold tracking-wider mb-1.5 ${
                  isDarkMode ? "text-slate-400" : "text-slate-500"
                }`}>
                  Linked Email Identity:
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={profile.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className={`w-full rounded-lg pl-10 pr-4 py-2.5 text-xs outline-hidden transition-all ${
                      isDarkMode 
                        ? "bg-slate-850 border border-slate-700 focus:bg-slate-900 focus:border-indigo-500 text-slate-100" 
                        : "bg-slate-50 border border-slate-300 focus:bg-white focus:border-indigo-500 text-slate-800"
                    }`}
                  />
                </div>
                {profile.email !== originalEmail && (
                  <div className="mt-2.5 p-3.5 bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-150 dark:border-indigo-900/30 rounded-xl text-xs">
                    <div className="flex justify-between items-center flex-wrap gap-2 mb-2">
                      <span className="font-bold text-indigo-750 dark:text-indigo-400 flex items-center gap-1.5 leading-none">
                        {profile.email === verifiedEmail ? "✓ New Email Verified" : "🔒 Verification Required to Update Email"}
                      </span>
                      {profile.email !== verifiedEmail && !emailCodeSent && (
                        <button
                          type="button"
                          disabled={isSendingEmailCode}
                          onClick={handleSendEmailVerification}
                          className="text-[10px] bg-indigo-650 font-extrabold uppercase tracking-widest text-white px-3 py-1.5 rounded-lg cursor-pointer hover:bg-indigo-700 disabled:bg-indigo-400 transition-colors"
                        >
                          {isSendingEmailCode ? "Sending..." : "Send Verification Code"}
                        </button>
                      )}
                    </div>
                    {profile.email !== verifiedEmail && emailCodeSent && (
                      <div className="mt-2.5 flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="6-Digit Verification Code"
                          value={emailVerifyCode}
                          onChange={(e) => setEmailVerifyCode(e.target.value)}
                          className={`w-40 rounded-lg px-3 py-2 text-xs text-center font-mono tracking-widest border font-bold ${
                            isDarkMode ? "bg-slate-900 border-slate-705 text-white" : "bg-white border-slate-300 text-slate-950"
                          }`}
                        />
                        <button
                          type="button"
                          disabled={isVerifyingEmailCode}
                          onClick={handleVerifyEmailCode}
                          className="text-[11px] bg-emerald-600 font-extrabold text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-emerald-700 transition-colors flex items-center gap-1"
                        >
                          {isVerifyingEmailCode ? "Verifying..." : "Verify Code"}
                        </button>
                      </div>
                    )}
                    {emailSuccessLocal && <p className="text-[11px] text-emerald-500 font-bold mt-2">{emailSuccessLocal}</p>}
                    {emailErrorLocal && <p className="text-[11px] text-rose-500 font-bold mt-2">{emailErrorLocal}</p>}
                  </div>
                )}
              </div>

              {/* Mobile Phone Number */}
              <div>
                <label className={`block text-[10px] uppercase font-extrabold tracking-wider mb-1.5 ${
                  isDarkMode ? "text-slate-400" : "text-slate-500"
                }`}>
                  Secure Contact phone number:
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    value={profile.mobileNumber}
                    onChange={(e) => handleChange("mobileNumber", e.target.value)}
                    className={`w-full rounded-lg pl-10 pr-4 py-2.5 text-xs outline-hidden transition-all ${
                      isDarkMode 
                        ? "bg-slate-850 border border-slate-700 focus:bg-slate-900 focus:border-indigo-500 text-slate-100" 
                        : "bg-slate-50 border border-slate-300 focus:bg-white focus:border-indigo-500 text-slate-800"
                    }`}
                  />
                </div>
                {profile.mobileNumber !== originalMobile && (
                  <div className="mt-2.5 p-3.5 bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-150 dark:border-indigo-900/30 rounded-xl text-xs">
                    <div className="flex justify-between items-center flex-wrap gap-2 mb-2">
                      <span className="font-bold text-indigo-750 dark:text-indigo-400 flex items-center gap-1.5 leading-none">
                        {profile.mobileNumber === verifiedMobile ? "✓ New Phone Verified" : "🔒 Verification Required to Update Phone"}
                      </span>
                      {profile.mobileNumber !== verifiedMobile && !mobileCodeSent && (
                        <button
                          type="button"
                          disabled={isSendingMobileCode}
                          onClick={handleSendMobileVerification}
                          className="text-[10px] bg-indigo-650 font-extrabold uppercase tracking-widest text-white px-3 py-1.5 rounded-lg cursor-pointer hover:bg-indigo-700 disabled:bg-indigo-400 transition-colors"
                        >
                          {isSendingMobileCode ? "Sending..." : "Send Verification Code"}
                        </button>
                      )}
                    </div>
                    {profile.mobileNumber !== verifiedMobile && mobileCodeSent && (
                      <div className="mt-2.5 flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="6-Digit Verification Code"
                          value={mobileVerifyCode}
                          onChange={(e) => setMobileVerifyCode(e.target.value)}
                          className={`w-40 rounded-lg px-3 py-2 text-xs text-center font-mono tracking-widest border font-bold ${
                            isDarkMode ? "bg-slate-900 border-slate-705 text-white" : "bg-white border-slate-300 text-slate-950"
                          }`}
                        />
                        <button
                          type="button"
                          disabled={isVerifyingMobileCode}
                          onClick={handleVerifyMobileCode}
                          className="text-[11px] bg-emerald-600 font-extrabold text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-emerald-700 transition-colors flex items-center gap-1"
                        >
                          {isVerifyingMobileCode ? "Verifying..." : "Verify Code"}
                        </button>
                      </div>
                    )}
                    {mobileSuccessLocal && <p className="text-[11px] text-emerald-500 font-bold mt-2">{mobileSuccessLocal}</p>}
                    {mobileErrorLocal && <p className="text-[11px] text-rose-500 font-bold mt-2">{mobileErrorLocal}</p>}
                  </div>
                )}
              </div>

              {/* Account Secure Code Code (Password edit / view) */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className={`block text-[10px] uppercase font-extrabold tracking-wider ${
                    isDarkMode ? "text-slate-400" : "text-slate-500"
                  }`}>
                    Credential Password:
                  </label>
                  <span className="text-[9px] font-mono font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-1 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                    <KeyRound className="w-2.5 h-2.5" /> High Strength 
                  </span>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={profile.passwordHex}
                    onChange={(e) => handleChange("passwordHex", e.target.value)}
                    className={`w-full rounded-lg pl-10 pr-10 py-2.5 text-xs font-mono tracking-wider outline-hidden transition-all ${
                      isDarkMode 
                        ? "bg-slate-850 border border-slate-700 focus:bg-slate-900 focus:border-indigo-500 text-slate-100" 
                        : "bg-slate-50 border border-slate-300 focus:bg-white focus:border-indigo-500 text-slate-800"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-650 transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Gumroad License Synchronization Segment */}
          <div className={`p-5 rounded-2xl border transition-all duration-300 ${
            localIsPurchased
              ? isDarkMode ? "bg-emerald-950/25 border-emerald-800/40 text-emerald-300" : "bg-emerald-50 border-emerald-200 text-emerald-800"
              : isDarkMode ? "bg-slate-950/40 border-slate-800 text-slate-300" : "bg-slate-50 border-slate-200 text-slate-800"
          }`}>
            <div className="flex items-center justify-between mb-3.5 select-none animate-fade-in">
              <div className="flex items-center gap-2">
                <span className={`p-1.5 rounded-lg font-bold flex items-center justify-center ${
                  localIsPurchased ? "bg-emerald-500 text-white" : "bg-indigo-600 text-white"
                }`}>
                  <KeyRound className="w-4 h-4" />
                </span>
                <div>
                  <h4 className="font-extrabold text-xs">Gumroad Lifetime License Sync</h4>
                  <p className="text-[10px] text-slate-400 font-medium">Verify your lifetime license key to toggle Pro state permanently</p>
                </div>
              </div>
              <div>
                {localIsPurchased ? (
                  <span className="text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500 text-white px-2.5 py-1 rounded-md">
                    👑 Pro Lifetime Active
                  </span>
                ) : (
                  <span className="text-[10px] font-extrabold uppercase tracking-wider bg-amber-550 text-white px-2.5 py-1 rounded-md">
                    🎁 Free Trial Mode
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 items-stretch mt-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Paste Gumroad License Key (e.g. GUMROAD-TEST-ACTIVE-KEY)"
                  value={localLicenseKey}
                  disabled={localIsPurchased || isVerifyingKey}
                  onChange={(e) => {
                    setLocalLicenseKey(e.target.value);
                    setVerifyError("");
                    setVerifySuccess("");
                  }}
                  className={`w-full rounded-lg pl-3.5 pr-4 py-2 text-xs font-mono outline-hidden transition-all ${
                    isDarkMode 
                      ? "bg-slate-850 border border-slate-700 text-slate-100 disabled:opacity-50" 
                      : "bg-white border border-slate-300 text-slate-800 disabled:opacity-50"
                  }`}
                />
              </div>
              {!localIsPurchased ? (
                <button
                  type="button"
                  disabled={isVerifyingKey}
                  onClick={handleVerifyLocalLicense}
                  className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white text-xs font-extrabold uppercase tracking-wider h-9.5 px-5 py-2 rounded-lg transition-all shrink-0 cursor-pointer flex items-center gap-1.5"
                >
                  {isVerifyingKey ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white/35 border-t-white rounded-full animate-spin" />
                      <span>Syncing...</span>
                    </>
                  ) : (
                    "Sync License"
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setLocalIsPurchased(false);
                    setLocalLicenseKey("");
                    setVerifySuccess("");
                    setVerifyError("");
                  }}
                  className="bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs font-extrabold uppercase tracking-wider px-5 py-2 rounded-lg transition-all shrink-0 cursor-pointer"
                >
                  Disconnect Key
                </button>
              )}
            </div>

            {verifySuccess && (
              <p className="mt-2 text-[11px] text-emerald-500 font-bold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> {verifySuccess}
              </p>
            )}
            {verifyError && (
              <p className="mt-2 text-[11px] text-rose-500 font-bold flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {verifyError}
              </p>
            )}

            {!localIsPurchased && (
              <p className="text-[10px] mt-2.5 text-slate-400 font-medium">
                💡 <strong>Demo Unlock Key:</strong> Paste <code className="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-1 py-0.5 rounded text-[9px]">GUMROAD-TEST-ACTIVE-KEY</code> or <code className="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-1 py-0.5 rounded text-[9px]">DEMO-LICENSE-KEY</code> to instantly experience verified sync state privileges.
              </p>
            )}

            {/* Auto-Verify Toggle representation in Profile Modal */}
            <div className={`mt-4 p-3.5 rounded-xl border flex items-center justify-between transition-all duration-205 ${
              localIsAutoVerifyEnabled 
                ? isDarkMode ? "bg-indigo-950/20 border-indigo-900/40" : "bg-indigo-50/60 border-indigo-200/50" 
                : isDarkMode ? "bg-slate-900/40 border-slate-800" : "bg-slate-50 border-slate-200"
            }`}>
              <div className="flex-1 pr-3">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className={`text-[11px] font-bold ${isDarkMode ? "text-slate-100" : "text-slate-800"}`}>Auto-Verify License Option</span>
                  {!localHasClaimedReceipt && (
                    <span className="text-[8px] font-extrabold uppercase tracking-widest bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400 px-1.5 py-0.5 rounded font-mono">
                      🔒 Locked till purchase
                    </span>
                  )}
                </div>
                <p className={`text-[10px] mt-1 leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                  Automatically sync and restore your premium lifetime Pro status on app startup without re-entering details.
                </p>
              </div>
              <button
                type="button"
                disabled={!localHasClaimedReceipt}
                onClick={() => {
                  const nextVal = !localIsAutoVerifyEnabled;
                  setLocalIsAutoVerifyEnabled(nextVal);
                  localStorage.setItem("receipts_auto_verify", nextVal ? "true" : "false");
                }}
                className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                  !localHasClaimedReceipt ? "opacity-40 cursor-not-allowed bg-slate-200 dark:bg-slate-800" : localIsAutoVerifyEnabled ? "bg-indigo-650" : "bg-slate-350 dark:bg-slate-700"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs transition duration-200 ease-in-out ${
                    localIsAutoVerifyEnabled ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Device Sync Protection Notice banner */}
          <div className={`p-4 rounded-xl border flex gap-3 text-xs leading-relaxed ${
            isDarkMode 
              ? "bg-indigo-950/20 border-indigo-800/40 text-indigo-300" 
              : "bg-indigo-50/50 border-indigo-100 text-indigo-700"
          }`}>
            <ShieldCheck className="w-5 h-5 shrink-0 text-indigo-500 mt-0.5" />
            <div>
              <strong className="font-bold">Offline Sync Local Security Panel:</strong>
              <p className={`text-[11px] mt-0.5 font-medium ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                Your credentials and profile are saved locally onto secure client storage container schemas. Data never transits plain-text to external nodes. Keep your verified Gumroad license key safe to sync assets smoothly.
              </p>
            </div>
          </div>

          {/* Danger Zone: Permanent Deletion Segment */}
          <div className={`p-5 rounded-2xl border transition-all duration-300 bg-rose-50/10 dark:bg-rose-950/5 border-rose-200 dark:border-rose-900/30 text-rose-800 dark:text-rose-300`}>
            <div className="flex items-start justify-between gap-4 mb-3.5 select-none text-rose-800 dark:text-rose-400">
              <div className="flex gap-2.5">
                <span className="p-1.5 rounded-lg bg-rose-600 text-white flex items-center justify-center shrink-0">
                  <Trash2 className="w-4 h-4" />
                </span>
                <div>
                  <h4 className="font-extrabold text-xs text-rose-700 dark:text-rose-400">Danger Zone: Permanent Account Deletion</h4>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Permanently purge your credentials, trial logs, and synced licenses from local storage schemas</p>
                </div>
              </div>
            </div>

            {!showDeleteConfirm ? (
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(true)}
                className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold uppercase tracking-wider px-4 py-2 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete My Account</span>
              </button>
            ) : (
              <div className="flex flex-col gap-3.5 p-3.5 rounded-lg bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-950/35 text-xs text-slate-700 dark:text-slate-350 animate-fade-in">
                <p className="font-medium text-[11px] leading-relaxed">
                  ⚠️ <strong>Are you absolutely sure?</strong> This action is permanent and cannot be undone. All your trial credentials, license alignments, and setup assets will be deleted immediately from local storage cache databases.
                </p>
                <div>
                  <label className="block text-[9px] uppercase font-extrabold text-slate-400 mb-1">
                    Type <strong className="text-rose-600 select-all font-mono">DELETE</strong> below of linked account to authorize:
                  </label>
                  <input
                    type="text"
                    placeholder="Type DELETE to confirm"
                    value={deleteConfirmValue}
                    onChange={(e) => setDeleteConfirmValue(e.target.value)}
                    className={`w-full rounded-lg px-3 py-1.5 text-xs font-mono outline-hidden border ${
                      isDarkMode 
                        ? "bg-slate-850 border-slate-700 text-slate-100 placeholder:text-slate-600"
                        : "bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400"
                    }`}
                  />
                </div>
                <div className="flex gap-2.5 justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setShowDeleteConfirm(false);
                      setDeleteConfirmValue("");
                    }}
                    className={`text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-extrabold text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-md border ${
                      isDarkMode ? "border-slate-800 bg-slate-900" : "border-slate-200 bg-white"
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={deleteConfirmValue !== "DELETE"}
                    onClick={handleDeleteAccount}
                    className="bg-rose-600 hover:bg-rose-705 disabled:bg-rose-400 text-white font-extrabold text-[10px] uppercase tracking-wider px-4 py-1.5 rounded-md transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Confirm Purge Account</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          </div>

          {/* Validation Status & Footer Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-850">
            {saveSuccess && (
              <p className="mr-auto text-xs text-emerald-600 font-bold flex items-center gap-1.5 bg-emerald-500/10 px-3.5 py-2.5 rounded-lg border border-emerald-500/20 animate-fade-in">
                <Check className="w-4 h-4" /> Account Profile Updated Successfully!
              </p>
            )}
            
            <div className="flex gap-2.5 w-full sm:w-auto justify-end ml-auto">
              <button
                type="button"
                onClick={onClose}
                className={`py-2.5 px-5 rounded-lg text-xs font-extrabold uppercase tracking-wider transition-colors cursor-pointer ${
                  isDarkMode 
                    ? "border border-slate-700 bg-slate-800 hover:bg-slate-705 text-slate-300 hover:text-white" 
                    : "border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900"
                }`}
              >
                Close
              </button>
              
              <button
                type="submit"
                disabled={isSaving}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-extrabold text-xs uppercase tracking-wider px-6 py-2.5 rounded-lg transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                {isSaving ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/35 border-t-white rounded-full animate-spin" />
                    <span>Encrypting...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>Update Profile</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
