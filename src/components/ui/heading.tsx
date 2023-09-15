import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const headingVariants = cva("font-semibold tracking-tight", {
  variants: {
    variant: {
      h1: "text-4xl font-extrabold lg:text-5xl",
      h2: "text-3xl",
      h3: "text-2xl",
      h4: "text-xl",
    },
  },
  defaultVariants: {
    variant: "h1",
  },
});

export interface HeadingProps
  extends React.ComponentProps<"h1">,
    VariantProps<typeof headingVariants> {}

export function Heading({ variant, className, ...props }: HeadingProps) {
  const Comp = variant ?? "h1";
  return (
    <Comp className={cn(headingVariants({ variant, className }))} {...props} />
  );
}
