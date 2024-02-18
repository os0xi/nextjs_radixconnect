"use client";
import { ReactNode, useEffect, useState } from "react";
import {
  DataRequestBuilder,
  RadixDappToolkit,
  createLogger,
} from "@radixdlt/radix-dapp-toolkit";
import { config } from "./config";
import { RadixContext } from "./radixContext";

const getChallenge: () => Promise<string> = () =>
  fetch("http://localhost:3000/api/create-challenge")
    .then((res) => res.json())
    .then((res) => res.challenge);

export const RadixProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<RadixDappToolkit | undefined>();
  useEffect(() => {
    const radixDappToolkit = RadixDappToolkit({
      networkId: config.network.networkId,
      dAppDefinitionAddress: config.dAppDefinitionAddress,
      logger: createLogger(1),
    });

    radixDappToolkit.walletApi.setRequestData(
      DataRequestBuilder.persona().withProof(),
      DataRequestBuilder.accounts().exactly(1).withProof()
    );

    radixDappToolkit.walletApi.provideChallengeGenerator(getChallenge);

    radixDappToolkit.walletApi.dataRequestControl(async ({ proofs }) => {
      const { valid } = await fetch("http://localhost:3000/verify", {
        method: "POST",
        body: JSON.stringify(proofs),
        headers: { "content-type": "application/json" },
      }).then((res): Promise<{ valid: boolean }> => res.json());
      if (!valid) {
        throw new Error("Invalid proof");
      }
    });

    setState(radixDappToolkit);
  }, []);

  if (!state) return null;
  return (
    <RadixContext.Provider value={state}>{children}</RadixContext.Provider>
  );
}
