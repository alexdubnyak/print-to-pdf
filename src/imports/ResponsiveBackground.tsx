import imgImage22 from '../assets/0fc685cd8f14f838f09ada3b1204362f5d241faf.png';
import imgImage3 from '../assets/4f0bad069f1a79526d8fca7a1265e757a1048cd4.png';
import imgRibbon from '../assets/e957f5dba6ea799dcbd1028743c639263f649749.png';

function RibbonContainer() {
  return (
    <div
      className="absolute h-[92px] left-0 overflow-x-auto overflow-y-clip top-[75px] w-[1496px]"
      data-name="ribbon-container"
    >
      <div
        className="absolute bg-center bg-cover bg-no-repeat h-[92px] left-0 top-0 w-[1882px]"
        data-name="ribbon"
        style={{ backgroundImage: `url('${imgRibbon}')` }}
      />
    </div>
  );
}

function Frame296() {
  return (
    <div className="absolute bg-[#1e2023] h-7 left-0 top-[47px] w-[1496px]">
      <div
        className="absolute bg-no-repeat bg-top-left h-7 left-0 top-0 w-[558px]"
        style={{ backgroundSize: '337.28% 100%' }}
        data-name="image 3"
        style={{ backgroundImage: `url('${imgImage3}')` }}
      />
      <div
        className="absolute bg-no-repeat bg-top-right h-7 right-0 top-0 w-10"
        style={{ backgroundSize: '4705% 100%' }}
        data-name="image 21"
        style={{ backgroundImage: `url('${imgImage3}')` }}
      />
    </div>
  );
}

function Frame294() {
  return <div className="absolute h-[37px] left-[619px] top-[868px] w-[1487px]" />;
}

function Frame295() {
  return (
    <div className="absolute bg-[#1e2023] h-[47px] left-0 top-0 w-[1496px]">
      <div
        className="absolute bg-no-repeat bg-top-right h-[47px] right-0 top-0 w-[314px]"
        style={{ backgroundSize: '476.43% 1727.66%' }}
        data-name="image 22"
        style={{ backgroundImage: `url('${imgImage22}')` }}
      />
      <div
        className="absolute bg-no-repeat bg-top-left h-[47px] left-0 top-0 w-[873px]"
        style={{ backgroundSize: '171.36% 1727.66%' }}
        data-name="image 21"
        style={{ backgroundImage: `url('${imgImage22}')` }}
      />
    </div>
  );
}

function Frame298() {
  return (
    <div
      className="absolute bg-[#333538] bottom-0 h-[37px] translate-x-[-50%] w-[1487px]"
      style={{ left: 'calc(50% + 0.5px)' }}
    >
      <div
        className="absolute bg-bottom-left bg-no-repeat h-[37px] left-0 top-0 w-[1436px]"
        style={{ backgroundSize: '104.18% 2194.59%' }}
        data-name="image 18"
        style={{ backgroundImage: `url('${imgImage22}')` }}
      />
      <div
        className="absolute bg-bottom-right bg-no-repeat h-[37px] right-0 top-0 w-[51px]"
        style={{ backgroundSize: '2933.33% 2194.59%' }}
        data-name="image 19"
        style={{ backgroundImage: `url('${imgImage22}')` }}
      />
    </div>
  );
}

export default function ResponsiveBackground() {
  return (
    <div className="bg-[#dcdcdc] relative size-full" data-name="responsive background">
      <RibbonContainer />
      <Frame296 />
      <Frame294 />
      <div
        className="absolute bg-[99.17%_83.11%] bg-no-repeat h-[587px] right-[19px] top-56 w-72"
        style={{ backgroundSize: '519.44% 138.33%' }}
        data-name="image 18"
        style={{ backgroundImage: `url('${imgImage22}')` }}
      />
      <div
        className="absolute bg-[50%_91.21%] bg-no-repeat bottom-[74px] h-[38px] left-1/2 translate-x-[-50%] w-[420px]"
        style={{ backgroundSize: '356.19% 2136.84%' }}
        data-name="image 19"
        style={{ backgroundImage: `url('${imgImage22}')` }}
      />
      <div
        className="absolute bg-[44.64%_61.84%] bg-no-repeat h-[183px] top-1/2 translate-x-[-50%] translate-y-[-50%] w-[237px]"
        style={{ backgroundSize: '631.22% 443.72%' }}
        data-name="image 20"
        style={{
          left: 'calc(50% + 0.5px)',
          backgroundImage: `url('${imgImage22}')`,
        }}
      />
      <Frame295 />
      <Frame298 />
    </div>
  );
}
