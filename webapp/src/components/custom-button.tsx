"use client";

import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdDelete, MdModeEdit, MdOutlineCancel } from "react-icons/md";
import { useMediaQuery } from "usehooks-ts";
import { Button, buttonVariants } from "./ui/button";

interface Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  buttonLabel: string;
  linkHref?: string;
  icon?: "delete" | "add" | "back" | "cancel" | "edit";
  hideLabelOnMobile?: boolean;
}

const CustomButton = React.forwardRef<HTMLButtonElement, Props>(
  (
    {
      buttonLabel,
      linkHref = "",
      icon,
      hideLabelOnMobile = true,
      ...restProps
    },
    ref,
  ) => {
    const matches = useMediaQuery("(min-width: 768px)");
    const [componentLoaded, setComponentLoaded] = useState(false);

    const allIcons = () => {
      switch (icon) {
        case "delete":
          return <MdDelete size={18} />;

        case "add":
          return <IoAddCircleOutline size={18} />;

        case "back":
          return <IoMdArrowRoundBack size={18} />;

        case "cancel":
          return <MdOutlineCancel size={18} />;

        case "edit":
          return <MdModeEdit size={18} />;

        default:
          break;
      }
    };

    const leIcon = allIcons();

    const spanClasses =
      !matches && icon && hideLabelOnMobile ? "hidden md:inline" : "";

    useEffect(() => {
      setComponentLoaded(true);

      return () => setComponentLoaded(false);
    }, []);

    if (linkHref)
      return (
        <>
          {componentLoaded ? (
            <Button
              ref={ref}
              size={
                !matches && icon && hideLabelOnMobile ? "icon" : restProps.size
              }
              {...restProps}
              className={cn("gap-2", restProps.className)}
              asChild
            >
              <Link href={linkHref}>
                {leIcon}
                {restProps.size !== "icon" && (
                  <span className={cn(spanClasses)}>{buttonLabel}</span>
                )}
              </Link>
            </Button>
          ) : (
            <ButtonSkeleton />
          )}
        </>
      );

    return (
      <>
        {componentLoaded ? (
          <Button
            ref={ref}
            size={
              !matches && icon && hideLabelOnMobile ? "icon" : restProps.size
            }
            {...restProps}
            className={cn("gap-2", restProps.className)}
          >
            {leIcon}
            {restProps.size !== "icon" && (
              <span className={cn(spanClasses)}>{buttonLabel}</span>
            )}
          </Button>
        ) : (
          <ButtonSkeleton />
        )}
      </>
    );
  },
);

CustomButton.displayName = "CustomButton";

export { CustomButton };

function ButtonSkeleton() {
  return <Button size={"icon"} variant={"secondary"}></Button>;
}
