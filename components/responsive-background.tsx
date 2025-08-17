import React, { ReactNode } from "react";
import imgImage3 from "figma:asset/4f0bad069f1a79526d8fca7a1265e757a1048cd4.png";
import imgImage22 from "figma:asset/0fc685cd8f14f838f09ada3b1204362f5d241faf.png";
import ScrollableRibbon from "./ScrollableRibbon";
import A3 from "../imports/A3-483-448";

interface ResponsiveBackgroundProps {
  children?: ReactNode;
  className?: string;
  overlay?: boolean;
}

/* ===== Decorative pieces (все немые) ===== */
function TabBar() {
  return (
    <div className="absolute bg-[#1e2023] h-[28px] left-0 top-[47px] w-full pointer-events-none">
      <div
        className="absolute bg-no-repeat bg-size-[337.28%_100%] bg-top-left h-[28px] left-0 top-0 w-[558px]"
        style={{ backgroundImage: `url('${imgImage3}')` }}
      />
      <div
        className="absolute bg-no-repeat bg-size-[4705%_100%] bg-top-right h-[28px] right-0 top-0 w-10"
        style={{ backgroundImage: `url('${imgImage3}')` }}
      />
    </div>
  );
}

function Frame294() {
  return <div className="absolute h-[37px] left-[619px] top-[872px] w-[1487px] pointer-events-none" />;
}

function Header() {
  return (
    <div className="absolute bg-[#1e2023] h-[47px] left-0 top-0 w-full pointer-events-none">
      <div
        className="absolute bg-no-repeat bg-size-[476.43%_1727.66%] bg-top-right h-[47px] right-0 top-0 w-[314px]"
        style={{ backgroundImage: `url('${imgImage22}')` }}
      />
      <div
        className="absolute bg-no-repeat bg-size-[171.36%_1727.66%] bg-top-left h-[47px] left-0 top-0 w-[873px]"
        style={{ backgroundImage: `url('${imgImage22}')` }}
      />
    </div>
  );
}

function Frame298() {
  return (
    <div
      className="absolute bg-[#333538] bottom-0 h-[37px] left-0 w-full pointer-events-none"
    >
      {/* Image18 - левое изображение с фиксированной шириной */}
      <div
        className="absolute bg-bottom-left bg-no-repeat bg-size-[104.18%_2194.59%] h-[37px] left-0 top-0 w-[1436px] z-10"
        style={{ backgroundImage: `url('${imgImage22}')` }}
      />
      {/* A3 компонент поверх image18 в правой части */}
      <div className="absolute right-[10px] top-1/2 transform -translate-y-1/2 z-20 w-[37px] h-[37px] flex items-center justify-center">
        <A3 />
      </div>
    </div>
  );
}

/* ===== Main wrapper ===== */
const ResponsiveBackground: React.FC<ResponsiveBackgroundProps> = ({
  children,
  className = "",
  overlay = false,
}) => {
  return (
    <div className={`fixed inset-0 bg-[#dcdcdc] ${className}`} data-name="responsive background">
      {/* фон/декор */}
      <div className="relative z-0 w-full h-full">
        <TabBar />
        <Frame294 />
        <div
          className="absolute bg-[99.17%_83.11%] bg-no-repeat bg-size-[519.44%_138.33%] h-[587px] right-[19px] top-56 w-72 pointer-events-none"
          style={{ backgroundImage: `url('${imgImage22}')` }}
        />
        <div
          className="absolute bg-[50%_91.21%] bg-no-repeat bg-size-[356.19%_2136.84%] bottom-[74px] h-[38px] left-1/2 translate-x-[-50%] w-[420px] pointer-events-none"
          style={{ backgroundImage: `url('${imgImage22}')` }}
        />
        <div
          className="absolute bg-[44.64%_61.84%] bg-no-repeat bg-size-[631.22%_443.72%] h-[183px] top-1/2 translate-x-[-50%] translate-y-[-50%] w-[237px] pointer-events-none"
          style={{ left: "calc(50% + 0.5px)", backgroundImage: `url('${imgImage22}')` }}
        />
        <Header />
        <Frame298 />
      </div>

      {/* лента */}
      <ScrollableRibbon className="absolute left-0 top-[75px] w-full z-20 pointer-events-auto" />

      {/* оверлей */}
      {overlay && <div className="fixed inset-0 bg-black/20 bg-opacity-50 z-30" />}

      {/* контент */}
      <div className="relative z-40 w-full h-full">{children}</div>
    </div>
  );
};

export { ResponsiveBackground };
export default ResponsiveBackground;