import React, { useState, useEffect } from 'react';
import { dispatcher, watchLoadingAction } from 'lander-engine/core';
import InteractiveResponseViewer from './InteractiveResponseViewer';

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  primaryCtaText?: string;
  onPrimaryCtaClick?: any[];
  secondaryCtaText?: string;
  onSecondaryCtaClick?: any[];
}

function useLoadingAction(actions: any) {
  const [state, setState] = useState<{ isLoading: boolean; values: Record<string, any> }>(
    () => ({ isLoading: false, values: {} })
  );

  useEffect(() => {
    if (!actions) return;
    const unsubscribe = watchLoadingAction(actions, setState);
    return unsubscribe;
  }, [JSON.stringify(actions)]);

  return state;
}

export default function CTASection({
  title = "Ready to get started?",
  subtitle = "Join thousands of satisfied customers using our platform today.",
  primaryCtaText = "Get Started Now",
  onPrimaryCtaClick,
  secondaryCtaText,
  onSecondaryCtaClick
}: CTASectionProps) {
  const primaryState = useLoadingAction(onPrimaryCtaClick);
  const secondaryState = useLoadingAction(onSecondaryCtaClick);

  const handlePrimaryClick = () => {
    if (onPrimaryCtaClick) dispatcher.dispatch(onPrimaryCtaClick);
  };

  const handleSecondaryClick = () => {
    if (onSecondaryCtaClick) dispatcher.dispatch(onSecondaryCtaClick);
  };

  const activeValues = {
    ...primaryState.values,
    ...secondaryState.values,
  };

  const isPrimaryLoading = primaryState.isLoading;
  const isSecondaryLoading = secondaryState.isLoading;

  return (
    <section className="py-20 px-6 bg-[var(--color-primary)] text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">
          {title}
        </h2>
        <p className="text-xl md:text-2xl text-blue-100 font-light mb-10">
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          {primaryCtaText && (
            <button
              onClick={handlePrimaryClick}
              disabled={isPrimaryLoading}
              className={`w-full sm:w-auto px-8 py-4 font-bold rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 ${
                isPrimaryLoading
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-white text-[var(--color-primary)] hover:bg-gray-50'
              }`}
            >
              {isPrimaryLoading && (
                <span className="animate-spin inline-block h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2" />
              )}
              <span>{isPrimaryLoading ? 'Processing Request...' : primaryCtaText}</span>
            </button>
          )}
          {secondaryCtaText && (
            <button
              onClick={handleSecondaryClick}
              disabled={isSecondaryLoading}
              className={`w-full sm:w-auto px-8 py-4 font-bold rounded-xl border-2 transition-all flex items-center justify-center space-x-2 ${
                isSecondaryLoading
                  ? 'border-gray-400 text-gray-400 cursor-not-allowed'
                  : 'border-white text-white hover:bg-white/10'
              }`}
            >
              {isSecondaryLoading && (
                <span className="animate-spin inline-block h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2" />
              )}
              <span>{isSecondaryLoading ? 'Processing...' : secondaryCtaText}</span>
            </button>
          )}
        </div>

        {Object.keys(activeValues).length > 0 && (
          <InteractiveResponseViewer data={activeValues} />
        )}
      </div>
    </section>
  );
}

