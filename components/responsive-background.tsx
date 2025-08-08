import imgImage20 from "figma:asset/0fc685cd8f14f838f09ada3b1204362f5d241faf.png";
import imgImage21 from "figma:asset/fc1aa20fa288627bfb8f77e052e2670c57b8a968.png";

interface ResponsiveBackgroundProps {
  children?: React.ReactNode;
  overlay?: boolean;
}

function BackgroundLayer() {
  return (
    <div className="absolute h-[92px] left-0 top-20 w-full">
      <div
        className="absolute bg-[0%_11.27%] bg-no-repeat bg-size-[100%_873.12%] h-[93px] left-0 top-px w-full"
        data-name="image 20"
        style={{ backgroundImage: `url('${imgImage20}')` }}
      />
      <div
        className="absolute bg-[100%_79.25%] bg-no-repeat bg-size-[271.51%_157.61%] h-[92px] right-0 top-0 w-[551px]"
        data-name="image 21"
        style={{ backgroundImage: `url('${imgImage21}')` }}
      />
    </div>
  );
}

export function ResponsiveBackground({ children, overlay = false }: ResponsiveBackgroundProps) {
  return (
    <div className="relative size-full">
      {/* Main background layer */}
      <div
        className="absolute bg-center bg-cover bg-no-repeat h-[812px] left-0 top-0 w-full"
        data-name="main background"
        style={{ backgroundImage: `url('${imgImage20}')` }}
      />
      
      {/* Right side panel background - adapts to screen width */}
      <div className="absolute bg-[#333538] h-[37px] right-0 top-[774px] w-[133px]" />
      
      {/* Right corner element */}
      <div
        className="absolute bg-bottom-right bg-no-repeat bg-size-[2624.56%_2082.05%] h-[39px] right-0 top-[773px] w-[57px]"
        data-name="right corner"
        style={{ backgroundImage: `url('${imgImage20}')` }}
      />
      
      {/* Right side content area - expands with screen width */}
      <div className="absolute bg-[#dcdcdc] h-[591px] right-0 top-[182px] w-[379px]" />
      
      {/* Top header area - expands to right */}
      <div className="absolute bg-[#1e2023] h-20 right-0 top-0 w-[639px]" />
      
      {/* Top separator line */}
      <div className="absolute bg-[#1e2023] h-2.5 right-0 top-[172px] w-[639px]" />
      
      {/* Top toolbar area */}
      <div className="absolute bg-[#333538] h-[92px] right-0 top-20 w-[639px]" />
      
      {/* Top right corner header */}
      <div
        className="absolute bg-no-repeat bg-size-[476.43%_1015%] bg-top-right h-20 right-0 top-0 w-[314px]"
        data-name="top right header"
        style={{ backgroundImage: `url('${imgImage20}')` }}
      />
      
      {/* Left side header */}
      <div
        className="absolute bg-no-repeat bg-size-[171.36%_1727.66%] bg-top-left h-[47px] left-0 top-0 w-[873px]"
        data-name="left header"
        style={{ backgroundImage: `url('${imgImage20}')` }}
      />
      
      {/* Right side panel */}
      <div
        className="absolute bg-[100%_82.96%] bg-no-repeat bg-size-[476.43%_137.86%] h-[589px] right-0 top-[185px] w-[314px]"
        data-name="right panel"
        style={{ backgroundImage: `url('${imgImage20}')` }}
      />
      
      {/* Additional background layer */}
      <BackgroundLayer />
      
      {/* Overlay for dialogs */}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-overlay" />
      )}
      
      {/* Content children */}
      {children}
    </div>
  );
}