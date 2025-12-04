import Link from "next/link";

type AuthType = "host" | "volunteer";
type AuthAction = "login" | "register";

interface AuthButtonProps {
  type: AuthType;
  action: AuthAction;
  className?: string;
}

const styles: Record<AuthType, string> = {
  host: "text-black font-bold ",
  volunteer: "text-black font-bold ",
};

export default function AuthButton({ type, action }: AuthButtonProps) {
  const formattedText =
    action.charAt(0).toUpperCase() +
    action.slice(1) + " as " + type.charAt(0).toUpperCase()+ type.slice(1);

  const href = `/${type}/${action}`;

  return (
    <Link
      href={href}
      className={`${styles[type]} font-[8px] hover:text-green-700`}
    >
      {formattedText}
    </Link>
  );
}

