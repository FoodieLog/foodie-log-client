export default function AccountsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full">
      <div className="w-screen h-screen flex justify-center mt-10">{children}</div>
    </div>
  );
}
