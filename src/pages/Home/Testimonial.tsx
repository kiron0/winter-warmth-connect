import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

const testimonials = [
          {
                    name: "Jane Smith",
                    position: "Community Volunteer",
                    message: "As a volunteer working with homeless shelters, I've witnessed firsthand the impact of winter clothes donations. Thanks to generous contributions from individuals like you, we've been able to keep countless individuals warm during the coldest months. Your kindness truly makes a difference."
          },
          {
                    name: "John Doe",
                    position: "Director of a Local Charity Organization",
                    message: "On behalf of our organization, I want to express our heartfelt gratitude for your winter clothes donations. Your support ensures that families in need can stay warm and protected from the harsh winter weather. Together, we're making our community a warmer and more compassionate place."
          },
          {
                    name: "Sarah Johnson",
                    position: "Social Worker",
                    message: "Working with low-income families, I've seen the struggle they face during the winter season. Your donations of winter clothes provide more than just warmth; they offer hope and comfort to those who need it most. Thank you for your generosity."
          },
          {
                    name: "Michael Brown",
                    position: "Shelter Manager",
                    message: "As someone who manages a homeless shelter, I can't overstate the importance of winter clothing donations. Your contributions have helped us meet the basic needs of our residents, allowing them to focus on rebuilding their lives. Thank you for being a beacon of warmth and support in our community."
          },
          {
                    name: "Emily Garcia",
                    position: "Outreach Coordinator",
                    message: "Your winter clothes donations have a ripple effect that extends far beyond providing warmth. They instill a sense of dignity and worth in those who receive them, reminding them that they are valued members of our community. Thank you for spreading kindness and compassion during the colder months."
          },
          {
                    name: "David Nguyen",
                    position: "Founder of a Homeless Advocacy Group",
                    message: "As someone who has experienced homelessness firsthand, I know how vital winter clothes donations are. Your generosity not only saves lives but also restores hope to those who are struggling. Thank you for your unwavering support and for making a tangible difference in the lives of others."
          }
];

export default function Testimonial() {
          return (
                    <div className='pb-10 md:px-12 my-10 px-6 md:my-16 py-12'>
                              <div className="pb-12">
                                        <h1 className='text-2xl md:text-3xl lg:text-4xl py-4 text-center font-lemonMilk text-black'>Testimonial</h1>
                                        <p className='w-full mx-auto text-base md:text-lg text-center font-monospaceTypewriter text-black px-1'>
                                                  Explore donor testimonials with engaging animations and sliders. Witness the impact of your support firsthand as stories of warmth and hope come to life. Join us in spreading compassion this winter.
                                        </p>
                              </div>
                              <div className="rounded-md flex flex-col antialiased bg-white dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
                                        <InfiniteMovingCards
                                                  items={testimonials?.slice(0, 6)}
                                                  direction="right"
                                                  speed="slow"
                                        />
                              </div>
                    </div>
          )
}