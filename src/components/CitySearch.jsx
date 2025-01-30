/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Button } from "./ui/button";
import { Loader2, Search } from "lucide-react";
import { useLocationSearch } from "@/hooks/useWeather";
import { useNavigate } from "react-router-dom";

const CitySearch = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const { data, isLoading } = useLocationSearch(query);

  const handleSelect = (cityData) => {
    const [lat, lon, name] = cityData.split("|");

    setOpen(false);

    navigate(`/city/${name}?lat=${lat}&lon=${lon}`);
  };
  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className=" relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
      >
        <Search className="mr-2 h-4 w-4" />
        Search cities...
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search cities..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          {query.length > 2 && !isLoading && (
            <CommandEmpty>No cities found.</CommandEmpty>
          )}

          {data && data.length > 0 && (
            <CommandGroup heading="suggestions">
              {isLoading && (
                <div
                  className="flex items-center justify-center p-4
                "
                >
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              )}

              {data.map((location) => {
                return (
                  <CommandItem
                    key={`${location.lat}-${location.lon}`}
                    value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                    onSelect={handleSelect}
                  >
                    <Search className="mr-2 h-4 w-4" />
                    <span>{location.name}</span>
                    {location.state && (
                      <span className="text-sm text-muted-foreground">
                        , {location.state}
                      </span>
                    )}
                    <span className="text-sm text-muted-foreground">
                      , {location.country}
                    </span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default CitySearch;
