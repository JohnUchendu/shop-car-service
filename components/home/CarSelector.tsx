"use client"; // Required for interactive components (Select)

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Search } from "lucide-react"; // Optional: add search icon

// Data arrays remain the same
const carMakes = ["Toyota", "Honda", "Ford", "BMW", "Mercedes", "Lexus", "Nissan", "Hyundai"];
const carModels = ["Camry", "Corolla", "Civic", "Accord", "Focus", "3 Series", "C-Class"];
const years = ["2024", "2023", "2022", "2021", "2020", "2019", "2018"];

const CarSelector = () => {
  // State for form values
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    engine: "",
    transmission: "",
    trim: "",
    vin: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the search logic here
    console.log("Searching with:", formData);
    
    // You could redirect to search results page
    // const query = new URLSearchParams(formData).toString();
    // window.location.href = `/search?${query}`;
    
    // Or call an API
    // fetch('/api/search', { method: 'POST', body: JSON.stringify(formData) })
  };

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-6 shadow-lg">
      <h3 className="text-lg font-heading font-bold mb-4">Select your car</h3>
      <div className="grid grid-cols-2 gap-3">
        {/* Make Selector */}
        <Select 
          value={formData.make} 
          onValueChange={(value) => handleInputChange("make", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Make" />
          </SelectTrigger>
          <SelectContent>
            {carMakes.map((make) => (
              <SelectItem key={make} value={make.toLowerCase()}>
                {make}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Model Selector */}
        <Select 
          value={formData.model} 
          onValueChange={(value) => handleInputChange("model", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Model" />
          </SelectTrigger>
          <SelectContent>
            {carModels.map((model) => (
              <SelectItem key={model} value={model.toLowerCase()}>
                {model}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Year Selector */}
        <Select 
          value={formData.year} 
          onValueChange={(value) => handleInputChange("year", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Engine Selector */}
        <Select 
          value={formData.engine} 
          onValueChange={(value) => handleInputChange("engine", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Engine" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="v4">4-Cylinder</SelectItem>
            <SelectItem value="v6">V6</SelectItem>
            <SelectItem value="v8">V8</SelectItem>
            <SelectItem value="electric">Electric</SelectItem>
          </SelectContent>
        </Select>

        {/* Transmission Selector */}
        <Select 
          value={formData.transmission} 
          onValueChange={(value) => handleInputChange("transmission", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Transmission" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="auto">Automatic</SelectItem>
            <SelectItem value="manual">Manual</SelectItem>
            <SelectItem value="cvt">CVT</SelectItem>
          </SelectContent>
        </Select>

        {/* Trim Selector */}
        <Select 
          value={formData.trim} 
          onValueChange={(value) => handleInputChange("trim", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Trim" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="base">Base</SelectItem>
            <SelectItem value="le">LE</SelectItem>
            <SelectItem value="se">SE</SelectItem>
            <SelectItem value="xle">XLE</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="text-center my-4 text-muted-foreground text-sm">OR</div>

      {/* VIN Input */}
      <Input 
        placeholder="Search by VIN" 
        className="mb-4"
        value={formData.vin}
        onChange={(e) => handleInputChange("vin", e.target.value)}
      />

      {/* Submit Button */}
      <Button type="submit" className="w-full font-semibold gap-2">
        <Search className="h-4 w-4" />
        Search
      </Button>
    </form>
  );
};

export default CarSelector;