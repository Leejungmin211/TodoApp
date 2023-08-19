export default function EditDiary() {
  const handleChange = (e) => {
    const { name, value, files } = e.target;
  };
  return (
    <>
      <input
        type="file"
        accept="image/*"
        name="file"
        onChange={handleChange}
        required
      />
    </>
  );
}
