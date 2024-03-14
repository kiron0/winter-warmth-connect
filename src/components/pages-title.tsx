type PagesTitleProps = {
          title: string
          description: string
}

export default function PagesTitle({ title, description }: PagesTitleProps) {
          return (
                    <div className="pb-12">
                              <h1 className='text-2xl md:text-3xl lg:text-4xl py-4 text-center font-lemonMilk text-primary'>{title}</h1>
                              <p className='w-full mx-auto text-base md:text-lg text-center font-monospaceTypewriter text-primary px-1'>
                                        {description}
                              </p>
                    </div>
          )
}