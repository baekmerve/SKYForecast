/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useDebounce } from "use-debounce";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";

import { Loader2, Search } from "lucide-react";
import { useCitySearch } from "@/hooks/useWeatherDetails";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

const CitySearch = ({ onSelectCity }) => {
  const [city, setCity] = useState(""); // State to hold city name
  const [debouncedQuery] = useDebounce(city, 500); // Debounce to prevent rapid API calls
  const { data, isLoading, error } = useCitySearch(debouncedQuery); // Fetching city data from the API

  // Handle the city selection
  const handleCitySelect = (cityData) => {
    if (cityData && cityData.coord) {
      onSelectCity(cityData.coord); // Pass the coordinates back to parent component
    }
  };

  return (
    <div className="flex flex-col w-full max-w-sm items-center space-y-2 ">
      <div className="flex w-full items-center  ">
        <Input
          type="text"
          placeholder="검색할 도시를 입력하세요"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <Button
          onClick={() => handleCitySelect(data)}
          variant={"outline"}
          className="ml-1"
          disabled={isLoading} // Disable button when loading or no data
        >
          검색
        </Button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center w-full mt-2">
          <Loader2 className="animate-spin h-6 w-6 text-gray-500" />
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="w-full mt-2 text-red-700 text-sm">
          <p>Error: Could find the city</p>
        </div>
      )}

      {/* Display City Data */}
      {!isLoading && !error && data && data.name && (
        <div className="w-full">
          <Command>
            <CommandList>
              <CommandGroup>
                <CommandItem
                  value={data.name}
                  onSelect={() => handleCitySelect(data)}
                  className="p-2 cursor-pointer "
                >
                  <Search className="mr-2 h-4 w-4" />
                  <span>{data.name}</span>
                  <span className="text-sm text-muted-foreground">
                    , {data.sys?.country}
                  </span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
};

export default CitySearch;
