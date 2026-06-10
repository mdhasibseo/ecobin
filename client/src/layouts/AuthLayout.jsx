// import recycleImg from "../assets/images/recycle.png";

const AuthLayout = ({
  children,
  title,
  subtitle,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-10 items-center">
        
        {/* Left Side */}
        <div className="hidden lg:block">
          <h1 className="text-5xl font-bold text-green-700 mb-6">
            EcoReward
          </h1>

          <h2 className="text-4xl font-bold leading-tight">
            Turn Waste Into
            <span className="block text-green-700">
              Rewards
            </span>
          </h2>

          <p className="text-gray-600 mt-4 text-lg">
            Recycle smarter and earn points
            for every contribution.
          </p>

          <img
            src={"recycleImg"}
            alt="Recycle"
            className="mt-10 w-full max-w-lg"
          />
        </div>

        {/* Right Side */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 w-full max-w-md mx-auto">
          <h2 className="text-3xl font-bold mb-2">
            {title}
          </h2>

          <p className="text-gray-500 mb-8">
            {subtitle}
          </p>

          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;