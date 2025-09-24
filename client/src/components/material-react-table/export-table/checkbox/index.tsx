interface ICheckbox {
  selectedFormat: string | null;
  format: { id: string; label: string };
  setSelectedFormat: (id: string) => void;
}

export const Checkbox = ({ format, selectedFormat, setSelectedFormat }: ICheckbox) => {
  return (
    <div className="border-#D0DDEC border-b-2 p-2">
      <label key={format.id} className="flex cursor-pointer items-center gap-2">
        <input
          type="checkbox"
          className="h-4 w-4 accent-blue-500"
          checked={selectedFormat === format.id}
          onChange={() => setSelectedFormat(format.id)}
        />
        {format.label}
      </label>
    </div>
  );
};
