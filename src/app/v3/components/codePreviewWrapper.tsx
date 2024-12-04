"use client";
import { CodePreview } from "@stianlarsen/react-code-preview";
import { ReactElement } from "react";

interface CodePreviewWrapperProps {
  code: string;
  component: () => ReactElement;
}

export const CodePreviewWrapper = ({
  code,
  component,
}: CodePreviewWrapperProps) => {
  return <CodePreview code={code} component={component} />;
};
