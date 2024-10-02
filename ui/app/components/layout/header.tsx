const Header = () => {
  return (
    <header
      className="w-full h-12 lg:h-24 py-2 lg:py-8 px-24 bg-gradient-to-t
            from-transparent
            to-zinc-900
            opacity-100"
    >
      <div className="flex justify-between items-center h-full">
        <div className="text-white text-sm lg:text-2xl font-bold">Logo</div>
        <nav className="flex gap-4 text-sm lg:text-xl text-white">
          <a href="#">Home</a>
          <a href="#">Movies</a>
          <a href="#">Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
