
"use client";

import { useRef, useState, type ForwardedRef } from "react";
import { SatelliteToast, type ToastNotification } from "./satellite-toast";
import ChronicleButton from "./chronicle-button";
import { CodeBlock } from "./code-block";
import GithubButton from "./github-button";
import { Separator } from "./ui/separator";

type Demo = { 
  name: string; 
  description: string; 
  config: Omit<ToastNotification, "id">; 
  highlightLines?: number[];
  toastContainerProps?: {
    maxWidth?: string;
    horizontalMarginAdjustment?: string;
    verticalGapAdjustment?: string;
    firstContainerVerticalStartMarginAdjustment?: string;
  },
  highlightContainerLines?: number[]
};

const demos: Demo[] = [
  {
    name: "Default Toast",
    description: "The default toast implementation with all properties set to their initial values, featuring a dark theme.",
    config: {
      title: "Satellite Toast",
      content: "This is the default Satellite Toast. Ain't it great?",
    },
  },
  {
    name: "Toast Alignment, Spacing, Max Width",
    description: "LTR toasts display on the right side of the viewport, and RTL toasts display on the left. The 'position' prop can place toasts on the opposite side, but this is discouraged because slide-in and slide-out animations are designed for their respective horizontal alignments. When toasts are aligned to the top, 'firstContainerVerticalStartMarginAdjustment' must be adjusted to compensate for the height of the type icon container, as its size is not accounted for when calculating spacing.",
    config: {
      title: "Anaïs Nin",
      content: "We don't see things as they are, we see them as we are.",
      position: "top-right",
    },
    toastContainerProps: {
        maxWidth: "100%",
        horizontalMarginAdjustment: "15px",
        verticalGapAdjustment: "56px",
        firstContainerVerticalStartMarginAdjustment: "32px",
    },
    highlightLines: [5],
    highlightContainerLines: [5, 6, 7, 8]
  },
  {
    name: "RTL (Right-to-Left)",
    description: "Enables right-to-left display for the toast, mirroring both its layout and animations. RTL toasts are meant to be displayed on the left side of the screen, ensuring alignment matches the animation flow.",
    config: {
      title: "אוסקר ווילד",
      content: "יש רק שתי טרגדיות בעולם הזה. האחת היא לא לקבל את מה שרוצים והשנייה היא לקבל.",
      isRTL: true,
      position: "bottom-left",
    },
    highlightLines: [5, 6]
  },
  {
    name: "Timer Animation",
    description: "The toast body boasts a timer bar whose appearance is controlled by the 'timerAnimationType' prop. It accepts one of the following values: 'shrink' (default), which contracts the bar symmetrically toward the center from both ends, or 'deplete', which reduces the bar length linearly from one side in a manner similar to a conventional progress indicator.",
    config: {
      title: "Satellite Toast",
      content: "Look at the timer bar. It's depleting!",
      timerAnimationType: "deplete"
    },
    highlightLines: [5]
  },
  {
    name: "Longevity",
    description: "The lifetime of a toast is defined by the 'longevity' prop, which sets how long (in milliseconds) the notification remains visible before auto‑dismissal. By default, 'longevity' is 5000 ms (5 seconds).",
    config: {
      title: "Long-Lived Toast",
      content: "This toast remains visible for 15 seconds.",
      longevity: 15000
    },
    highlightLines: [5]
  },
  {
    name: "Colors",
    description: "The toast color scheme is fully customizable, ensuring it can be adapted even for the most unconventional use cases.",
    config: {
      title: "JM Barrie",
      content: "Would you like an adventure now, or would you like to have your tea first?",
      accentColor: "#ffffff",
      backgroundColor: "#00a6fb",
      textColor: "#242424",
      titleFontColor: "#242424",
      contentFontColor: "#242424",
      bodyBorderColor: "#00a6fb",
      typeIconContainerBorderColor: "#616161",
      typeIconColor: "#00a6fb",
      closeIconBgColor: "#000",
      closeIconFgColor: "#ffffff",
      closeIconHoverBgColor: "#242424",
      closeIconHoverFgColor: "#fff",
      closeIconOutlineColor: "#303030",
      timerBgColor: "#333",
      timerColor: "#00a6fb",
      satelliteColor: "#363636",
    },
    highlightLines: [5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
  },
  {
    name: "Rounding, Typography, Border Width",
    description: "Toast rounding, font styling, and outline widths are fully customizable, allowing precise control over typography and component shape.",
    config: {
      title: "Louise Bourgeois",
      content: "Art is a guaranty of sanity.",
      titleFontSize: "0.875rem",
      titleFontWeight: "400",
      contentFontSize: "1.3rem",
      contentFontWeight: "900",
      bodyBorderRadius: "4px",
      typeIconContainerBorderRadius: "16px",
      closeIconBorderRadius: "2px",
      bodyBorderWidth: "10px",
      typeIconContainerBorderWidth: "6px",
      closeIconOutlineWidth: "24px"
    },
    highlightLines: [5,6,7,8,9,10,11,12,13,14]
  },
  {
    name: "Custom Icon",
    description: "Replaces the default satellite icon with a custom SVG.",
    config: {
      title: "Campfire Toast",
      content: "This toast has a custom campfire icon.",
      customIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="icon icon-tabler icons-tabler-filled icon-tabler-campfire"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19.757 16.03a1 1 0 0 1 .597 1.905l-.111 .035l-16 4a1 1 0 0 1 -.597 -1.905l.111 -.035l16 -4z" /><path d="M3.03 16.757a1 1 0 0 1 1.098 -.749l.115 .022l16 4a1 1 0 0 1 -.37 1.962l-.116 -.022l-16 -4a1 1 0 0 1 -.727 -1.213z" /><path d="M13.553 2.106c-4.174 2.086 -6.553 5.358 -6.553 8.894a5 5 0 0 0 10 0c0 -1.047 -.188 -1.808 -.606 -2.705l-.169 -.345l-.33 -.647c-.621 -1.24 -.895 -2.338 -.895 -4.303a1 1 0 0 0 -1.447 -.894z" /></svg>`,
    },
    highlightLines: [5],
  },
  {
    name: "Satellite Layer",
    description: "By setting `satelliteInFront` to `false`, the satellite animation is rendered behind the main toast body, altering the visual depth.",
    config: {
      title: "Back",
      content: "The satellite animation is now behind the planet.",
      satelliteInFront: false,
    },
    highlightLines: [5]
  },
  {
    name: "Background Bars",
    description: "The component allows disabling the animated background bars for a cleaner, more minimalist appearance by setting `disableBackgroundBars` to `true`.",
    config: {
      title: "Miyamoto Musashi",
      content: "It's wrong to be inflexible.",
      disableBackgroundBars: true,
    },
    highlightLines: [5]
  },
  {
    name: "More Customization Options",
    description: "It is possible to disable the satellite orbit animation, adjust the type icon container offset, and customize the toast’s padding for a tailored layout.",
    config: {
      title: "Lao Tzu",
      content: "When I let go of what I am, I become what I might be.",
      bars: 100,
      showSatelliteAnimation: false,
      animationDuration: 720,
      iconXOffset: "-61px",
      iconYOffset: "-10px",
      paddingLTR: "1.375rem 2.75rem 1.375rem 2.75rem",
      paddingRTL: "1.375rem 2.75rem 1.375rem 2.75rem",
    },
    highlightLines: [5, 6, 7, 8, 9, 10, 11],
  },
];

const generateCodeSnippet = (demo: Demo) => {
    const { config, toastContainerProps } = demo;

    const propsToString = (obj: object | undefined) =>
        Object.entries(obj || {})
            .map(([key, value]) => {
                if (value === undefined) return null;
                const valueStr = typeof value === 'string' ? `"${value.replace(/"/g, '\\"')}"` : value;
                if (key === 'customIcon') {
                     return `        ${key}: \`${value}\``;
                }
                return `        ${key}: ${valueStr}`;
            })
            .filter(Boolean)
            .join(',\n');

    const toastPropsString = propsToString(config);

    const containerPropsToString = (props: typeof toastContainerProps) => {
      if (!props) return '';
      return Object.entries(props)
        .map(([key, value]) => `\n        ${key}="${value}"`)
        .join('');
    };
    
    const containerPropsString = containerPropsToString(toastContainerProps);

    return `
"use client"
import { useRef } from "react";
import { SatelliteToast, type ToastNotification } from "./satellite-toast";

export default function App() {
  const toastRef = useRef<{ showNotification: (options: Omit<ToastNotification, "id">) => void }>(null);

  const showToast = () => {
    if (toastRef.current) {
      toastRef.current.showNotification({
${toastPropsString}
      });
    }
  };

  return (
    <div>
      <button onClick={showToast}>Show Toast</button>
      <SatelliteToast ref={toastRef}${containerPropsString}
      />
    </div>
  );
}
  `.trim();
};

const getHighlightLines = (demo: Demo) => {
    const code = generateCodeSnippet(demo);
    const lines = code.split('\n');
    let highlightLines: number[] = [];

    // Highlight toast configuration properties
    if (demo.highlightLines) {
        const baseOffset = lines.findIndex(line => line.includes('showNotification({')) + 1;
        highlightLines = demo.highlightLines.map(line => baseOffset + line - 2);
    }
    
    // Highlight SatelliteToast container props
    if (demo.highlightContainerLines) {
        const containerLineIndex = lines.findIndex(line => line.includes('<SatelliteToast'));
        if (containerLineIndex !== -1) {
            const containerLines = lines.slice(containerLineIndex);
            demo.highlightContainerLines.forEach(lineNum => {
                const propName = Object.keys(demo.toastContainerProps || {})[lineNum - 5];
                if (propName) {
                    const lineIndex = containerLines.findIndex(l => l.includes(`${propName}=`));
                    if (lineIndex !== -1) {
                        highlightLines.push(containerLineIndex + lineIndex + 1);
                    }
                }
            });
        }
    }
    return highlightLines;
};

const credits = [
  { name: "Resizable Navbar", author: "Aceternity UI", authorUrl: "https://ui.aceternity.com/", componentUrl: "https://ui.aceternity.com/components/resizable-navbar" },
  { name: "Chronicle Button", author: "Haaguitos", authorUrl: "https://codepen.io/Haaguitos", componentUrl: "https://codepen.io/Haaguitos/pen/OJrVZdJ" },
  { name: "Code Block", author: "Aceternity UI", authorUrl: "https://ui.aceternity.com/", componentUrl: "https://ui.aceternity.com/components/code-block" },
  { name: "すりガラスなプロフィールカード", author: "あしざわ - Webクリエイター", authorUrl: "https://codepen.io/ash_creator", componentUrl: "https://codepen.io/ash_creator/pen/zYaPZLB" },
  { name: "Splashed Toast Notifications - CSS", author: "Josetxu", authorUrl: "https://codepen.io/josetxu", componentUrl: "https://codepen.io/josetxu/pen/OJGXdzY" },
  { name: "Push Notifications", author: "Florin Pop", authorUrl: "https://codepen.io/FlorinPop17", componentUrl: "https://codepen.io/FlorinPop17/pen/xxORmaB" },
  { name: "bg bars", author: "Moazam", authorUrl: "https://21st.dev/muhammadnadeemmn9485134", componentUrl: "https://21st.dev/to_be_deleted/bg-bars/default" },
  { name: "Satellite animation", author: "Emile Duval", authorUrl: "https://codepen.io/Emile_Dvl", componentUrl: "https://codepen.io/Emile_Dvl/pen/RwVeVy" },
  { name: "framer-motion", author: "", authorUrl: "", componentUrl: "https://www.npmjs.com/package/framer-motion" },
  { name: "radix-ui", author: "", authorUrl: "", componentUrl: "https://www.npmjs.com/package/radix-ui" },
  { name: "Lucide React", author: "", authorUrl: "", componentUrl: "https://www.npmjs.com/package/lucide-react" },
  { name: "tabler-icons-react", author: "", authorUrl: "", componentUrl: "https://www.npmjs.com/package/tabler-icons-react" },
  { name: "Firebase Studio", author: "", authorUrl: "", componentUrl: "https://firebase.studio/" },
  { name: "Perplexity", author: "", authorUrl: "", componentUrl: "https://www.perplexity.ai/" },
];

export default function DocsPage() {
  const toastRef = useRef<{ showNotification: (options: Omit<ToastNotification, "id">) => void }>(null);
  const [currentDemo, setCurrentDemo] = useState<Demo | null>(demos[0]);

  const showNotification = (demo: Demo) => {
    if (toastRef.current) {
      toastRef.current.showNotification(demo.config)
      setCurrentDemo(demo);
    }
  };
  
  const currentToastContainerProps = currentDemo?.toastContainerProps;

  return (
    <div className="bg-black min-h-screen text-gray-200 font-sans">
      <main className="p-8 pt-28">
        <div className="max-w-[962px] mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-100">{"<SatelliteToast/>"}</h1>
            <p className="text-lg text-gray-400 mt-4">
              A flexible, reusable toast notification component designed to suit diverse UX needs.
            </p>
          </header>
          
          <Separator className="my-8 bg-[#161616]" />

          <div className="space-y-12">
            {demos.map((demo, index) => (
              <div key={index}>
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">{demo.name}</h2>
                  <p className="text-gray-400 mb-6">{demo.description}</p>
                  <ChronicleButton
                    text="Show Toast"
                    onClick={() => showNotification(demo)}
                    customBackground="#FFFFFF"
                    customForeground="#000000"
                    hoverColor="#6750A4"
                    hoverForeground="#FFFFFF"
                  />
                  <CodeBlock 
                    language="tsx"
                    code={generateCodeSnippet(demo)}
                    highlightLines={getHighlightLines(demo)}
                  />
                </div>
                {index < demos.length - 1 && <Separator className="my-8 bg-[#161616]" />}
              </div>
            ))}
          </div>
          
          <Separator className="my-12 bg-[#161616]" />

          <div className="text-left space-y-4">
            <h3 className="text-2xl font-semibold">Enjoying SatelliteToast?</h3>
            <p className="text-gray-400">
              If you find this component useful, please consider giving it a star on GitHub.
            </p>
            <div className="mt-4">
              <GithubButton />
            </div>
          </div>

          <Separator className="my-12 bg-[#161616]" />
          
          <div className="text-left">
              <h3 className="text-2xl font-semibold mb-4">Credit</h3>
              <p className="text-gray-400 mb-1.5">
                The existence of this project, at least in its current form, wouldn’t've been possible without the following:
              </p>
              <p className="text-gray-400 mb-6">
                Below are the credit entries for both the toast and the documentation:
              </p>
              <div className="space-y-2 text-gray-400">
                {credits.map((credit, index) => (
                   <p key={index} className="break-inside-avoid">
                    <a href={credit.componentUrl} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">{credit.name}</a>
                    {credit.author && (
                      <span> by <a href={credit.authorUrl} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">{credit.author}</a></span>
                    )}
                  </p>
                ))}
              </div>
          </div>
          <div style={{height: "52px"}} />
        </div>
      </main>

      <SatelliteToast 
        key={JSON.stringify(currentToastContainerProps)}
        ref={toastRef as ForwardedRef<{ showNotification: (options: Omit<ToastNotification, "id">) => void; }> | undefined}
        maxWidth={currentToastContainerProps?.maxWidth}
        horizontalMarginAdjustment={currentToastContainerProps?.horizontalMarginAdjustment}
        verticalGapAdjustment={currentToastContainerProps?.verticalGapAdjustment}
        firstContainerVerticalStartMarginAdjustment={
          currentToastContainerProps?.firstContainerVerticalStartMarginAdjustment
        }
       />
    </div>
  );
}
