import { MEMState } from "@/types";

export function getContainerIndexById(state: MEMState, container_id: string) {
  return state.containers.findIndex(
    (container) => container.id === container_id
  );
}

export function getContainerIndexByVaultId(state: MEMState, vault_id: string) {
  return state.containers.findIndex(
    (container) => container.config.vault_id === vault_id
  );
}
