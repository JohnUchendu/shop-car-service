"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { Search, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Type definitions
interface CarFormData {
  make: string;
  model: string;
  year: string;
  engine: string;
  transmission: string;
  trim: string;
  vin: string;
}

interface CarData {
  [make: string]: string[];
}

// Form validation schema
const formSchema = z.object({
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  year: z.string().min(4, "Please select a valid year"),
  engine: z.string().optional(),
  transmission: z.string().optional(),
  trim: z.string().optional(),
  vin: z.string().max(17, "VIN must be 17 characters or less").optional(),
});

type FormData = z.infer<typeof formSchema>;

// Data arrays
const carMakes = ["Toyota", "Honda", "Ford", "BMW", "Mercedes", "Lexus", "Nissan", "Hyundai"];
const years = ["2024", "2023", "2022", "2021", "2020", "2019", "2018"];

// Dynamic car data structure
const carData: CarData = {
  toyota: ["Camry", "Corolla", "RAV4", "Highlander", "Tacoma", "4Runner", "Sienna"],
  honda: ["Civic", "Accord", "CR-V", "Pilot", "Odyssey", "HR-V", "Ridgeline"],
  ford: ["Focus", "Fusion", "Escape", "Explorer", "F-150", "Mustang", "Edge"],
  bmw: ["3 Series", "5 Series", "7 Series", "X3", "X5", "X7", "M3"],
  mercedes: ["C-Class", "E-Class", "S-Class", "GLC", "GLE", "GLS", "A-Class"],
  lexus: ["ES", "RX", "NX", "UX", "LS", "GX", "LX"],
  nissan: ["Altima", "Sentra", "Rogue", "Pathfinder", "Frontier", "Murano", "Maxima"],
  hyundai: ["Elantra", "Sonata", "Tucson", "Santa Fe", "Kona", "Palisade", "Venue"],
};

