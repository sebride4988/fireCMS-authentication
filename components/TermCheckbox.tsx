import { useCallback, useEffect, useState } from 'react';

import { Checkbox, Typography, Modal } from 'antd';
import * as R from 'ramda';

interface TermCheckboxProps {
  modal: {
    title: string;
  };
  renderModalContent: () => JSX.Element;
  checkboxContent: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export function TermCheckbox({
  modal,
  renderModalContent,
  onChange,
  checkboxContent,
}: TermCheckboxProps) {
  const [isChecked, setIsChecked] = useState<boolean | null>(null);
  const checkCheckbox = useCallback(() => {
    setIsChecked(true);
  }, [setIsChecked]);
  const uncheckCheckbox = useCallback(() => {
    setIsChecked(false);
  }, [setIsChecked]);
  const [isVisible, setIsVisible] = useState(false);
  const openModal = useCallback(() => {
    setIsVisible(true);
  }, []);
  const closeModal = useCallback(() => {
    setIsVisible(false);
  }, []);
  useEffect(() => {
    if (isChecked !== null) {
      onChange?.(isChecked);
    }
  }, [onChange, isChecked]);

  return (
    <>
      <Checkbox
        checked={!!isChecked}
        onChange={(e) => {
          setIsChecked(e.target.checked);
          return e;
        }}
      >
        {checkboxContent}
        <Typography.Link
          onClick={(e) => {
            e.preventDefault();
            openModal();
          }}
        >
          {' #'}
        </Typography.Link>
      </Checkbox>
      <Modal
        visible={isVisible}
        title={modal.title}
        onOk={R.pipe(closeModal, checkCheckbox)}
        okText="동의"
        cancelText="동의 안 함"
        onCancel={R.pipe(closeModal, uncheckCheckbox)}
      >
        {renderModalContent()}
      </Modal>
    </>
  );
}
