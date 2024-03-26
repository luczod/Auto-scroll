import {
  CheckCircledIcon,
  ExclamationTriangleIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";
import { ToastProps } from "../include/ui/toast";
import { useToast } from "../include/ui/use-toast";

type TToastMsg = {
  text: string;
  kind: ToastProps["variant"];
};

export function toastMsg(text: string, kind: ToastProps["variant"]) {
  const { toast } = useToast();

  return toast({
    variant: kind,
    description: <RawMsg text={text} kind={kind} />,
  });
}

export function RawMsg({ text, kind }: TToastMsg) {
  switch (kind) {
    case "error":
      return (
        <span className="flex flex-row  w-full gap-4 items-center md:text-lg md:uppercase">
          <ExclamationTriangleIcon className="text-red-500 size-8" /> {text}
        </span>
      );
    case "success":
      return (
        <span className="flex flex-row  w-full gap-4 items-center md:text-lg md:uppercase">
          <CheckCircledIcon className="text-emerald-500 size-8" /> {text}!
        </span>
      );
    case "info":
      return (
        <span className="flex flex-row  w-full gap-4 items-center md:text-lg md:uppercase">
          <InfoCircledIcon className="text-yellow-500 size-8" /> {text}
        </span>
      );

    default:
      return (
        <span className="flex flex-row  w-full gap-4 items-center md:text-lg md:uppercase">
          <ExclamationTriangleIcon className="text-red-500 size-8" /> {text}
        </span>
      );
  }
}
