import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TCloth } from '@/types';
import { Link } from 'react-router-dom';

export default function ClothCard({ cloth }: { cloth: TCloth }) {
          return (
                    <Card key={cloth?._id} className="w-full bg-background rounded-xl shadow-md overflow-hidden">
                              <div className="relative">
                                        <img
                                                  alt={cloth?.title}
                                                  className="w-full h-80 object-cover object-center border-b select-none"
                                                  src={cloth?.image?.url}
                                                  draggable={false}
                                        />
                              </div>
                              <CardContent className="space-y-4 p-4">
                                        <div>
                                                  <h3 className="text-lg font-semibold">{cloth?.title}</h3>
                                                  <p className="text-sm text-gray-500 capitalize">{cloth?.category}</p>
                                        </div>
                                        <div className="flex justify-between items-center">
                                                  <p className="text-sm font-medium capitalize">Size: {cloth?.size?.map((size, index) => (
                                                            <span key={index} className="bg-primary text-primary-foreground ml-2 rounded-md shadow-sm px-2 py-1 text-xs">{size}</span>
                                                  ))}</p>
                                                  <Link to={`/winter-clothes/${cloth?._id}`}>
                                                            <Button variant="default" size="sm" className="text-xs">View Detail</Button>
                                                  </Link>
                                        </div>
                              </CardContent>
                    </Card>
          )
}