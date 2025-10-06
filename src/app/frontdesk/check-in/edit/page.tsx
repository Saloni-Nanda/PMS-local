"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, CreditCard, User, FileCheck, Hotel } from 'lucide-react';
import { useRouter } from 'next/navigation';
import RoomSelection from './RoomSelection';
import Payments from './Payments';
import GuestInfo from './GuestInfo';
import Confirmation from './Confirmation';

// Types
interface StepProps {
    onNext: () => void;
    onBack?: () => void;
}

interface Step {
    title: string;
    icon: React.ComponentType<{ className?: string }>;
}

// Step 1: Room Selection Component
const RoomSelectionStep: React.FC<Pick<StepProps, 'onNext'>> = ({ onNext }) => {
    return (
        <div className="space-y-6">
            <RoomSelection />
            <div className="flex justify-start">
                <Button onClick={onNext} className='bg-[#076DB3] hover:bg-[#054f80] cursor-pointer w-full sm:w-auto'>
                    Go to Payments
                </Button>
            </div>
        </div>
    );
};

// Step 2: Payment Component
const PaymentStep: React.FC<StepProps> = ({ onNext }) => {
    return (
        <div className="space-y-6">
            <Payments/>
            <div className="flex justify-start">
                <Button onClick={onNext} className='bg-[#076DB3] hover:bg-[#054f80] cursor-pointer w-full sm:w-auto'>
                    Save and go to Guest Info
                </Button>
            </div>
        </div>
    );
};

// Step 3: Guest Info Component
const GuestInfoStep: React.FC<StepProps> = ({ onNext }) => {
    return (
        <div className="space-y-6">
            <GuestInfo/>
            <div className="flex justify-start ">
                <Button onClick={onNext} className='bg-[#076DB3] hover:bg-[#054f80] cursor-pointer w-full md:w-auto'>
                    Save and go to Confirmation
                </Button>
            </div>
        </div>
    );
};

// Step 4: Confirmation Component
const ConfirmationStep: React.FC<Pick<StepProps, 'onBack'>> = ({ onBack }) => {
    const router = useRouter()
    const handleCompleteBooking = (): void => {
        //alert('Booking completed successfully!');
        router.back()
    };

    return (
        <div className="space-y-6">
            <Confirmation/>
            <div className="flex flex-col sm:flex-row justify-end gap-2 ">
                {onBack && (
                    <Button variant="outline" onClick={onBack} className='bg-gray-500 hover:bg-gray-700 text-white hover:text-white cursor-pointer w-full sm:w-auto'>
                        Back to Guest Info
                    </Button>
                )}
                <Button className='bg-[#076DB3] hover:bg-[#054f80] cursor-pointer w-full sm:w-auto' onClick={handleCompleteBooking}>
                    Complete Booking
                </Button>
            </div>
        </div>
    );
};

// Main Booking Form Component
const Page: React.FC = () => {
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set([0])); // Step 0 is accessible by default

    const steps: Step[] = [
        { title: 'Select Room', icon: Hotel },
        { title: 'Payments', icon: CreditCard },
        { title: 'Main Guest Info', icon: User },
        { title: 'Confirmation', icon: CheckCircle2 }
    ];

    const nextStep = (): void => {
        if (currentStep < steps.length - 1) {
            // Mark current step as completed and move to next step
            setCompletedSteps(prev => new Set([...prev, currentStep + 1]));
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = (): void => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const goToStep = (stepIndex: number): void => {
        // Only allow navigation to completed/saved steps
        if (completedSteps.has(stepIndex)) {
            setCurrentStep(stepIndex);
        }
    };

    const isStepClickable = (stepIndex: number): boolean => {
        // Only allow clicking on completed/saved steps
        return completedSteps.has(stepIndex);
    };

    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return <RoomSelectionStep onNext={nextStep} />;
            case 1:
                return <PaymentStep onNext={nextStep} onBack={prevStep} />;
            case 2:
                return <GuestInfoStep onNext={nextStep} onBack={prevStep} />;
            case 3:
                return <ConfirmationStep onBack={prevStep} />;
            default:
                return <RoomSelectionStep onNext={nextStep} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto">
                {/* Step Navigation */}
                <Card className="mb-4 p-0 rounded-none">
                    <CardContent className="p-0">
                        <div className="flex overflow-x-auto">
                            {steps.map((step, index) => {
                                const isClickable = isStepClickable(index);
                                const Icon = step.icon;
                                return (
                                    <div
                                        key={index}
                                        className={`flex-1 min-w-[80px] sm:min-w-0 py-3 sm:py-4 px-2 text-center relative transition-all ${
                                            index === currentStep
                                                ? "bg-blue-50 border-b-2 border-[#076DB3]"
                                                : completedSteps.has(index)
                                                    ? "bg-green-50"
                                                    : "bg-white"
                                        } ${
                                            isClickable
                                                ? "cursor-pointer hover:bg-gray-50"
                                                : "cursor-not-allowed opacity-75"
                                        }`}
                                        onClick={() => {
                                            if (isClickable) {
                                                goToStep(index);
                                            }
                                        }}
                                        role="button"
                                        tabIndex={isClickable ? 0 : -1}
                                        onKeyDown={(e) => {
                                            if (
                                                isClickable &&
                                                (e.key === "Enter" || e.key === " ")
                                            ) {
                                                e.preventDefault();
                                                goToStep(index);
                                            }
                                        }}
                                        aria-label={
                                            isClickable
                                                ? `Go to step ${index + 1}: ${step.title}`
                                                : `Step ${index + 1}: ${step.title} (not clickable)`
                                        }
                                        aria-disabled={!isClickable}
                                    >
                                        <div className="flex flex-col items-center gap-1">
                                            {/* Icon for mobile, hidden on larger screens */}
                                            <Icon className={`sm:hidden w-5 h-5 ${
                                                index === currentStep
                                                    ? "text-[#076DB3]"
                                                    : completedSteps.has(index)
                                                        ? "text-green-600"
                                                        : "text-gray-400"
                                            }`} />
                                            
                                            {/* Step number - hidden on mobile */}
                                            <div
                                                className={`hidden sm:block font-medium text-sm ${
                                                    index === currentStep
                                                        ? "text-[#076DB3]"
                                                        : completedSteps.has(index)
                                                            ? "text-green-600"
                                                            : "text-gray-500"
                                                }`}
                                            >
                                                Step {index + 1}
                                            </div>
                                            
                                            {/* Title */}
                                            <div
                                                className={`text-[10px] sm:text-xs uppercase tracking-wide ${
                                                    index === currentStep
                                                        ? "text-[#076DB3]"
                                                        : completedSteps.has(index)
                                                            ? "text-green-600"
                                                            : "text-gray-400"
                                                }`}
                                            >
                                                <span className="hidden sm:inline">{step.title}</span>
                                                <span className="sm:hidden">
                                                    {step.title.split(' ').slice(-1)[0]}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>


                {/* Step Content */}
                <div className="mb-8">
                    {renderStep()}
                </div>
            </div>
        </div>
    );
};

export default Page;