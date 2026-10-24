
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";

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

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const categories = [
  "Beach",
  "Mountain",
  "Historical",
  "City Tour",
  "Adventure",
  "Luxury",
];

const inputClass =
  "h-10 rounded-md border-gray-200 bg-[#f8fafc] px-3 text-sm";

export function EditDestination({ destination }) {
  const router = useRouter();

  const [form, setForm] = useState(() => ({
    _id: destination?._id ?? "",
    name: destination?.name ?? "",
    country: destination?.country ?? "",
    category: destination?.category ?? "",
    price: String(destination?.price ?? ""),
    duration: destination?.duration ?? "",
    departureDate: destination?.departureDate ?? "",
    imageUrl: destination?.imageUrl ?? "",
    description: destination?.description ?? "",
  }));

  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const setField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setSaved(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.name.trim()) {
      toast.error("Destination name is required.");
      return;
    }

    const id = destination?._id ?? form._id;

    if (!id) {
      toast.error("Destination ID is missing.");
      return;
    }

    const { _id, ...updateData } = form;

    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:5000/destination/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...updateData,
            price:
              updateData.price === ""
                ? ""
                : Number(updateData.price),
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Failed to update destination."
        );
      }

      if (data.matchedCount === 0) {
        throw new Error("Destination not found.");
      }

      toast.success("Destination updated successfully.");

      setSaved(true);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update destination."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger
        render={
          <button
            type="button"
            className="inline-flex h-9 items-center gap-2 rounded-md border border-gray-300 bg-white px-4 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-50"
          >
            Edit
            <Pencil className="size-4" />
          </button>
        }
      />

      <DialogContent className="w-[calc(100%-2rem)] sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Destination</DialogTitle>
          <DialogDescription>
            Update the destination details below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="w-full space-y-5">
          <div className="grid gap-5 sm:grid-cols-2 sm:gap-x-6">
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="name">Destination Name</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setField("name", e.target.value)}
                placeholder="Bali Paradise"
                required
                className={inputClass}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                value={form.country}
                onChange={(e) => setField("country", e.target.value)}
                placeholder="Indonesia"
                className={inputClass}
              />
            </div>

            <div className="space-y-1.5">
              <Label>Category</Label>
              <Select
                value={form.category || null}
                onValueChange={(value) =>
                  setField("category", value)
                }
              >
                <SelectTrigger className={inputClass}>
                  <SelectValue placeholder="Select category" />
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

            <div className="space-y-1.5">
              <Label htmlFor="price">Price (USD)</Label>
              <Input
                id="price"
                type="number"
                min="0"
                value={form.price}
                onChange={(e) => setField("price", e.target.value)}
                placeholder="1299"
                className={inputClass}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                value={form.duration}
                onChange={(e) => setField("duration", e.target.value)}
                placeholder="7 Days/6 Nights"
                className={inputClass}
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="departureDate">Departure Date</Label>
              <Input
                id="departureDate"
                type="date"
                value={form.departureDate}
                onChange={(e) =>
                  setField("departureDate", e.target.value)
                }
                className={inputClass}
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                type="url"
                value={form.imageUrl}
                onChange={(e) => setField("imageUrl", e.target.value)}
                placeholder="https://example.com/image.jpg"
                className={inputClass}
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) =>
                  setField("description", e.target.value)
                }
                placeholder="Describe the travel experience..."
                className="min-h-28 rounded-md border-gray-200 bg-[#f8fafc] text-sm"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-3 border-t pt-4">
            {saved && (
              <p className="mr-auto text-xs text-emerald-600">
                Destination updated successfully.
              </p>
            )}

            <DialogClose
              render={
                <Button
                  type="button"
                  variant="outline"
                  className="gap-2 border-red-200 text-red-500 hover:bg-red-50"
                >
                  <Trash2 className="size-4" />
                  Delete
                </Button>
              }
            />

            <Button
              type="submit"
              disabled={loading}
              className="gap-2 bg-[#00bcd4] text-white hover:bg-[#00b0c6]"
            >
              <Save className="size-4" />
              {loading ? "Saving..." : "Save Destination"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
