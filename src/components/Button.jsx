export default function Button({ type, children, click }) {
  return (
    <button type={type} className="px-4 py-2.5 rounded-lg border cursor-pointer" onClick={click}>{children}</button>
  )
}