export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 px-4 md:px-8 py-3 bg-[#323643] text-white animate__animated animate__fadeInDown">
      <div className="max-w-7xl mx-auto flex flex-col space-y-3 items-center justify-between">
        <h1 className="text-3xl md:text-4xl font-bold">Urban Insights</h1>
        <p className="hidden md:block text-sm">
          Explore the universe with our amazing satellite-themed website!
        </p>
      </div>
    </header>
  )
}
