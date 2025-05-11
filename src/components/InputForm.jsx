export default function InputForm({ label, type, className, onChange, value }) {
  return (
    <div className={className}>
      <label htmlFor="">{label}</label>
      <input type={type} className="block mt-2.5 px-4 py-2.5 border rounded-lg w-full" placeholder="New Task" onChange={onChange} value={value} required />
    </div>
  )
}