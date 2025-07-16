import { Ghost, Sparkle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <section className=" bg-gradient-to-br from-[#0f1e12] to-[#0a2d1c] flex items-center justify-center ">
      <div
        className="bg-gradient-to-tr from-white/5 w-[100%] h-[100vh]
       to-white/5 backdrop-blur-2xl  border border-white/10
        p-10  text-center space-y-6 text-white animate-fade-in ring-1 ring-white/10 py-[10rem]"
      >
        <h1 className="text-6xl font-bold text-[#00ff88] drop-shadow-[0_0_8px_#00ff88] animate-pulse">
          404
        </h1>

        <Ghost className="mx-auto text-[#00ff88] w-12 h-12 animate-bounce drop-shadow-[0_0_6px_#00ff88]" />

        <h1 className="text-2xl font-semibold">Oops!</h1>
        <p className="text-gray-300">
          We looked everywhere, even under the rug... but couldn’t find the page
          you’re wishing for.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <Link
            to="/"
            className="bg-[#123727]/80 hover:bg-[#00ff88]/20 text-white px-4 py-2 rounded-lg border border-green-300/30 backdrop-blur-md transition-all duration-300 inline-flex items-center gap-2 shadow-md"
          >
            <ArrowLeft size={18} /> Go Back Home
          </Link>
        </div>

        <p className="text-sm text-green-300/60 pt-4 italic">
          Or summon a developer to fix this mess{" "}
        </p>
      </div>
    </section>
  );
};

export default NotFoundPage;
