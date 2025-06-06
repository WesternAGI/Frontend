import Link from "next/link";
import React from "react";

interface QuickActionButtonProps {
  icon: React.ReactNode;
  title: string;
  href: string;
  color: string;
}

export default function QuickActionButton({
  icon,
  title,
  href,
  color,
}: QuickActionButtonProps) {
  return (
    <Link
      href={href}
      className={`flex items-center justify-center px-4 py-4 border border-transparent rounded-xl shadow-sm text-sm font-medium ${color} transition-all transform hover:scale-105`}
    >
      {icon}
      <span className="ml-2">{title}</span>
    </Link>
  );
}
