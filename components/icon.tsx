import svgPaths from "../imports/svg-wmfynqmf6c";

export type IconType = 
  | 'edit-layout'
  | 'delete-layout' 
  | 'create-layout'
  | 'approve'
  | 'cancel-creation'
  | 'edit'
  | 'delete-layout-red'
  | 'activate'
  | 'activate-all-sheets'
  | 'import-layout'
  | 'search'
  | 'deactivate';

interface IconProps {
  type: IconType;
  disabled?: boolean;
  className?: string;
  active?: boolean;        // ← НОВОЕ: для поддержки активного состояния
}

export function Icon({ type, disabled = false, className = "", active = false }: IconProps) {
  const getIconColor = (baseColor: string) => {
    if (active) {
      return '#ffffff'; // Белый цвет для активного состояния
    }
    return disabled ? 'var(--color-text-secondary, #8E8F90)' : baseColor;
  };

  const renderIcon = () => {
    switch (type) {
      case 'edit-layout':
        return (
          <div className={`relative shrink-0 size-4 ${className}`} data-name="edit layout">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 16 16"
            >
              <g id="edit layout">
                <path
                  d={svgPaths.pa18ea80}
                  fill={getIconColor('var(--color-icon-fill, #CFCFCF)')}
                  id="Vector"
                />
              </g>
            </svg>
          </div>
        );

      case 'delete-layout':
        return (
          <div className={`overflow-clip relative shrink-0 size-4 ${className}`} data-name="delete layout">
            <div className="absolute h-[12.6px] left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[14.4px]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 15 13"
              >
                <g id="Frame 829">
                  <path
                    d={svgPaths.p147d0780}
                    fill={getIconColor('var(--color-icon-fill, #CFCFCF)')}
                    id="Vector"
                  />
                  <path
                    d={svgPaths.p1794b680}
                    fill={getIconColor('var(--color-icon-fill, #CFCFCF)')}
                    id="Vector_2"
                  />
                  <path
                    d={svgPaths.p1abae400}
                    fill={getIconColor('var(--color-icon-fill, #CFCFCF)')}
                    id="Vector_3"
                  />
                </g>
              </svg>
            </div>
          </div>
        );

      case 'create-layout':
        return (
          <div className={`relative shrink-0 size-4 ${className}`} data-name="create layout">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 16 16"
            >
              <g id="create layout">
                <path
                  d={svgPaths.p3c8b7d00}
                  fill={getIconColor('var(--color-icon-fill, #CFCFCF)')}
                  id="Union"
                />
              </g>
            </svg>
          </div>
        );

      case 'approve':
        return (
          <div className={`relative shrink-0 size-4 ${className}`} data-name="approve">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 16 16"
            >
              <g id="approve">
                <path
                  d={svgPaths.p15b14880}
                  fill={getIconColor('#6EF01D')}
                  id="Union"
                />
              </g>
            </svg>
          </div>
        );

      case 'cancel-creation':
        return (
          <div className={`relative shrink-0 size-4 ${className}`} data-name="cancel creation">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 16 16"
            >
              <g id="cancel creation">
                <path
                  d={svgPaths.p1a855b00}
                  fill={getIconColor('var(--color-icon-fill, #CFCFCF)')}
                  id="Union"
                />
              </g>
            </svg>
          </div>
        );

      case 'edit':
        return (
          <div className={`relative shrink-0 size-4 ${className}`} data-name="edit">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 16 16"
            >
              <g id="edit">
                <path
                  d={svgPaths.p201e0ac0}
                  fill={getIconColor('var(--color-icon-fill, #CFCFCF)')}
                  id="Union"
                />
              </g>
            </svg>
          </div>
        );

      case 'delete-layout-red':
        return (
          <div className={`overflow-clip relative shrink-0 size-4 ${className}`} data-name="delete layout">
            <div className="absolute h-[12.6px] left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[14.4px]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 15 13"
              >
                <g id="Frame 836">
                  <path
                    d={svgPaths.p147d0780}
                    fill={getIconColor('#FF4548')}
                    id="Vector"
                  />
                  <path
                    d={svgPaths.p1794b680}
                    fill={getIconColor('#FF4548')}
                    id="Vector_2"
                  />
                  <path
                    d={svgPaths.p1abae400}
                    fill={getIconColor('#FF4548')}
                    id="Vector_3"
                  />
                </g>
              </svg>
            </div>
          </div>
        );

      case 'activate':
        return (
          <div className={`relative shrink-0 size-4 ${className}`} data-name="activate">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 16 16"
            >
              <g id="activate">
                <path
                  d={svgPaths.p15b14880}
                  fill={getIconColor('#F5F5F6')}
                  id="Union"
                />
              </g>
            </svg>
          </div>
        );

      case 'activate-all-sheets':
        return (
          <div className={`relative shrink-0 size-4 ${className}`} data-name="activate all sheets">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 16 16"
            >
              <g id="activate all sheets">
                <path
                  d="M4.11572 10.4646L4.49561 10.0837L5.20264 10.7908L4.82275 11.1716L4.82568 11.1746L4.11865 11.8816L0.460449 8.22437L1.16846 7.51733L4.11572 10.4646ZM6.60205 9.39136L5.90967 10.0837L5.20264 9.37671L5.89502 8.68433L6.60205 9.39136ZM11.9497 4.04468L7.30908 8.68433L6.60205 7.97729L11.2427 3.33765L11.9497 4.04468Z"
                  fill={getIconColor('#F5F5F6')}
                  id="checkmark-1"
                />
                <path
                  d="M15.5396 4.04443L8.4126 11.1714L8.41553 11.1743L7.7085 11.8813L4.05127 8.22412L4.7583 7.51709L7.70557 10.4644L14.8325 3.3374L15.5396 4.04443Z"
                  fill={getIconColor('#F5F5F6')}
                  id="checkmark-2"
                />
              </g>
            </svg>
          </div>
        );

      case 'import-layout':
        return (
          <div className={`relative shrink-0 size-4 ${className}`} data-name="import layout">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 16 16"
            >
              <g id="import layout">
                <path
                  d="M10 1.5L13.5 5"
                  id="Vector"
                  stroke={getIconColor('var(--color-icon-fill, #CFCFCF)')}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit="10"
                />
                <g id="Group">
                  <path
                    d={svgPaths.p5511e00}
                    fill={getIconColor('var(--color-icon-fill, #CFCFCF)')}
                    id="Vector_2"
                  />
                  <path
                    d={svgPaths.p2f89f300}
                    fill={getIconColor('var(--color-icon-fill, #CFCFCF)')}
                    id="Vector_3"
                  />
                </g>
              </g>
            </svg>
          </div>
        );

      case 'search':
        return (
          <div className={`relative shrink-0 size-4 ${className}`} data-name="search">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 17 17"
            >
              <g id="search">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.2825 11.2182C9.4573 11.8959 8.40116 12.3027 7.25 12.3027C4.60939 12.3027 2.46875 10.1621 2.46875 7.52148C2.46875 4.88087 4.60939 2.74023 7.25 2.74023C9.89061 2.74023 12.0312 4.88087 12.0312 7.52148C12.0312 8.65073 11.6398 9.68854 10.9851 10.5066L14.0312 13.5527L13.3241 14.2598L10.2825 11.2182ZM11.0312 7.52148C11.0312 9.60981 9.33833 11.3027 7.25 11.3027C5.16167 11.3027 3.46875 9.60981 3.46875 7.52148C3.46875 5.43316 5.16167 3.74023 7.25 3.74023C9.33833 3.74023 11.0312 5.43316 11.0312 7.52148Z"
                  fill={getIconColor('#ADADAE')}
                  id="search-path"
                />
              </g>
            </svg>
          </div>
        );

      case 'deactivate':
        return (
          <div className={`relative shrink-0 size-4 ${className}`} data-name="deactivate">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 16 16"
            >
              <g id="deactivate">
                <path
                  d="M14 8.5H2V7.5H14V8.5Z"
                  fill={getIconColor('#D5D7E1')}
                  id="deactivate-line"
                />
              </g>
            </svg>
          </div>
        );

      default:
        return null;
    }
  };

  return renderIcon();
}