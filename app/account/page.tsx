"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getOrders, getProfile, saveProfile, type LocalOrder, type LocalProfile } from "@/lib/local-store";
import { formatPrice } from "@/lib/products";
import { toast } from "sonner";

const EMPTY_PROFILE: LocalProfile = {
  full_name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  governorate: "",
};

const STATUS_LABEL: Record<LocalOrder["status"], string> = {
  pending: "Pending",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

function AccountView() {
  const searchParams = useSearchParams();
  const [profile, setProfile] = useState<LocalProfile>(EMPTY_PROFILE);
  const [orders, setOrders] = useState<LocalOrder[]>([]);
  const [tab, setTab] = useState(searchParams.get("tab") === "orders" ? "orders" : "profile");

  useEffect(() => {
    setProfile(getProfile() ?? EMPTY_PROFILE);
    setOrders(getOrders());
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    saveProfile(profile);
    toast("Profile saved");
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <Navigation />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-40 pb-24 lg:pt-48 lg:pb-32">
        <h1 className="text-5xl lg:text-6xl font-display tracking-tight mb-4">Your account</h1>
        <p className="text-muted-foreground mb-12 max-w-lg">
          Manage your delivery details and keep an eye on every order — synced from this device.
        </p>

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="mb-10">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="orders">Orders {orders.length > 0 && `(${orders.length})`}</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <form onSubmit={handleSaveProfile} className="max-w-xl space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="full_name">Full name</Label>
                  <Input
                    id="full_name"
                    value={profile.full_name}
                    onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={profile.address}
                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={profile.city}
                    onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="governorate">Governorate</Label>
                  <Input
                    id="governorate"
                    value={profile.governorate}
                    onChange={(e) => setProfile({ ...profile, governorate: e.target.value })}
                  />
                </div>
              </div>
              <Button type="submit" className="bg-stikky-orange hover:brightness-110 text-white rounded-full h-12 px-8">
                Save profile
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="orders">
            {orders.length === 0 ? (
              <div className="border border-foreground/10 py-24 text-center text-muted-foreground">
                No orders yet — once you check out, they&apos;ll show up here.
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="border border-foreground/10 p-6">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                      <div>
                        <span className="font-mono text-sm text-muted-foreground">{order.id}</span>
                        <span className="block text-xs text-muted-foreground mt-1">
                          {new Date(order.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <span className="text-xs font-mono uppercase px-3 py-1 border border-foreground/15 rounded-full">
                        {STATUS_LABEL[order.status]}
                      </span>
                      <span className="font-display text-xl">{formatPrice(order.total)}</span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {order.items.map((item) => (
                        <div key={item.id} className="w-14 h-14 overflow-hidden bg-secondary/40 border border-foreground/10">
                          {item.image_url && (
                            <img src={item.image_url} alt={item.product_name} className="w-full h-full object-cover" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      <FooterSection />
    </main>
  );
}

export default function AccountPage() {
  return (
    <Suspense fallback={null}>
      <AccountView />
    </Suspense>
  );
}
