const Header = () => {
  return (
    <header
      className="w-full h-48 p-8 bg-gradient-to-t
            from-transparent
            to-zinc-900
            opacity-100"
    >
      <div className="flex justify-between items-center">
        <div className="text-white text-2xl font-bold">Logo</div>
        <nav className="text-white">
          <a href="#" className="ml-4">
            Home
          </a>
          <a href="#" className="ml-4">
            Movies
          </a>
          <a href="#" className="ml-4">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
