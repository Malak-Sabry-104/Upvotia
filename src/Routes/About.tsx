import {
  Lightbulb,
  Code,
  Flame,
  Rocket,
  MessageSquare,
  BarChart2,
} from "lucide-react";

const AboutUs = () => {
  return (
    <section className="animate-on-scroll  bg-gradient-to-br from-[#040F0C] via-[#03130D] to-[#010805] text-white min-h-screen px-6 py-16 md:px-20">
      {/* Header */}
      <div className="mb-16 max-w-3xl">
        <h1 className="text-4xl md:text-4xl mt-[2rem] font-bold mb-4 flex items-center gap-3 text-green-300 drop-shadow-glow">
          <Lightbulb className="text-green-400" /> What Is Upvotia
        </h1>
        <p className="text-white/60 text-md mt-5">
          Upvotia is a dynamic platform that bridges the gap between people with{" "}
          <span className="text-white font-semibold">creative ideas</span> and{" "}
          <span className="text-white font-semibold">developers</span> ready to bring them to life.
        </p>
        <p className="mt-4 text-gray-400">
          Whether you're someone with a spark of innovation or a dev looking for meaningful projects,
          Upvotia is your space to <span className="text-white font-semibold">share</span>,{" "}
          <span className="text-white font-semibold">collaborate</span>, and{" "}
          <span className="text-white font-semibold">ignite possibilities</span>.
        </p>
      </div>

      {/* Mission */}
      <div className="mb-20 backdrop-blur-md bg-white/5 p-6 rounded-2xl border border-white/10 shadow-md">
        <h2 className="text-3xl font-semibold mb-2 text-green-400">Our Mission</h2>
        <blockquote className="border-l-4 pl-4 border-green-500 italic text-gray-200 text-xl">
          “Turn the best ideas into real, working products — fast.”
        </blockquote>
        <p className="mt-4 text-gray-400">
          We’re building a community where ideas don’t just sit idle — they grow, evolve, and become something real.
        </p>
      </div>

      {/* Features */}
      <div className="mb-20">
        <h2 className="text-3xl font-semibold mb-6 text-green-400">Key Features</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              icon: <Lightbulb className="text-green-300" />,
              title: "Submit Ideas",
              desc: "Post your project ideas — apps, websites, tools, or features.",
            },
            {
              icon: <Code className="text-green-300" />,
              title: "Developer Hub",
              desc: "Devs browse and build projects that inspire them.",
            },
            {
              icon: <Flame className="text-green-300" />,
              title: "Boost System",
              desc: "Upvote and boost ideas to increase visibility.",
            },
            {
              icon: <Rocket className="text-green-300" />,
              title: "Live Projects Showcase",
              desc: "See real projects with demos, GitHub links, and time invested.",
            },
            {
              icon: <MessageSquare className="text-green-300" />,
              title: "Comment & Feedback",
              desc: "Collaborate through comments and questions.",
            },
            {
              icon: <BarChart2 className="text-green-300" />,
              title: "Idea Stats & Activity",
              desc: "Track popularity, progress, and engagement in real time.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="backdrop-blur-lg bg-white/5 p-5 rounded-xl border border-white/10 shadow-sm hover:shadow-green-500/20 transition"
            >
              <div className="flex items-start gap-4 mb-2">
                <div className="p-3 bg-green-900/40 rounded-md">{feature.icon}</div>
                <h3 className="text-lg font-bold text-white">{feature.title}</h3>
              </div>
              <p className="text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why Use Upvotia */}
      <div className="mb-20">
        <h2 className="text-3xl font-semibold mb-6 text-green-400"> Why Use Upvotia?</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="backdrop-blur-md bg-white/5 p-6 rounded-2xl border border-white/10">
            <h3 className="text-white font-semibold text-xl mb-3">For Idea Creators:</h3>
            <ul className="text-gray-300 list-disc list-inside space-y-2">
              <li> Get your ideas heard</li>
              <li> Connect with developers who want to build what you envision</li>
              <li> Watch your ideas come to life — without needing to code</li>
            </ul>
          </div>
          <div className="backdrop-blur-md bg-white/5 p-6 rounded-2xl border border-white/10">
            <h3 className="text-white font-semibold text-xl mb-3">For Developers:</h3>
            <ul className="text-gray-300 list-disc list-inside space-y-2">
              <li> Discover real-world project ideas people actually want</li>
              <li> Build your portfolio with community-driven work</li>
              <li> Learn, experiment, and collaborate in a low-risk, high-value environment</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Vision */}
      <div className="backdrop-blur-md bg-white/5 p-6 rounded-2xl border border-white/10">
        <h2 className="text-3xl font-semibold mb-4 text-green-400"> Our Vision</h2>
        <p className="text-gray-300 mb-2">
          We believe that <span className="text-white font-semibold">anyone</span> can have a great idea — but{" "}
          <span className="text-white font-semibold">not everyone</span> can build it.
        </p>
        <p className="text-gray-400">
          Upvotia connects <span className="text-white font-semibold">inspiration</span> and{" "}
          <span className="text-white font-semibold">implementation</span>. We empower creators and coders to bring
          useful, fun, and innovative tools to life — together.
        </p>
      </div>
    </section>
  );
};

export default AboutUs;
