import { ArrowRightIcon } from "lucide-react";
import AnimationContainer from "./global/animation-container";
import { Button } from "./ui/button";
import { LampContainer } from "./ui/lamp";

function CTA() {
    return (
        <div className="mt-20 w-full overflow-hidden max-w-7xl mx-auto px-6 lg:px-8">
                <AnimationContainer delay={0.1}>
                    <LampContainer>
                        <div className="flex flex-col items-center justify-center relative w-full text-center">
                            <h2 className="bg-gradient-to-b from-neutral-200 to-neutral-400 py-4 bg-clip-text text-center text-4xl md:text-7xl !leading-[1.15] font-medium font-heading tracking-tight text-neutral-700 mt-8">
                            Never Stop Learning To be Expert
                            </h2>
                            <p className="text-muted-foreground mt-6 max-w-xl mx-auto">
                            We are a team of experts who are passionate about helping you learn and grow as a expert in your field. Don't miss out on the opportunity!
                            </p>
                            <div className="mt-6">
                                <Button variant="blue">
                                    Get Started
                                    <ArrowRightIcon className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        </div>
                    </LampContainer>
                </AnimationContainer>
            </div>
    )
}

export default CTA