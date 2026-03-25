"use client";

import { useState, useEffect } from "react";
import SettingRow from "./SettingRow";

interface ColorPickerFieldProps {
  label: string;
  settingKey?: string;
  value: string;
  onChange: (value: string) => void;
}

const HEX_REGEX = /^#[0-9a-fA-F]{6}$/;

export default function ColorPickerField({
  label,
  settingKey,
  value,
  onChange,
}: ColorPickerFieldProps) {
  const [hexInput, setHexInput] = useState(value);

  useEffect(() => {
    setHexInput(value);
  }, [value]);

  const handleHexChange = (newVal: string) => {
    setHexInput(newVal);
    if (HEX_REGEX.test(newVal)) {
      onChange(newVal);
    }
  };

  return (
    <SettingRow label={label} settingKey={settingKey}>
      <div className="flex items-center gap-3">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-8 h-8 rounded cursor-pointer bg-transparent border border-[#2a2a2a]"
        />
        <input
          type="text"
          value={hexInput}
          onChange={(e) => handleHexChange(e.target.value)}
          onBlur={() => {
            if (!HEX_REGEX.test(hexInput)) setHexInput(value);
          }}
          className="w-24 px-2 py-1.5 bg-[#111111] border border-[#2a2a2a] rounded text-sm font-mono text-[#e5e5e5] focus:border-[#00ff9f]/50 focus:outline-none transition-colors"
          maxLength={7}
          spellCheck={false}
        />
      </div>
    </SettingRow>
  );
}
