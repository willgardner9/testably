import Logo from "./Logo";

const AuthContainer: React.FC<{children: React.ReactNode}> = ({children}) => {
  return (
    <section className="min-h-screen min-w-screen bg-stone-100 flex flex-col items-center justify-center">
      <Logo fontSize="text-md" />
      <section className="bg-white p-4 shadow-sm border border-stone-200 w-72 rounded-lg mt-4">
        {children}
      </section>
    </section>
  );
};

export default AuthContainer;
