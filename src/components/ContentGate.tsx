"use client";

import { useContentState } from "@/context/ContentContext";
import ContentLoading from "./ContentLoading";
import ContentError from "./ContentError";

type ContentGateProps = {
  children: React.ReactNode;
};

/**
 * Shows loading skeleton until content is loaded from the database (or file).
 * Shows error + retry if the request fails. Renders children only when content is ready.
 */
export default function ContentGate({ children }: ContentGateProps) {
  const { content, loading, error, retry } = useContentState();

  if (loading) {
    return <ContentLoading />;
  }

  if (error || !content) {
    return <ContentError message={error ?? "Content could not be loaded."} onRetry={retry} />;
  }

  return <>{children}</>;
}
