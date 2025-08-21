import { ButtonIcon } from './button-icon';

export function ButtonDemo() {
  return (
    <div className="absolute top-4 right-4 flex flex-col gap-4 p-4 bg-gray-800 rounded-lg">
      <div className="text-white text-sm mb-2">Button Icon Demo:</div>
      
      {/* Small buttons */}
      <div className="flex items-center gap-2">
        <span className="text-white text-xs w-12">Small:</span>
        <ButtonIcon icon="help" size="small" variant="default" />
        <ButtonIcon icon="help" size="small" variant="secondary" />
        <ButtonIcon icon="edit-layout" size="small" variant="default" />
        <ButtonIcon icon="activate" size="small" variant="secondary" />
      </div>
      
      {/* Medium buttons */}
      <div className="flex items-center gap-2">
        <span className="text-white text-xs w-12">Medium:</span>
        <ButtonIcon icon="help" size="medium" variant="default" />
        <ButtonIcon icon="help" size="medium" variant="secondary" />
        <ButtonIcon icon="edit-layout" size="medium" variant="default" />
        <ButtonIcon icon="activate" size="medium" variant="secondary" />
      </div>

      {/* Disabled states */}
      <div className="flex items-center gap-2">
        <span className="text-white text-xs w-12">Disabled:</span>
        <ButtonIcon icon="help" size="small" variant="default" disabled />
        <ButtonIcon icon="help" size="medium" variant="secondary" disabled />
      </div>

      {/* Active states */}
      <div className="flex items-center gap-2">
        <span className="text-white text-xs w-12">Active:</span>
        <ButtonIcon icon="activate" size="small" variant="secondary" active />
        <ButtonIcon icon="help" size="medium" variant="default" active />
      </div>
    </div>
  );
}