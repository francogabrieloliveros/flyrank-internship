"use client";

import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";
import spec from "@/lib/openapi.json";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });

export default function DocsPage() {
  return <SwaggerUI spec={spec} />;
}
