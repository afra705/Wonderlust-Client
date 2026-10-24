"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const categories = ["Beach", "Mountain", "Historical", "City Tour", "Adventure", "Luxury"];

const emptyForm = {
  name: "",
  country: "",
  category: "",
  price: "",
  duration: "",
  departureDate: "",
  imageUrl: "",
  description: "",
};

const inputClass = "h-10 rounded-md border-gray-200 bg-[#f8fafc] px-3 text-sm";

export default function AddDestinationPage() {
  const router = useRouter();
  const [form, setForm] = useState(emptyForm);
  const [saved, setSaved] = useState(false);

  const setField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const resetForm = () => {
    setForm(emptyForm);
    setSaved(false);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    const res = await fetch('http://localhost:5000/destination',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(form)
    })
    const data =await res.json()
    console.log(data);
    
   toast.success("Destination added successfully.");

    if (!form.name.trim()) return;

    let destinations = [];
    try {
      destinations = JSON.parse(localStorage.getItem("destinations") ?? "[]");
    } catch {
      destinations = [];
    }
    destinations.push({ id: Date.now(), ...form });
    try {
      localStorage.setItem("destinations", JSON.stringify(destinations));
    } catch {
      // storage unavailable — still acknowledge below
    }
    resetForm();
    setSaved(true);

  };

  return (
    <main className="min-h-screen bg-[#fafbfd] px-6 py-8 lg:px-12">
      <h1 className="font-serif text-4xl text-gray-950">Add New Travel Package</h1>

      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-12 w-full max-w-[540px] rounded-lg border border-gray-100 bg-white p-6 shadow-sm"
      >
        <div className="grid gap-5 sm:grid-cols-2 sm:gap-x-6">
          <div className="sm:col-span-2">
            <Label htmlFor="name" className="text-sm font-semibold text-gray-900">
              Destination Name
            </Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
              placeholder="Bali Paradise"
              required
              className={inputClass}
            />
          </div>

          <div>
            <Label htmlFor="country" className="text-sm font-semibold text-gray-900">
              Country
            </Label>
            <Input
              id="country"
              value={form.country}
              onChange={(e) => setField("country", e.target.value)}
              placeholder="Indonesia"
              className={inputClass}
            />
          </div>

          <div>
            <Label className="text-sm font-semibold text-gray-900">Category</Label>
            <Select
              value={form.category || null}
              onValueChange={(value) => setField("category", value)}
            >
              <SelectTrigger className="mt-0.5 h-10 w-full rounded-md border-gray-200 bg-[#f8fafc] px-3 text-sm data-placeholder:text-muted-foreground">
                <SelectValue placeholder="Beach" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="price" className="text-sm font-semibold text-gray-900">
              Price (USD)
            </Label>
            <Input
              id="price"
              type="number"
              min="0"
              value={form.price}
              onChange={(e) => setField("price", e.target.value)}
              placeholder="e.g., 1299"
              className={inputClass}
            />
          </div>

          <div>
            <Label htmlFor="duration" className="text-sm font-semibold text-gray-900">
              Duration
            </Label>
            <Input
              id="duration"
              value={form.duration}
              onChange={(e) => setField("duration", e.target.value)}
              placeholder="e.g., 7 Days/6 Nights"
              className={inputClass}
            />
          </div>

          <div className="sm:col-span-2">
            <Label htmlFor="departureDate" className="text-sm font-semibold text-gray-900">
              Departure Date
            </Label>
            <Input
              id="departureDate"
              type="date"
              value={form.departureDate}
              onChange={(e) => setField("departureDate", e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="sm:col-span-2">
            <Label htmlFor="imageUrl" className="text-sm font-semibold text-gray-900">
              Image URL
            </Label>
            <Input
              id="imageUrl"
              type="url"
              value={form.imageUrl}
              onChange={(e) => setField("imageUrl", e.target.value)}
              placeholder="https://example.com/image.jpg"
              className={inputClass}
            />
          </div>

          <div className="sm:col-span-2">
            <Label htmlFor="description" className="text-sm font-semibold text-gray-900">
              Description
            </Label>
            <Textarea
              id="description"
              value={form.description}
              onChange={(e) => setField("description", e.target.value)}
              placeholder="Describe the travel experience..."
              className="mt-0.5 min-h-28 rounded-md border-gray-200 bg-[#f8fafc] px-3 text-sm"
            />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-4">
          {saved ? (
            <p className="mr-auto text-xs text-emerald-600">
              Travel package saved successfully.
            </p>
          ) : null}
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/")}
            className="h-10 gap-2 rounded-md border-red-200 px-5 text-red-500 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 className="size-4" />
            Cancel
          </Button>
          <Button
            type="submit"
            className="h-10 gap-2 rounded-md bg-[#00bcd4] px-5 text-sm font-semibold text-white hover:bg-[#00b0c6]"
          >
            <Save className="size-4" />
            Add Travel Package
          </Button>
        </div>
      </form>
    </main>
  );
}
