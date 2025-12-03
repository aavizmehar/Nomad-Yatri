import Link from "next/link";

type AuthType = "host" | "volunteer";
type AuthAction = "login" | "register";

interface AuthButtonProps {
  type: AuthType;
  action: AuthAction;
  className?: string;
}

const styles: Record<AuthType, string> = {
  host: "bg-[#396a6b] hover:bg-[#CD7643] text-white w-fit ",
  volunteer: "bg-[#CD7643] hover:bg-[#314E4D] text-white w-fit",
};

export default function AuthButton({ type, action }: AuthButtonProps) {
  const formattedText =
    action.charAt(0).toUpperCase() +
    action.slice(1);

  const href = `/${type}/${action}`;

  return (
    <Link
      href={href}
      className={`${styles[type]} px-4 py-2 rounded-lg font-medium transition`}
    >
      {formattedText}
    </Link>
  );
}

