export default function Header({ title }: { title: string }) {
  return (
    <>
      <h2 className="flex  hover:scale-105 flex-row flex-nowrap items-center mt-2 mb-2 text-2xl">
        <span className="flex-grow block border-t border-gray-700"></span>
        <span className="flex-none block mx-4 px-4 py-2.5 text-md rounded-lg leading-none font-bold bg-gradient-to-r dark:from-purple-500 dark:to-blue-500  from-blue-400 to-blue-500 text-gray-00  dark:text-white shadow-lg transition-transform transform hover:scale-105">
          <i className="fas fa-tags mr-2"></i>
          {title}
        </span>
        <span className="flex-grow block border-t border-gray-700"></span>
      </h2>
    </>
  );
}
