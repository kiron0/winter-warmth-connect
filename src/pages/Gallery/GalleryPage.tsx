import StyleProvider from '@/components/style-provider';
import useScrollToTop from '@/hooks/useScrollToTop';
import Gallery from '../Home/Gallery/Gallery';

export default function GalleryPage() {
          useScrollToTop();

          return (
                    <StyleProvider>
                              <Gallery
                                        isResetStyle
                                        isRenderedAll
                                        hiddenViewMore
                                        scrollToTop
                                        className='mx-3 lg:mx-0'
                              />
                    </StyleProvider>
          )
}