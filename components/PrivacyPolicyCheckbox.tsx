import { TermCheckbox } from './TermCheckbox';

interface PrivacyPolicyCheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  renderPrivacyPolicy: () => JSX.Element;
}

export function PrivacyPolicyCheckbox({
  renderPrivacyPolicy,
  checked,
  onChange,
}: PrivacyPolicyCheckboxProps) {
  return (
    <TermCheckbox
      modal={{ title: '개인정보 처리방침' }}
      checkboxContent="개인정보 처리방침에 동의합니다."
      renderModalContent={renderPrivacyPolicy}
      checked={checked}
      onChange={onChange}
    />
  );
}
