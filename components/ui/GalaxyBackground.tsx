"use client";

import Galaxy from "@/components/ui/Galaxy";

export function GalaxyBackground() {
    return (
        <div className="fixed inset-0 -z-10 w-screen h-screen overflow-hidden">
            <Galaxy
                density={1.0}
                speed={0.2}
                starSpeed={0.2}
                hueShift={200}
                glowIntensity={0.12}
                twinkleIntensity={0.15}
                rotationSpeed={0.015}
                transparent={false}
            />
        </div>
    );
}
