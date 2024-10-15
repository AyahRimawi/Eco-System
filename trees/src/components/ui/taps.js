// // components/ui/tabs.js

// import React, { useState } from 'react';

// export const Tabs = ({ children }) => {
//   const [activeTab, setActiveTab] = useState(0);
//   return (
//     <div>
//       <div className="flex space-x-4 border-b">
//         {React.Children.map(children, (child, index) => (
//           <div
//             onClick={() => setActiveTab(index)}
//             className={`cursor-pointer py-2 px-4 ${activeTab === index ? 'border-b-2 border-green-600' : ''}`}
//           >
//             {child.props.label}
//           </div>
//         ))}
//       </div>
//       {React.Children.toArray(children)[activeTab]}
//     </div>
//   );
// };

// export const TabsContent = ({ children }) => {
//   return <div className="p-4">{children}</div>;
// };

// export const TabsList = ({ children }) => {
//   return <div className="flex">{children}</div>;
// };

// export const TabsTrigger = ({ children }) => {
//   return <div>{children}</div>;
// };
import React, { createContext, useContext, useState } from 'react';

const TabsContext = createContext();

export const Tabs = ({ children, defaultValue }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  );
};

export const TabsList = ({ children }) => {
  return <div className="flex border-b">{children}</div>;
};

export const TabsTrigger = ({ value, children }) => {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  return (
    <button
      className={`px-4 py-2 ${
        activeTab === value
          ? 'border-b-2 border-green-600 text-green-600'
          : 'text-gray-600'
      }`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({ value, children }) => {
  const { activeTab } = useContext(TabsContext);
  if (activeTab !== value) return null;
  return <div>{children}</div>;
};