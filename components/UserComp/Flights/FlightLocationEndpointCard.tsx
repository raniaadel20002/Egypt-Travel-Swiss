"use client";

import React, { useState } from "react";
import { IconType } from "react-icons";
import { CityApiItem, CountryApiItem } from "@/models/flightLocation";
import { useLocale } from "@/shared/providers/LocaleProvider";

interface FlightLocationEndpointCardProps {
  title: string;
  icon: IconType;
  countries: CountryApiItem[];
  cities: CityApiItem[];
  countryId: number | null;
  onCountryChange: (id: number | null) => void;
  customCountry: string;
  onCustomCountryChange: (val: string) => void;
  cityId: number | null;
  onCityChange: (id: number | null) => void;
  customCity: string;
  onCustomCityChange: (val: string) => void;
  airport: string;
  onAirportChange: (val: string) => void;
  datalistId: string;
  requiredCountryCity?: boolean;
  isEgyptLocked?: boolean;
}

export default function FlightLocationEndpointCard({
  title,
  icon: Icon,
  countries,
  cities,
  countryId,
  onCountryChange,
  customCountry,
  onCustomCountryChange,
  cityId,
  onCityChange,
  customCity,
  onCustomCityChange,
  airport,
  onAirportChange,
  datalistId,
  requiredCountryCity = false,
  isEgyptLocked = false,
}: FlightLocationEndpointCardProps) {
  const { dictionary } = useLocale();
  const t = dictionary.flightsPage;

  const [isManualCountry, setIsManualCountry] = useState(false);
  const [isManualCity, setIsManualCity] = useState(false);

  const handleCountrySelect = (val: string) => {
    const id = val ? Number(val) : null;
    onCountryChange(id);
    onCityChange(null);
    if (id) {
      const found = countries.find((c) => c.id === id);
      if (found) {
        onCustomCountryChange(found.name);
      }
    } else {
      onCustomCountryChange("");
    }
  };

  const handleManualCountryType = (val: string) => {
    onCustomCountryChange(val);
    const matched = countries.find(
      (c) => c.name.toLowerCase() === val.trim().toLowerCase()
    );
    if (matched) {
      onCountryChange(matched.id);
    } else {
      onCountryChange(null);
    }
  };

  const handleCitySelect = (val: string) => {
    const id = val ? Number(val) : null;
    onCityChange(id);
    if (id) {
      const found = cities.find((c) => c.id === id);
      if (found) {
        onCustomCityChange(found.name);
        onAirportChange(found.name);
      }
    } else {
      onCustomCityChange("");
    }
  };

  const handleManualCityType = (val: string) => {
    onCustomCityChange(val);
    const matched = cities.find(
      (c) => c.name.toLowerCase() === val.trim().toLowerCase()
    );
    if (matched) {
      onCityChange(matched.id);
    } else {
      onCityChange(null);
    }
    if (val.trim()) {
      onAirportChange(val.trim());
    }
  };

  const showManualCityInput = isManualCity || (Boolean(countryId || customCountry) && cities.length === 0);

  return (
    <div className="rounded-2xl bg-[#FBF7F0] border border-[#EFE6D8] p-4 space-y-3">
      <div className="flex items-center gap-2">
        <span className="w-6 h-6 rounded-full bg-[#E8B34A] text-[#013E51] flex items-center justify-center shrink-0">
          <Icon className="w-3.5 h-3.5" />
        </span>
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#013E51]">
          {title}
        </span>
      </div>

      {/* Country Selection */}
      <div>
        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#013E51]/60 mb-1">
          {t.countryLabel} {requiredCountryCity && !isEgyptLocked && "*"}
        </label>

        {isEgyptLocked ? (
          <div className="w-full px-3.5 py-2.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs font-bold text-[#013E51] flex items-center justify-between">
            <span>{t.egyptLabel || "Egypt"}</span>
            <span className="text-[10px] font-semibold text-[#013E51]/60 uppercase tracking-wider">
              Domestic / Egypt
            </span>
          </div>
        ) : isManualCountry ? (
          <div>
            <input
              type="text"
              required={requiredCountryCity}
              list={`${datalistId}-country-list`}
              value={customCountry}
              onChange={(e) => handleManualCountryType(e.target.value)}
              placeholder={t.customCountryPlaceholder}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E5DDD0] text-xs font-semibold text-[#013E51] placeholder:text-[#013E51]/35 focus:outline-hidden focus:ring-2 focus:ring-[#E8B34A] [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:opacity-0"
            />
            <datalist id={`${datalistId}-country-list`}>
              {countries.map((c) => (
                <option key={c.id} value={c.name} />
              ))}
            </datalist>
          </div>
        ) : (
          <select
            required={requiredCountryCity}
            value={countryId ?? ""}
            onChange={(e) => handleCountrySelect(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E5DDD0] text-xs font-semibold text-[#013E51] focus:outline-hidden focus:ring-2 focus:ring-[#E8B34A] cursor-pointer"
          >
            <option value="">{t.selectCountry}</option>
            {countries.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* City Selection (Only when not Egypt-locked) */}
      {!isEgyptLocked && (
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#013E51]/60">
              {t.cityLabel} {requiredCountryCity && "*"}
            </label>
            <button
              type="button"
              onClick={() => setIsManualCity(!isManualCity)}
              className="text-[10px] font-bold text-[#013E51]/75 hover:text-[#013E51] hover:underline cursor-pointer"
            >
              {showManualCityInput ? t.selectFromList : t.typeManually}
            </button>
          </div>

          {showManualCityInput ? (
            <div>
              <input
                type="text"
                required={requiredCountryCity}
                list={`${datalistId}-city-list`}
                value={customCity}
                onChange={(e) => handleManualCityType(e.target.value)}
                placeholder={t.customCityPlaceholder}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E5DDD0] text-xs font-semibold text-[#013E51] placeholder:text-[#013E51]/35 focus:outline-hidden focus:ring-2 focus:ring-[#E8B34A] [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:opacity-0"
              />
              <datalist id={`${datalistId}-city-list`}>
                {cities.map((ct) => (
                  <option key={ct.id} value={ct.name} />
                ))}
              </datalist>
            </div>
          ) : (
            <select
              required={requiredCountryCity && cities.length > 0}
              disabled={!countryId && !customCountry}
              value={cityId ?? ""}
              onChange={(e) => handleCitySelect(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E5DDD0] text-xs font-semibold text-[#013E51] disabled:bg-gray-100/80 focus:outline-hidden focus:ring-2 focus:ring-[#E8B34A] cursor-pointer"
            >
              <option value="">
                {countryId || customCountry ? t.selectCity : t.selectCountryFirst}
              </option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          )}
        </div>
      )}

      {/* Airport Input */}
      <div>
        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#013E51]/60 mb-1">
          {t.airportLabel} *
        </label>
        <input
          type="text"
          required
          list={datalistId}
          value={airport}
          onChange={(e) => onAirportChange(e.target.value)}
          placeholder={t.airportPlaceholder}
          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E5DDD0] text-xs font-semibold text-[#013E51] placeholder:text-[#013E51]/35 focus:outline-hidden focus:ring-2 focus:ring-[#E8B34A] [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:opacity-0"
        />
      </div>
    </div>
  );
}
