import { TermCheckbox } from './TermCheckbox';

interface TermOfUseCheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  renderTermOfUse: () => JSX.Element;
}

export function TermOfUseCheckbox({
  renderTermOfUse,
  checked,
  onChange,
}: TermOfUseCheckboxProps) {
  return (
    <TermCheckbox
      modal={{ title: '이용약관' }}
      checkboxContent="이용약관에 동의합니다."
      renderModalContent={renderTermOfUse}
      checked={checked}
      onChange={onChange}
    />
  );
}
