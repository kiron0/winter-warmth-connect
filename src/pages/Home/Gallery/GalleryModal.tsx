/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { HiArrowLongLeft, HiArrowLongRight } from 'react-icons/hi2';

interface ModalProps {
          src: string;
          data: any[];
          setSelectedImage: (value: string | null) => void;
          isRenderedAll?: boolean;
}

export default function GalleryModal({ data, src, setSelectedImage, isRenderedAll }: ModalProps) {
          const [initialX, setInitialX] = useState<number>(0);
          const [initialY, setInitialY] = useState<number>(0);
          const [direction, setDirection] = useState<'left' | 'right' | null>(null);

          const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                    if (e.target === e.currentTarget) {
                              setSelectedImage(null);
                    }
          };

          const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
                    setInitialX(e.touches[0].clientX);
                    setInitialY(e.touches[0].clientY);
          };

          const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
                    const currentX = e.changedTouches[0].clientX;
                    const currentY = e.changedTouches[0].clientY;
                    const diffX = initialX - currentX;
                    const diffY = initialY - currentY;

                    if (Math.abs(diffX) > Math.abs(diffY)) {
                              if (diffX > 0) {
                                        setDirection('right');
                                        onRightClick();
                              } else {
                                        setDirection('left');
                                        onLeftClick();
                              }
                    }
          };

          const onRightClick = () => {
                    const currentIndex = data?.findIndex(
                              (item: any) => item?.image?.url === src
                    );

                    if (
                              currentIndex <
                              (isRenderedAll ? data?.length : data?.slice(0, 6)?.length) - 1
                    ) {
                              setSelectedImage(data[currentIndex + 1]?.image?.url);
                    }
          };

          const onLeftClick = () => {
                    const currentIndex = data?.findIndex(
                              (item: any) => item?.image?.url === src
                    );

                    if (currentIndex > 0) {
                              setSelectedImage(data[currentIndex - 1]?.image?.url);
                    }
          };

          const noDataLeftClick =
                    data?.findIndex((item: any) => item?.image?.url === src) === 0;
          const noDataRightClick =
                    data?.findIndex((item: any) => item?.image?.url === src) ===
                    (isRenderedAll ? data?.length : data?.slice(0, 6)?.length) - 1;

          return (
                    <AnimatePresence>
                              <motion.div
                                        className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-80"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onClick={handleOverlayClick}
                              >
                                        <motion.div
                                                  className="max-w-6xl w-full mx-3 lg:mx-0 bg-white p-2 rounded-2xl shadow-lg overflow-hidden relative"
                                                  initial={{ scale: 0.5, opacity: 0 }}
                                                  animate={{ scale: 1, opacity: 1 }}
                                                  exit={{ scale: 0.5, opacity: 0 }}
                                                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                                  onTouchStart={handleTouchStart}
                                                  onTouchEnd={handleTouchEnd}
                                        >
                                                  <motion.div
                                                            key={src}
                                                            initial={{ x: direction === 'left' ? '-100%' : '100%' }}
                                                            animate={{ x: 0 }}
                                                            exit={{ x: direction === 'left' ? '100%' : '-100%' }}
                                                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                                  >
                                                            <div
                                                                      className={`${noDataLeftClick ? 'hidden' : 'absolute top-1/2 left-0 transform -translate-y-1/2'}`}
                                                            >
                                                                      <button
                                                                                className="p-2 bg-white rounded-full shadow-md sm:hover:bg-black/75 text-black sm:hover:text-white duration-300"
                                                                                disabled={noDataLeftClick}
                                                                                onClick={onLeftClick}
                                                                      >
                                                                                <HiArrowLongLeft className="h-4 sm:h-6 w-4 sm:w-6" />
                                                                      </button>
                                                            </div>
                                                            <button
                                                                      className="absolute top-0 right-0 p-0.5 sm:p-1 m-1 bg-white rounded-full shadow-md sm:hover:bg-black/75 text-black sm:hover:text-white duration-300"
                                                                      onClick={() => setSelectedImage(null)}
                                                            >
                                                                      <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                className="h-4 sm:h-6 w-4 sm:w-6"
                                                                                fill="none"
                                                                                viewBox="0 0 24 24"
                                                                                stroke="currentColor"
                                                                      >
                                                                                <path
                                                                                          strokeLinecap="round"
                                                                                          strokeLinejoin="round"
                                                                                          strokeWidth={2}
                                                                                          d="M6 18L18 6M6 6l12 12"
                                                                                />
                                                                      </svg>
                                                            </button>
                                                            <div
                                                                      className={`${noDataRightClick ? 'hidden' : 'absolute top-1/2 right-0 transform -translate-y-1/2'}`}
                                                            >
                                                                      <button
                                                                                className="p-2 bg-white rounded-full shadow-md sm:hover:bg-black/75 text-black sm:hover:text-white duration-300"
                                                                                disabled={noDataRightClick}
                                                                                onClick={onRightClick}
                                                                      >
                                                                                <HiArrowLongRight className="h-4 sm:h-6 w-4 sm:w-6" />
                                                                      </button>
                                                            </div>
                                                            <div>
                                                                      <img
                                                                                src={src}
                                                                                alt={src}
                                                                                draggable={false}
                                                                                className="w-full h-full rounded-2xl select-none"
                                                                      />
                                                            </div>
                                                  </motion.div>
                                        </motion.div>
                              </motion.div>
                    </AnimatePresence>
          );
}
