"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SecretCodeListener() {
  const [secretCode, setSecretCode] = useState("");
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // 🔐 Keyboard Secret Code Detection
  useEffect(() => {
    if (!isClient) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      setSecretCode((prev) => {
        const newCode = (prev + e.key).slice(-10);
        if (newCode.includes("openadmin")) {
          setTimeout(() => router.push("/admin-login"), 100);
          return "";
        }
        return newCode;
      });
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [router, isClient]);

  // 🟦 Corner Tap Sequence: TL → TR → BL → BR
  useEffect(() => {
    if (!isClient) return;

    let cornerTaps: string[] = [];
    const cornerSize = 50;
    const tapTimeout = 3000;
    let lastTapTime = 0;

    const handleTap = (e: TouchEvent) => {
      const touch = e.touches[0] || e.changedTouches[0];
      const now = Date.now();

      if (now - lastTapTime > tapTimeout && cornerTaps.length > 0) {
        cornerTaps = [];
      }

      lastTapTime = now;

      const { clientX, clientY } = touch;
      const width = window.innerWidth;
      const height = window.innerHeight;

      let corner = "";
      if (clientX < cornerSize && clientY < cornerSize) corner = "TL";
      else if (clientX > width - cornerSize && clientY < cornerSize) corner = "TR";
      else if (clientX < cornerSize && clientY > height - cornerSize) corner = "BL";
      else if (clientX > width - cornerSize && clientY > height - cornerSize) corner = "BR";

      if (corner) {
        cornerTaps.push(corner);
        if (cornerTaps.length > 4) cornerTaps.shift();

        if (cornerTaps.join("") === "TLTRBLBR") {
          cornerTaps = [];
          setTimeout(() => router.push("/admin-login"), 100);
        }
      }
    };

    window.addEventListener("touchstart", handleTap);
    return () => window.removeEventListener("touchstart", handleTap);
  }, [router, isClient]);

  // 📱 Device Shake Detection
  useEffect(() => {
    if (!isClient || typeof window.DeviceMotionEvent === "undefined") return;

    let shakeCount = 0;
    let lastShake = 0;
    const shakeThreshold = 15;
    const shakeTimeout = 1000;
    const requiredShakes = 3;

    const handleShake = (e: DeviceMotionEvent) => {
      if (!e.acceleration) return;

      const { x, y, z } = e.acceleration;
      const now = Date.now();
      const movement = Math.sqrt((x || 0) ** 2 + (y || 0) ** 2 + (z || 0) ** 2);

      if (movement > shakeThreshold) {
        if (now - lastShake > shakeTimeout) shakeCount = 0;
        lastShake = now;
        shakeCount++;

        if (shakeCount >= requiredShakes) {
          shakeCount = 0;
          setTimeout(() => router.push("/admin-login"), 100);
        }
      }
    };

    const enableShake = () => window.addEventListener("devicemotion", handleShake);

    // 🛑 iOS 13+ requires permission
    if (typeof (DeviceMotionEvent as any).requestPermission === "function") {
      (DeviceMotionEvent as any)
        .requestPermission()
        .then((res: string) => res === "granted" && enableShake())
        .catch(console.error);
    } else {
      enableShake();
    }

    return () => window.removeEventListener("devicemotion", handleShake);
  }, [router, isClient]);

  // 🔘 Hidden Area Rapid Tap (Top-Left Corner)
  useEffect(() => {
    if (!isClient) return;

    let tapCount = 0;
    let lastTap = 0;
    const tapArea = { size: 50 };
    const tapTimeout = 2000;
    const requiredTaps = 5;

    const handleHiddenTap = (e: TouchEvent) => {
      const touch = e.touches[0] || e.changedTouches[0];
      const now = Date.now();

      if (touch.clientX < tapArea.size && touch.clientY < tapArea.size) {
        e.preventDefault();

        if (now - lastTap > tapTimeout) tapCount = 0;
        lastTap = now;
        tapCount++;

        if (tapCount >= requiredTaps) {
          tapCount = 0;
          setTimeout(() => router.push("/admin-login"), 100);
        }
      }
    };

    document.addEventListener("touchstart", handleHiddenTap, { passive: false });
    return () => {
      document.removeEventListener("touchstart", handleHiddenTap);
    };
  }, [router, isClient]);

  return null; // No visual output
}
