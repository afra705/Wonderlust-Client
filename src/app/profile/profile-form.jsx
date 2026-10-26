"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  Camera,
  CircleAlert,
  CircleCheck,
  Loader2,
  Mail,
  Trash2,
  UserRound,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const MAX_PHOTO_SIZE = 1024 * 1024; // 1 MB

const getInitials = (name) =>
  name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase() || "U";

const ProfileForm = ({ user }) => {
  const router = useRouter();
  const [savedProfile, setSavedProfile] = useState({
    name: user.name,
    image: user.image,
  });
  const [form, setForm] = useState(savedProfile);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState(null);

  const isDirty =
    form.name !== savedProfile.name || form.image !== savedProfile.image;
  const canSave = isDirty && form.name.trim().length > 0 && !isSaving;

  const setField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setMessage(null);
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage({ type: "error", text: "Please choose an image file." });
      return;
    }

    if (file.size > MAX_PHOTO_SIZE) {
      setMessage({
        type: "error",
        text: "That image is too large. Please choose a file under 1 MB.",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setField("image", String(reader.result));
    reader.onerror = () =>
      setMessage({
        type: "error",
        text: "We couldn't read that image. Please try another one.",
      });
    reader.readAsDataURL(file);
  };

  const handleReset = () => {
    setForm(savedProfile);
    setMessage(null);
  };

  const handleSubmit = async (event) => {
event.preventDefault()
     const res = await fetch(`http://localhost:5000/profile/${user.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name:form.name,
      image:form.image
    }),
  });
  
  const data = await res.json();
  console.log(data);
if (res.ok) {
setSavedProfile({
name: form.name.trim(),
image: form.image,
});

setForm({
  name: form.name.trim(),
  image: form.image,
});

router.refresh();

}
  };

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-10">
      <h1 className="font-serif text-4xl text-gray-950">My Profile</h1>
      <p className="mt-2 text-sm text-gray-500">
        Manage your account settings and travel preferences
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm"
      >
        <div
          aria-hidden="true"
          className="relative h-28 overflow-hidden bg-gradient-to-r from-[#00bcd4] to-[#0d8fa7]"
        >
          <span className="absolute -top-12 -right-8 size-40 rounded-full bg-white/10" />
          <span className="absolute -bottom-20 left-14 size-48 rounded-full bg-white/10" />
        </div>

        <div className="px-5 pb-6 sm:px-8">
          <div className="-mt-12 flex flex-wrap items-end justify-between gap-4">
            <div className="rounded-full border-4 border-white bg-white shadow-sm">
              <Avatar className="size-24">
                {form.image ? (
                  <AvatarImage src={form.image} alt={form.name || "Profile"} />
                ) : null}
                <AvatarFallback className="bg-cyan-50 text-2xl font-semibold text-cyan-600">
                  {getInitials(form.name || user.email)}
                </AvatarFallback>
              </Avatar>
            </div>

            {user.memberSince ? (
              <span className="mb-1 inline-flex items-center gap-1.5 rounded-full bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-500">
                <CalendarDays className="size-3.5" />
                Member since {user.memberSince}
              </span>
            ) : null}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <label
              htmlFor="profile-photo"
              className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-md border border-gray-200 bg-white px-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              <Camera className="size-4 text-gray-500" />
              Change photo
            </label>
            <input
              id="profile-photo"
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={handlePhotoChange}
            />

            {form.image ? (
              <button
                type="button"
                onClick={() => setField("image", "")}
                className="inline-flex h-9 items-center gap-1.5 px-2 text-sm font-medium text-red-500 transition-colors hover:text-red-600"
              >
                <Trash2 className="size-4" />
                Remove
              </button>
            ) : null}

            <p className="text-xs text-gray-400">
              JPG, PNG or WebP. Maximum 1 MB.
            </p>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700">
                Full name
              </Label>
              <div className="relative">
                <UserRound className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  maxLength={80}
                  value={form.name}
                  onChange={(event) => setField("name", event.target.value)}
                  placeholder="Your full name"
                  className="h-11 border-gray-200 bg-[#f8fafc] pl-10 text-gray-800 focus-visible:border-[#00bcd4] focus-visible:ring-[#00bcd4]/30"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">
                Email address
              </Label>
              <div className="relative">
                <Mail className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={user.email}
                  readOnly
                  disabled
                  className="h-11 border-gray-200 bg-gray-50 pl-10 text-gray-500 disabled:bg-gray-50 disabled:opacity-100"
                />
              </div>
              <p className="text-xs text-gray-400">
                Your email address cannot be changed here.
              </p>
            </div>
          </div>

          {message ? (
            <div
              role={message.type === "error" ? "alert" : "status"}
              className={`mt-6 flex items-start gap-2 rounded-md border px-3.5 py-3 text-sm ${
                message.type === "success"
                  ? "border-green-200 bg-green-50 text-green-700"
                  : "border-red-200 bg-red-50 text-red-600"
              }`}
            >
              {message.type === "success" ? (
                <CircleCheck className="mt-0.5 size-4 shrink-0" />
              ) : (
                <CircleAlert className="mt-0.5 size-4 shrink-0" />
              )}
              {message.text}
            </div>
          ) : null}

          <div className="mt-6 flex flex-wrap items-center justify-end gap-3 border-t border-gray-100 pt-5">
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              disabled={!isDirty || isSaving}
              className="h-10 border-gray-200 px-4 text-gray-700"
            >
              Reset
            </Button>
            <Button
              type="submit"
              disabled={!canSave}
              className="h-10 bg-[#00bcd4] px-5 font-semibold text-white hover:bg-[#00b0c6] disabled:opacity-60"
            >
              {isSaving ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save changes"
              )}
            </Button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default ProfileForm;
