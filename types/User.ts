import { ProviderType } from '../enum/ProviderType';

export interface UserCredential {
  providerType: ProviderType;
  displayName: string | null;
}
