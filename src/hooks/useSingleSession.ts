import { useState, useEffect } from "react";

function useSingleSession() {
  const [isActiveSession, setIsActiveSession] = useState(true);
  const currentTabId = sessionStorage.getItem("tabId") || Date.now().toString();
  sessionStorage.setItem("tabId", currentTabId);
  console.log(currentTabId)
  useEffect(() => {
    localStorage.setItem("lastActiveTab", currentTabId);

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "lastActiveTab") {
        const lastActiveTab = localStorage.getItem("lastActiveTab");

        setIsActiveSession(lastActiveTab === currentTabId);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [currentTabId]);

  return isActiveSession;
}

export default useSingleSession;
