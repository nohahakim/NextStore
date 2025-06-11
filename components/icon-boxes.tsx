import { Card, CardContent } from "@/components/ui/card";
import { Truck, Shield, RotateCcw, Headphones } from "lucide-react";

const IconBoxes = () => {
  return (
    <div>
      <Card className="bg-brand-light/20 rounded-3xl p-12">
        <CardContent className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 p-0">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-500 text-white">
              <Truck className="w-8 h-8 text-white" />
            </div>
            <div className="text-xl font-bold">Free Shipping</div>
            <div className="text-gray-600">On orders over $100</div>
          </div>
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary text-white">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div className="text-xl font-bold">Secure Payment</div>
            <div className="text-gray-600">100% protected payments</div>
          </div>
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent text-white">
              <RotateCcw className="w-8 h-8 text-white" />
            </div>
            <div className="text-xl font-bold">Easy Returns</div>
            <div className="text-gray-600">30-day return policy</div>
          </div>
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-600 text-white">
              <Headphones className="w-8 h-8 text-white" />
            </div>
            <div className="text-xl font-bold">24/7 Support</div>
            <div className="text-gray-600">Dedicated support</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IconBoxes;
