import type { Metadata } from "next";

import { InquiryDesk } from "@/components/sections/InquiryDesk";

export const metadata: Metadata = {
  title: "Contact | Lumo",
  description:
    "Secure your strategic session — minimalist inquiry desk for high-tier architectural proposals and consultation scheduling.",
};

export default function ContactPage() {
  return <InquiryDesk />;
}
