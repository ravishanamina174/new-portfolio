import React from "react";

interface SkillCardProps {
  /** rendered icon component (svg or img) */
  icon: React.ReactNode;
  /** human readable name of the skill */
  name: string;
}

export const SkillCard: React.FC<SkillCardProps> = ({ icon, name }) => {
  return (
    <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-full px-3 py-1 border border-gray-200 dark:border-gray-700 shadow-sm">
      {/* icon container fixes size */}
      <div className="w-4 h-4 flex-shrink-0 text-current">{icon}</div>
      <span className="text-xs font-medium text-gray-900 dark:text-gray-100">
        {name}
      </span>
    </div>
  );
};

// note: we deliberately use plain <img> tags for most icons so that we
// don't need additional dependencies.  The images are pulled from the
// simpleicons CDN which provides lightweight SVGs for popular
// technologies.  For items that are not available (LangChain/FASTAPI)
// a generic code icon from lucide-react is used as a fallback.
