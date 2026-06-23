import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import type { VariantProps } from "class-variance-authority";

interface CTALinkProps
  extends React.ComponentProps<typeof Link>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
}

export function CTALink({
  children,
  className,
  variant = "default",
  size = "lg",
  ...props
}: CTALinkProps) {
  return (
    <Link
      className={cn(
        buttonVariants({ variant, size }),
        "rounded-full min-h-11",
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
