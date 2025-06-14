import { TextReveal } from "@/components/magicui/text-reveal";
import { Ripple } from "@/components/magicui/ripple";

function LetsBuild() {
    return (
        <div className="relative w-full">
            {/* Container for both text and ripple with proper overlay */}
            <div className="relative">
                {/* Ripple background - hidden on mobile, visible on tablet and up */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none hidden md:block z-0">
                    <div className="sticky top-0 w-full h-screen flex items-center justify-center">
                        <Ripple />
                    </div>
                </div>
                {/* Text on top */}
                <div className="relative z-10">
                    <TextReveal className="text-center max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto text-4xl">Let&apos;s work together to build your future.</TextReveal>
                </div>
            </div>
        </div>
    )
}

export default LetsBuild;
