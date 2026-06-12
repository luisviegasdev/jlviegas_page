"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { z } from "zod";

import { Reveal } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contact } from "@/lib/content";
import { useLocale } from "@/lib/locale-context";

type InquiryValues = {
  name: string;
  email: string;
  scope: string;
};

export function InquiryDesk() {
  const { locale } = useLocale();
  const [dispatched, setDispatched] = useState(false);

  const schema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, contact.errors.name[locale]),
        email: z.email(contact.errors.email[locale]),
        scope: z.string().min(10, contact.errors.scope[locale]),
      }),
    [locale],
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InquiryValues>({
    resolver: standardSchemaResolver(schema),
    defaultValues: { name: "", email: "", scope: "" },
  });

  // Static site — no backend per CLAUDE.md; a valid submission
  // confirms locally via the dispatched status line.
  const onSubmit = () => {
    setDispatched(true);
    reset();
  };

  return (
    <section className="px-5 pt-20 pb-20 md:px-10 md:pt-28 md:pb-28">
      <div className="grid gap-12 md:grid-cols-12">
        <Reveal className="md:col-span-5">
          <h1 className="max-w-[12ch] font-display text-[clamp(2.8rem,7vw,6.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em]">
            {contact.heading[locale]}
          </h1>
          <p className="mt-8 max-w-md text-body-lg text-muted-foreground">
            {contact.subheading[locale]}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-6 md:col-start-7">
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="rounded-lg border border-border bg-card p-6 md:p-10"
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="inquiry-name">
                {contact.fields.name.label[locale]}
              </Label>
              <Input
                id="inquiry-name"
                autoComplete="name"
                placeholder={contact.fields.name.placeholder[locale]}
                aria-invalid={!!errors.name}
                {...register("name")}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>

            <div className="mt-7 flex flex-col gap-2">
              <Label htmlFor="inquiry-email">
                {contact.fields.email.label[locale]}
              </Label>
              <Input
                id="inquiry-email"
                type="email"
                autoComplete="email"
                placeholder={contact.fields.email.placeholder[locale]}
                aria-invalid={!!errors.email}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="mt-7 flex flex-col gap-2">
              <Label htmlFor="inquiry-scope">
                {contact.fields.scope.label[locale]}
              </Label>
              <Textarea
                id="inquiry-scope"
                rows={6}
                placeholder={contact.fields.scope.placeholder[locale]}
                aria-invalid={!!errors.scope}
                {...register("scope")}
              />
              {errors.scope && (
                <p className="text-sm text-destructive">{errors.scope.message}</p>
              )}
            </div>

            <Button type="submit" className="mt-9 h-12 w-full px-6 text-base">
              {contact.submit[locale]}
            </Button>

            <p
              aria-live="polite"
              className="mt-5 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground"
            >
              <span
                aria-hidden
                className="inline-block size-1.5 rounded-full bg-accent"
              />
              {dispatched ? contact.dispatched[locale] : contact.status[locale]}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
