"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function SecretCodeListener() {
  const [input, setInput] = useState("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      setInput((prev) => {
        const newInput = (prev + e.key).slice(-10); // Keep last 10 characters
        if (newInput.includes("openadmin")) {
          router.push("/admin-login"); // Redirect
          return ""; // Reset input
        }
        return newInput;
      });
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [router]);

  useEffect(() => {
    if (input.includes("openadmin")) {
      setInput(""); // Reset input before redirect
      router.push("/admin-login");
    }
  }, [input, router]);

  // ✅ Tap anywhere to focus input on mobile
  useEffect(() => {
    const handleTouch = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    document.addEventListener("touchstart", handleTouch);
    return () => document.removeEventListener("touchstart", handleTouch);
  }, []);

  return (
    <input
      ref={inputRef}
      type="text"
      value={input}
      onChange={(e) => {
        setInput((prev) => {
          const newInput = (prev + e.target.value).slice(-10); // Keep last 10 characters
          if (newInput.includes("openadmin")) {
            router.push("/admin-login"); // Redirect
            return ""; // Reset input
          }
          return newInput;
        });
      }}
      autoCapitalize="off"
      autoCorrect="off"
      autoComplete="off"
      style={{
        position: "absolute",
        left: "-9999px", // Hides input
        opacity: 0,
      }}
    />
  );
}
