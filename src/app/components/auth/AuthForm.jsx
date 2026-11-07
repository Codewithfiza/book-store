"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  EnvelopeSimple,
  Lock,
  User,
  CircleNotch,
} from "@phosphor-icons/react";
import { useCustomer } from "./CustomerContext";

gsap.registerPlugin(useGSAP);

function Field({ icon: Icon, ...props }) {
  return (
    <div className="relative">
      <Icon
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-dim"
      />
      <input
        {...props}
        className="h-12 w-full rounded-lg bg-wood pl-10 pr-3 text-base text-text outline-none placeholder:text-dim focus:shadow-glow disabled:opacity-60 sm:text-sm"
      />
    </div>
  );
}

export default function AuthForm({ redirectTo = "/" }) {
  const router = useRouter();
  const { refresh } = useCustomer();
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const isSignup = mode === "signup";

  // Only allow redirects to pages on our own site
  const safeRedirect =
    redirectTo.startsWith("/") && !redirectTo.startsWith("//")
      ? redirectTo
      : "/";

  const scope = useRef(null);
  const pill = useRef(null);
  const nameRow = useRef(null);
  const confirmRow = useRef(null);
  const subtitle = useRef(null);
  const errorBox = useRef(null);

  // Entrance animation: runs once on load
  useGSAP(
    () => {
      gsap.from(".auth-card", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      });
      gsap.from(".auth-item", {
        y: 16,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        delay: 0.25,
        ease: "power2.out",
      });
    },
    { scope }
  );

  // Mode change animation
  useGSAP(
    () => {
      gsap.to(pill.current, {
        x: isSignup ? "100%" : "0%",
        duration: 0.4,
        ease: "power3.inOut",
      });

      [nameRow.current, confirmRow.current].forEach((row) => {
        gsap.to(row, {
          height: isSignup ? "auto" : 0,
          opacity: isSignup ? 1 : 0,
          duration: 0.4,
          ease: "power2.inOut",
        });
      });

      gsap.fromTo(
        subtitle.current,
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 0.35 }
      );
    },
    { scope, dependencies: [mode] }
  );

  // Error message animation
  useGSAP(
    () => {
      if (error && errorBox.current) {
        gsap.fromTo(
          errorBox.current,
          { opacity: 0, y: -8 },
          { opacity: 1, y: 0, duration: 0.3 }
        );
      }
    },
    { scope, dependencies: [error] }
  );

  const switchMode = (next) => {
    setMode(next);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const form = new FormData(e.currentTarget);
    const name = form.get("name")?.toString().trim();
    const email = form.get("email")?.toString().trim();
    const password = form.get("password")?.toString();
    const confirm = form.get("confirm")?.toString();

    if (!email || !password) {
      return setError("Please enter your email and password.");
    }
    if (isSignup) {
      if (!name) return setError("Please enter your name.");
      if (password.length < 8) {
        return setError("Password must be at least 8 characters.");
      }
      if (password !== confirm) return setError("Passwords do not match.");
    }

    setLoading(true);
    try {
      const res = await fetch(
        isSignup ? "/api/customer/signup" : "/api/customer/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            isSignup ? { name, email, password } : { email, password }
          ),
        }
      );
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      // Cookie is already set by the server. Send them onward.
      await refresh();
      router.push(safeRedirect);
      router.refresh();
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const tabText = (active) =>
    `relative z-10 py-2.5 text-sm font-medium transition-colors ${
      active ? "text-bg" : "text-muted hover:text-text"
    }`;

  return (
    <div ref={scope} className="w-full max-w-md">
      <div className="auth-card rounded-2xl border border-wood bg-surface p-6 shadow-soft sm:p-8">
        <h1 className="auth-item text-center font-display text-xl text-glow sm:text-2xl">
          Scriptorium
        </h1>
        <p
          ref={subtitle}
          className="mt-1 text-center text-sm text-muted"
        >
          {isSignup ? "Create your account" : "Welcome back, reader"}
        </p>

        <div className="auth-item relative mt-6 grid grid-cols-2 rounded-lg bg-wood p-1">
          <div
            ref={pill}
            className="absolute bottom-1 left-1 top-1 w-[calc(50%-4px)] rounded-md bg-primary"
          />
          <button
            type="button"
            onClick={() => switchMode("login")}
            className={tabText(!isSignup)}
          >
            Log in
          </button>
          <button
            type="button"
            onClick={() => switchMode("signup")}
            className={tabText(isSignup)}
          >
            Sign up
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col">
          <div
            ref={nameRow}
            inert={!isSignup}
            className="h-0 overflow-hidden opacity-0"
          >
            <div className="pb-4">
              <Field
                icon={User}
                type="text"
                name="name"
                autoComplete="name"
                placeholder="Full name"
                disabled={loading}
              />
            </div>
          </div>

          <div className="auth-item pb-4">
            <Field
              icon={EnvelopeSimple}
              type="email"
              name="email"
              autoComplete="email"
              placeholder="Email"
              disabled={loading}
            />
          </div>

          <div className="auth-item pb-4">
            <Field
              icon={Lock}
              type="password"
              name="password"
              autoComplete={isSignup ? "new-password" : "current-password"}
              placeholder="Password"
              disabled={loading}
            />
          </div>

          <div
            ref={confirmRow}
            inert={!isSignup}
            className="h-0 overflow-hidden opacity-0"
          >
            <div className="pb-4">
              <Field
                icon={Lock}
                type="password"
                name="confirm"
                autoComplete="new-password"
                placeholder="Confirm password"
                disabled={loading}
              />
            </div>
          </div>

          {error && (
            <p
              ref={errorBox}
              role="alert"
              className="mb-4 rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-300"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="auth-item flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary font-medium text-bg transition-shadow hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <>
                <CircleNotch size={20} className="animate-spin" />
                Please wait
              </>
            ) : isSignup ? (
              "Create account"
            ) : (
              "Log in"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}