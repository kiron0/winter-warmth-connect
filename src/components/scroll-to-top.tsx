import { useState } from "react";
import { HiOutlineArrowNarrowUp } from 'react-icons/hi';

export default function ScrollToTop() {
  const [visible, setVisible] = useState<boolean>(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    typeof window !== "undefined" && window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  typeof window !== "undefined" && window.addEventListener("scroll", toggleVisible);

  return (
    <div className={`fixed cursor-pointer z-40 right-10 bottom-12 ${visible ? 'inline' : 'hidden'}`}>
      <HiOutlineArrowNarrowUp className="text-3xl md:text-4xl bg-primary text-primary-foreground p-2 rounded-lg" onClick={scrollToTop} />
    </div>
  )
}