const CarSelector = () => {
  // State management
  const [isLoading, setIsLoading] = useState(false);
  const [filteredModels, setFilteredModels] = useState<string[]>([]);
  const [selectedMake, setSelectedMake] = useState<string>("");

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      make: "",
      model: "",
      year: "",
      engine: "",
      transmission: "",
      trim: "",
      vin: "",
    },
    mode: "onChange",
  });

  // Watch form values
  const makeValue = watch("make");
  const modelValue = watch("model");

  // Dynamic model filtering
  useEffect(() => {
    if (makeValue && carData[makeValue.toLowerCase()]) {
      const models = carData[makeValue.toLowerCase()];
      setFilteredModels(models);
      setSelectedMake(makeValue);
      
      // Reset model when make changes
      if (modelValue && !models.includes(modelValue)) {
        setValue("model", "");
      }
    } else {
      setFilteredModels([]);
    }
  }, [makeValue, modelValue, setValue]);

  // Form submission handler
  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    
    try {
      console.log("Searching with:", data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would:
      // 1. Call your search API
      // 2. Redirect to results page
      // 3. Update global state
      
      // Example redirect:
      // const queryParams = new URLSearchParams(data as any).toString();
      // window.location.href = `/search?${queryParams}`;
      
      // Show success message
      alert(`Searching for ${data.year} ${data.make} ${data.model}`);
      
    } catch (error) {
      console.error("Search failed:", error);
      alert("Search failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle VIN-only search
  const handleVINSearch = () => {
    const vin = watch("vin");
    if (vin && vin.trim().length > 0) {
      onSubmit({ 
        make: "", 
        model: "", 
        year: "", 
        vin, 
        engine: "", 
        transmission: "", 
        trim: "" 
      } as FormData);
    }
  };

  // Reset form
  const handleReset = () => {
    reset();
    setFilteredModels([]);
    setSelectedMake("");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-card border border-border rounded-lg p-6 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-heading font-bold">Select your car</h3>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={handleReset}
          className="text-muted-foreground hover:text-foreground"
        >
          Clear All
        </Button>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {/* Make Selector */}
        <div>
          <Select 
            value={makeValue} 
            onValueChange={(value) => setValue("make", value)}
          >
            <SelectTrigger className={errors.make ? "border-destructive" : ""}>
              <SelectValue placeholder="Make *" />
            </SelectTrigger>
            <SelectContent>
              {carMakes.map((make) => (
                <SelectItem key={make} value={make.toLowerCase()}>
                  {make}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.make && (
            <p className="text-xs text-destructive mt-1">{errors.make.message}</p>
          )}
        </div>

        {/* Model Selector */}
        <div>
          <Select 
            value={modelValue} 
            onValueChange={(value) => setValue("model", value)}
            disabled={!makeValue || filteredModels.length === 0}
          >
            <SelectTrigger className={errors.model ? "border-destructive" : ""}>
              <SelectValue 
                placeholder={makeValue ? "Model *" : "Select make first"} 
              />
            </SelectTrigger>
            <SelectContent>
              {filteredModels.map((model) => (
                <SelectItem key={model} value={model.toLowerCase()}>
                  {model}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.model && (
            <p className="text-xs text-destructive mt-1">{errors.model.message}</p>
          )}
          {makeValue && filteredModels.length === 0 && (
            <p className="text-xs text-muted-foreground mt-1">No models found for {selectedMake}</p>
          )}
        </div>

        {/* Year Selector */}
        <div>
          <Select 
            value={watch("year")} 
            onValueChange={(value) => setValue("year", value)}
          >
            <SelectTrigger className={errors.year ? "border-destructive" : ""}>
              <SelectValue placeholder="Year *" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.year && (
            <p className="text-xs text-destructive mt-1">{errors.year.message}</p>
          )}
        </div>

        {/* Engine Selector */}
        <div>
          <Select 
            value={watch("engine")} 
            onValueChange={(value) => setValue("engine", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Engine" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="v4">4-Cylinder</SelectItem>
              <SelectItem value="v6">V6</SelectItem>
              <SelectItem value="v8">V8</SelectItem>
              <SelectItem value="electric">Electric</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
              <SelectItem value="diesel">Diesel</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Transmission Selector */}
        <div>
          <Select 
            value={watch("transmission")} 
            onValueChange={(value) => setValue("transmission", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Transmission" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="auto">Automatic</SelectItem>
              <SelectItem value="manual">Manual</SelectItem>
              <SelectItem value="cvt">CVT</SelectItem>
              <SelectItem value="dsg">DSG</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Trim Selector */}
        <div>
          <Select 
            value={watch("trim")} 
            onValueChange={(value) => setValue("trim", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Trim" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="base">Base</SelectItem>
              <SelectItem value="le">LE</SelectItem>
              <SelectItem value="se">SE</SelectItem>
              <SelectItem value="xle">XLE</SelectItem>
              <SelectItem value="sport">Sport</SelectItem>
              <SelectItem value="luxury">Luxury</SelectItem>
              <SelectItem value="premium">Premium</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="text-center my-4 text-muted-foreground text-sm">OR</div>

      {/* VIN Input */}
      <div className="mb-4">
        <div className="relative">
          <Input 
            placeholder="Search by VIN (17 characters max)" 
            className={`pr-24 ${errors.vin ? "border-destructive" : ""}`}
            {...register("vin")}
            disabled={isLoading}
          />
          <Button 
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-4"
            onClick={handleVINSearch}
            disabled={isLoading || !watch("vin")?.trim()}
          >
            VIN Search
          </Button>
        </div>
        {errors.vin && (
          <p className="text-xs text-destructive mt-1">{errors.vin.message}</p>
        )}
        {watch("vin") && (
          <p className="text-xs text-muted-foreground mt-1">
            Characters: {watch("vin")?.length || 0}/17
          </p>
        )}
      </div>

      {/* Submit Button */}
      <Button 
        type="submit" 
        className="w-full font-semibold gap-2"
        disabled={isLoading || (!makeValue && !modelValue && !watch("vin"))}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Searching...
          </>
        ) : (
          <>
            <Search className="h-4 w-4" />
            Search Parts
          </>
        )}
      </Button>

      {/* Form status */}
      <div className="mt-3 text-center">
        <p className="text-xs text-muted-foreground">
          {makeValue && modelValue ? (
            <>Selected: <span className="font-medium">{watch("year")} {selectedMake} {modelValue}</span></>
          ) : watch("vin") ? (
            <>Searching by VIN: <span className="font-medium">{watch("vin")}</span></>
          ) : (
            "Fill in required fields (*) or use VIN"
          )}
        </p>
      </div>
    </form>
  );
};

export default CarSelector;