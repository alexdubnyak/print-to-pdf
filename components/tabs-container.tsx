import { useState } from "react";

interface TabsContainerProps {
  activeTab: "quick" | "advanced";
  onTabChange: (tab: "quick" | "advanced") => void;
}

function QuickPrintTab({ 
  isActive, 
  onClick 
}: { 
  isActive: boolean; 
  onClick: () => void; 
}) {
  return (
    <div 
      className={`box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-1.5 py-2.5 relative shrink-0 cursor-pointer`}
      onClick={onClick}
    >
      <div
        aria-hidden="true"
        className={`absolute border-[0px_0px_2px] border-solid inset-0 pointer-events-none ${
          isActive ? 'border-[#ffffff]' : 'border-[#1e2023]'
        }`}
      />
      <div className={`font-['Open_Sans:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[12px] text-left text-nowrap ${
        isActive ? 'text-[#ffffff]' : 'text-[#e3e5ea]'
      }`}>
        <p className="block leading-[normal] whitespace-pre">Quick print</p>
      </div>
    </div>
  );
}

function AdvancedPrintTab({ 
  isActive, 
  onClick 
}: { 
  isActive: boolean; 
  onClick: () => void; 
}) {
  return (
    <div 
      className={`box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-1.5 py-2.5 relative shrink-0 cursor-pointer`}
      onClick={onClick}
    >
      <div
        aria-hidden="true"
        className={`absolute border-[0px_0px_2px] border-solid inset-0 pointer-events-none ${
          isActive ? 'border-[#ffffff]' : 'border-[#1e2023]'
        }`}
      />
      <div className={`font-['Open_Sans:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[12px] text-left text-nowrap ${
        isActive ? 'text-[#ffffff]' : 'text-[#e3e5ea]'
      }`}>
        <p className="block leading-[normal] whitespace-pre">Advanced print</p>
      </div>
    </div>
  );
}

function TabsGroup({ activeTab, onTabChange }: TabsContainerProps) {
  return (
    <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-start p-0 relative shrink-0">
      <QuickPrintTab 
        isActive={activeTab === "quick"} 
        onClick={() => onTabChange("quick")} 
      />
      <AdvancedPrintTab 
        isActive={activeTab === "advanced"} 
        onClick={() => onTabChange("advanced")} 
      />
    </div>
  );
}

function TabsWrapper({ activeTab, onTabChange }: TabsContainerProps) {
  return (
    <div className="box-border content-stretch flex flex-row gap-2.5 items-end justify-start p-0 relative shrink-0 w-full">
      <div
        aria-hidden="true"
        className="absolute border-[#1e2023] border-[0px_0px_2px] border-solid inset-0 pointer-events-none"
      />
      <TabsGroup activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}

export function TabsContainer({ activeTab, onTabChange }: TabsContainerProps) {
  return (
    <div className="relative size-full">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col gap-2.5 items-start justify-start px-0 py-0 relative size-full p-[0px]">
          <TabsWrapper activeTab={activeTab} onTabChange={onTabChange} />
        </div>
      </div>
    </div>
  );
}