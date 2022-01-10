import { useAuthState } from '..';

import SignInEmailPasswordButton from './SignInEmailPasswordButton';

interface AccountButtonProps {
  renderTermOfUse: () => JSX.Element;
  renderPrivacyPolicy: () => JSX.Element;
}

type MergeProps = AccountButtonProps;

enum AccountButtonType {
  Account,
  SignIn,
}

function AccountButton(props: MergeProps) {
  const type = useAuthState((state) =>
    state.userCredentials.length > 0
      ? AccountButtonType.Account
      : AccountButtonType.SignIn,
  );
  switch (type) {
    case AccountButtonType.Account:
      return <>계정</>;
    case AccountButtonType.SignIn:
      return (
        <SignInEmailPasswordButton
          renderTermOfUse={props.renderTermOfUse}
          renderPrivacyPolicy={props.renderPrivacyPolicy}
        />
      );

    default:
      return <>Unexpected type</>;
  }
}

AccountButton.defaultProps = {};

export default AccountButton;
